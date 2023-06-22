const presence = new Presence({
		clientId: "867411016836186112",
	}),
	pathArr = document.location.pathname.split("/"),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	pages: Record<string, PresenceData> = {
		"liste-danimes": {
			details: "Visite la page :",
			state: "Listes d'animes",
		},
		"nouveaux-ajouts": {
			details: "Visite la page :",
			state: "Nouveaux animes",
		},
		prochainement: {
			details: "Visite la page :",
			state: "Prochains animes",
		},
	};

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	currentLang: string,
	strings: { [key: string]: string };

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		if (data?.duration) video = data;
	}
);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		details: "Page d'accueil",
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/V/Voiranime/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};
	const newLang = await presence.getSetting<string>("lang").catch(() => "en");
	if (newLang !== currentLang) {
		currentLang = newLang;
		strings = await presence.getStrings(
			{
				browsing: "general.browsing",
				watchingMovie: "general.watchingMovie",
				watchingSeries: "general.watchingSeries",
				buttonViewMovie: "general.buttonViewMovie",
				buttonViewSeries: "general.buttonViewSeries",
				buttonViewPage: "general.buttonViewPage",
				viewPage: "general.viewPage",
				playing: "general.playing",
				searching: "general.search",
				searchFor: "general.searchFor",
				play: "general.playing",
				pause: "general.paused",
			},
			newLang
		);
	}
	switch (pathArr[1]) {
		case "anime": {
			const title = document.querySelector("ol > li:nth-child(2) > a");
			presenceData.details = "Visite la page de l'anime :";
			presenceData.state = document.querySelector(
				"div.post-title > h1"
			)?.textContent;
			if (
				!isNaN(video.duration) &&
				title &&
				!!document.querySelector("li.active")
			) {
				const [startTimestamp, endTimestamp] = presence.getTimestamps(
					video.currentTime,
					video.duration
				);

				presenceData.details = title.textContent;
				presenceData.state = document
					.querySelector("li.active")
					.textContent.split("-")[1];
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;
				presenceData.buttons = [
					{
						label: "Regarder l'épisode",
						url: document.location.href,
					},
					{
						label: "Voir l'anime",
						url: title.getAttribute("href"),
					},
				];
				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
			break;
		}
		case "anime-genre":
			presenceData.details = "Visite la page :";
			presenceData.state = `Listes d'animes du genre "${
				document.querySelector("h1")?.textContent
			}"`;
			break;
		default:
			if (document.location.search.startsWith("?s")) {
				presenceData.details = "Recherche un anime :";
				presenceData.state = new URLSearchParams(document.location.search).get(
					"s"
				);
				presenceData.smallImageKey = Assets.Search;
			} else if (Object.keys(pages).includes(pathArr[1]))
				presenceData = { ...presenceData, ...pages[pathArr[1]] };
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
