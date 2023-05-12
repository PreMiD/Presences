const presence = new Presence({
	clientId: "651406405093425152",
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
let presenceData: PresenceData = {
	largeImageKey: "https://i.imgur.com/UR8jlF9.png",
};

presence.on("UpdateData", async () => {
	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/home"
	)
		presenceData.details = "Viewing the homepage";
	else if (document.location.pathname.startsWith("/team"))
		presenceData.details = "Looking at the team";
	else if (document.location.pathname.startsWith("/faq"))
		presenceData.details = "Reading the FAQ";
	else if (document.location.pathname.startsWith("/rules"))
		presenceData.details = "Reading their rules";
	else if (document.location.pathname.startsWith("/contact"))
		presenceData.details = "Reading the contact informations";
	else if (document.location.pathname.startsWith("/downloads"))
		presenceData.details = "Looking at the download page";
	else {
		presenceData = {
			largeImageKey: "https://i.imgur.com/UR8jlF9.png",
		};
	}
	presence.setActivity(presenceData);
});
