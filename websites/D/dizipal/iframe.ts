const iframe = new iFrame();

iframe.on("UpdateData", () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video && !isNaN(video.duration) && !isNaN(video.currentTime)) {
		iframe.send({
			duration: video.duration,
			currentTime: video.currentTime,
			paused: video.paused,
		});
	}
});
