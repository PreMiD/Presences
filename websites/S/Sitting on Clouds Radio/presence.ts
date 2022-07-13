const presence = new Presence({
		clientId: "689724677274337290",
	}),
	timeElapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "clouds",
		},
		albumName = document.querySelector<HTMLElement>(
			"p#cardAlbum.playerText.truncate"
		);
	if (albumName.textContent === "Press the Play button to start the radio") {
		presenceData.details = "Not tuned in.";
		presenceData.smallImageKey = "pause";
	} else {
		presenceData.details = document.querySelector<HTMLElement>(
			"span#cardTitle.card-title.playerText.truncate"
		).textContent;
		presenceData.state = `${
			document.querySelector<HTMLElement>("p#cardArtist.playerText.truncate")
				.textContent
		} - ${albumName.textContent}`;
		presenceData.smallImageKey = "live";
		presenceData.startTimestamp = timeElapsed;
	}
	presence.setActivity(presenceData);
});
