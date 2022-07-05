const presence = new Presence({
	clientId: "608065709741965327",
});

async function getStrings() {
	return presence.getStrings(
		{
			play: "presence.playback.playing",
			pause: "presence.playback.paused",
			browse: "presence.activity.browsing",
			reading: "presence.activity.reading",
			viewManga: "general.viewManga",
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
	const newLang = await presence.getSetting<string>("lang").catch(() => "en");
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
		largeImageKey: "lg",
	};

	if (!playback && document.location.pathname.includes("/manga")) {
		if (document.location.pathname.includes("/read")) {
			presenceData.details =
				document.querySelector(".chapter-header a").textContent;
			presenceData.state = `${(await strings).reading} ${
				document
					.querySelector(".chapter-header")
					.textContent.split("</a>")[1]
					.split("\n")[0]
			}`;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = "book_open";
			presenceData.smallImageText = `${(await strings).page} ${
				document.querySelector(".first-page-number").textContent === ""
					? "1"
					: document.querySelector(".first-page-number").textContent
			}/${document.querySelector(".images").children.length}`;
			presenceData.buttons = [
				{
					label: `Read ${(await strings).chapter}`,
					url: document.location.toString(),
				},
			];
		} else if (document.location.pathname.includes("/volumes")) {
			presenceData.details = (await strings).viewManga;
			presenceData.state = document
				.querySelector(".ellipsis")
				.textContent.split("&gt;")[1];
			presenceData.buttons = [
				{
					label: `View ${(await strings).manga}`,
					url: document.location.toString(),
				},
			];
		} else {
			presenceData.details = (await strings).browse;
			presenceData.startTimestamp = browsingTimestamp;

			delete presenceData.state;
			delete presenceData.smallImageKey;
		}

		presence.setActivity(presenceData);
	}

	if (!playback && !document.location.pathname.includes("/manga")) {
		presenceData.details = (await strings).browse;
		presenceData.startTimestamp = browsingTimestamp;

		delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
	}

	if (iFrameVideo !== false && !isNaN(duration)) {
		let videoTitle,
			series: HTMLElement,
			seriesLink,
			episode,
			epName,
			seasonregex,
			seasonName;
		if (document.location.hostname.startsWith("beta")) {
			seriesLink =
				document.location.origin +
				document.querySelector(".show-title-link").getAttribute("href");
			episode = document.querySelector(
				".c-heading.c-heading--xs.c-heading--family-type-one.title"
			).textContent;
			[, epName] = episode.match(/.* - (.*)/);
			epName = epName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			seasonregex = new RegExp(`(.*) ${epName} -`);
			[, seasonName] = document.title.match(seasonregex);
			videoTitle = seasonName;
		} else {
			series = document.querySelector(".ellipsis .text-link");
			videoTitle = series.textContent;
			seriesLink = series.getAttribute("href");
			episode = `${
				document.querySelectorAll("#showmedia_about_media h4")[1].textContent
			} - ${document.querySelector("h4#showmedia_about_name").textContent}`;
		}
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused
			? (await strings).pause
			: (await strings).play;
		[, presenceData.endTimestamp] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		);

		presenceData.details = videoTitle ?? "Title not found...";
		presenceData.state = episode;

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (videoTitle) {
			presenceData.buttons = [
				{
					label: (await strings).watchEpisode,
					url: document.location.toString(),
				},
				{
					label: (await strings).viewSeries,
					url: seriesLink,
				},
			];
			presence.setActivity(presenceData, !paused);
		}
	}
});
