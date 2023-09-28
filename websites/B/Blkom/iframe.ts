const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector(".vjs-tech")) {
		const video: HTMLVideoElement = document.querySelector(".vjs-tech");
		if (video && !isNaN(video.duration)) {
			iframe.send({
				duration: video.duration,
				currentTime: video.currentTime,
				paused: video.paused,
			});
		}
	}
});
