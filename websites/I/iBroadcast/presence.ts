const presence = new Presence({
		clientId: "861594094623129691",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/I/iBroadcast/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				document.querySelector<HTMLImageElement>(
					".mgr-container-artwork-single,.mgr-player-artwork-image"
				)?.src ?? Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		cover = await presence.getSetting<boolean>("cover"),
		{ hostname } = document.location;

	if (hostname.startsWith("edit")) presenceData.details = "Editing Library";
	else if (hostname.startsWith("beta") || hostname.startsWith("media")) {
		const playlist = document.querySelector(".mgr-list-tracks-title"),
			popup = document.querySelector(
				"div.mgr-modal.mgr-modal-opaque > div > div.mgr-title"
			);

		if (document.querySelector(".icon-player-pause")) {
			presenceData.type = ActivityType.Listening;
			const title = document.querySelector(".mgr-player-title"),
				artist = document.querySelector(".mgr-player-artist"),
				currentTime = document.querySelector(".mgr-player-current-time"),
				duration = document.querySelector(".mgr-player-duration");

			if (title && artist) {
				presenceData.details = `${title.textContent} by ${artist.textContent}`;
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Listening";
			}
			if (currentTime && duration) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					presence.timestampFromFormat(currentTime.textContent),
					presence.timestampFromFormat(duration.textContent)
				);
			}
		} else if (playlist) {
			presenceData.details = "Looking at a playlist";
			presenceData.state = playlist?.textContent ?? "";
		} else if (popup?.textContent)
			presenceData.details = `Viewing ${popup.textContent}`;
		else {
			switch (
				document.querySelector(".mgr-menu-item.mgr-menu-item-selected")
					?.textContent
			) {
				case "Album Artists": {
					const albumSelected = document.querySelector(
						".mgr-list-tracks-title"
					)?.textContent;

					if (albumSelected) {
						presenceData.details = "Viewing album artists";
						presenceData.state = albumSelected;
					} else {
						presenceData.details = "Viewing all album artists";
						presenceData.largeImageKey = Assets.Logo;
					}
					break;
				}
				default: {
					presenceData.details = "Browsing...";
				}
			}
		}
	}

	if (!cover && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
