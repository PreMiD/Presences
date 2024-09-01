interface Video {
	paused: boolean;
	duration: number;
	currentTime: number;
}

const presence = new Presence({
	clientId: "1278837516165713962",
}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
		viewAnime: "general.viewAnime",
		watching: "general.watching",
		episode: "general.episode",
		watchEpisode: "general.buttonViewEpisode",
		anime: "general.anime",
	});

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://animeelysium.com/logo512.png",
}

let video: Video;

presence.on("iFrameData", (msg: Video) => {
	if (!msg) return;
	video = msg;
});


presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	},
		infoTitle = document.querySelector("#root > div > div.bg-\\[\\#212121\\].shadow-lg.rounded-md.transition-all.duration-300.flex-row.mx-auto.w-4\\/6.xl\\:w-9\\/12.lg\\:w-10\\/12.md\\:w-full.sm\\:w-full.xs\\:w-full.h-full.drop-shadow-xl > div > div.w-full.mx-auto > div > div.relative.z-10.w-2\\/3.xs\\:w-full.sm\\:w-full > h2")?.textContent.trim(),
		episodeTitle = document.querySelector("#root > div > div.bg-\\[\\#212121\\].shadow-lg.rounded-md.transition-all.duration-300.flex-row.mx-auto.w-4\\/6.xl\\:w-9\\/12.lg\\:w-10\\/12.md\\:w-full.sm\\:w-full.xs\\:w-full.h-full.drop-shadow-xl > div > div.w-full.h-16.p-2.m-2.bg-\\[\\#181818\\].flex.flex-row.justify-between > div:nth-child(1) > div.text-white.cursor-pointer > span.font-bold")?.textContent.trim(),
		episode = document.querySelector("#root > div > div.bg-\\[\\#212121\\].shadow-lg.rounded-md.transition-all.duration-300.flex-row.mx-auto.w-4\\/6.xl\\:w-9\\/12.lg\\:w-10\\/12.md\\:w-full.sm\\:w-full.xs\\:w-full.h-full.drop-shadow-xl > div > div.w-full.h-16.p-2.m-2.bg-\\[\\#181818\\].flex.flex-row.justify-between > div:nth-child(1) > div.text-white.cursor-pointer > span.text-xs")?.textContent.trim(),
		animeImage = document.querySelector("#root > div > div.bg-\\[\\#212121\\].shadow-lg.rounded-md.transition-all.duration-300.flex-row.mx-auto.w-4\\/6.xl\\:w-9\\/12.lg\\:w-10\\/12.md\\:w-full.sm\\:w-full.xs\\:w-full.h-full.drop-shadow-xl > div > div:nth-child(2) > div.w-4\\/12 > div > div.bg-\\[\\#181818\\].flex.flex-row.mb-2.h-20.items-center.p-2.rounded-md > img")?.getAttribute("src");

	if (window.location.pathname === "/") {
		presenceData.details = `${(await strings).browsing}`;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		presenceData.smallImageText = (await strings).browsing;
		presenceData.smallImageKey = Assets.Viewing;

	} else if (window.location.pathname.startsWith("/info/") && infoTitle) {

		presenceData.details = (await strings).viewAnime;
		presenceData.state = infoTitle;
		presenceData.buttons = [
			{
				label: (await strings).anime,
				url: document.URL,
			},
		];
	} else if (window.location.pathname.startsWith("/watch/") && episodeTitle && episode) {

		const epNum = episode.match(/[0-9]+\.Bölüm/g);

		presenceData.type = ActivityType.Watching;
		presenceData.details = `${(await strings).watching} ${episodeTitle}`;
		if (animeImage) presenceData.largeImageKey = animeImage;
		if (epNum) {
			presenceData.state = `${(await strings).episode} ${epNum[0].split(".")[0]
				}`;
		};
		presenceData.buttons = [
			{
				label: (await strings).watchEpisode,
				url: document.URL,
			},
		];
	} else {
		presenceData.details = `${(await strings).browsing}`;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		presenceData.smallImageText = (await strings).browsing;
		presenceData.smallImageKey = Assets.Viewing;
	};

	if (episode && episodeTitle && video) {
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).paused
			: (await strings).playing;

		if (!video.paused && video.duration) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		}
	};

	presence.setActivity(presenceData);
});
