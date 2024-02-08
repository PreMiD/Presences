const presence = new Presence({
	clientId: "620204628608417832",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/N/Nightwave%20Plaza/assets/logo.png",
		},
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
