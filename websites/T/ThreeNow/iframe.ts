const iframe = new iFrame();

iframe.on("UpdateData", () => {
	const video: HTMLVideoElement = document.querySelector(
		"#mw-player_player_html5_api"
	);
	if (video && !isNaN(video.duration)) {
		iframe.send({
			iFrameVideo: true,
			currentTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
