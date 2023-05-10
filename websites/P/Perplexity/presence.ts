const presence = new Presence({
		clientId: "893871116945350726",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	threadExportRegex = /([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12})/i;
let recentSearchQuery: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "lg",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		hideButtons = await presence.getSetting<boolean>("hideButtons"),
		currentSearch = new URL(document.location.href).searchParams.get("q"),
		pageInput = document.querySelector<HTMLInputElement>(".md\\:mb-md"),
		currentThread = document.location.pathname.match(threadExportRegex),
		currentPage = document.location.pathname.split("/")[1];

	if (currentSearch && currentSearch !== recentSearchQuery)
		recentSearchQuery = currentSearch;

	presenceData.details = "Home";

	if (!currentPage) return presence.setActivity(presenceData);

	switch (currentPage.toLowerCase()) {
		case "search":
			presenceData.details = "Searching for";
			presenceData.smallImageKey = "search";

			if (currentThread) {
				presenceData.buttons = [
					{
						label: "Open thread",
						url: `https://www.perplexity.ai/search/${currentThread[0]}`,
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
			presenceData.smallImageKey = "threads";
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

	if (privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
		if (presenceData.details.includes("Searching for"))
			presenceData.details = "Searching";
	}
	if (hideButtons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
