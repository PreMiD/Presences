const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const video = document.querySelectorAll(".jw-video")[0] as HTMLVideoElement;
	iframe.send({
		currentTime: video.currentTime,
		duration: video.duration,
		paused: video.paused,
	});
});
