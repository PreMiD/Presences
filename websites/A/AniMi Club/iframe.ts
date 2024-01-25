const iframe = new iFrame();

setInterval(function () {
	if (document.querySelector("video")) {
		const video: HTMLVideoElement =
			document.querySelector<HTMLVideoElement>("video");

		if (video && !isNaN(video.duration)) {
			iframe.send({
				duration: video.duration,
				currentTime: video.currentTime,
				paused: video.paused,
			});
		}
	}
}, 100);
