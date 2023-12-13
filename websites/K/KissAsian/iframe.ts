const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector(
		"video,[class='jw-video jw-reset']"
	);

	if (video && !isNaN(video.duration)) {
		iframe.send({
			iframeVideo: {
				currentTime: video.currentTime,
				duration: video.duration,
				paused: video.paused,
			},
		});
	}
});
