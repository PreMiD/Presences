const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	const video: HTMLVideoElement = document.querySelector("video");

	if (video) {
		iframe.send({
			video: {
				isPaused: video.paused,
				thumbnail:
					document
						.querySelector('[class="ytp-title-channel-logo"]')
						?.getAttribute("style")
						?.match(/http(s)?:\/\/.*-rj/gm)?.[0]
						?.replace(/w=s88/gm, "w=s512") ??
					"https://cdn.rcd.gg/PreMiD/websites/H/Holodex/assets/logo.png",
			},
		});
	}
});
