const presence = new Presence({
		clientId: "752151960743837817",
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
		largeImageKey: "https://i.imgur.com/Brh0MPv.png",
	};

	if (document.location.hostname === "spinsha.re") {
		const { pathname } = document.location;
		switch (pathname) {
			case "/":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing Frontpage";
				break;
			case "/new":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing New Charts";
				break;
			case "/hot":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing Hot Charts";
				break;
			case "/popular":
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing Popular Charts";
				break;
			default:
				//Idle
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Idling";
				break;
		}
		if (pathname.startsWith("/song")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = document.querySelector(".song-title").textContent;
			presenceData.state = document.querySelector(".song-artist").textContent;
			if (document.querySelector(".player-active"))
				presenceData.smallImageKey = Assets.Play;
		} else if (pathname.startsWith("/user")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing User Profile:";
			presenceData.state = (<HTMLElement>(
				document.querySelector(".user-name")
			)).textContent;
		} else if (pathname.startsWith("/search")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Searching";
			presenceData.state = "🔍";
		} else if (pathname.startsWith("/report")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Reporting Something...";
			presenceData.state = "🔨";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
