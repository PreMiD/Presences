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
		pageInput = document.querySelector(".md\\:mb-md") as HTMLInputElement,
		currentThread = document.location.pathname.match(threadExportRegex);

	if (currentSearch && currentSearch !== recentSearchQuery)
		recentSearchQuery = currentSearch;

	presenceData.details = "Home";

	if (document.location.pathname.toLowerCase().includes("/search")) {
		presenceData.details = "Searching for";

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
	}

	if (document.location.pathname.toLowerCase().includes("/threads"))
		presenceData.details = "Searching threads";

	if (privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
		if (presenceData.details.includes("Searching for"))
			presenceData.details = "Searching";
	}
	if (hideButtons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
