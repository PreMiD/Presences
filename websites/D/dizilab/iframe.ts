const iframe = new iFrame();

setInterval(function () {
	const video =
		(document.querySelector("#vplayer video") as HTMLVideoElement) ||
		(document.querySelector("video") as HTMLVideoElement);

	if (video && document.location.hostname === "vidmoly.to") {
		iframe.send({
			error: false,
			currentTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	} else if (video && document.location.hostname !== "vidmoly.to") {
		iframe.send({
			error: false,
			currentTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		});
	} else {
		iframe.send({
			error: true,
		});
	}
}, 100);
