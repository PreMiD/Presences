const presence = new Presence({
		clientId: "938310167404101683"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	if (document.location.pathname.startsWith("/wordle")) {
		const presenceData: PresenceData = {
				largeImageKey: "logo",
				startTimestamp: browsingTimestamp
			},
			guess = await presence.getSetting<boolean>("guess");
		for (let i = 0; i < 6; i++) {
			const notGuessed = document
				.querySelector("body > game-app")
				.shadowRoot.querySelectorAll("#board > game-row")
				[i].shadowRoot.querySelector("div > game-tile")
				.shadowRoot.querySelector('div[data-state="empty"]');
			if (notGuessed) {
				presenceData.details = "Guessing...";
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "thought";
				break;
			}
		}
		for (let i = 0; i < 6; i++) {
			const typing = document
				.querySelector("body > game-app")
				.shadowRoot.querySelectorAll("#board > game-row")
				[i].shadowRoot.querySelector("div > game-tile")
				.shadowRoot.querySelector('div[data-state="tbd"]');
			if (typing) {
				presenceData.details = "Typing...";
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "writing";
				break;
			}
		}
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
					).length;
			if (correct === 5) {
				presenceData.details = "Solved";
				presenceData.state = `Guess ${i + 1} / 6`;
				presenceData.smallImageKey = "solved";
				break;
			} else if (i === 5 && guessed) {
				presenceData.details = "Failed";
				presenceData.state = "Guess X / 6";
				presenceData.smallImageKey = "fail";
				break;
			}
		}
		if (!guess) delete presenceData.state;
		presence.setActivity(presenceData);
	}
});
