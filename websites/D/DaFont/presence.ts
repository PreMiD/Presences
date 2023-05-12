const presence = new Presence({
		clientId: "685827254256795677",
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
			largeImageKey: "https://i.imgur.com/PScrApw.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	let details;

	if (path === "/") {
		details = document.querySelector(
			"#width > div.minwidth > div > div > div:nth-child(9) > div:nth-child(3) > div.dfsmall > strong"
		).textContent;
		presenceData.details = "Browsing the main page :";
		presenceData.state = `${details}`;
	} else if (path.startsWith("/themes.php")) {
		details = document.querySelector("#menuthemespp > table > tbody > tr")
			.children.length;
		presenceData.details = "Browsing the theme's page :";
		presenceData.state = `${details} total themes`;
	} else if (path.startsWith("/theme.php")) {
		details = document
			.querySelector(
				"#width > div > div > div > div:nth-child(9) > div:nth-child(3) > div.dffont2"
			)
			.textContent.replace("&gt;", ">");
		presenceData.details = "Browsing a sub-theme's page :";
		presenceData.state = `${details}`;
	} else if (path.startsWith("/mtheme.php")) {
		details = document.querySelector(
			"#width > div > div > div > div:nth-child(9) > div:nth-child(5) > div.dffont2"
		).textContent;
		presenceData.details = "Browsing a main-theme's page :";
		presenceData.state = `${details}`;
	} else if (path.startsWith("/new.php")) {
		details = document.querySelector(
			"#width > div > div > div > div:nth-child(9) > div:nth-child(5) > span > span"
		).textContent;
		presenceData.details = "Browsing the new fonts :";
		presenceData.state = `${details}`;
	} else if (path.startsWith("/top.php")) {
		details = document.location.search.length > 1 ? "All Time" : "Yesterday";
		presenceData.details = "Browsing the top fonts :";
		presenceData.state = `${details}`;
	} else if (path.startsWith("/authors.php")) {
		presenceData.details = "Browsing the authors :";
		if (document.location.search.startsWith("?letter")) {
			presenceData.state = `Sorted by letter : ${document.location.search
				.replace("?letter=", "")
				.toUpperCase()}`;
		} else if (document.location.search.startsWith("?cc")) {
			presenceData.state = `Sorted by country : ${
				document.querySelector(
					"#width > div > div.layout > div > div:nth-child(9) > div > div:nth-child(2) > div:nth-child(11) > div:nth-child(1)"
				).textContent
			}`;
		} else presenceData.state = "All authors";
	} else if (path.startsWith("/forum")) presenceData.details = "On the forum";
	else if (path.startsWith("/faq.php"))
		presenceData.details = "Reading the FAQ ";
	else if (path.startsWith("/soft.php"))
		presenceData.details = "Viewing the tools ";
	else if (path.startsWith("/login.php"))
		presenceData.details = "Logging into their account ";
	else if (path.startsWith("/register.php"))
		presenceData.details = "Registering a new account  ";
	else if (path.endsWith(".font")) {
		presenceData.details = "Viewing a font's page :";
		presenceData.state = `${
			document.querySelector("#width > div > div > div > div:nth-child(9) > h1")
				.textContent
		} ( ${
			document.querySelector(
				"#width > div > div > div > div:nth-child(9) > div.lv2right > span"
			).textContent
		} )`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
