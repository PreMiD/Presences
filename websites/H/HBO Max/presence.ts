const presence = new Presence({
		clientId: "879535934977245244",
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
		crunchyroll: "Crunchyroll Collection",
	},
	videosInfo: Record<
		string,
		{
			coverArt?: string;
			title?: string;
			subtitle?: string;
		}
	> = {};

let isFetching = false;

async function fetchToken(): Promise<string> {
	const res = await fetch("https://oauth.api.hbo.com/auth/tokens", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			/* eslint-disable camelcase */
			body: JSON.stringify({
				client_id: "585b02c8-dbe1-432f-b1bb-11cf670fbeb0",
				client_secret: crypto.randomUUID(),
				scope: "browse video_playback",
				grant_type: "client_credentials",
				deviceSerialNumber: crypto.randomUUID(),
				clientDeviceData: {
					paymentProviderCode: "blackmarket",
				},
			}),
		}),
		res_1 = await res.json();
	return res_1.access_token;
}

async function fetchClientConfig(
	token: string
): Promise<{ routeKey: string; countryCode: string }> {
	const res = await fetch(
			"https://sessions.api.hbo.com/sessions/v1/clientConfig",
			{
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					contract: "abc:1.0.0.0",
					preferredLanguages: ["en-us"],
				}),
			}
		),
		res_1 = await res.json();
	return {
		routeKey: res_1.routeKeys.contentSubdomain,
		countryCode: new URLSearchParams(
			res_1.features["express-content"].config.expressContentParams
		).get("country-code"),
	};
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/H/HBO%20Max/assets/logo.png",
}

async function fetchVideoInfo() {
	if (isFetching) return { coverArt: Assets.Logo, title: "" };

	let output: {
		coverArt?: string;
		title?: string;
		subtitle?: string;
	} = {};

	const accessToken = await fetchToken(),
		{ routeKey, countryCode } = await fetchClientConfig(accessToken);

	isFetching = true;

	try {
		const mediaInfo = (
			await fetch(
				`https://comet${routeKey}.api.hbo.com/express-content/${
					location.pathname.split("/")[2]
				}?device-code=desktop&product-code=hboMax&api-version=v9.0&country-code=${countryCode}&language=en-us`,
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			).then(res => res.json())
		)[0].body;

		output = {
			coverArt: (() => {
				if (location.pathname.includes(":episode:")) {
					return `https://artist.api.cdn.hbo.com/images/${
						mediaInfo.references.series.match(/series:([^:]+)/)[1]
					}/tileburnedin?size=1024x1024`;
				} else if (location.pathname.includes(":feature:")) {
					return `https://artist.api.cdn.hbo.com/images/${
						location.pathname.match(/:feature:([^:]+)/)[1]
					}/tileburnedin?size=1024x1024`;
				} else return Assets.Logo;
			})(),
			title: (mediaInfo.seriesTitles || mediaInfo.titles).full,
			subtitle: mediaInfo.seriesTitles
				? `S${mediaInfo.seasonNumber}:E${mediaInfo.numberInSeason} ${mediaInfo.titles.full}`
				: "",
		};
	} catch {
		output = { coverArt: Assets.Logo };
		presence.error(
			"Unable to fetch video info. Please open an issue here https://github.com/PreMiD/Presences/issues"
		);
	}

	isFetching = false;
	return output;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			type: ActivityType.Watching,
			largeImageKey: Assets.Logo,
		},
		video = document.querySelector("video"),
		path = document.location.pathname;

	switch (true) {
		case path === "/profileSelect":
			Object.assign(presenceData, {
				details: "Selecting a profile",
			});
			break;
		case path === "/search":
			Object.assign(presenceData, {
				details: "Searching",
				smallImageKey: Assets.Search,
				smallImageText: "Browsing...",
			});
			break;
		case !!video: {
			const timestamps = presence.getTimestampsfromMedia(video),
				videoId = location.pathname.match(/:[a-z]+:([^:]+)$/)[1];

			videosInfo[videoId] ??= await fetchVideoInfo();

			const videoInfo = videosInfo[videoId];

			Object.assign(presenceData, {
				details: videoInfo.title,
				state:
					videoInfo.subtitle ||
					(location.pathname.includes(":feature:") ? "Movie" : "Extra"),
				smallImageKey: video.paused ? Assets.Pause : Assets.Play,
				smallImageText: video.paused ? "Paused" : "Playing",
			});

			if (
				[":episode:", ":feature:"].some(x => location.pathname.includes(x)) &&
				(await presence.getSetting<boolean>("cover"))
			)
				presenceData.largeImageKey = videoInfo.coverArt;

			if (!video.paused) {
				Object.assign(presenceData, {
					startTimestamp: timestamps[0],
					endTimestamp: timestamps[1],
				});
			}

			break;
		}
		case /(type:[a-z]+)$/.test(path) && document.title.includes(" • "): {
			const title = document.title
				.split(" • ")
				.shift()
				.match(/.+?(?=,)|^(?!,).*$/g)
				.join("");

			switch (/(type:[a-z]+)$/.exec(path)[0]) {
				case "type:episode":
				case "type:series":
					Object.assign(presenceData, {
						details: "Viewing series:",
						state: title,
					});
					break;
				case "type:feature":
					Object.assign(presenceData, {
						details: "Viewing movie:",
						state: title,
					});
					break;
				case "type:extra":
					Object.assign(presenceData, {
						details: "Viewing extra video:",
						state: title,
					});
					break;
			}
			break;
		}
		default: {
			Object.assign(presenceData, { details: "Browsing" });
			const pageSlug = Object.keys(slugs).find(z =>
				window.location.href.includes(`:page:${z}`)
			);

			if (pageSlug) Object.assign(presenceData, { state: slugs[pageSlug] });

			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
