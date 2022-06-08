const presence = new Presence({
	clientId: "463151177836658699"
});

let prevMetadata: {
	title: string;
	startedAt: number;
};

presence.on("UpdateData", async () => {
	const title = navigator.mediaSession.metadata?.title,
		video = document.querySelector<HTMLVideoElement>(".video-stream"),
		progressBar = document.querySelector<HTMLElement>("#progress-bar"),
		repeatMode = document
			.querySelector('ytmusic-player-bar[slot="player-bar"]')
			.getAttribute("repeat-Mode_"),
		[buttons, timestamps, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover")
		]);
	if (title && !isNaN(video.duration)) {
		const endTimestamp =
				Date.now() / 1000 +
				Number(progressBar.getAttribute("aria-valuemax")) -
				Number(progressBar.getAttribute("value")),
			watchID = document
				.querySelector<HTMLAnchorElement>("a.ytp-title-link.yt-uix-sessionlink")
				.href.match(/v=([^&#]{5,})/)[1],
			presenceData: PresenceData = {
				details: title,
				state: [
					navigator.mediaSession.metadata.artist,
					navigator.mediaSession.metadata.album
				]
					.filter(Boolean)
					.join(" - "),
				largeImageKey: cover
					? navigator.mediaSession.metadata.artwork[0].src
					: "ytm_lg",
				smallImageKey: video.paused
					? "pause"
					: repeatMode === "ONE"
					? "repeat-one"
					: repeatMode === "ALL"
					? "repeat"
					: "play",
				smallImageText: video.paused
					? "Paused"
					: repeatMode === "ONE"
					? "On loop"
					: repeatMode === "ALL"
					? "Playlist on loop"
					: "Playing",
				startTimestamp: prevMetadata?.startedAt,
				endTimestamp
			};

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Listen Along",
					url: `https://music.youtube.com/watch?v=${watchID}`
				}
			];
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Listen Along",
					url: `https://music.youtube.com/watch?v=${watchID}`
				}
			];
		}

		if (video.paused || !timestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (!prevMetadata || prevMetadata.title !== title) {
			prevMetadata = {
				title,
				startedAt: Date.now() / 1000
			};
		}

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
