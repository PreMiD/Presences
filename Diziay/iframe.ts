var iframe = new iFrame();

iframe.on("UpdateData", async () => {
	let video: HTMLVideoElement = document.querySelector("video");

	if (video) {
		let videoMessage: any = {
			paused: video.paused,
			duration: video.duration,
			currentTime: video.currentTime
		};

		iframe.send(videoMessage);
	}
});
