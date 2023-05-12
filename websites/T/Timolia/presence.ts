const presence = new Presence({
		clientId: "872421983554502717",
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
		largeImageKey: "https://i.imgur.com/NkFEsHW.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "www.timolia.de": {
			if (document.location.pathname === "/") {
				presenceData.details = "Viewing home page";
				presenceData.smallImageKey = "minecraft";
				presenceData.smallImageText = `${
					document.querySelector("#liveplayercount").textContent
				} online players`;
			} else if (document.location.pathname.startsWith("/stats")) {
				presenceData.details = "Viewing stats from:";
				presenceData.state = document.querySelector("#playername").textContent;
			} else if (document.location.pathname.includes("/games"))
				presenceData.details = "Viewing gamemodes";
			else if (document.location.pathname.includes("/account"))
				presenceData.details = "Viewing account settings";

			break;
		}
		case "howto.timolia.de": {
			presenceData.details = "HowTo - Reading:";
			presenceData.state = document.querySelector(
				"body > div.md-container > main > div > div.md-content > article > h1"
			).textContent;

			break;
		}
		case "shop.timolia.de": {
			presenceData.details = "Shop - Viewing store page";
			if (document.location.pathname.startsWith("/checkout")) {
				presenceData.details = "Shop - Viewing shopping cart:";
				presenceData.state = document.querySelector(
					"body > div.sections-wrapper > section > div > div > div.jumbotron > div > div.packages > form > table > tbody > tr > td.col-md-6"
				).textContent;
			}

			break;
		}
		case "forum.timolia.de": {
			presenceData.details = "Viewing forum start page";
			if (document.location.pathname.startsWith("/members")) {
				presenceData.details = "Viewing forum profile of:";
				presenceData.state = document.querySelector(
					"#content > div.pageWidth > div > div > div.mainProfileColumn > div > div > h1 > span"
				).textContent;
			} else if (document.location.pathname.startsWith("/threads")) {
				presenceData.details = "Viewing thread:";
				presenceData.state = document.querySelector(
					"#content > div.pageWidth > div > div.titleBar > h1"
				).textContent;
			} else if (document.location.pathname.startsWith("/forums")) {
				presenceData.details = "Viewing forum:";
				presenceData.state = document.querySelector(
					"#content > div.pageWidth > div > div.titleBar > h1"
				).textContent;
			}

			break;
		}
		default:
			if (document.location.hostname.includes("wi.timolia.de"))
				presenceData.details = "Viewing Webinterface";
			else if (document.location.hostname.includes("gitlab.timolia.de")) {
				presenceData.details = "Viewing GitLab Server";
				presenceData.smallImageKey = "gitlab";
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
