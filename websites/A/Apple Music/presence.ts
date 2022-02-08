const presence = new Presence({
		clientId: "842112189618978897"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "applemusic-logo"
		},
		audio = document.querySelector<HTMLAudioElement>(
			"audio#apple-music-player"
		);

	if (audio?.title) {
		const timestamp = document.querySelector<HTMLInputElement>(
				"input[aria-valuenow][aria-valuemax]"
			),
			paused = audio.paused || audio.readyState <= 2;

		presenceData.details = navigator.mediaSession.metadata.title;
		presenceData.state = navigator.mediaSession.metadata.artist;

		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused
			? (await strings).pause
			: (await strings).play;

		presenceData.largeImageKey =
			navigator.mediaSession.metadata.artwork[0].src.replace(
				/[0-9]{1,2}x[0-9]{1,2}bb/,
				"1024x1024"
			);

		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Number(timestamp.ariaValueNow),
				Number(timestamp.ariaValueMax)
			);

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (!presenceData.details) presence.clearActivity();
		else presence.setActivity(presenceData);
	} else presence.clearActivity();
});
