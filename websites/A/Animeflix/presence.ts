const presence = new Presence({
	clientId: "1039178085922250873",
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
			largeImageKey: "https://i.imgur.com/4hiyxuW.png",
		},
		{ pathname } = document.location;

	switch (pathname) {
		case "/": {
			presenceData.details = "Exploring Main Page";
			break;
		}
		case "/genres": {
			presenceData.details = "Exploring Genres";
			break;
		}
		case "/series": {
			presenceData.details = "Exploring Series";
			break;
		}
		case "/movies": {
			presenceData.details = "Exploring Movies";
			break;
		}
		case "/mylist": {
			presenceData.details = "Going through My List";
			break;
		}
		default:
			if (pathname.includes("/watch")) {
				const episodeName = document.querySelector<HTMLMetaElement>(
					'meta[name="anime-skip.episode.name"]'
				);
				presenceData.details = `Watching ${
					document.querySelector<HTMLMetaElement>(
						'meta[name="anime-skip.show.name"]'
					).content
				}`;
				presenceData.state = episodeName.content.includes("Episode")
					? episodeName.content
					: `${
							document.querySelector<HTMLMetaElement>(
								'meta[name="anime-skip.episode.number"]'
							).content
					  }. ${episodeName.content}`;
			} else presenceData.details = "Exploring Animeflix";
	}
	presence.setActivity(presenceData);
});
