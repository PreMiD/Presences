const presence = new Presence({
		clientId: "1001112348192423946",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let lastPlaybackState,
	playback: boolean,
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Unknown page",
			largeImageKey: "https://i.imgur.com/FIXyNZo.png",
		},
		video: HTMLVideoElement = document.querySelector(
			"#player > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"
		);

	playback = !!video;

	if (!playback) {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		presence.setActivity(presenceData);
	}

	if (video && !isNaN(video.duration)) {
		const videoTitle: HTMLElement = document.querySelector(
				"div.watch-header.h4.mb-0.font-weight-normal.link.hidden-sm-down"
			),
			season: HTMLElement = document.querySelector(
				"#playercontainer span.outPes"
			),
			episode: HTMLElement = document.querySelector(
				"#playercontainer span.outPep"
			);
		presenceData.largeImageKey = document
			.querySelector<HTMLMetaElement>('meta[property="og:image"]')
			.getAttribute("content")
			.replace("https:https:", "https:");

		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (season && episode) {
			presenceData.details = videoTitle
				? videoTitle.textContent
				: "Title not found...";
			presenceData.state = `Season ${season.textContent} Episode ${episode.textContent}`;
			presenceData.buttons = [
				{
					label:
						presenceData.details.length >= 30
							? "View Now"
							: presenceData.details,
					url: document.location.href.split("/season/")[0],
				},
				{
					label: presenceData.state,
					url: document.location.href,
				},
			];
		} else if (!season && episode) {
			presenceData.details = videoTitle
				? videoTitle.textContent
				: "Title not found...";
			presenceData.state = `Episode ${episode.textContent}`;
			presenceData.buttons = [
				{
					label:
						presenceData.details.length >= 30
							? "View Now"
							: presenceData.details,
					url: document.location.href.split("/episode/")[0],
				},
				{
					label: presenceData.state,
					url: document.location.href,
				},
			];
		} else {
			presenceData.details = "Watching";
			presenceData.state = videoTitle
				? videoTitle.textContent
				: "Title not found...";
			presenceData.buttons = [
				{
					label:
						presenceData.state.length >= 30 ? "Watch Now" : presenceData.state,
					url: document.location.href,
				},
			];
		}

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		if (videoTitle) presence.setActivity(presenceData, !video.paused);
	}
});
