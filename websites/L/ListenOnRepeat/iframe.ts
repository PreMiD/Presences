const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	let video: HTMLVideoElement;
	if (document.querySelector(".video")) {
		video = document.querySelector(".video");
		if (video && !isNaN(video.duration)) {
			iframe.send({
				iframeVideo: {
					iFrameVideo: true,
					currTime: video.currentTime,
					dur: video.duration,
					paused: video.paused,
				},
			});
		}
	} else if (document.querySelector("body > div > div > div > video")) {
		video = document.querySelector("body > div > div > div > video");
		if (video && !isNaN(video.duration)) {
			iframe.send({
				iframeVideo: {
					iFrameVideo: true,
					currTime: video.currentTime,
					dur: video.duration,
					paused: video.paused,
				},
			});
		}
	}
});
