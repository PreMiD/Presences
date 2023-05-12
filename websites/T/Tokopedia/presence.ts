const presence = new Presence({
	clientId: "798368817318330400",
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
			largeImageKey: "https://i.imgur.com/oR93cDm.png",
		},
		elapsed = Math.floor(Date.now() / 1000);
	if (document.location.hostname === "www.tokopedia.com") {
		if (document.location.pathname.includes("/p?nref=")) {
			presenceData.details = "Viewing Product List....";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/mitra")) {
			presenceData.details = "Viewing a Tokopedia Partner....";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/promo")) {
			presenceData.details = "Viewing a Promo....";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/edu")) {
			presenceData.details = "Viewing on EduMart....";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/search")) {
			presenceData.details = "Searching for a product....";
			presenceData.state = new URL(document.location.href).searchParams.get(
				"q"
			);
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else {
			presenceData.details = "Viewing a Homepage";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		}
	} else if (document.location.hostname === "seller.tokopedia.com") {
		if (document.location.pathname.includes("/edu")) {
			presenceData.details = "Viewing a Seller Education Center....";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/home")) {
			presenceData.details = "Viewing a Seller Homepage";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
		}
	}
});
