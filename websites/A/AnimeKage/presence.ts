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

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeKage/assets/logo.png",
}

presence.on("UpdateData", async () => {
	if (lastPlaybackState !== playback) {
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	if (
		document.querySelector(
			"body > div:nth-child(2) > div > div > div > div > div > div > div > div > div > h1"
		)
	) {
		if (iFrameVideo && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
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
