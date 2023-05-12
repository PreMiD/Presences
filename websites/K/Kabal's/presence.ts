const presence = new Presence({
		clientId: "655837567962447882",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/FIkYpzN.png",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname;

	if (page.endsWith("panel")) {
		presenceData.details = "Bir sayfayı görüntülüyor:";
		presenceData.state = "Panel";
	} else if (page.endsWith("yonetim")) {
		presenceData.details = "Bir sayfayı görüntülüyor:";
		presenceData.state = "Sunucularım";
	} else if (page.startsWith("/yonetim/")) {
		presenceData.details = "Bir sunucuyu yönetiyor:";
		presenceData.state = document.querySelector(
			"body > div > div > div.col-4.col-sm-4.col-md-4.col-lg-4.col-xl-4 > div > div > h5 > center"
		).textContent;
	} else if (page.endsWith("komutlar")) {
		presenceData.details = "Bir sayfayı görüntülüyor:";
		presenceData.state = "Komutlar";
	} else if (page.endsWith("irtibat")) {
		presenceData.details = "Bir sayfayı görüntülüyor:";
		presenceData.state = "İrtibat";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
