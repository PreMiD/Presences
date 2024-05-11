const presence = new Presence({
	clientId: "1039178085922250873",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/Animeflix/assets/0.png",
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
				presenceData.details = `Watching ${JSON.parse(
					document.querySelector<HTMLMetaElement>('script[id="syncData"]')
						.textContent
				).name.replace(/\b[a-z]/g, (letter: string) => letter.toUpperCase())}`;
			} else presenceData.details = "Exploring Animeflix";
	}
	presence.setActivity(presenceData);
});
