const presence = new Presence({
		clientId: "1240716875927916616",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		search: "general.search",
		searchSomething: "general.searchSomething",
		browsing: "general.browsing",
		viewing: "general.viewing",
		viewPage: "general.viewPage",
		viewAPage: "general.viewAPage",
		viewAccount: "general.viewAccount",
		viewChannel: "general.viewChannel",
		viewCategory: "general.viewCategory",
		buttonViewPage: "general.buttonViewPage",
		watching: "general.watching",
		watchingAd: "youtube.ad",
		watchingLive: "general.watchingLive",
		watchingShow: "general.watchingShow",
		buttonWatchStream: "general.buttonWatchStream",
		buttonWatchVideo: "general.buttonWatchVideo",
		live: "general.live",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/KNsI47l.png",
	Animated = "https://imgur.com/uAqZdFg.gif",
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

function parseInformations(str: string) {

	const jsonValue = JSON.parse(str);
	switch (true) {
		case jsonValue["@type"] === "BreadcrumbList": {
			if (jsonValue.itemListElement.length === 2) {
				// CATEGORY NAME
				return {
					name: jsonValue.itemListElement[1].item.name
				};
			} else {
				// CONTENT NAME ON CONTENT PAGE
				return {
					name: jsonValue.itemListElement[0].item.name
				};
			}
		}
		case jsonValue["@type"] === "TVEpisode": {
			return {
				name: jsonValue.name,
				season: jsonValue.partOfSeason.seasonNumber,
				episode: jsonValue.episodeNumber,
			};
		}
	}
}
/*
To have a cover art as largeImageKey
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
}*/
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Animated, // Default
			largeImageText: "RTLplay",
			type: ActivityType.Watching,
		},
		{ /*hostname,*/ href, pathname } = document.location,
		[privacy, time, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("buttons"),
		]);

	switch (true) {
		/* MAIN PAGE (Page principale)

	(https://www.rtlplay.be/) */
		case pathname === "/" || pathname === "/rtl_play": {
			presenceData.details = (await strings).browsing;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* RESEARCH PAGE (Page de recherche)

	(https://www.rtlplay.be/recherche) */
		case pathname.split("/")[1] === "recherche": {
			presenceData.details = (await strings).searchSomething;

			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).search;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* ACCOUNT PAGE (Page Mon compte)

	(https://www.rtlplay.be/mon-compte) */
		case pathname.split("/")[1] === "mon-compte": {
			presenceData.details = privacy
				? (await strings).viewAPage
				: (await strings).viewAccount;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).viewPage,
						url: href,
					},
				];
			}

			break;
		}

		// CHANNEL PAGE (Page de chaine)
		case ["tvi", "club", "plug", "bel", "contact"].includes(
			pathname.split("/")[1]
		): {
			const { channel } = getChannel(pathname);
			presenceData.largeImageKey = getChannel(pathname).logo;

			switch (true) {
				/* HUB CHANNEL PAGE (Page HUB d'une chaîne)

				(ex: https://www.rtlplay.be/tvi) */
				default: {
					presenceData.details = privacy
						? (await strings).viewAPage
						: (await strings).viewChannel;
					presenceData.state = privacy ? "" : `${channel}`;

					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = (await strings).browsing;

					if (time) presenceData.startTimestamp = browsingTimestamp;

					break;
				}
				/* LIVE CHANNEL PAGE (Page d'une chaîne en direct)
				aka LIVE VIDEO PLAYER (Player vidéo en direct)

				(ex: https://www.rtlplay.be/tvi/direct) */
				case pathname.split("/")[2] === "direct":
					{
						presenceData.details = privacy
							? (await strings).watchingLive
							: `${(await strings).watching} ${channel}`;
						presenceData.state = privacy
							? ""
							: document.querySelector("div.sc-18trp4n-3.bVsrtw > h1")
									.textContent; // Content of the first line

						presenceData.largeImageKey = getChannel(pathname).logo;
						presenceData.largeImageText = channel;
						presenceData.smallImageKey = Assets.Live;
						presenceData.smallImageText = (await strings).live;
						
						presenceData.type = getChannel(pathname).type;

						if (time) {
							if (
								document
									.querySelector('[type="duration"]')
									.textContent.includes("-")
							) {
								presenceData.endTimestamp = presence.getTimestamps(
									0,
									presence.timestampFromFormat(
										document
											.querySelector('[type="duration"]')
											.textContent.replace("-", "")
									)
								)[1];
							} else {
								presenceData.endTimestamp = presence.getTimestamps(
									presence.timestampFromFormat(
										document.querySelector('[type="currentTime"]').textContent
									),
									presence.timestampFromFormat(
										document.querySelector('[type="duration"]').textContent
									)
								)[1];
							}
						}

						if (buttons) {
							presenceData.buttons = [
								{
									label: (await strings).buttonWatchStream,
									url: href, // We are not redirecting directly to the raw stream, it's only the livestream page
								},
							];
						}
					}

					break;
			}
			break;
		}

		/* MOVIE PAGE & CATEGORY PAGE (Page d'un Film ou d'une Catégorie)
	There's a little difference between a Movie page and a Category page.
	The first one has a Play video button that the other one hasn't

	(ex: https://www.rtlplay.be/chicago-fire-p_8947 and https://www.rtlplay.be/rtl_play/series-rtl-play-f_409) */
		case exist(
			"header > div > div > h1, div.sc-nqi6nw-0.cNDqJj > h1" // Movie name or Category name: Supports mobile and desktop layout
		): {
			presenceData.details = parseInformations(document.querySelector("div > div > div > script").textContent).name;
			/*
			presenceData.state = privacy
				? ""
				: document.querySelector(
						"header > div > div > h1, div.sc-nqi6nw-0.cNDqJj > h1" // Movie name or Category name: Supports mobile and desktop layout
				  ).textContent;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).buttonViewPage,
						url: href,
					},
				];
			}

			if (
				exist("div.sc-q5s88f-0.jzJNis > a > span") // Check if the button Play video exist
			) {
				const tagsLine = document.querySelector(
					"div.sc-gad7tv-0.enEPMo > span" // Tags line (ex: Série | Science-fiction | Drame)
				);
				presenceData.details = privacy
					? (await strings).viewAPage
					: `${(await strings).viewPage} ${
							tagsLine === null ? "" : tagsLine.textContent.split("|")[0].trim()
					  }`;

				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = (await strings).viewAPage;
			} else {
				presenceData.details = (await strings).viewCategory;

				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = (await strings).browsing;
			}
			*/

			
			break;
		}

		/* VIDEO PLAYER (Lecteur vidéo)
	
	(ex: https://www.rtlplay.be/the-power-p_25630/episode-01-c_13062282) */
		case parseInformations(document.querySelectorAll("div > div > div > script")[1].textContent): {
			const firstLine = document.querySelector(
					"div.sc-18trp4n-3.bVsrtw > h1" // Video Player first line
				).textContent,
				secondLine = exist("div.sc-3kw2pp-0.jqFqPu.sc-18trp4n-6.cQaAsL > h2")
					? document.querySelector(
							"div.sc-3kw2pp-0.jqFqPu.sc-18trp4n-6.cQaAsL > h2" // Video Player second line, may hide in mobile layout
					  ).textContent
					: "";
			
			// presenceData.largeImageKey = await getShortURL((document.querySelector("picture > img") as HTMLImageElement).src);
			presenceData.largeImageKey = Assets.Logo;
			if (
				document
					.querySelector("#player-control-playpause")
					.getAttribute("aria-label") === "Lecture"
			) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
			} else {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = (await strings).play;
			}

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).buttonWatchVideo,
						url: href, // We are not redirecting directly to the raw video stream, it's only the player page
					},
				];
			}

			switch (true) {
				case firstLine === "Publicité": {
					presenceData.details = (await strings).watchingAd;
					presenceData.state = privacy
						? ""
						: `${
								secondLine === null
									? ""
									: secondLine.split("commence")[0].trim()
						  }`;

					if (time) presenceData.startTimestamp = browsingTimestamp;
					break;
				}
				default: {
					presenceData.details = privacy
						? (await strings).watchingShow
						: `${(await strings).watching} ${parseInformations(document.querySelector("div > div > div > script").textContent).season}`;
					// If 1st line === 2nd line then it's a Movie, 1st line !== 2nd line then it's a Tv Show
					if (firstLine.toLowerCase() !== secondLine.toLowerCase())
						presenceData.state = privacy ? "" : secondLine; // Content of second line

					if (time) {
						if (
							document
								.querySelector('[type="duration"]')
								.textContent.includes("-")
						) {
							presenceData.endTimestamp = presence.getTimestamps(
								0,
								presence.timestampFromFormat(
									document
										.querySelector('[type="duration"]')
										.textContent.replace("-", "")
								)
							)[1];
						} else {
							presenceData.endTimestamp = presence.getTimestamps(
								presence.timestampFromFormat(
									document.querySelector('[type="currentTime"]').textContent
								),
								presence.timestampFromFormat(
									document.querySelector('[type="duration"]').textContent
								)
							)[1];
						}
					}
					break;
				}
			}

			presenceData.largeImageKey = document.querySelector("meta[property=\"og:image\"]").getAttribute("content");
			break;
		}
		case pathname !== null: {
			presenceData.details = (await strings).viewAPage;
			presenceData.largeImageKey = Assets.Animated;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = (await strings).viewAPage;
			break;
		}
	}

	if ((presenceData.startTimestamp || presenceData.endTimestamp) && !time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	// if (presenceData.details === "") delete presenceData.details;
	// if (presenceData.state === "") delete presenceData.state;

	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
