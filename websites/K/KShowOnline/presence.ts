const presence = new Presence({
		clientId: "614389710625964045",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let browsingTimestamp = Math.floor(Date.now() / 1000),
	title: HTMLElement,
	views: HTMLElement,
	air: HTMLElement,
	iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	lastPlaybackState = null,
	playback: boolean;

interface IFrameData {
	iframeVideo: {
		dur: number;
		iFrameVideo: boolean;
		paused: boolean;
		currTime: number;
	};
}

if (document.location.pathname.includes("/kshow/")) {
	if (lastPlaybackState !== playback) {
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}
	presence.on("iFrameData", (data: IFrameData) => {
		playback = data.iframeVideo.dur !== null ? true : false;

		if (playback) {
			({ iFrameVideo, paused } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
			duration = data.iframeVideo.dur;
		}
	});
}

presence.on("UpdateData", async () => {
	// Get the video
	const timestamps = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/fqNzu3W.png",
			smallImageKey: paused ? "pause" : "play",
			smallImageText: paused ? (await strings).pause : (await strings).play,
			startTimestamp: timestamps[0],
			endTimestamp: timestamps[1],
		};
	if (
		document.location.pathname.includes(".html") &&
		document.location.pathname.includes("/pages/")
	)
		presence.setActivity();
	else if (document.location.pathname.includes("/kshow/")) {
		if (iFrameVideo === true && !isNaN(duration)) {
			title = document.querySelector(
				"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4"
			);
			views = document.querySelector("#view");
			presenceData.details = title.textContent.replace(views.textContent, "");

			air = document.querySelector(
				"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(6) > td"
			);
			views = document.querySelector(
				"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > div.row.panel-info > div.col.s12.m9 > table > tbody > tr:nth-child(5) > td"
			);
			if (air)
				presenceData.state = `Subbed by: ${views.textContent}, Aired on: ${air.textContent}`;
			else presenceData.state = views.textContent;

			// Set presence state to views value

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			presence.setActivity(presenceData);
		} else if (iFrameVideo === null && isNaN(duration)) {
			delete presenceData.endTimestamp;
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Looking at: ";
			title = document.querySelector(
				"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div:nth-child(3) > h4"
			);
			views = document.querySelector("#view");
			presenceData.state = title.textContent.replace(views.textContent, "");
			delete presenceData.smallImageText;
			presenceData.smallImageKey = "reading";

			presence.setActivity(presenceData);
		}
	} else {
		switch (document.location.pathname) {
			case "/": {
				presenceData.details = "Browsing through";
				presenceData.state = "the main page";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = "reading";

				presence.setActivity(presenceData);

				break;
			}
			case "/list/view": {
				presenceData.details = "Browsing through";
				presenceData.state = "the most viewed shows";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = "reading";

				presence.setActivity(presenceData);

				break;
			}
			case "/list/rate": {
				presenceData.details = "Browsing through";
				presenceData.state = "the highest rated shows";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = "reading";

				presence.setActivity(presenceData);

				break;
			}
			case "/list": {
				presenceData.details = "Browsing through";
				presenceData.state = "the latest shows";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = "reading";

				presence.setActivity(presenceData);

				break;
			}
			case "/show-list": {
				presenceData.details = "Browsing through";
				presenceData.state = "a list of all shows";
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				delete presenceData.smallImageText;
				presenceData.smallImageKey = "reading";

				presence.setActivity(presenceData);

				break;
			}
			default:
				if (document.location.pathname.includes("/category/")) {
					views = document.querySelector(
						"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5"
					);

					presenceData.details = "Browsing through all episodes of:";
					presenceData.state = views.textContent
						.replace("CATEGORY: ", "")
						.replace("▼", "");
					delete presenceData.endTimestamp;
					presenceData.startTimestamp = browsingTimestamp;
					delete presenceData.smallImageText;
					presenceData.smallImageKey = "reading";

					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("/search/")) {
					views = document.querySelector(
						"#wrap > div.container.content > div > div.col.s12.m12.l8.content-left > div.content-list.z-depth-1 > h5"
					);

					presenceData.details = "Searching for:";
					presenceData.state = views.textContent
						.replace("Search by Keywords: ", "")
						.replace("▼", "");
					delete presenceData.endTimestamp;
					presenceData.startTimestamp = browsingTimestamp;
					delete presenceData.smallImageText;
					presenceData.smallImageKey = "search";
					presence.setActivity(presenceData);
				} else presence.setActivity();
		}
	}
});
