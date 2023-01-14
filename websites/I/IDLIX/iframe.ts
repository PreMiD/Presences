const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video = document.querySelector("video");
	if (video && !document.querySelector('iframe[id="iframe-trailer"]')) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
			isVideo: true,
			playingAds: document.querySelector('[class="jw-skip jw-reset"]')
				? true
				: false,
		});
	} else {
		iframe.send({
			isVideo: false,
			duration: null,
		});
	}
});
