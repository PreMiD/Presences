const presence = new Presence({
	clientId: "1136251242822238262",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/aniwave/assets/logo.png",
}

let video = {
	exists: false,
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: {
		exists: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};
	const [showCover, timestamps, joinButton, buttons] = await Promise.all([
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("watch2getherJoinRoomButton"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, href } = document.location;

	switch (true) {
		case pathname.includes("/watch/"):
		case video.exists: {
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				),
				coverArt =
					document.querySelector<HTMLImageElement>("#w-info img")?.src ??
					document
						.querySelector('[class="anime-poster"]')
						?.querySelector("img")
						?.getAttribute("src") ??
					document
						.querySelector('[class="row"]')
						?.querySelector("img")
						?.getAttribute("src"),
				seasonNumber = document.querySelector(".seasons.swiper-wrapper")
					? String(
							Array.from(
								document.querySelector(".seasons.swiper-wrapper").children
							).findIndex(x => x.className.includes(" active")) + 1
					  )
					: "",
				episodeNumber =
					document
						.querySelector("#w-servers .tip > div > b")
						?.textContent?.match(/[1-9]{1}[0-9]{0,}/)?.[0] ??
					document
						.querySelector('a[class*="active"]')
						?.textContent?.match(/[1-9]{1}[0-9]{0,}/)?.[0] ??
					document
						.querySelector('[class="item ep-item active"]')
						?.textContent?.match(/[1-9]{1}[0-9]{0,}/)?.[0],
				episodeName = document.querySelector(
					"li > a.active > .d-title"
				)?.textContent;

			presenceData.details =
				document.querySelector("#w-info .title")?.textContent ??
				document.querySelector('[class="film-name dynamic-name"]')
					?.textContent ??
				document.querySelector('[class="title"]')?.textContent ??
				"Undefined";
			presenceData.state =
				seasonNumber && episodeNumber
					? `S${seasonNumber}:E${episodeNumber}`
					: !episodeNumber && seasonNumber && !episodeName
					? `Season ${seasonNumber}`
					: !seasonNumber && !episodeNumber && episodeName
					? episodeName
					: !seasonNumber && episodeNumber && !episodeName
					? `Episode ${episodeNumber}`
					: !seasonNumber && episodeNumber && episodeName
					? `Episode ${episodeNumber} (${episodeName})`
					: href.endsWith("Movie")
					? "Movie"
					: "Undefined";

			if (coverArt && showCover) presenceData.largeImageKey = coverArt;

			if (video.exists) {
				presenceData.buttons = [
					{
						label: "Watch Video",
						url: href,
					},
				];

				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused ? "Paused" : "Playing";
				if (timestamps) {
					presenceData.startTimestamp = startTimestamp;
					presenceData.endTimestamp = endTimestamp;
				}

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else {
				presenceData.buttons = [
					{
						label: "View Anime",
						url: href,
					},
				];
			}
			break;
		}

		case pathname.includes("/watch2gether/room/"): {
			const coverArt =
				document.querySelector<HTMLImageElement>(".anime-info img")?.src;

			presenceData.details = "In a watch2gether room, watching";
			presenceData.state = `${
				document.querySelector(".name.d-title").textContent
			} • ${document.querySelector(".dot.ep").textContent}`;

			if (coverArt && showCover) presenceData.largeImageKey = coverArt;

			presenceData.smallImageKey = Assets.Live;
			presenceData.smallImageText = "Live";

			if (joinButton) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: href,
					},
				];
			}
			break;
		}
		default: {
			const pages: Record<string, PresenceData> = {
				"/ova": {
					details: "Browsing anime OVAs",
				},
				"/ona": {
					details: "Browsing anime ONAs",
				},
				"/tv": {
					details: "Browsing anime tv series",
				},
				"/movie": {
					details: "Browsing anime movies",
				},
				"/special": {
					details: "Browsing anime specials",
				},
				"/music": {
					details: "Browsing anime music",
				},
				"/newest": {
					details: "Browsing newest anime",
				},
				"/trending": {
					details: "Browsing trending anime",
				},
				"/added": {
					details: "Browsing recently added anime",
				},
				"/updated": {
					details: "Browsing recently updated anime",
				},
				"/ongoing": {
					details: "Browsing ongoing anime",
				},
				"/watch-list": {
					details: "Browsing their watchlist",
				},
				"/user/": {
					details: "Checking their user settings",
				},
				"/genre/": {
					details: `Browsing ${
						document
							.querySelector("title")
							?.textContent?.split("Anime")?.[0]
							?.toLowerCase() ?? pathname.split("/")[2]?.toLowerCase()
					} anime`,
				},
				"/az-list/": {
					details: `Browsing anime that start with: ${pathname.split("/")[2]}`,
				},
				"/country/": {
					details: `Browsing anime from ${
						document.querySelector("title")?.textContent?.split("Anime")?.[0] ??
						pathname.split("/")[2]
					}`,
				},
			};
			for (const [path, data] of Object.entries(pages)) {
				if (pathname.includes(path)) {
					presenceData = { ...presenceData, ...data };
					if (!presenceData.buttons) {
						presenceData.buttons = [
							{
								label: "Browse Animes",
								url: href,
							},
						];
					}
				}
			}
			if (!presenceData.details) {
				presenceData.details = "Browsing...";
				presenceData.smallImageKey = Assets.Search;
			}
			break;
		}
	}

	if (presenceData.details.includes("their") && presenceData.buttons)
		delete presenceData.buttons;
	if (!buttons && !joinButton && presenceData.buttons)
		delete presenceData.buttons;
	presence.setActivity(presenceData);
});
