const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video) {
		iframe.send({
			paused: video.paused,
			duration: isNaN(video.duration) ? 0 : video.duration,
			currentTime: isNaN(video.currentTime) ? 0 : video.currentTime,
		});
	}
});
