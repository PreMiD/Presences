const presence = new Presence({
	clientId: "630542731701387276",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/T1Zi3qF.png",
	};
	if (
		document.querySelector("#webplayer-region").getAttribute("data-state") ===
		"playing"
	) {
		presenceData.details = document
			.querySelectorAll(".artist-name")[0]
			.textContent.replace("-", "");
		presenceData.state =
			document.querySelectorAll(".track-name")[0].textContent;
		presenceData.smallImageKey = Assets.Play;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"div > section.track-region.col > div > div.artwork > div > img"
		).src;
	} else {
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = Assets.Pause;
	}
	presence.setActivity(presenceData);
});
