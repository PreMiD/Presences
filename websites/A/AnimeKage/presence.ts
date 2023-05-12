const presence = new Presence({
		clientId: "640244531346014214",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	air: HTMLElement,
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	lastPlaybackState: boolean,
	playback: boolean;

interface IFrameData {
	iframeVideo: {
		dur: number;
		iFrameVideo: boolean;
		paused: boolean;
		currTime: number;
	};
}

presence.on("iFrameData", (data: IFrameData) => {
	if (data.iframeVideo.dur) {
		({
			iFrameVideo,
			paused,
			currTime: currentTime,
			dur: duration,
		} = data.iframeVideo);
	}
});

presence.on("UpdateData", async () => {
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
	}
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zVbpanX.png",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.querySelector(
			"body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
		)
	) {
		if (iFrameVideo && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));

			title = document.querySelector(
				"body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
			);
			presenceData.details = title.textContent;

			air = document.querySelector("div > div.row > div:nth-child(3)");
			presenceData.state = `Aired on: ${air?.textContent?.trim()}`;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (!iFrameVideo && isNaN(duration)) {
			presenceData.details = "Looking at: ";
			title = document.querySelector(
				"body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
			);

			presenceData.state = title.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname === "/")
		presenceData.details = "Viewing main page";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
