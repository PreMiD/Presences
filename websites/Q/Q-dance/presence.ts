const presence = new Presence({
		clientId: "844107169205190686",
	}),
	elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};
	if (document.querySelector("svg.audioplayer-controls__icon--play")) {
		presenceData.details = document.querySelector(
			".audioplayer-nowplaying__track"
		).textContent;
		presenceData.state = document.querySelector(
			".audioplayer-nowplaying__artist"
		).textContent;
		(presenceData.smallImageKey = "live"),
			(presenceData.smallImageText = (
				await presence.getStrings({
					live: "general.live",
				})
			).live);
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(
				"div.audioplayer-nowplaying__image > img"
			)?.src ?? "logo";
		presenceData.startTimestamp = elapsed;
		presence.setActivity(presenceData);
	} else presence.setActivity();
});
