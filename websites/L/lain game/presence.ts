const presence = new Presence({
		clientId: "672143036767272961",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	url = new URLSearchParams(window.location.search).get("site");

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/0Ewrhd9.png",
		startTimestamp: browsingTimestamp,
	};

	if (url === "0") presenceData.details = "viewing site A";
	else if (url === "1") presenceData.details = "viewing site B";
	else if (new URLSearchParams(window.location.search).has("id")) {
		presenceData.details = "viewing an file:";
		presenceData.state = document.querySelector(
			"body > center > table > tbody > tr:nth-child(1) > td.ta4d01 > table > tbody > tr:nth-child(1) > td.ta4d2 > a:nth-child(2)"
		).textContent;
	} else if (new URLSearchParams(window.location.search).has("tag")) {
		presenceData.details = "viewing an tag:";
		presenceData.state =
			document.querySelector("body > center > h1").textContent;
	} else if (
		document.location.pathname === "/" ||
		document.location.pathname === "/index.html"
	)
		presenceData.details = "index";
	else if (document.location.pathname.includes("/about.html")) {
		presenceData.details = "reading the about page";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/feedback.php"))
		presenceData.details = "giving feedback";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
