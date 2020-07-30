var iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const titleElement: HTMLElement = document.querySelector("div.ytp-title-text > a")
	const videoElement: HTMLVideoElement = document.querySelector("#player video");
	if (!titleElement || !videoElement) return
	const title = titleElement.textContent
	const duration = videoElement.duration ? videoElement.duration : null
	const currentTime = videoElement.currentTime
	const paused = videoElement.paused
	iframe.send({
		title, currentTime, duration, paused
	});
})