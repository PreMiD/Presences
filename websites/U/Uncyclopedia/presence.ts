const presence = new Presence({
		clientId: "643159616498171934",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: string;
const actionURL = new URL(document.location.href),
	title2URL = new URL(document.location.href);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/U/Uncyclopedia/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	title = (
		document.querySelector("h1#firstHeading.firstHeading") as HTMLElement
	).textContent;
	const actionResult = actionURL.searchParams.get("action"),
		title2Result = title2URL.searchParams.get("title");
	if (document.location.pathname === "/wiki/Main_Page")
		presenceData.state = "Main Page | Home";
	else if (
		(title && document.location.pathname.includes("/wiki/")) ||
		(title && document.location.pathname.includes("/stupi/"))
	) {
		presenceData.details = "Reading about:";
		presenceData.state = title;
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
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
