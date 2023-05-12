const presence = new Presence({
		clientId: "861594094623129691",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

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
			presenceData.details = "Looking at playlist";
			presenceData.state = playlist.textContent;
		} else if (popup) presenceData.details = `Viewing ${popup.textContent}`;
		else presenceData.details = "At homepage";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
