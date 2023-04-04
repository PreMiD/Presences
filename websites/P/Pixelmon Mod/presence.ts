const presence = new Presence({
		clientId: "976435781486911509",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
			presenceData.smallImageKey = "search";
			presenceData.details = "Searching for";
			presenceData.state = search.value;
		} else if (firstChild.className.includes("firstHeading")) {
			presenceData.state = firstChild.textContent;
			presenceData.smallImageKey = "reading";
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
		presenceData.smallImageKey = "reading";
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
