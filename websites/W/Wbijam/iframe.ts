const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	let video: HTMLVideoElement;

	if (document.querySelector("video")) video = document.querySelector("video");

	if (!isNaN(video?.duration)) {
		iframe.send({
			iframeVideo: {
				iFrameVideo: true,
				currTime: video.currentTime,
				dur: video.duration,
				paused: video.paused,
			},
		});
	}
});
