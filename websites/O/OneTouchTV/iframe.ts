const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	switch (true) {
		case !!video: {
			iframe.send({
				paused: video.paused,
				duration: video.duration,
				currentTime: video.currentTime,
			});
			break;
		}
	}
});
