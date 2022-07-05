const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const { hostname } = window.location;
	if (
		hostname === "vcdn.space" ||
		hostname === "streamtape.com" ||
		hostname === "mixdrop.to"
	) {
		const video = document.querySelector("video");
		if (video) {
			iframe.send({
				current: video.currentTime,
				duration: video.duration,
				paused: video.paused,
				played: video.currentTime !== 0,
			});
		}
	}
});
