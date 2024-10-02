const presence = new Presence({
		clientId: "1232944311415603281",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				live: "general.live",
				browse: "general.browsing",
				ad: "youtube.ad",
				watchingLive: "general.watchingLive",
				watchingVid: "general.watchingVid",
				watchStream: "general.buttonWatchStream",
				watchVideo: "general.buttonWatchVideo",
			},
			oldLang
		);
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/CHZZK/assets/0.png",
}

const enum ChzzkAssets {
	Browse = "https://cdn.rcd.gg/PreMiD/websites/C/CHZZK/assets/1.png",
	Live = "https://cdn.rcd.gg/PreMiD/websites/C/CHZZK/assets/2.png",
	Play = "https://cdn.rcd.gg/PreMiD/websites/C/CHZZK/assets/3.png",
	Pause = "https://cdn.rcd.gg/PreMiD/websites/C/CHZZK/assets/4.png",
}

let oldLang: string, strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
	const [newLang, showStreamerLogo, showElapsedTime] = await Promise.all([
		presence.getSetting<string>("lang"),
		presence.getSetting<boolean>("logo"),
		presence.getSetting<boolean>("time"),
	]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
			details: strings.browse,
			largeImageKey: Assets.Logo,
			smallImageKey: ChzzkAssets.Browse,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
		},
		{ pathname, href } = document.location;

	switch (pathname.split("/")[1]) {
		case "video":
		case "live":
			{
				const video = document.querySelector("video");
				if (
					document.querySelector<HTMLElement>("div.ad_info_area")?.offsetParent
				) {
					presenceData.details = strings.ad;
					presenceData.smallImageKey = ChzzkAssets.Play;
					presenceData.smallImageText = strings.play;
				} else {
					const streamerLogo = new URL(
						document.querySelector<HTMLImageElement>(
							"img[class^=video_information_image]"
						).src
					);
					presenceData.details = document.querySelector(
						"h2[class^=video_information_title]"
					);
					presenceData.state = document.querySelector(
						"p[class^=video_information_name]"
					);
					presenceData.largeImageKey = showStreamerLogo
						? streamerLogo.href.replace(streamerLogo.search, "")
						: Assets.Logo;

					if (pathname.startsWith("/live")) {
						presenceData.smallImageKey = ChzzkAssets.Live;
						presenceData.smallImageText = strings.live;
						if (showElapsedTime) {
							presenceData.startTimestamp =
								Math.floor(Date.now() / 1000) -
								presence.timestampFromFormat(
									document.querySelector("span[class^=video_information_count]")
										.textContent
								);
						}
						presenceData.buttons = [{ url: href, label: strings.watchStream }];
					} else {
						presenceData.smallImageKey = ChzzkAssets.Play;
						presenceData.smallImageText = strings.play;
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(video);
						presenceData.buttons = [{ url: href, label: strings.watchVideo }];
					}

					if (video.paused) {
						presenceData.smallImageKey = ChzzkAssets.Pause;
						presenceData.smallImageText = strings.pause;
						delete presenceData.startTimestamp;
					}

					break;
				}
			}
			break;
	}

	presence.setActivity(presenceData);
});
