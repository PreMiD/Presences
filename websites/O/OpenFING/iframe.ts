const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	if (document.querySelector("video") !== null)
		iframe.send(Math.floor(document.querySelector("video").currentTime));
});
