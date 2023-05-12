const presence = new Presence({
		clientId: "923958284032032818",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/g9Xe9SH.png",
			startTimestamp: browsingTimestamp,
		},
		[shortTitle] = document.title.split(/[|]/, 1),
		path = document.location.pathname;

	if (path === "/post") presenceData.details = "Browsing posts";
	else if (path.startsWith("/post")) {
		presenceData.details = "Viewing an artwork";
		presenceData.state = shortTitle;
		presenceData.buttons = [
			{ label: "View Artwork", url: document.location.href },
		];
	} else if (path.startsWith("/history"))
		presenceData.details = "Viewing post history";
	else {
		switch (path) {
			case "/comment": {
				presenceData.details = "Reading comments";
				break;
			}
			case "/note": {
				presenceData.details = "Reading notes";
				break;
			}
			case "/wiki": {
				presenceData.details = "Browsing the wiki";
				break;
			}
			default:
				if (path.startsWith("/wiki")) {
					presenceData.details = "Reading a wiki page";
					presenceData.state = shortTitle;
				} else if (path === "/artist")
					presenceData.details = "Browsing artists";
				else if (path.startsWith("/artist")) {
					presenceData.details = "Viewing an artist";
					presenceData.state = shortTitle;
					presenceData.buttons = [
						{ label: "View Artist", url: document.location.href },
					];
				} else if (path === "/user") presenceData.details = "Looking up users";
				else if (path.startsWith("/user")) {
					presenceData.details = "Viewing a user";
					presenceData.state = shortTitle;
				} else if (path === "/tag") presenceData.details = "Browsing tags";
				else if (path === "/pool") presenceData.details = "Browsing pools";
				else if (path.startsWith("/pool")) {
					presenceData.details = "Viewing a pool";
					presenceData.state = shortTitle;
				} else if (path === "/forum")
					presenceData.details = "Browsing the forum";
				else if (path.startsWith("/forum")) {
					presenceData.details = "Viewing a forum";
					presenceData.state = shortTitle;
				} else if (
					document.location.href === "https://konachan.com/" ||
					document.location.href === "https://konachan.net/"
				)
					presenceData.details = "Home page";
				else presenceData.details = "Browsing the site";
		}
	}
	presence.setActivity(presenceData);
});
