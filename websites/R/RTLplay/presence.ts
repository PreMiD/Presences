import {
	exist,
	getThumbnail,
	stringsMap,
	getAdditionnalStrings,
	limitText,
	LargeAssets,
	getChannel,
} from "./util";

const presence = new Presence({
		clientId: "1240716875927916616",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	getStrings = async () => {
		return presence.getStrings(
			stringsMap,
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	};
let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
	const { hostname, href, pathname } = document.location,
		presenceData: PresenceData = {
			name: "RTLplay",
			largeImageKey:
				hostname === "www.radiocontact.be"
					? LargeAssets.Contact
					: LargeAssets.Animated, // Default
			largeImageText: "RTLplay",
			type: ActivityType.Watching,
		},
		[
			lang,
			usePresenceName,
			useChannelName,
			usePrivacyMode,
			useTimestamps,
			useButtons,
			usePoster,
		] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("usePresenceName"),
			presence.getSetting<boolean>("useChannelName"),
			presence.getSetting<boolean>("usePrivacyMode"),
			presence.getSetting<boolean>("useTimestamps"),
			presence.getSetting<number>("useButtons"),
			presence.getSetting<boolean>("usePoster"),
		]);

	if (oldLang !== lang || !strings) {
		oldLang = lang;
		strings = getAdditionnalStrings(lang, await getStrings());
	}

	switch (true) {
		/* MAIN PAGE (Page principale)

		(https://www.rtlplay.be/) */
		case pathname === "/" ||
			(pathname.split("/")[1] === "rtlplay" &&
				pathname.split("/").length <= 2): {
			presenceData.details = strings.browsing;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = strings.browsing;

			if (!usePrivacyMode) {
				presenceData.state = strings.viewHome;

				if (useTimestamps) presenceData.startTimestamp = browsingTimestamp;
			}
			break;
		}

		/* RESEARCH PAGE (Page de recherche)

		(https://www.rtlplay.be/rtlplay/recherche) */
		case ["recherche"].includes(pathname.split("/")[2]): {
			if (usePrivacyMode) presenceData.details = strings.searchSomething;
			else {
				const {searchQuery} = JSON.parse(document.querySelector("ol.search__results")?.getAttribute("data-tracking"));
				presenceData.details = searchQuery
					? strings.search
					: strings.searchSomething;
				presenceData.state = searchQuery?.term;

				if (useTimestamps) presenceData.startTimestamp = browsingTimestamp;

				if (useButtons) {
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}

			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = strings.search;
			break;
		}

		/* MY LIST (Ma Liste)

		(https://www.rtlplay.be/rtlplay/ma-liste) */
		case ["ma-liste"].includes(pathname.split("/")[2]): {
			presenceData.details = strings.browsing;
			presenceData.state = strings.viewAPage;
			if (!usePrivacyMode) {
				presenceData.state = strings.viewList;
				if (useButtons) {
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}
			break;
		}

		/* CATEGORY PAGE / COLLECTION PAGE (Page de catégorie)

		(https://www.rtlplay.be/rtlplay/collection/c2dBY3Rpb24) */
		case ["collection", "series", "films", "divertissement"].includes(
			pathname.split("/")[2]
		): {
			if (usePrivacyMode) presenceData.details = strings.viewAPage;
			else {
				const data = JSON.parse(
					document.querySelector("script[type='application/ld+json']")
						.textContent
				);

				presenceData.details = strings.viewCategory;
				presenceData.state =
					pathname.split("/")[2] !== "collection"
						? pathname.split("/")[2][0].toUpperCase() +
						  pathname.split("/")[2].substring(1) // to Upper Case the first letter
						: data[0]["@type"] === "CollectionPage"
						? data[0].name
						: null;

				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = strings.viewCategory;

				if (useTimestamps) presenceData.startTimestamp = browsingTimestamp;

				if (useButtons) {
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}
			break;
		}

		/* DIRECT PAGE (Page des chaines en direct)

		(https://www.rtlplay.be/rtlplay/direct/tvi)*/
		case (hostname === "www.rtlplay.be" &&
			["direct"].includes(pathname.split("/")[2])) ||
			(hostname === "www.radiocontact.be" &&
				["player"].includes(pathname.split("/")[1])): {
			switch (true) {
				case hostname === "www.rtlplay.be": {
					if (exist("div.playerui__adBreakInfo")) {
						presenceData.smallImageKey = ["fr-FR"].includes(lang)
							? LargeAssets.AdFr
							: LargeAssets.AdEn;
						presenceData.smallImageText = strings.watchingAd;
					} else if (exist("i.playerui__icon--name-play")) {
						// State paused
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = strings.pause;
					} else if (exist("div.playerui__liveStat--deferred")) {
						// State deferred
						presenceData.smallImageKey = LargeAssets.Deferred;
						presenceData.smallImageText = strings.deferred;
					} else {
						// State live
						presenceData.smallImageKey = LargeAssets.LiveAnimated;
						presenceData.smallImageText = strings.live;
					}

					if (usePrivacyMode) {
						presenceData.details = strings.watchingLive;
						presenceData.largeImageKey = LargeAssets.Logo;
					} else {
						if (
							!useChannelName &&
							document
								.querySelector("li[aria-current='true'] > a > div > h2")
								.textContent.toLowerCase() !== "aucune donnée disponible" &&
							!["contact", "bel"].includes(pathname.split("/")[3]) // Radio show name are not relevant
						) {
							presenceData.name = document.querySelector(
								"li[aria-current='true'] > a > div > h2"
							).textContent;
						} else
							presenceData.name = getChannel(pathname.split("/")[3]).channel;

						presenceData.type = getChannel(pathname.split("/")[3]).type;

						presenceData.details = strings.watchingLive;
						presenceData.state = document.querySelector(
							"li[aria-current='true'] > a > div > h2"
						).textContent;

						if (["contact", "bel"].includes(pathname.split("/")[3])) {
							/* Songs played in the livestream are the same as the audio radio ones but with video clips
							Fetch the data from the Radioplayer API. It is used on the official radio contact and bel rtl websites */
							const url = ["bel"].includes(pathname.split("/")[3])
									? "https://core-search.radioplayer.cloud/056/qp/v4/events/?rpId=6" /* Bel RTL */
									: "https://core-search.radioplayer.cloud/056/qp/v4/events/?rpId=1" /* Radio Contact */,
								response = await fetch(url),
								dataString = await response.text(),
								media = JSON.parse(dataString);

							if (media.results.now.type === "PE_E") {
								// When a song is played
								presenceData.largeImageKey = media.results.now.songArtURL; // Song cover art are always square so we don't need to generate a thumbnail
								presenceData.largeImageText = `${media.results.now.name} - ${media.results.now.artistName}`;
							} else {
								// When we don't have a song, we simply show the radio name as the show name is already displayed in state
								presenceData.largeImageKey = getChannel(
									pathname.split("/")[3]
								).logo;
								presenceData.largeImageText = getChannel(
									pathname.split("/")[3]
								).channel;
							}
						} else {
							presenceData.largeImageKey = getChannel(
								pathname.split("/")[3]
							).logo;
							presenceData.largeImageText = getChannel(
								pathname.split("/")[3]
							).channel;
						}

						if (useTimestamps && exist("span.playerui__controls__stat__time")) {
							// Radio livestream doesn't have stat time
							[presenceData.startTimestamp, presenceData.endTimestamp] =
								presence.getTimestamps(
									presence.timestampFromFormat(
										document
											.querySelector("span.playerui__controls__stat__time")
											.textContent.split("/")[0]
											.trim()
									),
									presence.timestampFromFormat(
										document
											.querySelector("span.playerui__controls__stat__time")
											.textContent.split("/")[1]
											.trim()
									)
								);
						} else if (exist("span.playerui__controls__stat__time")) {
							presenceData.largeImageText += ` - ${Math.round(
								presence.timestampFromFormat(
									document
										.querySelector("span.playerui__controls__stat__time")
										.textContent.split("/")[1]
										.trim()
								) / 60
							)} min`;
						}
						if (useButtons) {
							presenceData.buttons = [
								{
									label: strings.buttonWatchStream,
									url: href, // We are not redirecting directly to the raw video stream, it's only the media page
								},
							];
						}
					}
					break;
				}
				case hostname === "www.radiocontact.be": {
					presenceData.name = getChannel("contact").channel;
					presenceData.type = getChannel("contact").type;

					if (exist('button[aria-label="stop"]')) {
						presenceData.smallImageKey = LargeAssets.Listening;
						presenceData.smallImageText = strings.listeningMusic;
					} else {
						presenceData.smallImageKey = Assets.Stop;
						presenceData.smallImageText = strings.pause;
					}

					if (!usePrivacyMode) {
						// Fetch the data from the API
						const response = await fetch(
								"https://core-search.radioplayer.cloud/056/qp/v4/events/?rpId=1"
							), // Website backend use radioplayer api
							dataString = await response.text(),
							data = JSON.parse(dataString);

						if (data.results.now.type === "PE_E") {
							// When a song is played
							presenceData.details = data.results.now.name;
							presenceData.state = data.results.now.artistName;
							presenceData.largeImageKey = await getThumbnail(
								data.results.now.songArtURL
							);
						} else {
							// When there's no song and only the show
							presenceData.details = data.results.pis[0].programmeName;
							presenceData.state = data.results.pis[0].programmeDescription;
							presenceData.largeImageKey = await getThumbnail(
								data.results.pis[0].imageUrl
							);
						}

						presenceData.largeImageText = getChannel("contact").channel;

						if (useButtons) {
							presenceData.buttons = [
								{
									label: strings.buttonListenAlong,
									url: href, // We are not redirecting directly to the raw video stream, it's only the media page
								},
							];
						}
					}
					break;
				}
			}
			break;
		}

		/* MEDIA PLAYER PAGE (Lecteur video)

		(https://www.rtlplay.be/rtlplay/player/75e9a91b-29d1-4856-be8c-0b3532862404) */
		case ["player"].includes(pathname.split("/")[2]): {
			const {
				mediaName = document.querySelector("h1.lfvp-player__title").textContent,
				seasonNumber,
				episodeNumber,
				episodeName,
			} = (
				document
					.querySelector("h1.lfvp-player__title")
					?.textContent.match(
						/^(?<mediaName>.*?)\sS(?<seasonNumber>\d+)\sE(?<episodeNumber>\d+)\s(?<episodeName>.*)$/
					) || {}
			).groups || {};
			let isPaused = false;
			presenceData.largeImageKey = LargeAssets.Logo; // Intializing default

			if (usePrivacyMode) {
				presenceData.details = episodeName
					? strings.watchingShow
					: strings.watchingMovie;

				presenceData.smallImageKey = LargeAssets.Privacy;
				presenceData.smallImageText = strings.privacy;
			} else {
				// Media Infos
				if (usePresenceName) presenceData.name = mediaName;

				presenceData.details = mediaName;
				presenceData.state = episodeName
					? `S${seasonNumber} E${episodeNumber} - ${episodeName}`
					: strings.watchingMovie;

				if (seasonNumber && episodeNumber)
					presenceData.largeImageText = `${strings.season} ${seasonNumber} - ${strings.episode} ${episodeNumber}`;

				// Progress Bar / Timestamps
				if (useTimestamps) {
					const video = document.querySelector("video");
					if (video) {
						// Getting timestamps directly from video
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(video as HTMLMediaElement);
						isPaused = video.paused;
					} else {
						// Fallback method
						const formattedTimestamps = document
							.querySelector(".playerui__controls__stat__time")
							?.textContent.split("/");
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(
								presence.timestampFromFormat(formattedTimestamps?.[0].trim()),
								presence.timestampFromFormat(formattedTimestamps?.[1].trim())
							);
						isPaused = exist("i.playerui__icon--name-play");
					}
				} else {
					presenceData.largeImageText += ` - ${Math.round(
						presenceData.endTimestamp.valueOf() / 60
					)} min`;
				}

				// Key Art - Poster
				if (usePoster) {
					presenceData.largeImageKey = await getThumbnail(
							document
								.querySelector("#content > script")
								.textContent.match(
									/window\.App\.playerData\s*=\s*\{[\s\S]*?poster:\s*"(.*?)",/
								)[1]
								.replace(/\\u0026/g, "&")
								.replace(/\\/g, "")
						);
				}

				// Key Art - Status
				const ad = exist("div.playerui__adBreakInfo");
				if (isPaused) {
					// State paused
					presenceData.smallImageKey = ad
						? ["fr-FR"].includes(lang)
							? LargeAssets.AdFr
							: LargeAssets.AdEn
						: Assets.Pause;
					presenceData.smallImageText = ad ? strings.watchingAd : strings.pause;
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				} else {
					// State playing
					presenceData.smallImageKey = ad
						? ["fr-FR"].includes(lang)
							? LargeAssets.AdFr
							: LargeAssets.AdEn
						: Assets.Play;
					presenceData.smallImageText = ad ? strings.watchingAd : strings.play;
				}

				if (useButtons) {
					presenceData.buttons = [
						{
							label: episodeName
								? strings.buttonWatchEpisode
								: strings.buttonWatchMovie,
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}

			break;
		}
		/* MEDIA PAGE (Page de media)

		(https://www.rtlplay.be/rtlplay/salvation~2ab30366-51fe-4b29-a720-5e41c9bd6991) */
		case pathname.split("/")[2].length > 15: {
			

			if (usePrivacyMode) {
				presenceData.details = strings.browsing;
				presenceData.state = strings.viewAPage;
				presenceData.smallImageKey = LargeAssets.Privacy;
				presenceData.smallImageText = strings.privacy;
			} else {
				const summaryElement = document.querySelector("p.detail__description"),
				yearElement = document.querySelector('dd.detail__meta-label[title="Année de production"]'),
				durationElement = document.querySelector('dd.detail__meta-label[title="Durée"]'),
				seasonElement = document.querySelector("dd.detail__meta-label:not([title])"),
				genresArray = document.querySelectorAll("dl:nth-child(1) > dd > a"),
				isMovie = document.querySelector('meta[property="og:type"]').getAttribute("content").includes("movie");

				let subtitle = isMovie ? strings.movie : strings.tvshow;
				subtitle += yearElement ? ` - ${yearElement.textContent}` : ""; // Add Release Year
				subtitle += seasonElement && !isMovie ? ` - ${seasonElement.textContent}` : ""; // Add amount of seasons
				subtitle += durationElement ? ` - ${durationElement.textContent}` : ""; // Add Duration

				for (
					const element of genresArray // Add Genres
				) {
					subtitle += ` - ${
						element.textContent
					}`;
				}

				presenceData.details = document.querySelector("h1.detail__title").textContent; // Title
				presenceData.state = subtitle;

				presenceData.largeImageText = summaryElement ? limitText(summaryElement.textContent) : subtitle; // Summary if available

				presenceData.smallImageKey = LargeAssets.Binoculars;
				presenceData.smallImageText = strings.browsing;

				if (usePoster) {
					presenceData.largeImageKey = LargeAssets.Logo; // Temp placeholder
					presenceData.largeImageKey = await getThumbnail(
						document.querySelector("img.detail__poster")?.getAttribute("src")
					);
				}

				if (useButtons) {
					presenceData.buttons = [
						{
							label: strings.buttonViewPage,
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}
			break;
		}
		default: {
			presenceData.details = strings.viewAPage;
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
