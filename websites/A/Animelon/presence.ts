const presence = new Presence({
	clientId: "806539630878261328",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/Animelon/assets/logo.png",
}
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewSeries: "general.buttonViewSeries",
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
	currentAnimeWatching: string[],
	currentAnimeTitle: string,
	currentAnimeEpisode: string,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
		playback = video.duration ? true : false;

		if (playback) ({ currentTime, duration, paused } = video);

		if (lastPlaybackState !== playback) {
			lastPlaybackState = playback;
			browsingTimestamp = Math.floor(Date.now() / 1000);
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[buttons, newLang] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang").catch(() => "en"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (document.location.pathname.includes("/video/")) {
		if (playback === true && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused ? strings.pause : strings.play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));
			currentAnimeWatching = document.title
				.replace(" - Animelon", "")
				.split(" Episode ");
			[currentAnimeTitle] = currentAnimeWatching;
			currentAnimeEpisode = `Episode ${currentAnimeWatching[1]}`;

			presenceData.details = `${currentAnimeTitle}`;
			presenceData.state = `${currentAnimeEpisode}`;

			if (buttons) {
				presenceData.buttons = [
					{
						label: strings.watchEpisode,
						url: document.URL,
					},
					{
						label: strings.viewSeries,
						url: `https://animelon.com/series/${encodeURI(currentAnimeTitle)}`,
					},
				];
			}

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			currentAnimeWatching = document.title
				.replace(" - Animelon", "")
				.split(" Episode ");
			[currentAnimeTitle] = currentAnimeWatching;
			currentAnimeEpisode = `Episode ${currentAnimeWatching[1]}`;

			presenceData.details = `${currentAnimeTitle}`;
			presenceData.state = `${currentAnimeEpisode}`;

			if (buttons) {
				presenceData.buttons = [
					{
						label: strings.watchEpisode,
						url: document.URL,
					},
					{
						label: strings.viewSeries,
						url: `https://animelon.com/series/${encodeURI(currentAnimeTitle)}`,
					},
				];
			}

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (document.location.pathname.includes("/series/")) {
		presenceData.details = "Browsing...";
		currentAnimeTitle = document.title.replace(" - Animelon", "");
		presenceData.state = currentAnimeTitle;
		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.viewSeries,
					url: document.URL,
				},
			];
		}
	} else presenceData.details = "Browsing...";

	presence.setActivity(presenceData);
});
