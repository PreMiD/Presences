const presence = new Presence({
		clientId: "670669014363668481"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	actionURL = new URL(document.location.href),
	title2URL = new URL(document.location.href);
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp
	};

	title = document.querySelector("h1#firstHeading");

	const actionResult = actionURL.searchParams.get("action"),
		title2Result = title2URL.searchParams.get("title");

	if (document.location.pathname === "/wiki/Main_Page") {
		presenceData.state = "Main Page | Home";

		delete presenceData.details;
	} else if (title && document.location.pathname.includes("/wiki/")) {
		presenceData.details = "Reading about:";

		presenceData.state = title.textContent;
	} else if (
		actionResult === "history" &&
		title2Result &&
		document.location.pathname.includes("/w/")
	) {
		presenceData.details = "Viewing revision history of:";

		if (title2Result.includes("_"))
			presenceData.state = title2Result.replaceAll("_", " ");
		else presenceData.state = title2Result;
	} else if (
		actionResult === "edit" &&
		title2Result &&
		document.location.pathname.includes("/w/")
	) {
		presenceData.details = "Editing a page:";

		if (title2Result.includes("_"))
			presenceData.state = title2Result.replaceAll("_", " ");
		else presenceData.state = title2Result;
	} else if (
		actionResult === "formedit" &&
		title2Result &&
		document.location.pathname.includes("/w/")
	) {
		presenceData.details = "Form editing a page:";

		if (title2Result.includes("_"))
			presenceData.state = title2Result.replaceAll("_", " ");
		else presenceData.state = title2Result;
	}

	presence.setActivity(presenceData);
});
