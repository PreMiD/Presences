var iframe = new iFrame();
iframe.on("UpdateData", async () => {
	if (document.querySelector(".video") !== null) {
		var video: HTMLVideoElement = document.querySelector(".video");
		if (video != undefined && !isNaN(video.duration)) {
			iframe.send({
				iframe_video: {
					iFrameVideo: true,
					currTime: video.currentTime,
					dur: video.duration,
					paused: video.paused
				}
			});
		}
	} else if (
		document.querySelector("body > div > div > div > video") !== null
	) {
		var video: HTMLVideoElement = document.querySelector(
			"body > div > div > div > video"
		);
		if (video != undefined && !isNaN(video.duration)) {
			iframe.send({
				iframe_video: {
					iFrameVideo: true,
					currTime: video.currentTime,
					dur: video.duration,
					paused: video.paused
				}
			});
		}
	}
});
