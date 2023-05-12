const presence = new Presence({
	clientId: "806539630878261328",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
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

			enum Assets {
				Play = "https://i.imgur.com/q57RJjs.png",
				Pause = "https://i.imgur.com/mcEXiZk.png",
				Stop = "https://i.imgur.com/aLYu3Af.png",
				Search = "https://i.imgur.com/B7FxcD4.png",
				Question = "https://i.imgur.com/pIIJniP.png",
				Live = "https://i.imgur.com/0HVm46z.png",
				Reading = "https://i.imgur.com/5m10TTT.png",
				Writing = "https://i.imgur.com/Pa00qZh.png",
				Call = "https://i.imgur.com/PFdbnIf.png",
				Vcall = "https://i.imgur.com/6wG9ZvM.png",
				Downloading = "https://i.imgur.com/ryrDrz4.png",
				Uploading = "https://i.imgur.com/SwNDR5U.png",
				Repeat = "https://i.imgur.com/Ikh95KU.png",
				RepeatOne = "https://i.imgur.com/wh885z3.png",
				Premiere = "https://i.imgur.com/Zf8FSUR.png",
				PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
				Viewing = "https://i.imgur.com/fpZutq6.png",
			}
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/5gunVuc.png",
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
			presenceData.smallImageKey = paused ? "pause" : "play";
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
