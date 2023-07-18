const presence = new Presence({
		clientId: "804448815942860821",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			buttonViewEpisode: "general.buttonViewEpisode",
			buttonWatchMovie: "general.buttonWatchMovie",
			play: "general.playing",
			pause: "general.paused",
			browsing: "general.browsing",
			viewHome: "general.viewHome",
			viewAMovie: "general.viewAMovie",
			viewASeries: "general.viewASeries",
			watchingSeries: "general.watchingSeries",
			watchingMovie: "general.watchingMovie",
		},
		"es_419"
	);
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Cuevana%203/assets/logo.png",
}

function fullURL(cover: string, hostname: string) {
	const cover2 =
		cover ??
		document
			?.querySelector("article")
			?.querySelector("img")
			?.getAttribute("src");
	if (cover2?.startsWith("/_next")) return `https://${hostname}${cover2}`;
	else if (cover2?.startsWith("//"))
		return `https://${cover2.replace("//", "")}`;
	else if (cover2) return cover2;
	else return Assets.Logo;
}

let iFrameVideo: boolean, videoPaused: boolean, endTimestamp: number;

presence.on(
	"iFrameData",
	(data: {
		iFrameVideo: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		({ iFrameVideo } = data);
		[, endTimestamp] = presence.getTimestamps(data.currentTime, data.duration);
		videoPaused = data.paused;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
		[privacy, thumbnails, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("thumbnails"),
			presence.getSetting<boolean>("buttons"),
		]),
		strings = await getStrings();

	switch (true) {
		case pathname === "/": {
			presenceData.details = strings.viewHome;
			break;
		}
		case pathname.includes("/episodio/"):
		case pathname.includes("/watch/"):
		case pathname.includes("/peliculas-online/"):
		case pathname.includes("episodio/"):
		case pathname.includes("/series-online/"): {
			const isSeries = pathname.includes("/series-online/")
					? true
					: document.querySelector('[class="select-season"]')
					? true
					: false,
				title = document.querySelector('[class="Title"]')?.textContent,
				episodeNumber = document.querySelector('[class="Title"] > span')
					?.textContent
					? document.querySelector('[class="Title"] > span')?.textContent
					: title?.match(/[0-9]{1,}x[0-9]{1,}/gm)?.length ?? 0 !== 0
					? title.match(/[0-9]{1,}x[0-9]{1,}/gm)[0]
					: "";
			presenceData.largeImageKey =
				fullURL(
					document
						.querySelector('[class="Image"]')
						.querySelector("img")
						?.getAttribute("src"),
					hostname
				) ||
				fullURL(
					document.querySelector("figure > img")?.getAttribute("src") ??
						document
							.querySelector('[class="Image"]')
							.querySelector("img")
							?.getAttribute("src") ??
						document
							?.querySelector('[itemprop="image"]')
							?.getAttribute("src") ??
						"",
					hostname
				);
			if (iFrameVideo) {
				delete presenceData.startTimestamp;
				presenceData.details = !privacy
					? title.replace(episodeNumber, "")
					: isSeries
					? strings.watchingSeries
					: strings.watchingMovie;
				presenceData.state =
					episodeNumber &&
					episodeNumber.match(/[0-9]{1,}x[0-9]{1,}/gm)?.length !== 0
						? `S${episodeNumber.split("x")[0]}:E${episodeNumber.split("x")[1]}`
						: "";
				presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = videoPaused
					? strings.pause
					: strings.play;
				if (!videoPaused) presenceData.endTimestamp = endTimestamp;

				if (buttons) {
					presenceData.buttons = isSeries
						? [{ label: strings.buttonViewEpisode, url: href }]
						: [{ label: strings.buttonWatchMovie, url: href }];
				}
			} else {
				presenceData.details = !privacy
					? title.replace(episodeNumber, "")
					: isSeries
					? strings.viewASeries
					: strings.viewAMovie;
				presenceData.state =
					episodeNumber &&
					episodeNumber.match(/[0-9]{1,}x[0-9]{1,}/gm)?.length !== 0
						? `S${episodeNumber.split("x")[0]}:E${episodeNumber.split("x")[1]}`
						: "";
			}
			break;
		}
		default: {
			presenceData.details = strings.browsing;
			break;
		}
	}

	if (privacy && presenceData.state) delete presenceData.state;
	if (!thumbnails && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	presence.setActivity(presenceData);
});
