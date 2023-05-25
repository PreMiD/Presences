const iframe = new iFrame();

if (document.location.href.includes("https://replay.beatleader.xyz")) {
	iframe.on("UpdateData", async () => {
		iframe.send({
			name: document.querySelector("#songName")?.textContent,
			subName: document.querySelector("#songSubName")?.textContent,
			currentTime: document.querySelector("#songProgress")?.textContent,
			playing: Boolean(document.querySelector(".btn.pause")),
			duration: document.querySelector("#songDuration")?.textContent,
			playerName: document.querySelector("#playerName")?.textContent,
			cover: document.querySelector<HTMLImageElement>("#songImage").src,
		});
	});
}
