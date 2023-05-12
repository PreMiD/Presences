const presence = new Presence({
		clientId: "633805202868273153",
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
let user: string | HTMLElement | Element, title: string | HTMLElement | Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/TJO23bI.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "www.g2a.com": {
			if (document.location.pathname.includes("/wishlist"))
				presenceData.details = "Viewing their wishlist";
			else if (document.location.pathname.includes("/cart"))
				presenceData.details = "Viewing their cart";
			else if (document.location.pathname.includes("/search")) {
				presenceData.details = "Searching for:";
				presenceData.state = (title as HTMLElement).textContent
					.replace('" - G2A.COM', "")
					.replace('Search results - "', "");
				presenceData.smallImageKey = Assets.Search;
			} else if (document.location.pathname.includes("/category")) {
				presenceData.details = "Viewing category:";
				title = document.querySelector("head > title");
				presenceData.state = (title as HTMLElement).textContent.replace(
					" - G2A.COM",
					""
				);
			} else if (
				document.querySelector(
					"#app > div > div.content > div > article > header > div > div > h1 > span"
				) !== null
			) {
				presenceData.details = "Viewing item:";
				title = document.querySelector(
					"#app > div > div.content > div > article > header > div > div > h1 > span"
				);
				presenceData.state = (title as HTMLElement).textContent;
			} else if (document.location.pathname.includes("/user")) {
				presenceData.details = "Viewing user:";
				user = document.querySelector(
					"#app > div > div.content > div > div > div > section > div.user-info > button > strong"
				);
				presenceData.state = (user as HTMLElement).textContent;
			} else if (document.location.pathname.includes("/goldmine"))
				presenceData.details = "Using the goldmine";
			else if (document.location.pathname.includes("/news/")) {
				title = document.querySelector(
					"body > div.single-article.single-article--feature.default-template > div.review-top > div.review-top__wrapper > div > header > h1"
				);
				if (!title) presenceData.details = "Browsing news section";
				else {
					presenceData.details = "News - Reading:";
					presenceData.state = (title as HTMLElement).textContent;
					presenceData.smallImageKey = Assets.Reading;
				}
			}

			break;
		}
		case "id.g2a.com": {
			presenceData.details = "Viewing their account details";
			break;
		}
		case "dashboard.g2a.com": {
			presenceData.details = "Viewing their dashboard";
			break;
		}
		case "pay.g2a.com": {
			presenceData.details = "Using G2A Pay";
			break;
		}
		case "plus.g2a.com": {
			presenceData.details = "G2A Plus - Viewing:";
			title = document.querySelector("head > title");
			presenceData.state = (title as HTMLElement).textContent.replace(
				" - G2A Plus",
				""
			);

			break;
		}
		case "loot.g2a.com": {
			if (document.location.pathname === "/")
				presenceData.details = "Browsing G2A Loot";
			else {
				presenceData.details = "G2A Loot - Viewing:";
				title = document.querySelector("head > title");
				presenceData.state = (title as HTMLElement).textContent.replace(
					" - G2A Loot",
					""
				);
			}

			break;
		}
		// No default
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
