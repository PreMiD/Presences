const presence = new Presence({
		clientId: "893871116945350726",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	threadExportRegex = /([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12})/i;
let recentSearchQuery: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gdCcljx.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location,
		[privacy, hideButtons, iconType] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("hideButtons"),
			presence.getSetting<number>("iconType"),
		]),
		currentSearch = new URL(href).searchParams.get("q"),
		pageInput = document.querySelector<HTMLInputElement>(".md\\:mb-md"),
		currentThread = pathname.match(threadExportRegex),
		currentPage = pathname.split("/")[1],
		largeImage =
			["https://i.imgur.com/gdCcljx.png", "https://i.imgur.com/xp4o0wQ.png"][
				iconType
			] || "https://i.imgur.com/gdCcljx.png",
		presenceData: PresenceData = {
			largeImageKey: largeImage,
			startTimestamp: browsingTimestamp,
		};
	if (currentSearch && currentSearch !== recentSearchQuery)
		recentSearchQuery = currentSearch;

	presenceData.details = "Home";

	if (!currentPage) return presence.setActivity(presenceData);

	switch (currentPage.toLowerCase()) {
		case "search":
			presenceData.details = privacy ? "Searching" : "Searching for";
			presenceData.smallImageKey = "https://i.imgur.com/wYVlwJX.png";

			if (currentThread) {
				presenceData.buttons = [
					{
						label: "Open thread",
						url: href,
					},
				];
			}

			presenceData.state = recentSearchQuery;
			if (
				pageInput &&
				pageInput.textContent &&
				pageInput.textContent !== recentSearchQuery
			)
				presenceData.state = pageInput.textContent;
			break;

		case "threads":
			presenceData.details = "Searching threads";
			presenceData.smallImageKey = "https://i.imgur.com/3FPH9L0.png";
			break;

		case "about":
			presenceData.details = "Reading about";
			break;

		case "blog":
			presenceData.details = "Reading blog";
			break;

		case "privacy":
			presenceData.details = "Reading privacy policy";
			break;

		case "tos":
			presenceData.details = "Reading terms of service";
			break;

		default:
			presenceData.details = "Browsing";
			presenceData.state = currentPage;
			break;
	}

	if (privacy && presenceData.state) delete presenceData.state;
	if (hideButtons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
