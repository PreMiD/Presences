const presence = new Presence({
	clientId: "813680039354826784",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/0WHU4T5.png",
		},
		strings = await presence.getStrings({
			browsing: "general.browsing",
			playing: "general.playing",
			paused: "general.paused",
			live: "general.live",
			homepage: "general.viewHome",
			watchVideo: "general.buttonWatchVideo",
			watchStream: "general.buttonWatchStream",
			viewChannel: "general.buttonViewChannel",
		}),
		channel = document.querySelector<HTMLHeadingElement>("h1.text-ellipsis"),
		videoElement: HTMLVideoElement =
			document.querySelector("#vp-player > video"),
		videoTitle = document.querySelector<HTMLHeadingElement>(
			"h1.video__info-title"
		),
		videoChannel = document.querySelector<HTMLAnchorElement>(
			"a.influencer__info-link"
		);
	if (document.location.pathname === "/") {
		presenceData.details = strings.homepage;
		presenceData.state = strings.browsing;
		presenceData.smallImageKey = "malltvbrowsing";
	} else if (channel) {
		presenceData.details = channel.textContent;
		presenceData.state = strings.browsing;
		presenceData.smallImageKey = "malltvbrowsing";
	} else if (videoTitle && videoChannel) {
		const videoLive: HTMLButtonElement =
			document.querySelector("button.vp-live");
		presenceData.details = videoTitle.textContent;
		presenceData.state = videoChannel.textContent;
		presenceData.buttons = [
			{
				label:
					videoLive.style.display === "none"
						? strings.watchVideo
						: strings.watchStream,
				url: document.URL.split("?")[0],
			},
			{
				label: strings.viewChannel,
				url: videoChannel.href,
			},
		];
		if (videoLive.style.display !== "none") {
			presenceData.smallImageKey = "malltvlive";
			presenceData.smallImageText = strings.live;
		} else if (!videoElement.paused) {
			([presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(videoElement)),
				(presenceData.smallImageKey = "malltvplaying");
			presenceData.smallImageText = strings.playing;
		} else {
			presenceData.smallImageKey = "malltvpaused";
			presenceData.smallImageText = strings.paused;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
