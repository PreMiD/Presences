const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector("video")) {
		const video = document.querySelector("video");
		if (video && !isNaN(video.duration)) {
			iframe.send({
				iFrameVideo: {
					iFrameVideo: true,
					currTime: video.currentTime,
					duration: video.duration,
					paused: video.paused,
				},
			});
		}
	}
});
