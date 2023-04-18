const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector("#oframe") || document.querySelector("#player")) {
		const video = document.querySelector("video");
		if (!isNaN(video?.duration)) {
			iframe.send({
				duration: video.duration,
				currentTime: video.currentTime,
				paused: video.paused,
			});
		}
	}
});
