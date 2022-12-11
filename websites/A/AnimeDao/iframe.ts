const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video = document.querySelector("video");
	if (video) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
			isVideo: true,
		});
	}
});
