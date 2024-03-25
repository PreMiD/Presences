const iframe = new iFrame();
function blobToDataURL(blob: Blob, callback: (dataurl: string) => void) {
	const reader = new FileReader();
	reader.onload = function (e) {
		callback(e.target.result.toString());
	};
	reader.readAsDataURL(blob);
}

if (document.location.href.includes("https://replay.beatleader.xyz")) {
	iframe.on("UpdateData", async () => {
		const blob = await fetch(
			document.querySelector<HTMLImageElement>("#songImage").src
		).then(response => response.blob());
		blobToDataURL(blob, function (dataurl: string) {
			iframe.send({
				name: document.querySelector("#songName")?.textContent,
				subName: document.querySelector("#songSubName")?.textContent,
				currentTime: document.querySelector("#songProgress")?.textContent,
				playing: Boolean(document.querySelector(".btn.pause")),
				duration: document.querySelector("#songDuration")?.textContent,
				playerName: document.querySelector("#playerName")?.textContent,
				cover: dataurl,
			});
		});
	});
}
