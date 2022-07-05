const videoFrame = new iFrame();

videoFrame.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video) {
		videoFrame.send({
			paused: video.paused,
			duration: video.duration,
			currentTime: video.currentTime,
		});
	}
});
