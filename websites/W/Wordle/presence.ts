const presence = new Presence({
		clientId: "938310167404101683",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	puzzleNumber = Math.trunc(
		(Date.now() - new Date("06/19/2021").getTime()) / (1000 * 3600 * 24)
	);

presence.on("UpdateData", async () => {
	if (document.location.pathname.includes("/wordle")) {
		const presenceData: PresenceData = {
				largeImageKey: "https://i.imgur.com/N19NFSF.png",
				startTimestamp: browsingTimestamp,
			},
			guess = await presence.getSetting<boolean>("guess");
		for (let i = 0; i < 6; i++) {
			const guessed = document
					.querySelector("body > game-app")
					.shadowRoot.querySelectorAll("#board > game-row")
					[i].shadowRoot.querySelector("div > game-tile[evaluation]"),
				correct = document
					.querySelector("body > game-app")
					.shadowRoot.querySelectorAll("#board > game-row")
					[i].shadowRoot.querySelectorAll(
						'div > game-tile[evaluation="correct"]'
					).length,
				typing = document
					.querySelector("body > game-app")
					.shadowRoot.querySelectorAll("#board > game-row")
					[i].shadowRoot.querySelector("div > game-tile")
					.shadowRoot.querySelector('div[data-state="tbd"]');
			if (correct === 5) {
				presenceData.details = `Solved (#${puzzleNumber})`;
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "solved";
				break;
			} else if (i === 5 && guessed) {
				presenceData.details = `Failed (#${puzzleNumber})`;
				presenceData.state = "Guess X / 6";
				presenceData.smallImageKey = "fail";
				break;
			} else if (typing) {
				presenceData.details = `Typing... (#${puzzleNumber})`;
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "writing";
				break;
			} else if (!guessed) {
				if (i === 0) presenceData.details = `Warming up... (#${puzzleNumber})`;
				else presenceData.details = `Guessing... (#${puzzleNumber})`;
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "thought";
				break;
			}
		}
		if (!guess) delete presenceData.state;
		presence.setActivity(presenceData);
	}
});
