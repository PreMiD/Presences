const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");
	if (video) {
		iframe.send({
			iframevideo: true,
			currentTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	} else iframe.send({ iframevideo: false });
});
