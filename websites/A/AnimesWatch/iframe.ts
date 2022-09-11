const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video) {
		iframe.send({
			paused: <boolean>video.paused,
			duration: <number>video.duration,
			currentTime: <number>video.currentTime,
		});
	}
});
