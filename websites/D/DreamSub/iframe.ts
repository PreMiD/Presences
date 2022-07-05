const iframe = new iFrame();
let videos: HTMLCollectionOf<HTMLVideoElement>;

iframe.on("UpdateData", async () => {
	// eslint-disable-next-line unicorn/prefer-query-selector
	videos = document.getElementsByTagName("video");

	if (videos.length > 0) {
		const [video] = videos;

		if (!isNaN(video.duration)) {
			iframe.send({
				iframeVideo: {
					iFrameVideo: true,
					currTime: video.currentTime,
					paused: video.paused,
					duration: video.duration,
				},
			});
		}
	}
});
