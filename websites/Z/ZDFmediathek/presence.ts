let elapsed = Math.floor(Date.now() / 1000),
	prevUrl = document.location.href;

const assets = {
		zdf: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/0.png",
		"3sat": "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/1.png",
		phoenix: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/2.png",
		arte: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/3.png",
		zdfinfo: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/4.png",
		zdfneo: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/5.png",
		kika: "https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/6.png",
	},
	presence = new Presence({
		clientId: "854999470357217290",
	}),
	// TODO: Add multiLang
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
		browsingThrough: "discord.browseThrough",
		buttonWatchVideo: "general.buttonWatchVideo",
		buttonWatchStream: "general.buttonWatchStream",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/logo.png",
		},
		video = document.querySelector<HTMLVideoElement>(
			"div.zdfplayer-video_wrapper video"
		);

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	if (video) {
		if (location.pathname.startsWith("/live-tv")) {
			// Livestream
			const mediathekLivechannel = document
					.querySelector<HTMLHeadingElement>(
						"div.item.livetv-item.js-livetv-scroller-cell.m-active-done.m-activated-done.m-activated.m-active h2[class='visuallyhidden']"
					)
					.textContent.replace(/ {2}/g, " ")
					.replaceAll(" im Livestream", "")
					.replaceAll(" Livestream", ""),
				videoInfoResults = document.querySelectorAll(".zdfplayer-teaser-title");

			let videoInfoTag = null;
			for (const videoInfoResult of videoInfoResults) {
				if (
					videoInfoResult.textContent
						.toLowerCase()
						.includes(` ${mediathekLivechannel.toLowerCase()} `) ||
					videoInfoResult.textContent
						.toLowerCase()
						.includes(`>${mediathekLivechannel.toLowerCase()}<`)
				) {
					videoInfoTag = videoInfoResult.textContent;
					break;
				}
			}

			presenceData.largeImageKey =
				assets[mediathekLivechannel.toLowerCase() as keyof typeof assets];
			presenceData.smallImageKey = Assets.Live;
			presenceData.smallImageText = "Live";
			presenceData.details = `${mediathekLivechannel} Live`;
			presenceData.state = videoInfoTag
				.substring(videoInfoTag.lastIndexOf(">") + 1, videoInfoTag.length - 1)
				.trim();
			presenceData.startTimestamp = elapsed;
			presenceData.buttons = [
				{ label: (await strings).buttonWatchStream, url: prevUrl },
			];

			if (
				document.querySelector<HTMLVideoElement>(
					"div.item.livetv-item.js-livetv-scroller-cell.m-activated-done.m-activated.m-active.m-active-done div figure div video"
				).paused
			) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
				presenceData.startTimestamp = 0;
				presenceData.endTimestamp = 0;
			}
		} else {
			// Video-on-demand
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/Z/ZDFmediathek/assets/logo.png";
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = (await strings).play;

			const videoInfoTag = document.querySelector(
					".zdfplayer-teaser-title"
				).textContent,
				showTitleTag = videoInfoTag.substring(
					videoInfoTag.indexOf(">") + 1,
					videoInfoTag.lastIndexOf("<")
				);

			presenceData.state = videoInfoTag
				.substring(videoInfoTag.lastIndexOf(">") + 1, videoInfoTag.length - 1)
				.trim();
			presenceData.details = showTitleTag.includes("|")
				? showTitleTag.substring(
						showTitleTag.indexOf("|") + 1,
						showTitleTag.length
				  )
				: showTitleTag;
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
			presenceData.buttons = [
				{ label: (await strings).buttonWatchVideo, url: prevUrl },
			];
			if (video.paused) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = (await strings).pause;
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else {
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = (await strings).browsingThrough;
		presenceData.details = (await strings).browsing;
		presenceData.startTimestamp = elapsed;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
