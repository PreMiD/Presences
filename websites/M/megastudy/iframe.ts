const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	if (document.querySelector("#kollusPlayer_html5_api")) {
		const video: HTMLVideoElement = document.querySelector(
			"#kollusPlayer_html5_api"
		);
		iframe.send({
			isPlayerPlaying: !video.paused,
			currentTime: video.currentTime,
			duration: video.duration,
		});
	}
});
