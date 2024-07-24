const presence = new Presence({
		clientId: "1240716875927916616",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				search: "general.search",
				searchSomething: "general.searchSomething",
				browsing: "general.browsing",
				viewing: "general.viewing",
				viewPage: "general.viewPage",
				viewAPage: "general.viewAPage",
				viewHome: "general.viewHome",
				viewAccount: "general.viewAccount",
				viewChannel: "general.viewChannel",
				viewCategory: "general.viewCategory",
				viewList: "netflix.viewList",
				buttonViewPage: "general.buttonViewPage",
				watching: "general.watching",
				watchingAd: "youtube.ad",
				watchingLive: "general.watchingLive",
				watchingShow: "general.watchingShow",
				watchingMovie: "general.watchingMovie",
				listeningMusic: "general.listeningMusic",
				buttonWatchStream: "general.buttonWatchStream",
				buttonWatchVideo: "general.buttonWatchVideo",
				buttonWatchEpisode: "general.buttonViewEpisode",
				buttonWatchMovie: "general.buttonWatchMovie",
				buttonListenAlong: "general.buttonListenAlong",
				live: "general.live",
				season: "general.season",
				episode: "general.episode",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	};
let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

const enum Assets {
	Logo = "https://i.imgur.com/KNsI47l.png",
	Animated = "https://imgur.com/uAqZdFg.gif",
	Deferred = "https://i.imgur.com/o69hUKD.gif",
	LiveAnimated = "https://i.imgur.com/6oezfP6.gif",
	Listening = "https://i.imgur.com/9ZFChOG.png",
	RTLPlay = "https://i.imgur.com/1f5rMxV.png",
	RTLTVi = "https://i.imgur.com/wnjbhCe.png",
	RTLClub = "https://i.imgur.com/8FwZa7m.png",
	RTLPlug = "https://i.imgur.com/jfYLcJu.png",
	BelRTL = "https://i.imgur.com/1yZelPm.png",
	Contact = "https://i.imgur.com/ULP7pgr.png",
}

function getChannel(channel: string) {
	switch (true) {
		case channel.includes("tvi"): {
			return {
				channel: "RTL TVi",
				type: ActivityType.Watching,
				logo: Assets.RTLTVi,
			};
		}
		case channel.includes("club"): {
			return {
				channel: "RTL club",
				type: ActivityType.Watching,
				logo: Assets.RTLClub,
			};
		}
		case channel.includes("plug"): {
			return {
				channel: "RTL plug",
				type: ActivityType.Watching,
				logo: Assets.RTLPlug,
			};
		}
		case channel.includes("bel"): {
			return {
				channel: "Bel RTL",
				type: ActivityType.Listening,
				logo: Assets.BelRTL,
			};
		}
		case channel.includes("contact"): {
			return {
				channel: "Radio Contact",
				type: ActivityType.Listening,
				logo: Assets.Contact,
			};
		}
		default: {
			return {
				channel,
				type: ActivityType.Watching,
				logo: Assets.RTLPlay,
			};
		}
	}
}

function exist(selector: string) {
	return document.querySelector(selector) !== null;
}

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

presence.on("UpdateData", async () => {
	const { hostname, href, pathname } = document.location,
		presenceData: PresenceData = {
			name: "RTLplay",
			largeImageKey:
				hostname === "www.radiocontact.be" ? Assets.Contact : Assets.Animated, // Default
			largeImageText: "RTLplay",
			type: ActivityType.Watching,
		},
		[lang, usePresenceName, useChannelName, privacy, time, buttons, poster] =
			await Promise.all([
				presence.getSetting<string>("lang").catch(() => "en"),
				presence.getSetting<boolean>("usePresenceName"),
				presence.getSetting<boolean>("useChannelName"),
				presence.getSetting<boolean>("privacy"),
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<number>("buttons"),
				presence.getSetting<boolean>("usePosterImage"),
			]);

	if (oldLang !== lang) {
		oldLang = lang;
		strings = await getStrings();
	}

	switch (true) {
		/* MAIN PAGE (Page principale)

		(https://www.rtlplay.be/) */
		case pathname === "/" ||
			(pathname.split("/")[1] === "rtlplay" &&
				pathname.split("/").length <= 2): {
			presenceData.details = (await strings).browsing;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (!privacy) {
				presenceData.state = (await strings).viewHome;

				if (time) presenceData.startTimestamp = browsingTimestamp;
			}
			break;
		}

		/* RESEARCH PAGE (Page de recherche)

		(https://www.rtlplay.be/rtlplay/recherche) */
		case pathname.split("/")[2] === "recherche": {
			if (privacy) presenceData.details = (await strings).searchSomething;
			else {
				presenceData.details = JSON.parse(
					document
						.querySelector("ol.search__results")
						?.getAttribute("data-tracking")
				).searchQuery
					? (await strings).search
					: (await strings).searchSomething;
				presenceData.state = JSON.parse(
					document
						.querySelector("ol.search__results")
						?.getAttribute("data-tracking")
				).searchQuery.term;

				if (time) presenceData.startTimestamp = browsingTimestamp;

				if (buttons) {
					presenceData.buttons = [
						{
							label: (await strings).buttonViewPage, // Need to be a general string
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}

			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).search;
			break;
		}

		/* MY LIST (Ma Liste)

		(https://www.rtlplay.be/rtlplay/ma-liste) */
		case ["ma-liste"].includes(pathname.split("/")[2]): {
			presenceData.details = (await strings).browsing;
			presenceData.state = (await strings).viewAPage;
			if (!privacy) {
				presenceData.state = (await strings).viewList;
				if (buttons) {
					presenceData.buttons = [
						{
							label: (await strings).buttonViewPage, // Need to be a general string
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
			if (privacy) presenceData.details = (await strings).viewAPage;
			else {
				const data = JSON.parse(
					document.querySelectorAll("script[type='application/ld+json']")[0]
						.textContent
				);

				presenceData.details = (await strings).viewCategory;
				presenceData.state =
					pathname.split("/")[2] !== "collection"
						? pathname.split("/")[2][0].toUpperCase() +
						  pathname.split("/")[2].substring(1) // to Upper Case the first letter
						: data[0]["@type"] === "CollectionPage"
						? data[0].name
						: null;

				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = (await strings).viewCategory;

				if (time) presenceData.startTimestamp = browsingTimestamp;

				if (buttons) {
					presenceData.buttons = [
						{
							label: (await strings).buttonViewPage, // Need to be a general string
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
			pathname.split("/")[2] === "direct") ||
			(hostname === "www.radiocontact.be" &&
				pathname.split("/")[1] === "player"): {
			switch (true) {
				case hostname === "www.rtlplay.be": {
					if (exist("i.playerui__icon--name-play")) {
						// State paused
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = (await strings).pause;
					} else if (exist("div.playerui__liveStat--deferred")) {
						// State deferred
						presenceData.smallImageKey = Assets.Deferred;
						presenceData.smallImageText = "En Différé"; // Need to be a general string
					} else {
						// State live
						presenceData.smallImageKey = Assets.LiveAnimated;
						presenceData.smallImageText = (await strings).live;
					}

					if (privacy) {
						presenceData.details = (await strings).watchingLive;
						presenceData.largeImageKey = Assets.Logo;
					} else {
						if (
							!useChannelName &&
							document
								.querySelectorAll("li[aria-current='true'] > a > div > h2")[0]
								.textContent.toLowerCase() !== "aucune donnée disponible"
						) {
							presenceData.name = document.querySelectorAll(
								"li[aria-current='true'] > a > div > h2"
							)[0].textContent;
						} else
							presenceData.name = getChannel(pathname.split("/")[3]).channel;

						presenceData.type = getChannel(pathname.split("/")[3]).type;

						presenceData.details = (await strings).watchingLive;
						presenceData.state = document.querySelectorAll(
							"li[aria-current='true'] > a > div > h2"
						)[0].textContent;

						presenceData.largeImageKey = getChannel(
							pathname.split("/")[3]
						).logo;
						presenceData.largeImageText = getChannel(
							pathname.split("/")[3]
						).channel;

						if (time) {
							presenceData.endTimestamp = presence.getTimestamps(
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
							)[1];
						}

						if (buttons) {
							presenceData.buttons = [
								{
									label: (await strings).buttonWatchStream,
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
						presenceData.smallImageKey = Assets.Listening;
						presenceData.smallImageText = strings.listeningMusic;
					} else {
						presenceData.smallImageKey = Assets.Stop;
						presenceData.smallImageText = strings.pause;
					}

					if (!privacy) {
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
							presenceData.largeImageKey = await getShortURL(
								data.results.now.songArtURL
							);
						} else {
							// When there's no song and only the show
							presenceData.details = data.results.pis[0].programmeName;
							presenceData.state = data.results.pis[0].programmeDescription;
							presenceData.largeImageKey = await getShortURL(
								data.results.pis[0].imageUrl
							);
						}

						presenceData.largeImageText = getChannel("contact").channel;

						if (buttons) {
							presenceData.buttons = [
								{
									label: (await strings).buttonListenAlong,
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
		case pathname.split("/")[2] === "player": {
			const {
				mediaName = document.querySelectorAll("h1.lfvp-player__title")[0]
					.textContent,
				seasonNumber = "",
				episodeNumber = "",
				episodeName = "",
			} = (
				document
					.querySelectorAll("h1.lfvp-player__title")[0]
					?.textContent.match(
						/^(?<mediaName>.*?)\sS(?<seasonNumber>\d+)\sE(?<episodeNumber>\d+)\s(?<episodeName>.*)$/
					) || {}
			).groups || {};
			if (privacy) {
				presenceData.details =
					episodeName !== ""
						? (await strings).watchingShow
						: (await strings).watchingMovie;
				presenceData.largeImageKey = Assets.Logo;
			} else {
				if (usePresenceName) presenceData.name = mediaName;

				presenceData.details =
					episodeName !== ""
						? `${(await strings).watching} ${mediaName}`
						: (await strings).watchingMovie;
				presenceData.state = episodeName !== "" ? episodeName : mediaName;

				if (poster) {
					presenceData.largeImageKey = await getShortURL(
						document
							.querySelector("#content > script")
							.textContent.match(
								/window\.App\.playerData\s*=\s*\{[\s\S]*?poster:\s*"(.*?)",/
							)[1]
							.replace(/\\u0026/g, "&")
							.replace(/\\/g, "")
					);
				}

				if (seasonNumber && episodeNumber) {
					presenceData.largeImageText = `${
						(await strings).season
					} ${seasonNumber} - ${(await strings).episode} ${episodeNumber}`;
				}

				if (time) {
					presenceData.endTimestamp = presence.getTimestamps(
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
					)[1];
				}

				if (buttons) {
					presenceData.buttons = [
						{
							label:
								episodeName !== ""
									? strings.buttonWatchEpisode
									: (await strings).buttonWatchMovie, // Need to be a general string
							url: href, // We are not redirecting directly to the raw video stream, it's only the media page
						},
					];
				}
			}

			if (exist("i.playerui__icon--name-play")) {
				// State paused
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
			} else {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = (await strings).play;
			}
			break;
		}
		/* MEDIA PAGE (Page de media)

		(https://www.rtlplay.be/rtlplay/salvation~2ab30366-51fe-4b29-a720-5e41c9bd6991) */
		case pathname.split("/")[2].length > 15: {
			let subtitle = document.querySelector(
				'dd.detail__meta-label[title="Année de production"]'
			)
				? document.querySelector(
						'dd.detail__meta-label[title="Année de production"]'
				  ).textContent
				: ""; // Get Release Year
			subtitle += document.querySelector('dd.detail__meta-label[title="Durée"]')
				? ` - ${
						document.querySelector('dd.detail__meta-label[title="Durée"]')
							.textContent
				  }`
				: ""; // Get Duration
			for (
				let i = 0;
				document.querySelectorAll("dl:nth-child(1) > dd > a").length > i;
				i++ // Get Genres
			) {
				subtitle += ` - ${
					document.querySelectorAll("dl:nth-child(1) > dd > a")[i].textContent
				}`;
			}

			presenceData.details = (await strings).viewPage;
			presenceData.state =
				document.querySelectorAll("h1.detail__title")[0].textContent;

			presenceData.largeImageText = subtitle;

			if (poster) {
				presenceData.largeImageKey = await getShortURL(
					document.querySelectorAll("img.detail__poster")[0].getAttribute("src")
				);
			}

			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = (await strings).viewAPage;
			break;
		}
		default: {
			presenceData.details = (await strings).viewAPage;
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
