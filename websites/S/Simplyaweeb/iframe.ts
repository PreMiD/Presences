const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (!isNaN(video?.duration)) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
