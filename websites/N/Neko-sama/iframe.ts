const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video = document.querySelector("video");
	if (!isNaN(video?.duration)) {
		iframe.send({
			time: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
