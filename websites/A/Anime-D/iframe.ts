const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	let video: HTMLVideoElement;

	if (document.querySelector(".jw-video"))
		video = document.querySelector(".jw-video");
	else if (document.querySelector(".html5-video-container"))
		video = document.querySelector(".html5-video-container > video");

	if (video && !isNaN(video.duration)) {
		iframe.send({
			current: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	}
});
