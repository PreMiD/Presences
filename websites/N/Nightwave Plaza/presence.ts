const presence = new Presence({
	clientId: "620204628608417832",
});

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
	const presenceData: PresenceData = { largeImageKey: "icon" },
		playerTitle: HTMLDivElement = document.querySelector("div.player-title"),
		playerArtist: HTMLDivElement = document.querySelector("div.player-artist"),
		playerTime: HTMLDivElement = document.querySelector("div.player-time"),
		playBackStatus: HTMLButtonElement =
			document.querySelector("button.player-play"),
		listeners: HTMLDivElement = document.querySelector("div.col.cell"),
		header: NodeListOf<HTMLDivElement> = document.querySelectorAll(
			".window > .inner > .header.header-draggable.noselect"
		),
		songInfo: HTMLDivElement = document.querySelector(".p-2.song-info");

	if (songInfo) {
		const [artist, album, title] = [...songInfo.querySelectorAll(".mb-1")].map(
			e => e.textContent
		);
		if (artist && album && title) {
			presenceData.details = `Looking at ${title.substring(
				8
			)} by ${artist.substring(10)}`;
			presenceData.state = `Album: ${album.substring(8)}`;
		}
	} else if (header.length === 2) {
		let rating: HTMLButtonElement;
		if (header[1].textContent === "Ratings")
			rating = document.querySelector("button.active");
		presenceData.details = `Looking at ${rating ? rating.textContent : ""} ${
			header[1].textContent
		}`;
	} else {
		if (playerTitle) presenceData.state = playerTitle.textContent;
		if (playerArtist) presenceData.details = playerArtist.textContent;

		if (playBackStatus) {
			switch (playBackStatus.textContent) {
				case "Play": {
					presenceData.smallImageKey = Assets.Play;
					if (listeners) presenceData.smallImageText = listeners.textContent;
					break;
				}
				case "Stop": {
					presenceData.smallImageKey = Assets.Pause;
					if (listeners) presenceData.smallImageText = listeners.textContent;
					break;
				}
				default:
					break;
			}
		}

		if (playerTime) {
			const [currentTime, duration] = playerTime.textContent
				.split("/")
				.map(time => presence.timestampFromFormat(time));

			[, presenceData.endTimestamp] = presence.getTimestamps(
				currentTime,
				duration
			);
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
