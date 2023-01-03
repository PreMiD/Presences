const presence = new Presence({
		clientId: "708314580304003124",
	}),
	newStrings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browse: "general.browsing",
		search: "general.search",
	}),
	getElement = (query: string): string => {
		const element = document.querySelector(query);
		if (element) return element.textContent.replace(/^\s+|\s+$/g, "");
		else return "Loading...";
	};

let oldUrl: string, elapsed: number, strings: Awaited<typeof newStrings>;

presence.on("UpdateData", async () => {
	const path = location.pathname.replace(/\/?$/, "/"),
		video: HTMLVideoElement = document.querySelector("video"),
		[showSearchInfo, showBrowseInfo, showVideoInfo, cover] = await Promise.all([
			presence.getSetting<boolean>("search"),
			presence.getSetting<boolean>("browse"),
			presence.getSetting<boolean>("video"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Sr0u6MC.png",
		};

	if (oldUrl !== path) {
		oldUrl = path;
		elapsed = Math.floor(Date.now() / 1000);
	}

	strings ??= await newStrings;

	if (elapsed) presenceData.startTimestamp = elapsed;
	if (showBrowseInfo && path === "/") presenceData.details = "Browsing";

	if (showVideoInfo && video) {
		const state = Array.from(
				document.querySelector<HTMLElement>("#infotitle").childNodes
			).flatMap(node => node.textContent.trim() || []),
			status = video.paused ? "pause" : "play";

		presenceData.smallImageKey = status;
		presenceData.smallImageText = strings[status];
		if (status === "play") {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
		}

		if (getElement("#episodetitle") !== "Feature Film") {
			presenceData.details = state[1];
			presenceData.state = state[2];
		} else presenceData.details = state[1];

		if (cover) {
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"meta[property='og:image']"
			).content;
		}
	}

	/* Search Info */
	if (
		showSearchInfo &&
		getElement("#indextitle").split("\n")[0] === "Search Results"
	) {
		presenceData.details = "Searching for";
		presenceData.state =
			document.querySelector<HTMLInputElement>("input").value;
	}

	if (presenceData.details) {
		if (presenceData.details.match("(Browsing|Viewing)")) {
			presenceData.smallImageKey = "reading";
			presenceData.smallImageText = strings.browse;
		}
		if (presenceData.details.includes("Searching")) {
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = strings.search;
		}

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
