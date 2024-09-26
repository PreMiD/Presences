const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const videoElement: HTMLVideoElement =
		document.querySelector(".video-stream");
	if (!videoElement) return;

	iframe.send({
		title: document.querySelector<HTMLAnchorElement>("div.ytp-title-text > a")
			.textContent,
		duration: videoElement.duration,
		currentTime: videoElement.currentTime,
		paused: videoElement.paused,
	});
});
