const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>(
		"video.jw-video.jw-reset"
	);
	if (video) {
		iframe.send({
			currentTime: video.currentTime,
			duration: video.duration,
			played: video.duration !== 0,
			paused: video.paused,
		});
	}
});
