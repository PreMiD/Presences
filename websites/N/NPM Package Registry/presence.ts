const presence = new Presence({
	clientId: "613393646330576931",
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
		largeImageKey: "https://i.imgur.com/XaosIBS.png",
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing the homepage";
	else if (document.location.pathname.startsWith("/search")) {
		presenceData.details = "Searching...";
		presenceData.state = document.location.search.substr(3);
	} else if (document.location.pathname.startsWith("/package/")) {
		presenceData.details = "Viewing a package";
		presenceData.state = "Fetching...";
		if (document.location.pathname.split("/").length === 4) {
			presenceData.state = `${document.location.pathname.split("/")[2]}/${
				document.location.pathname.split("/")[3]
			}`;
		} else presenceData.state = document.location.pathname.split("/")[2];
	} else if (document.location.pathname.startsWith("/~")) {
		presenceData.details = "Viewing a profile...";
		presenceData.state = document.location.pathname.substr(3);
	}
	presence.setActivity(presenceData);
});
