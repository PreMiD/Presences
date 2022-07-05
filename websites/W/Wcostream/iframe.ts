const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector<HTMLVideoElement>("#video-js_html5_api")) {
		iframe.send({
			paused: document
				.querySelector<HTMLButtonElement>(
					"#video-js > div.vjs-control-bar > button"
				)
				.title.includes("Play"),
			timeLeft: document.querySelector<HTMLSpanElement>(
				"span.vjs-remaining-time-display"
			).textContent,
		});
	}
});
