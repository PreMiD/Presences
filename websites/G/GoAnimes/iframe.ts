const iframe = new iFrame();

iframe.on("UpdateData", async () => {
    if (document.querySelector("video.jw-video.jw-reset")) {
		const video: HTMLVideoElement = document.querySelector(
			"video.jw-video.jw-reset"
		);
		if (video) {
			iframe.send({
				currentTime: video.currentTime,
				duration: video.duration,
				played: video.duration !== 0,
				paused: video.paused,
			});
		}
	}
})