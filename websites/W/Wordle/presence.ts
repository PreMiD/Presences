const presence = new Presence({
		clientId: "938310167404101683",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	puzzleNumber = Math.trunc(
		(Date.now() - new Date("06/19/2021").getTime()) / (1000 * 3600 * 24)
	);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/W/Wordle/assets/logo.png",
	Thought = "https://cdn.rcd.gg/PreMiD/websites/W/Wordle/assets/0.png",
	Fail = "https://cdn.rcd.gg/PreMiD/websites/W/Wordle/assets/1.png",
	Solved = "https://cdn.rcd.gg/PreMiD/websites/W/Wordle/assets/2.png",
}

presence.on("UpdateData", async () => {
	if (document.location.pathname.includes("/wordle")) {
		const presenceData: PresenceData = {
				largeImageKey: Assets.Logo,
				startTimestamp: browsingTimestamp,
			},
			guess = await presence.getSetting<boolean>("guess");
		for (let i = 0; i < 6; i++) {
			const guessed = document.querySelector(
					'[aria-label="Row 1"]'
				).textContent,
				correct = document
					.querySelector('[aria-label="Row 1"]')
					.parentElement.querySelectorAll("[class*='Row-module_win']").length;
			if (correct === 5) {
				presenceData.details = `Solved (#${puzzleNumber})`;
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = Assets.Solved;
				break;
			} else if (i === 5 && guessed) {
				presenceData.details = `Failed (#${puzzleNumber})`;
				presenceData.state = "Guess X / 6";
				presenceData.smallImageKey = Assets.Fail;
				break;
			} else if (!guessed) {
				if (i === 0) presenceData.details = `Warming up... (#${puzzleNumber})`;
				else presenceData.details = `Guessing... (#${puzzleNumber})`;
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = Assets.Thought;
				break;
			}
		}
		if (!guess) delete presenceData.state;
		presence.setActivity(presenceData);
	}
});
