const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	if (document.querySelector(".artiste") && document.querySelector(".titre")) {
		iframe.send({
			artist: document.querySelector(".artiste").textContent,
			song: document.querySelector(".titre").textContent.split(".")[0], // Get only the title without the extension file
		});
	}
});
