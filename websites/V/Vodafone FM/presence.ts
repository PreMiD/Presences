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

	const playButton = document.getElementById("play");
	if (playButton.classList.contains("hidden")) {
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = (await strings).play
	} else {
		presenceData.smallImageKey = "pause";
		presenceData.smallImageText = (await strings).pause;
	}

	const artistElement = document.getElementById("artist_name");
	if (artistElement) {
		const songElement = document.getElementById("song_name");
		presenceData.state = `${artistElement.title} - ${songElement.title}`;
	}

	presence.setActivity(presenceData);
});
