const presence = new Presence({
		clientId: "1138970637440917504",
	}),
	timeElapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const strings = await presence.getStrings({
			play: "presence.playback.playing",
			pause: "presence.playback.paused",
		}),
		playBackStatus = document.querySelector("button.Player-ctaButton"),
		coverImage = document
			.querySelector(".Player-coverImage")
			?.getAttribute("src"),
		presenceData: PresenceData = {
			startTimestamp: timeElapsed,
			largeImageKey: /^https:\/\//.test(coverImage)
				? coverImage
				: "https://i.imgur.com/RBf6mDU.png",
			buttons: [
				{
					label: "Listen along!",
					url: "https://kexp.org/listen/",
				},
			],
			details: document.querySelector("a.Player-show")?.textContent,
			state: document.querySelector("div.Player-title")?.textContent,
		};

	if (playBackStatus) {
		switch (playBackStatus.ariaLabel) {
			case "Play Stream": {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = strings.pause;
				break;
			}
			case "Pause Stream": {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = strings.play;
				break;
			}
			default:
				break;
		}
	}

	presence.setActivity(presenceData);
});
