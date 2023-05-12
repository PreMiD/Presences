const presence = new Presence({
		clientId: "840759396103749633",
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

async function getTranslation(name: string) {
	const language =
		(await presence.getSetting<0 | 1>("lang")) === 0 ? "en" : "de";

	switch (name) {
		case "home":
			switch (language) {
				case "de":
					return "Durchsucht die Startseite";
				default:
					return "Browsing home page";
			}
		case "search":
			switch (language) {
				case "de":
					return "Sucht nach etwas";
				default:
					return "Searching for something";
			}
		case "faq":
			switch (language) {
				case "de":
					return "Durchsucht das FAQ";
				default:
					return "Browsing FAQ page";
			}
		case "activity":
			switch (language) {
				case "de":
					return "Schaut sich Aktivität an";
				default:
					return "Viewing activity";
			}
		case "user":
			switch (language) {
				case "de":
					return "Schaut sich Benutzer an";
				default:
					return "Viewing user";
			}
		case "settings":
			switch (language) {
				case "de":
					return "Durchsucht die Einstellungen";
				default:
					return "Browsing settings page";
			}
		case "viewUser":
			switch (language) {
				case "de":
					return "Benutzer anzeigen";
				default:
					return "View user";
			}
		case "viewActivity":
			switch (language) {
				case "de":
					return "Aktivität anzeigen";
				default:
					return "View activity";
			}
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/6SyDAmT.png",
		startTimestamp: browsingTimestamp,
	};

	switch (window.location.pathname) {
		case "/": {
			presenceData.details = await getTranslation("home");
			break;
		}
		case "/search": {
			presenceData.details = await getTranslation("search");
			break;
		}
		case "/faq": {
			presenceData.details = await getTranslation("faq");
			break;
		}
		default:
			if (window.location.pathname.includes("/activity/")) {
				if (!document.querySelector("#activityName")) return;
				presenceData.details = await getTranslation("activity");
				presenceData.state =
					document.querySelector("#activityName").textContent;
				presenceData.buttons = [
					{
						label: await getTranslation("viewActivity"),
						url: window.location.href,
					},
				];
			} else if (window.location.pathname.includes("/user/")) {
				if (!document.querySelector("#userName")) return;
				presenceData.details = await getTranslation("user");
				presenceData.state = document.querySelector("#userName").textContent;
				presenceData.buttons = [
					{
						label: await getTranslation("viewUser"),
						url: window.location.href,
					},
				];
			} else if (window.location.pathname === "/settings")
				presenceData.details = await getTranslation("settings");
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
