const presence = new Presence({
	clientId: "624914025247146000",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
presence.on("UpdateData", () => {
	let paused = true;
	const { children } = document.querySelector("#audioPlayer-controls-buttons");
	for (let i = 0; i < children.length; i++)
		if (children[i].id === "stopButton") paused = false;

	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/EHQLUof.png",
		smallImageKey: paused ? "pause" : "play",
		smallImageText: paused ? "Pausiert" : "Spielt",
		details: `Channel: ${
			document.querySelectorAll(".trackInfos-stream")[0].textContent
		}`,
		state: `${
			document.querySelectorAll(".trackInfos-artist")[0].textContent
		} - ${document.querySelectorAll(".trackInfos-title")[0].textContent}`,
	};
	presence.setActivity(presenceData);
});
