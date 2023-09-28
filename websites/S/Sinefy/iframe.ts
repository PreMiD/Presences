const sinefyIframe = new iFrame();

sinefyIframe.on("UpdateData", () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video && !isNaN(video.duration)) {
		sinefyIframe.send({
			duration: video.duration,
			currentTime: video.currentTime,
			paused: video.paused,
		});
	}
});
