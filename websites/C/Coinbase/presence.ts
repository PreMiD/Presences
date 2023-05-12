const presence = new Presence({
		clientId: "796810487177674822",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Is0F38Z.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path === "/") presenceData.details = "Browsing...";
	else if (path.includes("/dashboard"))
		presenceData.details = "Looking at Dashboard";
	else if (path.includes("/accounts"))
		presenceData.details = "Looking at Portfolio";
	else if (path.includes("/price/")) {
		presenceData.details = "Looking at prices for:";
		presenceData.state = document.querySelector(
			"#root > div > div > div > div.Flex-l69ttv-0.Layout__Container-sc-140tb7h-0.iOtOlJ > div > div > div.Flex-l69ttv-0.LayoutDesktop__MainContentFlex-bh368c-1.kKKtdZ > div.Flex-l69ttv-0.LayoutDesktop__Wrapper-bh368c-3.gMrngj > div > div > div > div.styles__Outer-vb6gfj-0.HeaderBar__StyledOuter-tvqwd7-0.jjhDbN > div > div > div > div.styles__TopRow-vb6gfj-1.pbrsa > div.styles__TextRow-vb6gfj-2.ftNBen > div > h1.TextElement__Spacer-hxkcw5-0.cicsNy.Header__StyledHeader-sc-1xiyexz-0.JJViP.styles__Name-vb6gfj-5.bHSVaQ"
		).textContent;
	} else if (path.includes("/notifications"))
		presenceData.details = "Checking notifications";
	else if (path.includes("/settings")) {
		presenceData.details = "Changing settings for:";
		presenceData.state = document.querySelector(".active > a").textContent;
	} else if (path.includes("/invite"))
		presenceData.details = "Inviting someone new";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
