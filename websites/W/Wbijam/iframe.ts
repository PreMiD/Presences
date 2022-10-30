const iframe = new iFrame();
let video: HTMLVideoElement;

iframe.on("UpdateData", async () => {
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
