const presence = new Presence({
		clientId: "685054359200858241",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
		largeImageKey: "https://i.imgur.com/vTAH4DD.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("/gamemode-rules"))
		presenceData.details = "Viewing the game rules";
	else if (document.location.pathname.includes("/changelog"))
		presenceData.details = "Viewing the change log";
	else if (document.location.pathname === "/") {
		if (document.location.href.includes("#0")) {
			presenceData.details = "Playing FFA mode";
			presenceData.state = `on server: ${document.location.href.split("#")[1]}`;
		} else if (document.location.href.includes("#1")) {
			presenceData.details = "Playing TEAM mode";
			presenceData.state = `on server: ${document.location.href.split("#")[1]}`;
		} else if (document.location.href.includes("#2")) {
			presenceData.details = "Playing DEFUSE mode";
			presenceData.state = `on server: ${document.location.href.split("#")[1]}`;
		} else if (document.location.href.includes("#3")) {
			presenceData.details = "Playing E-FFA mode";
			presenceData.state = `on server: ${document.location.href.split("#")[1]}`;
		} else presenceData.details = "Viewing home page";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
