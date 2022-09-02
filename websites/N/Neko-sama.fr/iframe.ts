const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector("video") === null) return;

	const video = document.querySelector("video");
	iframe.send({
		time: video.currentTime,
		duration: video.duration,
		paused: video.paused,
	});
});
