const presence = new Presence({
		clientId: "802964241179082822",
	}),
	nextEpisodeElement = document.querySelector<HTMLDivElement>(
		"div#sidebar-anime-info > div.border.rounded.mb-3.p-3:nth-child(2) > div:nth-child(1) > a.ka-url-wrapper"
	),
	previousEpisodeElement = document.querySelector<HTMLDivElement>(
		"div#sidebar-anime-info > div.border.rounded.mb-3.p-3:nth-child(2) > div:nth-child(2) > a.ka-url-wrapper"
	);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewSeries: "general.buttonViewSeries",
			viewMovie: "general.buttonViewMovie",
			watchEpisode: "general.buttonViewEpisode",
			viewing: "general.viewing",
			searching: "general.searchFor",
			episode: "general.episode",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let browsingTimestamp = Math.floor(Date.now() / 1000),
	video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	currentTime: number,
	duration: number,
	paused = true,
	lastPlaybackState: boolean = null,
	playback: boolean,
	currentAnimeTitle: string,
	currentAnimeEpisode: string,
	isMovie: boolean = null,
	episodeNumber,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

interface AppData {
	anime: {
		types?: [
			{
				name: string;
			}
		];
	};
}

function checkIfMovie() {
	!nextEpisodeElement && !previousEpisodeElement
		? (isMovie = true)
		: nextEpisodeElement && !previousEpisodeElement
		? (isMovie = false)
		: !nextEpisodeElement && previousEpisodeElement
		? (isMovie = false)
		: nextEpisodeElement && previousEpisodeElement
		? (isMovie = false)
		: (isMovie = true);

	!isMovie
		? presence.getPageletiable<AppData>("appData").then(appData => {
				isMovie = appData.anime.types?.find(
					(x: { name: string }) => x.name === "Movie"
				)
					? true
					: false;
		  })
		: presence.info(
				"Unable to determine if show is a Movie or TV Series.\nYou may be watching an OVA, or this is broken & you need to contact Striker#1337"
		  );
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
		playback = video.duration !== null ? true : false;

		if (playback) ({ currentTime, duration, paused } = video);

		if (lastPlaybackState !== playback) {
			lastPlaybackState = playback;
			browsingTimestamp = Math.floor(Date.now() / 1000);

			enum Assets {
				Play = "https://i.imgur.com/q57RJjs.png",
				Pause = "https://i.imgur.com/mcEXiZk.png",
				Stop = "https://i.imgur.com/aLYu3Af.png",
				Search = "https://i.imgur.com/B7FxcD4.png",
				Question = "https://i.imgur.com/pIIJniP.png",
				Live = "https://i.imgur.com/0HVm46z.png",
				Reading = "https://i.imgur.com/5m10TTT.png",
				Writing = "https://i.imgur.com/Pa00qZh.png",
				Call = "https://i.imgur.com/y4YKRZG.png",
				Vcall = "https://i.imgur.com/6wG9ZvM.png",
				Downloading = "https://i.imgur.com/ryrDrz4.png",
				Uploading = "https://i.imgur.com/SwNDR5U.png",
				Repeat = "https://i.imgur.com/Ikh95KU.png",
				RepeatOne = "https://i.imgur.com/qkODaWg.png",
				Premiere = "https://i.imgur.com/Zf8FSUR.png",
				PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
				Viewing = "https://i.imgur.com/fpZutq6.png",
			}
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/TGgZkKQ.png",
			startTimestamp: browsingTimestamp,
		},
		[buttons, newLang, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang"),
			presence.getSetting<boolean>("cover"),
		]);

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (
		document.location.pathname.includes("/anime/") &&
		document.location.pathname.includes("/episode")
	) {
		checkIfMovie();
		if (playback && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? strings.pause : strings.play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));
			currentAnimeTitle =
				document.querySelector<HTMLAnchorElement>(
					"a.ka-url-wrapper"
				).textContent;
			[, currentAnimeEpisode] = document.location.pathname
				.split("/")[3]
				.split("-");
			if (!isMovie) {
				if (currentAnimeEpisode[0] === "0")
					episodeNumber = currentAnimeEpisode.replace("0", "");
				else episodeNumber = currentAnimeEpisode;

				currentAnimeEpisode = `${strings.episode} ${episodeNumber}`;

				if (buttons) {
					presenceData.buttons = [
						{
							label: strings.watchEpisode,
							url: document.URL,
						},
						{
							label: strings.viewSeries,
							url: document.URL.replace(document.URL.split("/")[5], ""),
						},
					];
				}

				presenceData.largeImageKey = cover
					? document
							.querySelector<HTMLDivElement>("div.info-header")
							.style.backgroundImage.match(/"(.*)"/)[1]
					: "kaa";
			} else {
				currentAnimeEpisode = "Movie";

				if (buttons) {
					presenceData.buttons = [
						{
							label: strings.watchEpisode,
							url: document.URL,
						},
						{
							label: strings.viewMovie,
							url: document.URL.replace(document.URL.split("/")[5], ""),
						},
					];
				}
			}

			presenceData.details = currentAnimeTitle;
			presenceData.state = currentAnimeEpisode;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			currentAnimeTitle =
				document.querySelector<HTMLAnchorElement>(
					"a.ka-url-wrapper"
				).textContent;
			[, currentAnimeEpisode] = document.location.pathname
				.split("/")[3]
				.split("-");
			if (!isMovie) {
				if (currentAnimeEpisode[0] === "0")
					episodeNumber = currentAnimeEpisode.replace("0", "");
				else episodeNumber = currentAnimeEpisode;

				currentAnimeEpisode = `${strings.episode} ${episodeNumber}`;

				if (buttons) {
					presenceData.buttons = [
						{
							label: strings.watchEpisode,
							url: document.URL,
						},
						{
							label: strings.viewSeries,
							url: document.URL.replace(document.URL.split("/")[5], ""),
						},
					];
				}
			} else {
				currentAnimeEpisode = "Movie";

				if (buttons) {
					presenceData.buttons = [
						{
							label: strings.watchEpisode,
							url: document.URL,
						},
						{
							label: strings.viewMovie,
							url: document.URL.replace(document.URL.split("/")[5], ""),
						},
					];
				}
			}

			presenceData.details = `${currentAnimeTitle}`;
			presenceData.state = `${currentAnimeEpisode}`;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (
		document.location.pathname.includes("/anime/") &&
		document.location.pathname.includes("/episode") === false
	) {
		currentAnimeTitle =
			document.querySelector<HTMLHeadingElement>("h1.title").textContent;
		presenceData.details = strings.viewing;
		presenceData.state = `${currentAnimeTitle}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = cover
			? document
					.querySelector<HTMLElement>("div.poster")
					.style.backgroundImage.match(/"(.*)"/)[1]
			: "kaa";

		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.viewSeries,
					url: document.URL,
				},
			];
		}
	} else if (document.location.pathname.includes("anime-list")) {
		presenceData.details = strings.viewing;
		presenceData.state = "Anime List";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("new-season")) {
		presenceData.details = strings.viewing;
		presenceData.state = "New Season";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("favorites")) {
		presenceData.details = strings.viewing;
		presenceData.state = "Their Favorites";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("watched")) {
		presenceData.details = strings.viewing;
		presenceData.state = "Watch History";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("search")) {
		presenceData.details = strings.searching;
		presenceData.state = document
			.querySelector("#content > h1")
			.textContent.split('"')[1];
		presenceData.smallImageKey = Assets.Search;
		if (cover) {
			presenceData.largeImageKey = document
				.querySelector<HTMLElement>("#content > div > div:nth-child(1) > a")
				.style.background.replace('url("', "")
				.replace('") center center / cover no-repeat', "");
		}
	} else if (document.location.pathname === "/") {
		presenceData.details = strings.viewing;
		presenceData.state = "Home Page";
		presenceData.smallImageKey = Assets.Search;
	} else {
		presenceData.details = strings.viewing;
		presenceData.state = "An Unsupported Page";
	}

	presence.setActivity(presenceData);
});
