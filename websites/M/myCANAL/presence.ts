const presence = new Presence({
		clientId: "844106861711196179",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
		},
		showCover = await presence.getSetting<boolean>("cover"),
		video: HTMLVideoElement = document.querySelector(".aPWk0-TaQEzvggxIT6qvP");
	if (video && !isNaN(video.duration)) {
		if (!document.querySelector("._3uUpH58Juk_Qbizq6j5ThG")) {
			if (document.location.pathname.includes("/live/")) {
				title = document.querySelector("._3tdt8zwgvMCJ6v_sElXneQ").textContent;
				presenceData.smallImageKey = "live";
				presenceData.smallImageText = (await strings).live;
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				title = `${
					document.querySelector("._3tdt8zwgvMCJ6v_sElXneQ")?.textContent
				} ${document.querySelector("._3pyJlyeeH9KBKeFd4nFAmt")?.textContent}`;

				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				[, presenceData.endTimestamp] = presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);

				if (showCover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>(
							"#binder_mediaCardHeader > div > img"
						)?.src ||
						document.querySelector<HTMLImageElement>(
							"#episodeGrid-Épisode\\ 1\\ -\\ Les\\ Héritiers\\ du\\ Dragon_onclick_toFocus > div.poster___Cbuef.card__poster___cb98P.poster--dark___UyYiC > img"
						)?.src;
				}
			}
			const subtitle = document.querySelector(
				"._39WJKEhrSYo7ftwMlFjZtA  ._3tdt8zwgvMCJ6v_sElXneQ"
			).textContent;
			presenceData.details = title;
			presenceData.state = subtitle;

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			if (title && subtitle) presence.setActivity(presenceData, !video.paused);
		} else {
			(presenceData.details = "Watching an Ad"),
				presence.setActivity(presenceData);
		}
	} else
		(presenceData.details = "Browsing..."), presence.setActivity(presenceData);
});
