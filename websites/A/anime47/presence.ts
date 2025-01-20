const presence = new Presence({
		clientId: "640990409224486971",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/anime47/assets/logo.png",
}

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: string,
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
	}
	const [startTimestamp, endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		};

	if (
		document.querySelector(
			"body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
		)
	) {
		presenceData.details = "Đang xem:";
		presenceData.state = document.querySelector(
			"body > div.container > div:nth-child(3) > div > div.movie-info > div > div.block-wrapper.page-single > div > div.block-movie-info.movie-info-box > div > div.col-6.movie-detail > h1 > span.title-1"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (
		document.querySelector(
			"body > div.container > ol > li:nth-child(5) > a > span"
		)
	) {
		if (iFrameVideo === true && !isNaN(duration)) {
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] = [
				startTimestamp,
				endTimestamp,
			];

			[presenceData.details, presenceData.state] = document
				.querySelector("head > title")
				.textContent.split("- ");

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (!iFrameVideo && isNaN(duration)) {
			presenceData.details = "Đang xem: ";
			title = document.querySelector("head > title").textContent;

			presenceData.state = title;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname === "/")
		presenceData.details = "Đang xem trang chủ";
	else if (document.URL.includes("/the-loai/")) {
		presenceData.details = "Đang xem danh mục:";
		presenceData.state = document
			.querySelector(
				"body > div.container > div:nth-child(5) > div > div.movie-list-index.home-v2 > h1 > span"
			)
			.textContent.split(":")[1]
			.replace(" - Anime Vietsub Online", "");
	} else {
		presenceData.details = "Đang xem:";
		presenceData.state = document.querySelector("head > title").textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
