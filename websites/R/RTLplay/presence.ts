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
	RTLplay = "https://i.imgur.com/1f5rMxV.png",
	RTLTVi = "https://i.imgur.com/wnjbhCe.png",
	RTLclub = "https://i.imgur.com/8FwZa7m.png",
	RTLplug = "https://i.imgur.com/jfYLcJu.png",
	BelRTL = "https://i.imgur.com/1yZelPm.png",
	Contact = "https://i.imgur.com/ULP7pgr.png",
}

function getChannel(channel: string) {
	switch (true) {
		case channel.includes("tvi"): {
			return {
				channel: "RTL TVi",
				type: "tv",
				logo: Assets.RTLTVi,
			};
		}
		case channel.includes("club"): {
			return {
				channel: "RTL club",
				type: "tv",
				logo: Assets.RTLclub,
			};
		}
		case channel.includes("plug"): {
			return {
				channel: "RTL plug",
				type: "tv",
				logo: Assets.RTLplug,
			};
		}
		case channel.includes("bel"): {
			return {
				channel: "Bel RTL",
				type: "radio",
				logo: Assets.BelRTL,
			};
		}
		case channel.includes("contact"): {
			return {
				channel: "Radio Contact",
				type: "radio",
				logo: Assets.Contact,
			};
		}
		default: {
			return {
				channel,
				type: "tv",
				logo: Assets.RTLplay,
			};
		}
	}
}

function getTitleTrimmed(title: string) {
	switch (true) {
		case /en replay sur RTLplay*/.test(title): {
			return title.split("en replay sur RTLplay")[0].trim();
		}
		case /sur RTLplay*/.test(title): {
			return title.split("sur RTLplay")[0].trim();
		}
		case /:/.test(title): {
			return title.split(":")[0].trim();
		}
		default: {
			return title;
		}
	}
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Animated, // Default
		},
		{ /*hostname,*/ href, pathname } = document.location,
		[privacy, time, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<number>("buttons"),
		]);

	switch (true) {
		/* Main page 
	Page principale
	(https://www.rtlplay.be/) */
		case pathname === "/" || pathname === "/rtl_play": {
			presenceData.details = (await strings).browsing;

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* Research page 
	Page de recherche
	(https://www.rtlplay.be/recherche) */
		case pathname.split("/")[1] === "recherche": {
			presenceData.details = (await strings).searchSomething;

			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).search;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* My account page 
	Page Mon compte
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

		/* Watching an ad 
	Regarde une publicité
	(Any Player or Livestream page) */
		case document.querySelector(
			"div.sc-3kw2pp-0.jqFqPu.sc-18trp4n-6.sc-bff0kr-0.cQaAsL.lmxHAW > div.sc-18trp4n-3.bVsrtw > h1"
		) !== null: {
			// Check if the tag with the text Publicité exist
			presenceData.details = (await strings).watchingAd;
			presenceData.state = privacy
				? ""
				: getTitleTrimmed(document.querySelector("head > title").textContent); // Content of the title tag

			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = (await strings).viewing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* Live channel page
	Page d'une chaîne en direct
	(ex: https://www.rtlplay.be/tvi/direct) */
		case pathname.split("/")[2] === "direct": {
			presenceData.details = privacy
				? (await strings).watchingLive
				: `${(await strings).watching} ${getChannel(pathname).channel}`;
			presenceData.state = privacy
				? ""
				: `${
						document.querySelector("div.sc-18trp4n-3.bVsrtw > h1").textContent
				  }`; // Content of the first line

			presenceData.largeImageKey = getChannel(pathname).logo;
			presenceData.smallImageKey = Assets.Live;
			presenceData.smallImageText = (await strings).live;

			if (time) {
				if (
					document.querySelector('[type="duration"]').textContent.includes("-")
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

			break;
		}

		/* Channel HUB page
	Page HUB d'une chaîne
	(ex: https://www.rtlplay.be/tvi) */
		case pathname.split("/")[1] === "tvi" ||
			pathname.split("/")[1] === "club" ||
			pathname.split("/")[1] === "plug" ||
			pathname.split("/")[1] === "bel" ||
			pathname.split("/")[1] === "contact": {
			presenceData.details = privacy
				? (await strings).viewAPage
				: (await strings).viewChannel;
			presenceData.state = privacy ? "" : `${getChannel(pathname).channel}`;

			presenceData.largeImageKey = getChannel(pathname).logo;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			break;
		}

		/* Show, Serie, Movie page 
	Page d'une émission, une série, un film
	(ex: https://www.rtlplay.be/chicago-fire-p_8947) */
		case document.querySelector("div.sc-gad7tv-0.enEPMo > span") !== null: {
			presenceData.details = privacy
				? (await strings).viewAPage
				: `${(await strings).viewPage} ${document
						.querySelector("div.sc-gad7tv-0.enEPMo > span")
						.textContent.split("|")[0]
						.trim()}`; // Content trimmed of tags line (ex: Série | Science-fiction | Drame)
			presenceData.state = privacy
				? ""
				: getTitleTrimmed(document.querySelector("head > title").textContent);

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).viewAPage,
						url: href,
					},
				];
			}

			break;
		}

		/* Category (Theme) page 
	Page Catégorie (Thématique)
	(ex: https://www.rtlplay.be/rtl_play/divertissement-rtl-play-f_405)*/
		case document.querySelector("div > header > div > div > h1") !== null ||
			document.querySelector(
				"div > header > div > div > nav > div.sc-nqi6nw-0.cNDqJj > h1"
			) !== null: {
			presenceData.details = (await strings).viewCategory;
			if (document.querySelector("div > header > div > div > h1") !== null) {
				// Responsive webpage hides and shows category name
				presenceData.state = privacy
					? ""
					: document.querySelector("div > header > div > div > h1").textContent;
			} else {
				presenceData.state = privacy
					? ""
					: document.querySelector(
							"div > header > div > div > nav > div.sc-nqi6nw-0.cNDqJj > h1"
					  ).textContent;
			}

			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browsing;

			if (time) presenceData.startTimestamp = browsingTimestamp;

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).buttonViewPage,
						url: href,
					},
				];
			}

			break;
		}

		/* Video player 
	Lecteur vidéo
	(ex: https://www.rtlplay.be/the-power-p_25630/episode-01-c_13062282) */
		case document.querySelector("div.sc-18trp4n-3.bVsrtw > h1") !== null: {
			presenceData.details = privacy
				? (await strings).watchingShow
				: `${(await strings).watching} ${
						document.querySelector("div.sc-18trp4n-3.bVsrtw > h1").textContent
				  }`; // Content of first line
			// If 1st line === 2nd line then it's a Movie, 1st line !== 2nd line then it's a Tv Show
			if (
				document
					.querySelector("div.sc-18trp4n-3.bVsrtw > h1")
					.textContent.toLowerCase() !==
				document
					.querySelector("div.sc-3kw2pp-0.jqFqPu.sc-18trp4n-6.cQaAsL > h2")
					.textContent.toLocaleLowerCase()
			) {
				presenceData.state = privacy
					? ""
					: document.querySelector(
							"div.sc-3kw2pp-0.jqFqPu.sc-18trp4n-6.cQaAsL > h2"
					  ).textContent; // Content of second line
			}

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

			if (time) {
				if (
					document.querySelector('[type="duration"]').textContent.includes("-")
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
						label: (await strings).buttonWatchVideo,
						url: href, // We are not redirecting directly to the raw video stream, it's only the player page
					},
				];
			}

			break;
		}

		// In case we need a default
		default: {
			break;
		}
	}

	if ((presenceData.startTimestamp || presenceData.endTimestamp) && !time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (presenceData.details === "") delete presenceData.details;
	if (presenceData.state === "") delete presenceData.state;

	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
