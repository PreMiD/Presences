const presence = new Presence({
		clientId: "861594094623129691",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/o9rFoCG.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname } = document.location;

	if (hostname.startsWith("edit")) presenceData.details = "Editing Library";
	else if (hostname.startsWith("beta") || hostname.startsWith("media")) {
		const playlist: HTMLDivElement = document.querySelector(
				".mgr-list-tracks-title"
			),
			popup: HTMLDivElement = document.querySelector(
				"body > div.mgr-modal.mgr-modal-opaque > div > div.mgr-title"
			);

		if (document.querySelector(".icon-player-pause")) {
			const title: HTMLDivElement = document.querySelector(".mgr-player-title"),
				artist: HTMLDivElement = document.querySelector(".mgr-player-artist"),
				currentTime: HTMLDivElement = document.querySelector(
					".mgr-player-current-time"
				),
				duration: HTMLDivElement = document.querySelector(
					".mgr-player-duration"
				);

			if (title && artist) {
				presenceData.details = `${title.textContent} by ${artist.textContent}`;
				presenceData.smallImageKey = "play";
				presenceData.smallImageText = "Listening";
			}
			if (currentTime && duration) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					presence.timestampFromFormat(currentTime.textContent),
					presence.timestampFromFormat(duration.textContent)
				);
			}
		} else if (playlist) {
			presenceData.details = "Looking at playlist";
			presenceData.state = playlist.textContent;
		} else if (popup) presenceData.details = `Viewing ${popup.textContent}`;
		else presenceData.details = "At homepage";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
