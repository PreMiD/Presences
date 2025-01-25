const presence = new Presence({
		clientId: "1325035374430519392",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				live: "general.live",
				browse: "general.browsing",
				watchStream: "general.buttonWatchStream",
				watchVideo: "general.buttonWatchVideo",
			},
			oldLang
		);
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/S/SOOP/assets/logo.png",
}

const enum SoopAssets {
	Browse = "https://cdn.rcd.gg/PreMiD/websites/S/SOOP/assets/0.png",
	Live = "https://cdn.rcd.gg/PreMiD/websites/S/SOOP/assets/1.png",
	Play = "https://cdn.rcd.gg/PreMiD/websites/S/SOOP/assets/2.png",
	Pause = "https://cdn.rcd.gg/PreMiD/websites/S/SOOP/assets/3.png",
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
			smallImageKey: SoopAssets.Browse,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
		},
		{ hostname, pathname, href } = document.location;

	switch (hostname.split(".")[0]) {
		case "play": {
			presenceData.details =
				document.querySelector("span#infoTitle").textContent;
			presenceData.state = document.querySelector("a#infoNickName").textContent;
			presenceData.largeImageKey = showStreamerLogo
				? document.querySelector<HTMLImageElement>("#bjThumbnail img").src
				: Assets.Logo;

			presenceData.smallImageKey = SoopAssets.Live;
			presenceData.smallImageText = strings.live;

			if (showElapsedTime) {
				presenceData.startTimestamp =
					Math.floor(Date.now() / 1000) -
					presence.timestampFromFormat(
						document.querySelector("span#time").textContent
					);
			}

			presenceData.buttons = [{ url: href, label: strings.watchStream }];
			break;
		}
		case "vod": {
			const isCatch = pathname.includes("/catch"),
				video = document.querySelector("video");

			if (video) {
				presenceData.details = document.querySelector(
					isCatch ? "h3.title" : "div.broadcast_title"
				).textContent;
				presenceData.state = document.querySelector(
					isCatch ? "button.nick.ictFunc" : "a.ictFunc"
				).textContent;
				presenceData.largeImageKey = showStreamerLogo
					? document.querySelector<HTMLImageElement>(
							isCatch ? "div.author_inner img" : "div.thumbnail_box img"
					  ).src
					: Assets.Logo;

				presenceData.smallImageKey = video.paused
					? SoopAssets.Pause
					: SoopAssets.Play;
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;

				presenceData.buttons = [{ url: href, label: strings.watchVideo }];

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(video);

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
		}
	}

	presence.setActivity(presenceData);
});
