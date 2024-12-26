const presence = new Presence({
		clientId: "745261937092198532",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	if (!navigator.mediaSession.metadata) return presence.setActivity();

	const playing =
			document.querySelectorAll(".player-controls__btn_pause").length === 2,
		largeImageKey = navigator.mediaSession.metadata.artwork
			? navigator.mediaSession.metadata.artwork.at(-1).src
			: "https://cdn.rcd.gg/PreMiD/websites/Y/Yandex%20Music/assets/logo.png",
		timePassed = document.querySelector(".progress__left").textContent,
		durationString = document.querySelector(".progress__right").textContent,
		[currentTime, duration] = [
			presence.timestampFromFormat(timePassed),
			(() => {
				return (
					presence.timestampFromFormat(durationString) +
					presence.timestampFromFormat(timePassed)
				);
			})(),
		],
		[startTimestamp, endTimestamp] = presence.getTimestamps(
			currentTime,
			duration
		),
		presenceData = {
			type: ActivityType.Listening,
			largeImageKey,
			smallImageKey: playing ? Assets.Play : Assets.Pause,
			smallImageText: playing ? (await strings).playing : (await strings).pause,
			details: navigator.mediaSession.metadata.title,
			state:
				navigator.mediaSession.metadata.artist ||
				navigator.mediaSession.metadata.album,
			startTimestamp,
			endTimestamp,
		};

	if (!playing) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	presence.setActivity(presenceData);
});
