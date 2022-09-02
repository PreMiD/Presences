const iframe = new iFrame();
iframe.on("UpdateData", () => {
	if (document.querySelector("#video-player")) {
		const hentai = document.querySelector<HTMLVideoElement>("#video-player");
		if (hentai && !isNaN(hentai.duration)) {
			iframe.send({
				iframeVideo: {
					iFrameVideo: true,
					currTime: hentai.currentTime,
					duration: hentai.duration,
					paused: hentai.paused,
				},
			});
		}
	}
});
