const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector(".jw-media video");

	if (video) {
		iframe.send({
			paused: video.paused,
			currentTime: video.currentTime,
			duration: video.duration,
		});
	}
});
