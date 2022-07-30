const presence = new Presence({
		clientId: "914175371744800779",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		search: HTMLInputElement = document.querySelector("#search-input");
	if (search.value !== "") {
		presenceData.details = "Searching for:";
		presenceData.state = search.value;
	} else if (page === "/") presenceData.details = "Viewing the homepage";
	else if (page.includes("genre")) {
		presenceData.details = "Viewing Novels Genre:";
		presenceData.state = page.replace("/genre/", "");
	} else if (page.includes("chapter")) {
		presenceData.details = document.querySelector(
			"#container > div.navbar-breadcrumb > div > ol > li:nth-child(2) > h1 > a > span"
		).textContent;
		presenceData.state = document.querySelector(
			"#chapter > div > div > h2 > a > span"
		).textContent;
	} else if (page.includes("latest-release-novel"))
		presenceData.details = "Latest Releases";
	else if (page.includes("hot-novel")) presenceData.details = "Hot Novels";
	else if (page.includes("completed-novel"))
		presenceData.details = "Completed Novels";
	else if (page.includes("most-popular"))
		presenceData.details = "Most Popular Novels";
	else if (
		document.querySelector(
			"#truyen > div.csstransforms3d > div > div.col-xs-12.col-info-desc > div.title-list > h2"
		)
	) {
		presenceData.details = "Viewing:";
		presenceData.state = document.querySelector(
			"#truyen > div.csstransforms3d > div > div.col-xs-12.col-info-desc > div.col-xs-12.col-sm-8.col-md-8.desc > h3"
		).textContent;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
