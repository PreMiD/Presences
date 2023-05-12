const presence = new Presence({
		clientId: "661198037175238665",
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
		largeImageKey: "https://i.imgur.com/MmTi5zJ.png",
		smallImageKey: "reading",
		smallImageText: "Reading Node.js Doc's",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "nodejs.org") {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Viewing At Home Page";
		if (document.location.pathname.includes("/about")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "About Node.js";
		} else if (document.location.pathname.includes("/download")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Node.js Downloads";
		} else if (document.location.pathname.includes("/docs")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "About Docs";
		} else if (document.location.pathname.includes("/get-involved")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Get Involved";
		} else if (document.location.pathname.includes("/security")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Security";
		} else if (document.location.pathname.includes("/blog")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "Node.js News";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
