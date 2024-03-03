const presence = new Presence({
		clientId: "1212664221788274698",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/VnwSEyu.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		[showButtons] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
		]),
		path = pathname.split("/");

	path.shift();
	if (pathname.endsWith("/")) path.pop();

	getDetails(presenceData, path, showButtons);
	presence.setActivity(presenceData);
});

function getDetails(
	presenceData: PresenceData,
	path: string[],
	showButtons: boolean
): void {
	if (path.length === 0) {
		presenceData.details = "Viewing home page";
		return;
	}

	switch (path[0].toLowerCase()) {
		case "classes":
			presenceData.details = "Viewing classes";
			break;
		case "settings":
			presenceData.details = "Viewing account settings";
			break;
		case "faq":
			presenceData.details = "Viewing Frequently Asked Questions";
			break;
		case "terms":
			presenceData.details = "Viewing Terms of Service";
			break;
		case "privacy":
			presenceData.details = "Viewing Privacy Policy";
			break;
		case "beta":
			presenceData.details = "Viewing beta apps page";
			break;
		case "library":
			if (path.length === 1) presenceData.details = "Viewing library page";
			else presenceData.details = getLibraryCategory(path[1].toLowerCase());
			break;
		case "explore":
			if (path.length === 1) presenceData.details = "Viewing explore page";
			else presenceData.details = getExploreCategory(path[1].toLowerCase());
			break;
		case "videos":
			getVideoDetails(presenceData, showButtons);
			break;
		case "search":
			getSearchDetails(presenceData);
			break;
		default:
			getOtherDetails(presenceData, showButtons);
			break;
	}
}

function getExploreCategory(category: string): string {
	switch (category) {
		case "videos":
			return "Exploring videos";
		case "channels":
			return "Exploring channels";
		case "podcasts":
			return "Exploring podcasts";
		case "episodes":
			return "Exploring episodes";
	}
}

function getLibraryCategory(category: string): string {
	switch (category) {
		case "latest-videos":
			return "Viewing latest videos";
		case "followed-channels":
			return "Viewing followed channels";
		case "watch-later":
			return "Viewing Watch Later";
		case "watch-history":
			return "Viewing watch history";
		case "latest-episodes":
			return "Viewing latest episodes";
		case "followed-shows":
			return "Viewing followed shows";
		case "saved-episodes":
			return "Viewing saved episodes";
		case "listen-history":
			return "Viewing listening history";
		case "classes-in-progress":
			return "Viewing classes in progress";
		case "saved-classes":
			return "Viewing saved classes";
		case "lesson-history":
			return "Viewing lesson history";
	}
}

function getVideoDetails(
	presenceData: PresenceData,
	showButtons: boolean
): void {
	const videoElement = document.querySelector("video");

	presenceData.details = document.querySelector("[aria-label='video description'] > div:nth-of-type(1) > h1").textContent;
	presenceData.state = document.querySelector("[aria-label='video description'] > div:nth-of-type(2) > a:nth-of-type(2) > h2").textContent;

	if (showButtons) {
		presenceData.buttons = [
			{
				label: "Watch Video",
				url: document.location.href
			},
			{
				label: "View Channel",
				url: getRootUrl() + document.querySelector("[aria-label='video description'] > div > a:nth-of-type(2)").getAttribute("href")
			},
		];
	}

	if (videoElement === null) return;
	setTimestamps(videoElement, presenceData);
}

function getSearchDetails(presenceData: PresenceData): void {
	presenceData.details = "Searching for:";
	presenceData.state = parseQueryParams().q || "...";
}

function getOtherDetails(
	presenceData: PresenceData,
	showButtons: boolean
): void {
	const videoElement = document.querySelector("video"),
		audioElement = document.querySelector("audio");

	if (videoElement === null && audioElement === null) {
		// viewing a channel
		const channelName = document.querySelector("main > div:nth-of-type(1) > h1"),
			podcastName = document.querySelector("main > div:nth-of-type(1) > div > div > div:nth-of-type(2) > h1");

		if (channelName === null && podcastName === null) return;

		if (channelName === null) {
			presenceData.details = "Viewing a podcast";
			presenceData.state = podcastName.textContent;
		} else {
			presenceData.details = "Viewing a channel";
			presenceData.state = channelName.textContent;
		}

		if (showButtons) {
			presenceData.buttons = [
				{
					label: channelName === null ? "View Podcast" : "View Channel",
					url: document.location.href,
				},
			];
		}
	} else if (videoElement === null) {
		//it's a podcast
		const channelElement = document.querySelector("main > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > a");

		presenceData.details = document.querySelector("main > div:nth-of-type(1) > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(1)").textContent;
		presenceData.state = channelElement.textContent;
		setTimestamps(audioElement, presenceData);

		if (showButtons) {
			presenceData.buttons = [
				{
					label: "Listen to Podcast",
					url: document.location.href,
				},
				{
					label: "View Channel",
					url: getRootUrl() + channelElement.getAttribute("href"),
				},
			];
		}
	} else {
		//it's a class episode
		const classInfoElementSelector = "main > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
			episodeName = document.querySelector(`${classInfoElementSelector} > div:nth-of-type(1)`),
			className = document.querySelector(`${classInfoElementSelector} > div:nth-of-type(2)`);

		if (episodeName !== null)
			presenceData.details = `${episodeName.textContent} | ${className.textContent}`;
		else presenceData.details = className.textContent;

		presenceData.state = document.querySelector(`${classInfoElementSelector} > div:nth-of-type(3)`).textContent;
		setTimestamps(videoElement, presenceData);

		if (showButtons) {
			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: document.location.href,
				},
			];
		}
	}
}

function setTimestamps(
	element: HTMLAudioElement | HTMLVideoElement,
	presenceData: PresenceData
): void {
	delete presenceData.startTimestamp;
	presenceData.endTimestamp = presence.getTimestampsfromMedia(element)[1];
	if (element.paused) {
		delete presenceData.endTimestamp;
		presenceData.smallImageKey = Assets.Pause;
	} else presenceData.smallImageKey = Assets.Play;
}

interface QueryParams {
	[key: string]: string;
}

function parseQueryParams(): QueryParams {
	const queryParams: QueryParams = {},
		queryString = document.location.search.split("?")[1];

	if (queryString) {
		const pairs = queryString.split("&");

		for (const pair of pairs) {
			const keyValue = pair.split("=");
			queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(
				keyValue[1] || ""
			);
		}
	}

	return queryParams;
}

function getRootUrl(): string {
	return `${document.location.protocol}//${document.location.hostname}${
		document.location.port ? `:${document.location.port}` : ""
	}`;
}
