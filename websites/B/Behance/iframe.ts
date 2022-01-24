const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector("span.liveText")) {
		iframe.send({
			live: document.querySelector("span.liveText")
		});
	} else if (document.querySelector("span.timelabel")) {
		iframe.send({
			currentTime: document.querySelector("span.timelabel").textContent,
			duration: document.querySelector("span.vduration").textContent,
			paused: document
				.querySelector("#videocontrols > div.controlsleft > button")
				.textContent.includes("play")
		});
	}
});
