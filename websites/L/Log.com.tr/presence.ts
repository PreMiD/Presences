const presence = new Presence({
		clientId: "657615662537244673",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/4LtbS4t.png",
		startTimestamp: browsingTimestamp,
	};

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

function makeCategoryRPC(title: string): void {
	presenceData.details = "Bir kategoriye göz atıyor:";
	presenceData.state = title;
}

presence.on("UpdateData", () => {
	const page = document.location.pathname;

	if (page.length === 1) {
		presenceData.details = "Ana Sayfa";
		presenceData.state = "Haberlere göz atıyor...";
	}

	if (document.querySelectorAll(".entry-title").length > 0) {
		// Reading an article
		const [title] = document.querySelectorAll(".entry-title");
		presenceData.details = "Bir haber okuyor...";
		presenceData.state = title
			? title.textContent.replace("[İzle]", "")
			: "Bilinmeyen";
	}

	if (page.startsWith("/author")) {
		presenceData.details = "Bir yazara göz atıyor...";
		presenceData.state = document.querySelector(
			"body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1"
		)?.textContent;
	}

	if (page.includes("/page")) {
		presenceData.details = "Ana Sayfa";
		presenceData.state = `Sayfa: ${parseInt(
			document.location.pathname.split("/")[2]
		)}`;
	}
	if (page.includes("/asfalt")) makeCategoryRPC("Asfalt");
	if (page.includes("/teknoloji-haberleri")) makeCategoryRPC("Teknoloji");
	if (page.includes("/radar")) makeCategoryRPC("Radar");
	if (page.includes("/play")) makeCategoryRPC("Play");
	if (page.includes("/dosya-konusu")) makeCategoryRPC("Dosya");
	if (page.includes("/uygulama-rehberi")) makeCategoryRPC("Uygulama Rehberi");
	if (page.includes("/nasil-yapilir")) makeCategoryRPC("Nasıl yapılır?");
	if (page.includes("/test")) makeCategoryRPC("Test");
	if (page.includes("/etiket")) {
		const tag = document.querySelector(
			"body > div.container > div.grid12.first.breadcrumbs.borderTop.borderBottom.marginBottom.padding > h1"
		);
		presenceData.details = "Bir etiket görüntülüyor:";
		presenceData.state = tag ? tag.textContent : "Bilinmeyen";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
