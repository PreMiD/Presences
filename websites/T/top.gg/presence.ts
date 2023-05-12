const presence = new Presence({
	clientId: "629380028576301093",
});

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
		largeImageKey: "https://i.imgur.com/KzHXCRG.png",
	};
	presenceData.details = "Viewing Page:";

	//Discord Bot List
	if (window.location.pathname.startsWith("/moderation")) {
		presenceData.details = "Viewing DBL Staff section:";
		presenceData.largeImageKey = "dblstaff";

		switch (window.location.pathname) {
			case "/moderation": {
				const personalquota =
					document.querySelectorAll(".quotaindiv")[0].textContent;

				presenceData.state = `Reviewed ${personalquota.substring(
					personalquota.indexOf("reviewed") + 9,
					personalquota.indexOf("/")
				)} bots this week`;

				break;
			}
			case "/moderation/approve": {
				presenceData.state = "Verification Queue";
				break;
			}
			case "/moderation/certify": {
				presenceData.state = "Certification Queue";
				break;
			}
			case "/moderation/reports": {
				presenceData.state = "Reports Queue";
				break;
			}
			case "/moderation/reviews": {
				presenceData.state = "Reviews Dashboard";
				break;
			}
			default:
				if (window.location.pathname.startsWith("/moderation/decline")) {
					presenceData.state =
						document.querySelector("#botlistitle").textContent;
				}
		}
	} else if (window.location.pathname.startsWith("/bot/")) {
		if (window.location.pathname.endsWith("/edit")) {
			presenceData.details = "Editing a Discord bot:";
			presenceData.state = document
				.querySelector("#botlistitle")
				.textContent.substring(8);
		} else if (window.location.pathname.endsWith("/vote")) {
			presenceData.details = "Voting for a Discord bot:";
			presenceData.state = document
				.querySelector("#totalContent > div > p")
				.textContent.trim();
		} else if (window.location.pathname.endsWith("/report")) {
			//Might not be the smartest idea to expose someone reporting bots
			presenceData.state = "Discord Bot List";
		} else if (window.location.pathname.endsWith("/new"))
			presenceData.state = "Add a bot";
		else if (document.querySelector(".entity-queue-message__indicator")) {
			presenceData.details = `Viewing a Discord bot: ${document
				.querySelector(".entity-header__name")
				.textContent.trim()}`;
			presenceData.largeImageKey = "dblstaff";
			presenceData.state = "Bot isn't approved yet";
		} else {
			presenceData.details = "Viewing a Discord bot:";
			presenceData.state = document
				.querySelector(".entity-header__name")
				.textContent.trim();
		}
	} else if (window.location.pathname.startsWith("/list/")) {
		presenceData.details = "Viewing a list of Discord bots:";
		presenceData.state = document
			.querySelector("#botlistitle")
			.textContent.split("-")[0]
			.trim();
	} else if (window.location.pathname.startsWith("/tag/")) {
		presenceData.details = "Viewing Discord bots with tag:";
		presenceData.state = document
			.querySelector("#botlistitle")
			.textContent.split("-")[0]
			.trim();
	} else if (
		window.location.pathname.startsWith("/user/") ||
		window.location.pathname === "/me"
	) {
		presenceData.details = "Viewing a profile:";
		presenceData.state = document.querySelector(".header").textContent;
	} else if (window.location.pathname.startsWith("/api/docs"))
		presenceData.state = "Discord Bot List API Documentation";
	//Discord Server List
	else if (window.location.pathname.startsWith("/servers")) {
		presenceData.largeImageKey = "dslregular";
		if (
			window.location.pathname.startsWith("/servers/list/") ||
			window.location.pathname.startsWith("/servers/tag/")
		) {
			presenceData.details = "Viewing:";
			presenceData.state = document.querySelector("#botlistitle").textContent;
		} else if (document.querySelector(".entity-header__name")) {
			if (document.querySelectorAll(".entity-header__button").length < 2) {
				presenceData.details =
					"Viewing a Discord Server | Server isn't published yet.";
				presenceData.state = document
					.querySelector(".entity-header__name")
					.textContent.trim();
			} else presenceData.details = "Viewing a Discord Server:";
			presenceData.state = document
				.querySelector(".entity-header__name")
				.textContent.trim();
		} else if (window.location.pathname.endsWith("/edit")) {
			presenceData.details = "Editing a Discord Server:";
			presenceData.state = document
				.querySelector("#botlistitle")
				.textContent.substring(8);
		} else if (window.location.pathname.startsWith("/servers/new"))
			presenceData.details = "Adding a new Discord server...";
		else if (window.location.pathname.startsWith("/servers/me"))
			presenceData.state = "My servers";
		else presenceData.state = "Discord Servers";
	} else if (document.querySelector("#botlistitle")) {
		//If it doesn't fit to anything
		presenceData.state = document.querySelector("#botlistitle").textContent;
	} else {
		//If it really finds nothing
		presenceData.details = "Viewing something...";
	}

	presence.setActivity(presenceData);
});
