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

	const artist = document.querySelector("#artist_name")?.textContent,
		song = document.querySelector("#song_name")?.textContent;
	if (artist && song) presenceData.state = `${artist} - ${song}`;

	presence.setActivity(presenceData);
});
