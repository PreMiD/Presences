const presence = new Presence({
		clientId: "752464948965408768",
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
			largeImageKey: "https://i.imgur.com/Sv0IpMI.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location;

	if (hostname.includes("itch.io")) {
		if (hostname.split(".")[0] !== "itch") {
			if (pathname === "/") {
				presenceData.details = "Viewing Developer Profile";
				presenceData.state = document.title.replace(" - itch.io", "");
			} else {
				const [gameName, devName] = document.title.split(" by ");
				presenceData.details = gameName;
				presenceData.state = devName;
				if (document.querySelector(".game_loaded")) {
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = "Playing";
				}
				if (pathname.split("/")[2] === "devlog")
					presenceData.state = `${devName}'s Devlog`;
			}
		} else if (
			pathname.startsWith("/board") ||
			pathname.startsWith("/community")
		)
			presenceData.details = "In Community Discussion";
		else if (
			pathname.startsWith("/jam") &&
			pathname.split("/")[2] &&
			document.querySelector(".jam_header_widget")
		) {
			presenceData.details = (
				document.querySelector(".jam_title_header") as HTMLElement
			).textContent;
			presenceData.state = `Jam ${
				(document.querySelector(".jam_host_header") as HTMLElement).textContent
			}`;
		} else {
			switch (pathname) {
				//Games
				case "/games":
					presenceData.details = "Browsing Games";
					break;
				//Devlogs
				case "/devlogs":
					presenceData.details = "Browsing Devlogs";
					break;
				//Jams
				case "/jams":
					presenceData.details = "Browsing Jams";
					break;
				//Dashboard
				case "/dashboard":
					presenceData.details = "Dashboard";
					break;
				//Feed
				case "/my-feed":
					presenceData.details = "Browsing My Feed";
					break;
				case "/featured-games-feed":
					presenceData.details = "Browsing Featured Games Feed";
					break;
				case "/feed":
					presenceData.details = "Browsing Global Feed";
					break;
				//Default Idle
				default:
					presenceData.details = "Idling";
					break;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
