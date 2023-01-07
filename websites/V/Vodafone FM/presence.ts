const presence = new Presence({
		clientId: "1061398473368412210",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo_512",
		details: "Listening to music",
	};

	if (document.querySelector("#play").classList.contains("hidden")) {
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = (await strings).play;
	} else {
		presenceData.smallImageKey = "pause";
		presenceData.smallImageText = (await strings).pause;
	}

	const artistElement = document.querySelector("#artist_name"),
		songElement = document.querySelector("#song_name");
	if (artistElement && songElement)
		presenceData.state = `${artistElement.title} - ${songElement.title}`;

	presence.setActivity(presenceData);
});
