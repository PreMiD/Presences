const presence = new Presence({
		clientId: "969064871310282813",
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
function getElementByXpath(path: string) {
	return document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/9qpIurh.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;
	switch (pathname) {
		case "/": {
			presenceData.details = "Browsing the homepage...";
			break;
		}
		case "/radio": {
			presenceData.details = "Looking through radio stations";
			break;
		}
		case "/about-us": {
			presenceData.details = "Viewing the about us page";
			break;
		}
		case "/apps": {
			presenceData.details = "Looking at Quran apps";
			break;
		}
		case "/developers": {
			presenceData.details = "Looking at the developers page";
			break;
		}
		case "/privacy": {
			presenceData.details = "Reading the privacy policy";
			break;
		}
		case "/support": {
			presenceData.details = "Looking at the support page";
			break;
		}
		case "/search": {
			const searchQuery =
				document.querySelector<HTMLInputElement>("#searchQuery")?.value;
			if (searchQuery) presenceData.details = `Searching for ${searchQuery}`;
			else presenceData.details = "Searching for something...";
			break;
		}
		default: {
			if (pathname.includes("/reciters")) {
				if (pathname.includes("/reciters/")) {
					presenceData.details = "Viewing a reciter:";
					presenceData.state = document.querySelector<HTMLDivElement>(
						".ReciterInfo_reciterName__SiK59"
					).textContent;
				} else presenceData.details = "Browsing through reciters";
			} else {
				presenceData.details = "Reading the Holy Quran";
				presenceData.state = `Surah: Surat ${
					getElementByXpath("/html/body/div[1]/div/div[2]/div/div[1]/div/p")
						.textContent
				} (${
					getElementByXpath(
						"/html/body/div[1]/div/div[2]/div/div[2]/div/p[2]/span[2]"
					)?.textContent ??
					getElementByXpath(
						"/html/body/div[1]/div/div[2]/div/div[2]/div/p[2]/span"
					).textContent
				})`;
			}
		}
	}
	presence.setActivity(presenceData);
});
