const presence = new Presence({
		clientId: "976435781486911509",
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
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/49VYHIM.png",
			startTimestamp: browsingTimestamp,
		},
		title =
			document.querySelector(
				"#page-body > main > div > div.col-md-9 > div.side-segment > h3 > a"
			) ??
			document.querySelector(
				"#page-body > main > div > div.col-md-9 > div.side-segment > h3"
			),
		search = document.querySelector<HTMLInputElement>("#searchInput");
	if (document.querySelector("#siteSub")?.textContent.includes("Wiki")) {
		const firstChild = document.querySelector(
			"#content > div.contentHeader"
		)?.firstElementChild;
		if (search.value) {
			presenceData.smallImageKey = Assets.Search;
			presenceData.details = "Searching for";
			presenceData.state = search.value;
		} else if (firstChild.className.includes("firstHeading")) {
			presenceData.state = firstChild.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.details = "Reading wiki page";
		} else if (document.querySelector("#firstHeading-h2csdq87lb")) {
			presenceData.details = "Search results for";
			presenceData.state = document.querySelector("#ooui-php-1").textContent;
		} else presenceData.details = "Reading the wiki";
	} else if (pathname.includes("index.php")) presenceData.details = "Forum";
	else if (pathname.includes("viewforum.php"))
		presenceData.details = `${title.textContent} Forum`;
	else if (pathname.includes("viewtopic.php")) {
		presenceData.details = "Viewing post";
		presenceData.state = title.textContent;
	} else if (pathname.includes("team.php")) {
		presenceData.details = `Pixelmon's ${
			document.querySelector("li[class='team-nav-active']").textContent
		} Team`;
	} else if (pathname.includes("ucp.php?mode=")) {
		presenceData.details = title.textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (pathname.includes("downloads.php"))
		presenceData.details = "Viewing mod downloads page";
	else if (pathname.includes("donate.php"))
		presenceData.details = "Viewing the donations page";
	else if (pathname.includes("tracker.php")) {
		presenceData.details = title.textContent;
		if (document.querySelector("#col1 > div:nth-child(1) > h3")) {
			presenceData.state = document.querySelector(
				"#col1 > div:nth-child(1) > h3"
			).textContent;
		}
	} else if (
		document.querySelector(
			"#page-body > main > div > div.col-sm-8 > div:nth-child(2)"
		)
	)
		presenceData.details = "Homepage";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
