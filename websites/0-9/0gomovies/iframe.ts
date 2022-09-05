const iframe = new iFrame();

let sendback: {
	currTime: number;
	duration: number;
	paused: boolean;
};

iframe.on("UpdateData", () => {
	if (document.querySelector("video")) {
		const video: HTMLVideoElement = document.querySelector("video");
		sendback = {
			currTime: video.currentTime,
			duration: video.duration,
			paused: video.paused,
		};
		iframe.send(sendback);
	}
});
