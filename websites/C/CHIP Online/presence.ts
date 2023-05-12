const presence = new Presence({
	clientId: "651438286962688044",
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
		largeImageKey: "https://i.imgur.com/e8B18gA.png",
	};

	if (window.location.pathname.startsWith("/haber/")) {
		presenceData.details = "Bir haberi okuyor:";
		presenceData.state = document.querySelector(
			"#colana > article > h1"
		).textContent;
	} else if (window.location.pathname.endsWith("video/")) {
		presenceData.details = "Bütün videolara göz atıyor.";
		presenceData.state = "CHIP Online";
	} else if (window.location.pathname.endsWith("haber/")) {
		presenceData.state = "Bütün haberlere göz atıyor.";
		presenceData.details = "CHIP Online";
	} else if (window.location.pathname.endsWith("inceleme/")) {
		presenceData.state = "Bütün incelemelere göz atıyor.";
		presenceData.details = "CHIP Online";
	} else if (window.location.pathname.startsWith("/inceleme/")) {
		presenceData.state =
			document.querySelector("#anacontainer > h1").textContent;
		presenceData.details = "Bir incelemeyi okuyor:";
	} else if (window.location.pathname.startsWith("/blog/")) {
		presenceData.state =
			document.querySelector("#article-body > h1").textContent;
		presenceData.details = "Bir blog okuyor:";
	} else if (window.location.pathname.endsWith("forum/"))
		presenceData.details = "Tüm forumlara göz atıyor.";
	else if (window.location.pathname.endsWith("canli/")) {
		presenceData.state = "CHIP Online";
		presenceData.details = "Tüm Tech-Talk arşivine göz atıyor.";
	} else if (window.location.pathname.startsWith("/forum/")) {
		presenceData.state = "Adlı konuyu/gönderiyi okuyor.";
		presenceData.details =
			document.querySelector("#forumwrap > h1").textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
