const iframe = new iFrame();

iframe.on("UpdateData", () => {
	if (document.querySelector("video")) {
		const video: HTMLVideoElement = document.querySelector("video");
		iframe.send({
			currTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
