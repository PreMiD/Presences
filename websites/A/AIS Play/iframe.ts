const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector(
		"#vimmi_video_player_html5_api"
	);

	if (video && !isNaN(video.duration)) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
			isLive: !document
				.querySelector(".vjs-live-control")
				.classList.contains("vjs-hidden"),
		});
	}
});
