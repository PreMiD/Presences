const presence = new Presence({
		clientId: "629428243061145640",
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
let user: Element | HTMLElement | string,
	search: Element | HTMLElement | string,
	title: Element | HTMLElement | string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/DiUTf7t.png",
	};
	presenceData.startTimestamp = browsingTimestamp;
	if (document.location.hostname === "help.pinterest.com") {
		presenceData.details = "Viewing Help Center";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/search/")) {
		search = document.querySelector(
			"#HeaderContent > div > div > div > div > div > div > div > div > div > div > input"
		);
		presenceData.details = "Searching for:";
		presenceData.state = (search as HTMLInputElement).textContent;

		presenceData.smallImageKey = Assets.Search;

		presence.setActivity(presenceData);
	} else if (
		document.querySelector(
			"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
		) !== null ||
		document.querySelector(
			"body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
		) !== null
	) {
		user = document.querySelector(
			"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
		);
		user ??= document.querySelector(
			"body > div > div.App.AppBase > div.appContent > div > div > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h5"
		);
		presenceData.details = "Viewing user:";
		presenceData.state = (user as HTMLElement).textContent;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (
		document.querySelector(
			"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
		) !== null ||
		document.querySelector(
			"body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
		)
	) {
		user = document.querySelector(
			"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
		);
		if (user === null) {
			user = document.querySelector(
				"body > div > div.App.AppBase > div.appContent > div > div > div > div > div.BrioProfileHeaderWrapper > div:nth-child(1) > div > div > div > div > div > div > div > div:nth-child(1) > h4"
			);
		}
		presenceData.details = "Viewing user:";
		presenceData.state = (user as HTMLElement).textContent;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (
		document.querySelector(
			"body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
		) !== null ||
		document.querySelector(
			"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
		) !== null
	) {
		title = document.querySelector(
			"body > div > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
		);
		if (title === null) {
			title = document.querySelector(
				"#__PWS_ROOT__ > div.App.AppBase > div.appContent > div > div > div > div > div > div > div > div > div > div.boardHeaderWrapper > div > div > div > div:nth-child(1) > h4"
			);
		}
		presenceData.details = "Viewing board:";
		presenceData.state = (title as HTMLElement).textContent;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/following")) {
		presenceData.details = "Viewing their following";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/pin/")) {
		presenceData.details = "Viewing a pin";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/edit")) {
		presenceData.details = "Editting their homepage";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/settings")) {
		presenceData.details = "Viewing their settings";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else if (
		document.querySelector("#__PWS_ROOT__ > div.App.AppBase") !== null &&
		document.querySelector("#__PWS_ROOT__ > div.App.AppBase").className ===
			"App AppBase"
	) {
		presenceData.details = "Viewing the home page";
		delete presenceData.state;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	} else {
		title = document.querySelector("head > title");
		presenceData.details = "Viewing:";
		presenceData.state = (title as HTMLElement).textContent;

		delete presenceData.smallImageKey;

		presence.setActivity(presenceData);
	}
});
