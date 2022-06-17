const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const videoElement: HTMLVideoElement =
		document.querySelector("#player video");
	if (
		!(document.querySelector("div.ytp-title-text > a") as HTMLAnchorElement) ||
		!videoElement
	)
		return;
	iframe.send({
		title: videoElement.textContent,
		duration: videoElement.duration ? videoElement.duration : null,
		currentTime: videoElement.currentTime,
		paused: videoElement.paused,
	});
});
