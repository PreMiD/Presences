const presence = new Presence({
		clientId: "816042675626442783",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
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

type VideoData = {
	paused: boolean;
	currentTime: number;
	duration: number;
};
let iFrameVideo: VideoData;
presence.on("iFrameData", (videoData: VideoData) => {
	iFrameVideo = videoData;
});

const paths = {
	async "/watch"(presenceData: PresenceData, buttons: boolean) {
		presenceData.details =
			document.querySelector<HTMLAnchorElement>(".now2 .c a")?.textContent ||
			"Unknown title";
		presenceData.state =
			document
				.querySelector<HTMLElement>(".now2 .c")
				?.lastChild?.textContent?.match(/\s*-\s*(.+)/)[1] || "Unknown episode";

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Current Episode",
					url: window.location.href,
				},
			];

			const link =
				document.querySelector<HTMLAnchorElement>(".now2 > div > a")?.href;
			if (link) {
				presenceData.buttons.push({
					label: "Episode List",
					url: link,
				});
			}
		}

		if (iFrameVideo) {
			const video = iFrameVideo;

			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;

			if (!video.paused) {
				const [startTimestamp, endTimestamp] = presence.getTimestamps(
					video.currentTime,
					video.duration
				);
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;
			}

			return !video.paused;
		}
	},
	"/search"(presenceData: PresenceData) {
		presenceData.state = "Searching...";
		presenceData.smallImageKey = Assets.Search;

		let searchQuery = new URLSearchParams(window.location.search).get("q");

		if (searchQuery) {
			if (searchQuery.length > 18)
				searchQuery = `${searchQuery.substring(0, 18)}…`;

			presenceData.details = `"${searchQuery}"`;
		}
	},
	"/detail"(presenceData: PresenceData) {
		const title = document.querySelector<HTMLHeadingElement>(
			".infobox .infoboxc .infodesbox .infodes h1"
		)?.textContent;

		if (title) {
			presenceData.state = "Viewing info...";
			presenceData.details = title;
		} else presenceData.state = "Viewing info for a title...";
	},
	"/animeheaven.eu"(presenceData: PresenceData) {
		presenceData.state = "Viewing front page...";
	},
	"/anime-list"(presenceData: PresenceData) {
		presenceData.details = "Latest Anime";
	},
	"/dubbed-anime"(presenceData: PresenceData) {
		presenceData.details = "Latest Dubbed Anime";
	},
	"/anime-series"(presenceData: PresenceData) {
		presenceData.details = "Anime Series";
	},
	"/anime-movies"(presenceData: PresenceData) {
		presenceData.details = "Anime Movies";
	},
	"/ongoing"(presenceData: PresenceData) {
		presenceData.details = "Ongoing Anime";
	},
	"/popular"(presenceData: PresenceData) {
		presenceData.details = "Popular Anime";
	},
	"/schedule"(presenceData: PresenceData) {
		presenceData.details = "Anime Schedule";
	},
	"/"(presenceData: PresenceData) {
		presenceData.state = "Viewing landing page...";
	},
};

presence.on("UpdateData", async () => {
	const buttons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/K5IdObW.png",
			state: "Browsing...",
			startTimestamp: browsingTimestamp,
		};

	let playback = true;
	for (const [path, setPresence] of Object.entries(paths)) {
		if (window.location.pathname.toLowerCase().startsWith(path)) {
			const isPlaying = await setPresence(presenceData, buttons);
			if (isPlaying === false) playback = isPlaying;
			break;
		}
	}

	presence.setActivity(presenceData, playback);
});
