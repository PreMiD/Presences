let iframe = new iFrame();
let anime;

iframe.on("UpdateData", async () => {
	if (document.querySelector("video") !== null) {
		anime = <HTMLVideoElement>document.querySelector("video");
		if (anime != undefined && !isNaN(anime.duration)) {
			iframe.send({
				iframe_video: {
					iFrameVideo: true,
					currTime: anime.currentTime,
					duration: anime.duration,
					paused: anime.paused
				}
			});
		}
	}
});
