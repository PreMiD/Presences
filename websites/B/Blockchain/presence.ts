const presence = new Presence({
		clientId: "776522940517974016",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	currencyList = [
		"usd",
		"eur",
		"gbp",
		"btc",
		"eth",
		"bch",
		"xlm",
		"wdgld",
		"algo",
		"usd-d",
		"usdt",
	];

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

let currencyTitle: string, pageStatus: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/rmmWPPP.png",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.host === "www.blockchain.com") {
		if (window.location.pathname.includes("/careers"))
			presenceData.details = "Careers";
		else if (window.location.pathname.includes("/learning-portal"))
			presenceData.details = "Learning Portal";
		else if (window.location.pathname.includes("/explorer"))
			presenceData.details = "Explorer";
		else if (window.location.pathname.includes("/ventures"))
			presenceData.details = "Ventures";
		else if (window.location.pathname.includes("/press"))
			presenceData.details = "Press";
		else if (window.location.pathname.includes("/team"))
			presenceData.details = "Team";
		else if (window.location.pathname.includes("/research"))
			presenceData.details = "Research";
		else if (window.location.pathname.includes("/legal"))
			presenceData.details = "Legal";
		else if (window.location.pathname.includes("/charts"))
			presenceData.details = "Charts";
		else if (window.location.pathname.includes("/prices"))
			presenceData.details = "Prices";
		else presenceData.details = "Home";
	} else if (window.location.host.startsWith("exchange")) {
		if (window.location.pathname.includes("/features"))
			presenceData.details = "Exchange: Features";
		else if (window.location.pathname.includes("/fees"))
			presenceData.details = "Exchange: Fees";
		else if (window.location.pathname.includes("/markets"))
			presenceData.details = "Exchange: Markets";
		else if (window.location.pathname.includes("/api"))
			presenceData.details = "Exchange: API";
		else if (window.location.pathname.includes("/pro"))
			presenceData.details = "Exchange: Pro";
		else if (window.location.pathname.includes("/trade")) {
			currencyTitle = document.querySelector(
				"#app > div > div.sc-hBMVcZ.sc-jtiWoB.bhYWmy.iLgwSY > div > div.sc-dmdFIE.dFnCCE > div > div.sc-hBMVcZ.sc-krBkXf.bhYWmy.dAuExH > div.sc-eGJXgd.NEmKz > div:nth-child(1) > span.sc-1ryi78w-0.bkDxTg.sc-dlMBXb.jyCgbx"
			).textContent;
			presenceData.state = currencyTitle;
			presenceData.details = "Exchange: Trade";
		} else if (window.location.pathname.includes("/affiliate"))
			presenceData.details = "Exchange: Affiliate";
		else if (window.location.pathname.includes("/about"))
			presenceData.details = "Exchange: About";
		else if (window.location.pathname.includes("/legal"))
			presenceData.details = "Exchange: Legal";
		else presenceData.details = "Exchange";
	} else if (window.location.host.startsWith("login")) {
		if (window.location.hash.includes("/home"))
			presenceData.details = "Profile";
		else if (window.location.hash.includes("/exchange"))
			presenceData.details = "Exchange";
		else if (window.location.hash.includes("/airdrops"))
			presenceData.details = "Airdrops";
		else if (currencyList.includes(window.location.hash.split("/")[1])) {
			currencyTitle = document.querySelector(
				"#app > div > div.sc-eTpRJs.chWNvr > div.sc-iomxrj.kkzpGP > div > div > div > div > div.sc-jZRpAH.cBnkKE > div.sc-cNfOsU.hJFgdt > div.sc-eWciec.hrSHFN > div"
			).textContent;
			presenceData.details = currencyTitle;
		} else presenceData.details = "Profile";
	} else if (window.location.host.startsWith("support"))
		presenceData.details = "Support";
	else if (window.location.host === "www.blockchain-status.com") {
		pageStatus = document.querySelector(
			"body > div.layout-content.status.status-index.premium > div.container > div.page-status.status-none > span.status.font-large"
		).textContent;
		presenceData.details = "Status Page";
		presenceData.state = pageStatus;
	}

	if (!presenceData.details) presenceData.details = "Home";
	else presence.setActivity(presenceData);
});
