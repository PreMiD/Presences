const presence = new Presence({
		clientId: "719127768868061246",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/aI1Qn8s.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pathSplit = pathname.split("/").slice(1),
		pageTitle = document.querySelector(
			"[itemprop='breadcrumb'] > li:last-child"
		)?.textContent;

	switch (pathSplit[0] ?? "") {
		case "":
		case "home": {
			presenceData.details = "Viewing home page";
			break;
		}
		case "user": {
			presenceData.details = "Viewing a profile";
			presenceData.state = pageTitle;
			break;
		}
		case "dashboard": {
			presenceData.details = "Viewing the Dashboard";
			break;
		}
		case "premium": {
			presenceData.details = "Viewing Premium";
			break;
		}
		case "giveaway": {
			presenceData.details = "Viewing Giveaways";
			break;
		}
		case "settings": {
			presenceData.details = "Managing Settings";
			break;
		}
		case "market": {
			presenceData.details = "Viewing the Market";
			break;
		}
		case "notifications": {
			presenceData.details = "Viewing Notifications";
			break;
		}
		case "events": {
			presenceData.details = "Viewing Events";
			break;
		}
		case "anime": {
			presenceData.details = "Viewing Anime";
			break;
		}
		case "shop": {
			presenceData.details = "Viewing the Shop";
			break;
		}
		case "bank": {
			presenceData.details = "Viewing the Bank";
			break;
		}
		case "cards": {
			if (pathSplit[1] === "info") {
				presenceData.details = "Viewing a Card";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".cardData > img").src;
				presenceData.buttons = [
					{
						label: "View Card",
						url: href,
					},
				];
			} else presenceData.details = "Viewing the Cards";
			break;
		}
		case "card-abilities": {
			presenceData.details = "Viewing Card Abilities";
			break;
		}
		case "card-events": {
			presenceData.details = "Viewing Card Events";
			break;
		}
		case "inventory": {
			presenceData.details = "Viewing Inventory";
			break;
		}
		case "fusion": {
			presenceData.details = "Fusing Cards";
			break;
		}
		case "auction": {
			presenceData.details = "Viewing the Auction";
			break;
		}
		case "trades": {
			presenceData.details = "Viewing Trades";
			break;
		}
		// Shoob games section
		case "this-or-that": {
			presenceData.details = "Playing This or That";
			break;
		}
		case "mini-games": {
			presenceData.details = "Playing Mini Games";
			break;
		}
		// Shoob community section
		case "creators": {
			presenceData.details = "Viewing Creators";
			break;
		}
		case "medals": {
			presenceData.details = "Viewing Medals";
			break;
		}
		case "friends": {
			presenceData.details = "Viewing Friends";
			break;
		}
		case "leaderboards": {
			presenceData.details = "Viewing Leaderboards";
			break;
		}
		case "cardmakers": {
			if (pathSplit[1] === "leaderboard") {
				presenceData.details = "Viewing CardMaker Leaderboards";
			}
			break;
		}
		case "servers": {
			presenceData.details = "Viewing Servers";
			break;
		}
		case "appeals": {
			presenceData.details = "Viewing Appeals";
			break;
		}
		case "updates": {
			presenceData.details = "Viewing Updates";
			break;
		}
		case "articles": {
			presenceData.details = "Viewing Guides";
			break;
		}
		case "rules": {
			presenceData.details = "Reading the Rules";
			break;
		}
		case "staff-list": {
			presenceData.details = "Viewing Staff List";
			break;
		}
		case "staff": {
			presenceData.details = "Viewing Staff Pages";
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
