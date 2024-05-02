const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLMediaElement = document.querySelector(
		"div#mainContainer > div#player > video#html5video.video-player"
	);
	if (video) {
		iframe.send({
			currentTime: video.currentTime,
			paused: video.paused,
			duration: video.duration,
		});
	}
});
