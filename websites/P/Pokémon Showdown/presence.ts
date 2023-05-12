const presence = new Presence({
	clientId: "808762003476709406",
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

let elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/p3ZpoFY.png",
		},
		path = document.location.pathname;
	if (path === "/") {
		presenceData.details = "Viewing Homepage";
		elapsed = null;
	} else if (path.startsWith("/teambuilder")) {
		presenceData.details = "Building a Team";
		elapsed = null;
	} else if (path.startsWith("/ladder")) {
		presenceData.details = "Viewing a Ladder";
		elapsed = null;
	} else if (path.includes("battle")) {
		presenceData.details =
			document.querySelector("a.roomtab i.text").textContent;
		presenceData.state = document.querySelector(
			"a.roomtab.button.cur span"
		).textContent;
		presenceData.buttons = [
			{
				label: "Spectate",
				url: document.baseURI,
			},
		];
		if (elapsed === null) elapsed = Math.floor(Date.now() / 1000);

		presenceData.startTimestamp = elapsed;
	} else {
		presenceData.details = "Somewhere on-site";
		elapsed = null;
	}
	presence.setActivity(presenceData);
});
