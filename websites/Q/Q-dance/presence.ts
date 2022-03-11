const presence = new Presence({
		clientId: "844107169205190686"
	}),
	elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};
	if (document.querySelector("svg.audioplayer-controls__icon--play")) {
		presenceData.details = document.querySelector(
			".audioplayer-nowplaying__track"
		).textContent;
		presenceData.state = document.querySelector(
			".audioplayer-nowplaying__artist"
		).textContent;
		presenceData.smallImageKey = "live";
		presenceData.smallImageText = `Volume: ${document
			.querySelector(
				"#app > footer > div > div.audioplayer__wrapper > div.audioplayer-controls.audioplayer__controls > div.audioplayer-controls__right > div > div > div"
			)
			.getAttribute("style")
			.replace("width:", "")
			.replace(/;/, "")}`;
		presenceData.largeImageKey =
			document
				.querySelector(
					"#app > footer > div > div.audioplayer__wrapper > div.audioplayer-nowplaying.audioplayer__nowplaying > div.audioplayer-nowplaying__image > img"
				)
				?.getAttribute("src") ?? "logo";
		presenceData.startTimestamp = elapsed;
		presence.setActivity(presenceData);
	} else presence.setActivity();
});
