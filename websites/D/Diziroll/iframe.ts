const iframe = new iFrame();

iframe.on("UpdateData", () => {
	const vidyo: HTMLVideoElement = document.querySelector("video");
	if (vidyo && !isNaN(vidyo.duration) && !isNaN(vidyo.currentTime)) {
		return iframe.send({
			duration: vidyo.duration,
			currentTime: vidyo.currentTime,
			paused: vidyo.paused,
		});
	}
});
