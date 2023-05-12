const presence = new Presence({
		clientId: "843781235494486046",
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

presence.on("UpdateData", async function () {
	const setting = {
			timeElapsed: await presence.getSetting<boolean>("timeElapsed"),
			showButtons: await presence.getSetting<boolean>("showButtons"),
		},
		urlpath = window.location.pathname.split("/"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/BevxEyq.png",
		};

	if (setting.timeElapsed) presenceData.startTimestamp = browsingTimestamp;

	if (!urlpath[1]) presenceData.details = "Home";
	else if (urlpath[1] === "news" && urlpath[2]) {
		presenceData.details = "Viewing Article";
		presenceData.state =
			document.querySelector("h1.css-cmdiie.e172hw750")?.textContent ||
			"Unknown";

		if (setting.showButtons) {
			presenceData.buttons = [
				{
					label: "Read Article",
					url: window.location.href,
				},
			];
		}
	} else {
		switch (urlpath[1]) {
			case "episode": {
				presenceData.details =
					document.querySelector("h2.css-n0lwas.e172hw750")?.textContent ||
					"Unknown";
				presenceData.state =
					document.querySelectorAll("span.css-e6rih1.ew91t7w0")[1]
						?.textContent || "Unknown";

				if (setting.showButtons) {
					presenceData.buttons = [
						{
							label: "Watch Episode",
							url: window.location.href,
						},
					];
				}

				break;
			}
			case "show": {
				presenceData.details = "Viewing Show";
				presenceData.state =
					document.querySelector("h3.css-1qqpwph")?.textContent || "Unknown";

				if (setting.showButtons) {
					presenceData.buttons = [
						{
							label: "Watch Show",
							url: window.location.href,
						},
					];
				}

				break;
			}
			case "discussion": {
				presenceData.details = "Viewing Discussion";
				presenceData.state =
					document.querySelector("h2.css-n0lwas.e172hw750")?.textContent ||
					"Unknown";

				if (setting.showButtons) {
					presenceData.buttons = [
						{
							label: "View Discussion",
							url: window.location.href,
						},
					];
				}

				break;
			}
			case "author": {
				presenceData.details = "Viewing Author";
				presenceData.state =
					document.querySelector("h2.css-cmdiie.e172hw750")?.textContent ||
					"Unknown";

				if (setting.showButtons) {
					presenceData.buttons = [
						{
							label: "View Author",
							url: window.location.href,
						},
					];
				}

				break;
			}
			case "subscribe": {
				presenceData.details = "Viewing Membership";
				break;
			}
			case "read":
			case "dicuss":
			case "watch": {
				presenceData.details = "Browsing";
				break;
			}
			case "search": {
				presenceData.details = "Searching";
				presenceData.state = document.querySelector<HTMLInputElement>(
					"input.ais-SearchBox-input"
				)?.value;

				break;
			}
			default:
				presenceData.details = "Other";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
