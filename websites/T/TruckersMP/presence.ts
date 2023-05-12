const presence = new Presence({
		clientId: "821104573329440848",
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
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ptddTU8.png",
	};
	const [buttons, timestamp, privacy] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("privacy"),
		]),
		pages: Record<string, PresenceData> = {
			"/team": { details: "Viewing the staff team" },
			"/status": { details: "Viewing the server status" },
			"/knowledge-base": { details: "Browsing the knowledge base" },
			"/support": { details: "Viewing the support center" },
			"/rules": { details: "Reading the rules" },
			"/download": { details: "Viewing the downloads page" },
			"/profile/settings": { details: "Viewing profile settings" },
			"/vtc": { details: "Viewing the VTC center" },
			"/vtc/search": { details: "Searching for a VTC" },
			"/vtc/create": { details: "Creating a VTC" },
			"/blog": { details: "Browsing the blog" },
			"/events": { details: "Viewing the events system" },
			"/events/manage": { details: "Managing their events" },
			"/events/manage/past": { details: "Viewing their past events" },
			"/events/create": { details: "Creating an event" },
			"/events/search": { details: "Searching for an event" },
			"/api": { details: "Viewing the API" },
			"/live": { details: "Viewing the live stats" },
			"/history": { details: "Viewing the history" },
			"/settings": { details: "Viewing the settings" },
		};

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.pathname.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	switch (document.location.host) {
		case "truckersmp.com":
			switch (true) {
				case document.location.pathname.includes("/blog/"):
					presenceData.details = "Reading a blog post";
					presenceData.state = document.querySelector<HTMLHeadingElement>(
						"div.container-fluid > h1"
					).textContent;
					presenceData.buttons = [{ label: "Read Post", url: document.URL }];
					break;
				case document.location.pathname.includes("/events/"):
					presenceData.details = "Viewing an event";
					presenceData.state =
						document.querySelectorAll<HTMLHeadingElement>("h1")[1].textContent;
					presenceData.buttons = [{ label: "View Event", url: document.URL }];
					break;
				case document.location.pathname.includes("/members/"):
					presenceData.details = "Viewing a VTC members list";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					break;
				case document.location.pathname.includes("/vtc/"):
					presenceData.details = "Viewing a VTC";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [{ label: "View VTC", url: document.URL }];
					break;
				case document.location.pathname.includes("/user/"):
					presenceData.details = "Viewing a user's profile";
					presenceData.state = document.querySelector<HTMLSpanElement>(
						"div.col-md-12 > h1 > span"
					).textContent;
					presenceData.buttons = [{ label: "View Profile", url: document.URL }];
					break;
				case document.location.pathname.includes("/article/"):
					presenceData.details = "Viewing a knowledge base article";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h1").textContent;
					presenceData.buttons = [{ label: "Read Article", url: document.URL }];
					break;
				case document.location.pathname === "/":
					presenceData.details = "Browsing the homepage";
			}
			break;
		case "forum.truckersmp.com":
			switch (true) {
				case document.location.pathname.includes("/index.php?/profile"):
					presenceData.details = "Viewing a forum user";
					presenceData.state = document
						.querySelectorAll<HTMLDivElement>(
							"main > div > div > div> div > header > div  > div > div"
						)[1]
						.querySelector<HTMLSpanElement>("div > h1 > span").textContent;
					presenceData.buttons = [{ label: "View Profile", url: document.URL }];
					break;
				case document.location.pathname.includes("/index.php?/topic"):
					presenceData.details = "Viewing a forum topic";
					presenceData.state = document.querySelector<HTMLDivElement>(
						"main > div > div > div > div > header > div > div > div > h1"
					).textContent;
					presenceData.buttons = [{ label: "View Topic", url: document.URL }];
					break;
				case document.location.pathname.includes("/forum"):
					presenceData.details = "Browsing the forum";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>(
							"header > h1"
						).textContent;
					presenceData.buttons = [
						{ label: "View Forum Category", url: document.URL },
					];
					break;
				default:
					presenceData.details = "Browsing the forum";
			}
			break;
		case "map.truckersmp.com":
			presenceData.details = "Viewing the TruckersMP Map";
			if (document.location.pathname.includes("?follow=")) {
				presenceData.details = "TruckersMP Map";
				presenceData.state = `Following ${
					document.querySelector<HTMLDivElement>("div.player-name").textContent
				}`;
			}
			break;
	}

	if (!buttons) delete presenceData.buttons;
	if (privacy) delete presenceData.state;
	if (timestamp) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
