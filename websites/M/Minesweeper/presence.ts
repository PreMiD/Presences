const presence = new Presence({
		clientId: "989759189394030613",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KtDhLn7.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location;

	if (document.location.pathname === "/")
		presenceData.details = "Viewing the home page";
	else if (document.location.pathname.startsWith("/game/")) {
		presenceData.details = "Clicking cells";
		presenceData.state = `Difficulty: ${
			document.querySelector<HTMLSpanElement>(
				"a.level-select-link.active > span"
			).textContent
		}`;
		presenceData.buttons = [
			{
				label: "Spectate Game",
				url: location.href,
			},
		];
	} else if (document.location.pathname.startsWith("/player/")) {
		presenceData.details = "Viewing profile";
		presenceData.state = `${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")
			.replace(" - Minesweeper Online", "")}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: location.href,
			},
		];
	} else if (document.location.pathname.startsWith("/help/")) {
		presenceData.details = "Viewing the help page";
		presenceData.state = `${document
			.querySelector("meta[property='og:title']")
			.getAttribute("content")
			.replace(" - Minesweeper Online", "")}`;
	} else {
		switch (pathname) {
			case "/ranking": {
				presenceData.details = "Viewing the rankings";
				break;
			}
			case "/my-games": {
				presenceData.details = "Viewing their games history";
				break;
			}
			case "/best-players": {
				presenceData.details = "Viewing the best players";
				break;
			}
			case "/season-leaders": {
				presenceData.details = "Viewing this seasons's leaders";
				break;
			}
			case "/quests": {
				presenceData.details = "Viewing their quests";
				break;
			}
			case "/arena": {
				presenceData.details = "In the arena";
				break;
			}
			case "/equipment": {
				presenceData.details = "Viewing their equipment";
				break;
			}
			case "/marketplace": {
				presenceData.details = "Viewing the marketplace";
				break;
			}
			case "/events": {
				presenceData.details = "Viewing the event";
				break;
			}
			case "/players-online": {
				presenceData.details = "Viewing players online";
				break;
			}
			case "/news": {
				presenceData.details = "Viewing the news";
				break;
			}
			case "/statistics": {
				presenceData.details = "Viewing statistics";
				break;
			}
			case "/chat": {
				presenceData.details = "Chatting";
				break;
			}
			case "/premium": {
				presenceData.details = "Viewing premium perks";
				break;
			}
			case "/shop": {
				presenceData.details = "Viewing the shop";
				break;
			}
			case "/profile": {
				presenceData.details = "Managing their account details";
				break;
			}
		}
	}
	presence.setActivity(presenceData);
});
