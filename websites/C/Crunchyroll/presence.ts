const presence = new Presence({
		clientId: "608065709741965327",
	}),
	logo = "https://i.imgur.com/8CpYMrh.png";

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			browse: "general.browsing",
			reading: "general.reading",
			viewManga: "general.viewManga",
			viewPage: "general.viewPage",
			watchEpisode: "general.buttonViewEpisode",
			viewSeries: "general.buttonViewSeries",
			manga: "general.manga",
			chapter: "general.chapter",
			page: "general.page",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	lastPlaybackState = null,
	playback: boolean,
	browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

let iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean;

interface iFrameData {
	iFrameVideoData: {
		iFrameVideo: boolean;
		currTime: number;
		dur: number;
		paused: boolean;
	};
}

presence.on("iFrameData", (data: iFrameData) => {
	playback = data.iFrameVideoData !== null ? true : false;

	if (playback) {
		({
			iFrameVideo,
			currTime: currentTime,
			dur: duration,
			paused,
		} = data.iFrameVideoData);
	}
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: logo,
		},
		{ href, pathname, hostname } = document.location,
		[newLang, showCover] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("cover"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (pathname.includes("/manga")) {
		if (pathname.includes("/read")) {
			const queryTitle: HTMLHeadingElement =
				document.querySelector(".chapter-header h1");
			presenceData.details = queryTitle.children[0].textContent.trim();
			presenceData.state = `${
				strings.reading
			} ${queryTitle.lastChild.textContent.trim()}`;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "book_open";
			const pageNumber: string =
				document.querySelector(".first-page-number").textContent;
			presenceData.smallImageText = `${strings.page} ${
				pageNumber === "" ? "1" : pageNumber
			}/${document.querySelector(".images").children.length}`;
			presenceData.buttons = [
				{
					label: `Read ${strings.chapter}`,
					url: href,
				},
			];
		} else if (pathname.includes("/volumes")) {
			presenceData.details = strings.viewManga;
			presenceData.state = document
				.querySelector(".ellipsis")
				.textContent.split("Manga > ")[1];
			presenceData.buttons = [
				{
					label: `View ${strings.manga}`,
					url: href,
				},
			];
		} else {
			presenceData.details = strings.browse;
			presenceData.startTimestamp = browsingTimestamp;

			delete presenceData.state;
			delete presenceData.smallImageKey;
		}
	} else {
		presenceData.details = strings.browse;
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;
	}

	if (
		iFrameVideo !== false &&
		!isNaN(duration) &&
		!pathname.includes("/series")
	) {
		let videoTitle, series: HTMLElement, seriesLink, episode;
		if (hostname.startsWith("beta")) {
			seriesLink =
				document.location.origin +
				document.querySelector(".show-title-link").getAttribute("href");
			episode = document.querySelector("h1.title").textContent;
			videoTitle = document.querySelector("a > h4").textContent;
		} else {
			series = document.querySelector(".ellipsis .text-link");
			videoTitle = series.textContent;
			seriesLink = series.getAttribute("href");
			episode = `${
				document.querySelectorAll("#showmedia_about_media h4")[1].textContent
			} - ${document.querySelector("h4#showmedia_about_name").textContent}`;
		}
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? strings.pause : strings.play;
		[, presenceData.endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		);

		presenceData.details = videoTitle ?? "Title not found...";
		presenceData.state = episode;

		presenceData.largeImageKey =
			document.querySelector<HTMLMetaElement>("[property='og:image']")
				?.content ?? logo;

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (videoTitle) {
			presenceData.buttons = [
				{
					label: strings.watchEpisode,
					url: href,
				},
				{
					label: strings.viewSeries,
					url: seriesLink,
				},
			];
		}
	} else if (pathname.includes("/series")) {
		presenceData.details = strings.viewPage;
		presenceData.state = document.querySelector("h1.title").textContent;
		presenceData.largeImageKey =
			document.querySelector<HTMLMetaElement>("[property='og:image']")
				?.content ?? logo;
		presenceData.buttons = [
			{
				label: strings.viewSeries,
				url: href,
			},
		];
	}

	if (!showCover) presenceData.largeImageKey = logo;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
