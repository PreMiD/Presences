const presence = new Presence({
		clientId: "879535934977245244"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing"
	}),
	slugs: { [key: string]: string } = {
		home: "Home",
		series: "Series",
		movies: "Movies",
		originals: "Originals",
		"just-added": "Just Added",
		"last-chance": "Last Chance",
		"coming-soon": "Coming Soon",
		trending: "Trending Now",
		action: "Action",
		animation: "Animation",
		comedy: "Comedy",
		crime: "Crime",
		documentaries: "Documentaries",
		drama: "Drama",
		"fantasy-sci-fi": "Fantasy & Sci-Fi",
		horror: "Horror",
		international: "International",
		kids: "Kids & Family",
		latino: "Latino",
		music: "Music",
		"news-talk": "News/Talk",
		reality: "Reality",
		romance: "Romance",
		shorts: "Shorts",
		sports: "Sports",
		suspense: "Suspense",
		"audio-description": "Audio Description",
		hbo: "HBO",
		"max-originals": "Max Originals",
		dc: "DC",
		"classics-curated-by-tcm": "Classics Curated by TCM",
		"adult-swim": "Adult Swim",
		"studio-ghibli": "Studio Ghibli",
		"cartoon-network": "Cartoon Network",
		"sesame-workshop": "Sesame Workshop",
		"looney-tunes": "Looney Tunes",
		crunchyroll: "Crunchyroll Collection"
	},
	coverUrls: Record<string, string> = {};

function fetchCover(): Promise<string> {
	return new Promise(resolve => {
		fetch(
			`https://comet.api.hbo.com/express-content/${
				location.pathname.split("/")[2]
			}?device-code=desktop&product-code=hboMax&api-version=v9.0&country-code=US`
		)
			.then(x => x.json())
			.then(x =>
				resolve(
					`https://artist.api.cdn.hbo.com/images/${
						x[0].body.references.series.match(/series:([^:]+)/)[1]
					}/tileburnedin?size=1024x1024`
				)
			);
	});
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "lg"
		},
		video = document.querySelector("video"),
		path = document.location.pathname;

	let titles, hasEpisode, timestamps, pageSlug;

	switch (true) {
		case path === "/profileSelect":
			Object.assign(presenceData, {
				details: "Selecting a profile"
			});
			break;
		case path === "/search":
			Object.assign(presenceData, {
				details: "Searching",
				smallImageKey: "search",
				smallImageText: (await strings).browsing
			});
			break;
		case !!video:
			(titles = Array.from(
				document.querySelectorAll("[role=heading]:first-child span span")
			)
				.map(z => z.textContent)
				.filter(z => z.length > 1 && !/\d \/ \d+/.test(z))), // Test for "d / d" ex.: 01:45 / 01:30:00
				(hasEpisode = titles.length > 1);

			timestamps = presence.getTimestampsfromMedia(video);

			Object.assign(presenceData, {
				details: titles[0],
				state: hasEpisode ? titles[1] : "Watching movie",
				smallImageKey: video.paused ? "pause" : "play",
				smallImageText: video.paused
					? (await strings).pause
					: (await strings).play
			});

			if (
				[":episode:", ":feature:"].some(x => location.pathname.includes(x)) &&
				(await presence.getSetting<boolean>("cover"))
			) {
				if (location.pathname.includes(":feature:")) {
					presenceData.largeImageKey = `https://artist.api.cdn.hbo.com/images/${
						location.pathname.match(/:feature:([^:]+)/)[1]
					}/tileburnedin?size=1024x1024`;
				} else {
					const episodeId = location.pathname.match(/:episode:([^:]+)/)[1];
					coverUrls[episodeId] ??= await fetchCover();

					presenceData.largeImageKey = coverUrls[episodeId];
				}
			}

			if (!video.paused) {
				Object.assign(presenceData, {
					startTimestamp: timestamps[0],
					endTimestamp: timestamps[1]
				});
			}
			break;

		default: {
			Object.assign(presenceData, { details: "Browsing" });
			pageSlug = Object.keys(slugs).find(z =>
				window.location.href.includes(`:page:${z}`)
			);

			if (pageSlug) Object.assign(presenceData, { state: slugs[pageSlug] });

			break;
		}
	}
	presence.setActivity(presenceData);
});
