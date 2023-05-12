const presence = new Presence({
		clientId: "952575137180442626",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/cC2n2S6.png",
			startTimestamp: browsingTimestamp,
		},
		route = document.location.pathname.split("/");

	switch (route[1]) {
		case "":
			presenceData.details = "Browsing the main page...";
			break;
		case "downloads":
		case "downloads.php":
			presenceData.details = "Browsing the download section";
			break;
		case "docs.php":
			presenceData.details = "Browsing the documentation";
			break;
		case "download-docs.php":
			presenceData.details = "Downloading the documentation";
			break;
		case "download-logos.php":
			presenceData.details = "Viewing the official logos";
			break;
		case "manual-lookup.php":
			presenceData.details = "Searching the documentation";
			break;
		case "manual": {
			presenceData.details = "Viewing the documentation: ";
			const manualTitle = document.title
				.replaceAll("PHP: ", "")
				.replaceAll(" - Manual", "");
			presenceData.buttons = [
				{ label: "Open Documentation", url: document.location.href },
			];
			if (route[3].includes("function.")) {
				presenceData.state = `Function: ${manualTitle}`;
				presenceData.buttons = [
					{ label: "View Function", url: document.location.href },
				];
			} else if (route[3].includes("language.")) {
				const c = route[3].split(".")[1];
				presenceData.state = `${
					c.charAt(0).toUpperCase() + c.slice(1)
				}: ${manualTitle}`;
			} else presenceData.state = manualTitle;
			break;
		}
		case "releases":
			if (route[2]) {
				presenceData.details = "Viewing an release version:";
				presenceData.state = `PHP v${route[2]}`;
			} else presenceData.details = "Viewing the releases";
			break;
		default:
			presenceData.details = "Browsing the website";
	}

	if (route[1].toLowerCase().includes("changelog"))
		presenceData.details = "Reading the changelogs";

	presence.setActivity(presenceData);
});
