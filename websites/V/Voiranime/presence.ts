const presence = new Presence({
		clientId: "867411016836186112",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing",
	}),
	path = document.location.pathname,
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		if (data?.duration) video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};

	if (path.includes("/liste-danimes")) {
		presenceData.details = "Visite la page :";
		presenceData.state = "Listes d'animes";
	} else if (path.includes("/nouveaux-ajouts")) {
		presenceData.details = "Visite la page :";
		presenceData.state = "Nouveaux animes";
	} else if (path.includes("/prochainement")) {
		presenceData.details = "Visite la page :";
		presenceData.state = "Prochains animes";
	} else if (document.location.search.startsWith("?s")) {
		presenceData.details = "Recherche un anime :";
		presenceData.state = new URLSearchParams(document.location.search).get("s");
		presenceData.smallImageKey = "search";
	} else if (path.includes("/anime/")) {
		const title = document.querySelector(
			"#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
		)?.textContent;

		presenceData.details = "Visite la page de l'anime :";
		presenceData.state = document.querySelector(
			"body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1"
		)?.textContent;
		if (!isNaN(video.duration) && title) {
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
					video.currentTime,
					video.duration
				),
				[, epAndSeason] = document
					.querySelector(
						"#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active"
					)
					.textContent.split("-");

			presenceData.details = title;
			presenceData.state = epAndSeason;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			presenceData.buttons = [
				{
					label: "Regarder l'épisode",
					url: document.location.href,
				},
				{
					label: "Voir l'anime",
					url: document
						.querySelector(
							"#manga-reading-nav-head > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(2) > a"
						)
						.getAttribute("href"),
				},
			];
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (path.includes("/anime-genre")) {
		presenceData.details = "Visite la page :";
		presenceData.state = `Listes d'animes du genre "${
			document.querySelector(
				"body > div.wrap > div.body-wrap > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1"
			)?.textContent
		}"`;
	} else presenceData.details = "Page d'accueil";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
