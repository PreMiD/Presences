const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement =
		document.querySelector(".jw-video") ||
		document.querySelector(".html5-video-container");

	if (video && !isNaN(video.duration)) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
