const presence = new Presence({
	clientId: "722549030244057161",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/L5J9p8y.png",
	};
	switch (location.pathname.split("/")[1]) {
		case "guide":
			presenceData.details = "Reading the guide";
			presenceData.state = [
				document.querySelector(".sidebar-links > li > a.active")
					? document.querySelector(".sidebar-links > li > a.active").textContent
					: null,
				document.querySelector(".sidebar-sub-header > a.active")
					? document.querySelector(".sidebar-sub-header > a.active").textContent
					: null,
			]
				.filter(a => !!a)
				.join(" ― ");
			break;
		default:
			presenceData.details = "Homepage";
			break;
	}
	presence.setActivity(presenceData);
});
