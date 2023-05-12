const presence = new Presence({
		clientId: "660822610090655755",
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
		largeImageKey: "https://i.imgur.com/t04RdxC.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "iloot.it") {
		presenceData.details = "The gamer earning platform";
		if (document.location.pathname.includes("/partners"))
			presenceData.details = "Looking At Partner Page";
		else if (document.location.pathname.includes("/login"))
			presenceData.details = "Loging To Iloot.it";
		else if (document.location.pathname.includes("/register"))
			presenceData.details = "Registering At Iloot.it";
		else if (document.location.pathname.includes("/profile"))
			presenceData.details = "Looking At Own Profile";
		else if (document.location.pathname.includes("/minilinks"))
			presenceData.details = "Creating Minilinks";
		else if (document.location.pathname.includes("/watch_advertisements"))
			presenceData.details = "Watching Advertisements";
		else if (document.location.pathname.includes("/captcha"))
			presenceData.details = "Filling Captchers";
		else if (document.location.pathname.includes("/payout"))
			presenceData.details = "Looking At Payout Page";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
