const presence = new Presence({
	clientId: "1039178085922250873",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/4hiyxuW.png",
			buttons: [
				{
					label: "Visit Website",
					url: "https://animeflix.live/",
				},
				{
					label: "Join Discord",
					url: "https://discord.gg/SKcb2C7HjH",
				},
			],
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
