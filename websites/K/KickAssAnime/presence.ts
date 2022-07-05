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
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "kaa",
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

				currentAnimeEpisode = `Episode ${episodeNumber}`;

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

				currentAnimeEpisode = `Episode ${episodeNumber}`;

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
		presenceData.details = "Looking at:";
		presenceData.state = `${currentAnimeTitle}`;
		presenceData.smallImageKey = "searching";
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
		presenceData.details = "Looking at:";
		presenceData.state = "Anime List";
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.includes("new-season")) {
		presenceData.details = "Looking at:";
		presenceData.state = "New Season";
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.includes("favorites")) {
		presenceData.details = "Looking at:";
		presenceData.state = "Their Favorites";
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname.includes("watched")) {
		presenceData.details = "Looking at:";
		presenceData.state = "Watch History";
		presenceData.smallImageKey = "searching";
	} else if (document.location.pathname === "/") {
		presenceData.details = "Looking at:";
		presenceData.state = "Home Page";
		presenceData.smallImageKey = "searching";
	} else {
		presenceData.details = "Looking at:";
		presenceData.state = "An Unsupported Page";
	}

	presence.setActivity(presenceData);
});
