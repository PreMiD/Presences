const presence = new Presence({
		clientId: "976435781486911509",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	page = document.location.href;
let title: Element, title2: Element;

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "logo",
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
			presenceData.details = "Searching for:";
			presenceData.state = search.value;
		} else if (firstChild.className.includes("firstHeading")) {
			presenceData.state = firstChild.textContent;
			presenceData.smallImageKey = "reading";
			presenceData.details = "Reading Wiki:";
		} else if (document.querySelector("#firstHeading-h2csdq87lb"))
			presenceData.details = "Search Results";
		else presenceData.details = "Reading Wiki:";
	} else if (page.includes("index.php")) presenceData.details = "Forum";
	else if (page.includes("viewforum.php"))
		presenceData.details = `${title.textContent} Forum`;
	else if (page.includes("viewtopic.php")) {
		presenceData.details = "Viewing Post:";
		presenceData.state = title.textContent;
	} else if (page.includes("team.php")) {
		presenceData.details = `Pixelmon's ${
			document.querySelector("li[class='team-nav-active']").textContent
		} Team`;
	} else if (page.includes("ucp.php?mode=")) {
		presenceData.details = title2.textContent;
		presenceData.smallImageKey = "reading";
	} else if (page.includes("downloads.php")) presenceData.details = "Downloads";
	else if (page.includes("donate.php")) presenceData.details = "Donate";
	else if (page.includes("tracker.php")) {
		presenceData.details = title2.textContent;
		if (document.querySelector("#col1 > div:nth-child(1) > h3")) {
			presenceData.state = document.querySelector(
				"#col1 > div:nth-child(1) > h3"
			).textContent;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
