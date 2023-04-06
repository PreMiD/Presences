const iframe = new iFrame();

iframe.on("UpdateData", () => {
	const video: HTMLVideoElement =
		document.querySelector("video.jw-video") || document.querySelector("video");

	if (!video) return;

	iframe.send({
		elapsed: video.currentTime,
		duration: video.duration,
		ended: video.ended,
		paused: video.paused,
	});
});
