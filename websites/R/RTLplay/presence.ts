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
				// Non-existent, should be general strings
				deferred: "general.deferred",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	};
let oldLang: string = null,
	strings: Awaited<ReturnType<typeof getStrings>>;

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/logo.png",
	Animated = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/0.gif",
	Deferred = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/1.gif",
	LiveAnimated = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/2.gif",
	Listening = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/3.png",
	AdEn = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/4.png",
	AdFr = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/5.png",
	RTLPlay = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/6.png",
	RTLTVi = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/7.png",
	RTLClub = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/8.png",
	RTLPlug = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/9.png",
	BelRTL = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/10.png",
	Contact = "https://cdn.rcd.gg/PreMiD/websites/R/RTLplay/assets/11.png",
}

function getAdditionnalStrings(lang: string) {
	switch (true) {
		case ["fr-FR"].includes(lang): {
			strings.deferred = "En Différé";
			break;
		}
		case ["nl-NL"].includes(lang): {
			strings.deferred = "Uitgestelde";
			break;
		}
		case ["de-DE"].includes(lang): {
			strings.deferred = "Zeitversetzt";
			break;
		}
		default: {
			strings.deferred = "Deferred";
			break;
		}
	}
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

// Adapted veryCrunchy's function from YouTube Presence https://github.com/PreMiD/Presences/pull/8000
async function getThumbnail(src: string): Promise<string> {
	return new Promise(resolve => {
		const img = new Image(),
			wh = 320,
			borderThickness = 15, // Thickness of the gradient border
			cropLeftRightPercentage = 0.14, // Percentage to crop from left and right for landscape mode (e.g., 0.1 for 10%)
			cropTopBottomPercentage = 0.025; // Percentage to crop from top and bottom for portrait mode (e.g., 0.1 for 10%)
		img.crossOrigin = "anonymous";
		img.src = src;

		img.onload = function () {
			let croppedWidth,
				croppedHeight,
				cropX = 0,
				cropY = 0;

			if (img.width > img.height) {
				// Landscape mode: crop left and right
				const cropLeftRight = img.width * cropLeftRightPercentage;
				croppedWidth = img.width - 2 * cropLeftRight;
				croppedHeight = img.height;
				cropX = cropLeftRight;
			} else {
				// Portrait mode: crop top and bottom
				const cropTopBottom = img.height * cropTopBottomPercentage;
				croppedWidth = img.width;
				croppedHeight = img.height - 2 * cropTopBottom;
				cropY = cropTopBottom;
			}

			const isLandscape = croppedWidth >= croppedHeight;
			let newWidth, newHeight, offsetX, offsetY;

			if (isLandscape) {
				newWidth = wh;
				newHeight = (wh / croppedWidth) * croppedHeight;
				offsetX = 0;
				offsetY = (wh - newHeight) / 2;
			} else {
				newHeight = wh;
				newWidth = (wh / croppedHeight) * croppedWidth;
				offsetX = (wh - newWidth) / 2;
				offsetY = 0;
			}

			const tempCanvas = document.createElement("canvas");
			tempCanvas.width = wh;
			tempCanvas.height = wh;
			const ctx = tempCanvas.getContext("2d");

			// Fill the canvas with the background color
			ctx.fillStyle = "#172e4e";
			ctx.fillRect(0, 0, wh, wh);

			// Create the gradient
			const gradient = ctx.createLinearGradient(0, 0, wh, 0);
			gradient.addColorStop(0, "rgba(245,3,26,1)");
			gradient.addColorStop(0.5, "rgba(63,187,244,1)");
			gradient.addColorStop(1, "rgba(164,215,12,1)");

			// Draw the gradient borders
			if (isLandscape) {
				// Top border
				ctx.fillStyle = gradient;
				ctx.fillRect(0, offsetY - borderThickness, wh, borderThickness);

				// Bottom border
				ctx.fillStyle = gradient;
				ctx.fillRect(0, offsetY + newHeight, wh, borderThickness);
			} else {
				// Create a vertical gradient for portrait mode
				const verticalGradient = ctx.createLinearGradient(0, 0, 0, wh);
				verticalGradient.addColorStop(0, "rgba(245,3,26,1)");
				verticalGradient.addColorStop(0.5, "rgba(63,187,244,1)");
				verticalGradient.addColorStop(1, "rgba(164,215,12,1)");

				// Left border
				ctx.fillStyle = verticalGradient;
				ctx.fillRect(offsetX - borderThickness, 0, borderThickness, wh);

				// Right border
				ctx.fillStyle = verticalGradient;
				ctx.fillRect(offsetX + newWidth, 0, borderThickness, wh);
			}

			// Draw the cropped image
			ctx.drawImage(
				img,
				cropX,
				cropY,
				croppedWidth,
				croppedHeight,
				offsetX,
				offsetY,
				newWidth,
				newHeight
			);

			resolve(tempCanvas.toDataURL("image/png"));
		};

		img.onerror = function () {
			resolve(src);
		};
	});
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

	if (oldLang !== lang || !strings) {
		oldLang = lang;
		strings = await getStrings();
		getAdditionnalStrings(lang);
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

			if (!privacy) {
				presenceData.state = strings.viewHome;

				if (time) presenceData.startTimestamp = browsingTimestamp;
			}
			break;
		}

		/* RESEARCH PAGE (Page de recherche)

		(https://www.rtlplay.be/rtlplay/recherche) */
		case ["recherche"].includes(pathname.split("/")[2]): {
			if (privacy) presenceData.details = strings.searchSomething;
			else {
				presenceData.details = JSON.parse(
					document
						.querySelector("ol.search__results")
						?.getAttribute("data-tracking")
				).searchQuery
					? strings.search
					: strings.searchSomething;
				presenceData.state = JSON.parse(
					document
						.querySelector("ol.search__results")
						?.getAttribute("data-tracking")
				).searchQuery.term;

				if (time) presenceData.startTimestamp = browsingTimestamp;

				if (buttons) {
					presenceData.buttons = [
						{
							label: strings.buttonViewPage, // Need to be a general string
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
			if (!privacy) {
				presenceData.state = strings.viewList;
				if (buttons) {
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
			if (privacy) presenceData.details = strings.viewAPage;
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

				if (time) presenceData.startTimestamp = browsingTimestamp;

				if (buttons) {
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
							? Assets.AdFr
							: Assets.AdEn;
						presenceData.smallImageText = strings.watchingAd;
					} else if (exist("i.playerui__icon--name-play")) {
						// State paused
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = strings.pause;
					} else if (exist("div.playerui__liveStat--deferred")) {
						// State deferred
						presenceData.smallImageKey = Assets.Deferred;
						presenceData.smallImageText = strings.deferred;
					} else {
						// State live
						presenceData.smallImageKey = Assets.LiveAnimated;
						presenceData.smallImageText = strings.live;
					}

					if (privacy) {
						presenceData.details = strings.watchingLive;
						presenceData.largeImageKey = Assets.Logo;
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

						if (time && exist("span.playerui__controls__stat__time")) {
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
						if (buttons) {
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

						if (buttons) {
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
			if (privacy) {
				presenceData.details = !episodeName
					? strings.watchingShow
					: strings.watchingMovie;
				presenceData.largeImageKey = Assets.Logo;
			} else {
				if (usePresenceName) presenceData.name = mediaName;

				presenceData.details = episodeName
					? `${usePresenceName ? "" : strings.watching} ${mediaName}`
					: strings.watchingMovie;
				presenceData.state = episodeName || mediaName;

				if (poster) {
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

				if (seasonNumber && episodeNumber)
					presenceData.largeImageText = `${strings.season} ${seasonNumber} - ${strings.episode} ${episodeNumber}`;

				if (time) {
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
				} else {
					presenceData.largeImageText += ` - ${Math.round(
						presence.timestampFromFormat(
							document
								.querySelector("span.playerui__controls__stat__time")
								.textContent.split("/")[1]
								.trim()
						) / 60
					)} min`;
				}
				if (buttons) {
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

			const ad = exist("div.playerui__adBreakInfo");
			if (exist("i.playerui__icon--name-play")) {
				// State paused
				presenceData.smallImageKey = ad
					? ["fr-FR"].includes(lang)
						? Assets.AdFr
						: Assets.AdEn
					: Assets.Pause;
				presenceData.smallImageText = ad ? strings.watchingAd : strings.pause;
			} else {
				presenceData.smallImageKey = ad
					? ["fr-FR"].includes(lang)
						? Assets.AdFr
						: Assets.AdEn
					: Assets.Play;
				presenceData.smallImageText = ad ? strings.watchingAd : strings.play;
			}
			break;
		}
		/* MEDIA PAGE (Page de media)

		(https://www.rtlplay.be/rtlplay/salvation~2ab30366-51fe-4b29-a720-5e41c9bd6991) */
		case pathname.split("/")[2].length > 15: {
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewAPage;

			if (privacy) presenceData.details = strings.viewAPage;
			else {
				let subtitle = document.querySelector(
					'dd.detail__meta-label[title="Année de production"]'
				)
					? document.querySelector(
							'dd.detail__meta-label[title="Année de production"]'
					  ).textContent
					: ""; // Get Release Year
				subtitle += document.querySelector(
					'dd.detail__meta-label[title="Durée"]'
				)
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

				presenceData.details = strings.viewPage;
				presenceData.state =
					document.querySelector("h1.detail__title").textContent;

				presenceData.largeImageText = subtitle;

				if (poster) {
					presenceData.largeImageKey = await getThumbnail(
						document.querySelector("img.detail__poster").getAttribute("src")
					);
				}

				if (buttons) {
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
