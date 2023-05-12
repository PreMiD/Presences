const presence = new Presence({
		clientId: "938310167404101683",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	puzzleNumber = Math.trunc(
		(Date.now() - new Date("06/19/2021").getTime()) / (1000 * 3600 * 24)
	);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

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
				presenceData.smallImageKey = Assets.Writing;
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
