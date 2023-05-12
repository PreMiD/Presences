const presence = new Presence({
		clientId: "643159616498171934",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let title: string;
const actionURL = new URL(document.location.href),
	title2URL = new URL(document.location.href);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/e8b5Yvs.png",
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
