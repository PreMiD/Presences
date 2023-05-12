const presence = new Presence({
	clientId: "843058220398542878",
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
		largeImageKey: "https://i.imgur.com/WKHpLxp.jpg",
	};

	switch (document.location.pathname) {
		case "/home/foryou": {
			presenceData.details = "Viewing SiriusXM Home";
			break;
		}
		case "/home/music": {
			presenceData.details = "Viewing Music Home";
			break;
		}
		case "/home/sports": {
			presenceData.details = "Viewing Sports Home";
			break;
		}
		case "/home/news": {
			presenceData.details = "Viewing News Home";
			break;
		}
		case "/home/entertainment": {
			presenceData.details = "Viewing Talk Home";
			break;
		}
		case "/home/howard": {
			presenceData.details = "Viewing Howard Stern Home";
			break;
		}
		case "/favorites/channels": {
			presenceData.details = "Viewing Favorite Channels";
			break;
		}
		case "/favorites/shows": {
			presenceData.details = "Viewing Favorite Shows";
			break;
		}
		case "/favorites/episodes": {
			presenceData.details = "Viewing Favorite Episodes";
			break;
		}
		case "/recently-played": {
			presenceData.details = "Viewing Recently Played Stations";
			break;
		}
		case "/query": {
			presenceData.details = "Searching SiriusXM";
			break;
		}
		default:
			if (document.location.pathname.includes("/query")) {
				presenceData.details = "Viewing: ";
				presenceData.state = document.querySelector<HTMLInputElement>(
					'[name="searchText"]'
				).value;
			} else if (document.location.pathname.includes("/category-listing")) {
				presenceData.details = "Viewing Category: ";
				presenceData.state = document.querySelector(
					"span.sxm-breadcrumb__text"
				).textContent;
			} else presenceData.details = "Unknown page";
	}

	if (document.querySelector(".sxm-player-controls.no-select")) {
		const data = {
			channel: document.querySelector(".channel-name")?.textContent,
			track: document.querySelector(".track-name")?.textContent ?? "Loading",
			artist: document.querySelector(".artist-name")?.textContent ?? "Loading",
		};

		if (data.track === data.artist) presenceData.details = data.track;
		else if (data.channel)
			presenceData.details = `${data.track} - ${data.artist}`;
		else presenceData.details = data.track;

		if (data.channel) presenceData.state = data.channel;
		else presenceData.state = data.artist;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
