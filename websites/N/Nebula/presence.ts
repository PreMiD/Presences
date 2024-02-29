const presence = new Presence({
		clientId: "1212664221788274698",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/OzDunh4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp
	},
	{ pathname } = document.location,
	[showButtons] = await Promise.all([
		presence.getSetting<boolean>("buttons"),
	]),
	path = pathname.split("/");

	path.shift(); 
	if (pathname.endsWith("/")) 
		path.pop();

	getDetails(presenceData, path, showButtons);
	presence.setActivity(presenceData);
});

function getDetails(presenceData: PresenceData, path: string[], showButtons: boolean): void {
	if(path.length === 0) {
		presenceData.details = "Viewing home page";
		return;
	}

	switch(path[0].toLowerCase()) {
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
			if(path.length === 1)
				presenceData.details = "Viewing library page";
			else
				presenceData.details = getLibraryCategory(path[1].toLowerCase());
			break;
		case "explore":
			if(path.length === 1)
				presenceData.details = "Viewing explore page";
			else
				presenceData.details = getExploreCategory(path[1].toLowerCase());
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
	switch(category) {
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
	switch(category) {
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

function getVideoDetails(presenceData: PresenceData, showButtons: boolean): void {
	const videoElement = document.querySelector("video");
	
	presenceData.details = document.querySelector(".css-11wyb0j").innerHTML;
	presenceData.state = document.querySelector(".css-r06ha9").innerHTML;

	if(videoElement === null) return;
	setTimestamps(videoElement, presenceData);

	if (showButtons) {
		presenceData.buttons = [
			{
				label: "Watch Video",
				url: document.location.href,
			},
			{
				label: "View channel",
				url: getRootUrl() + document.querySelector(".css-1nacd6b").getAttribute("href"),
			}
		];
	}
}

function getSearchDetails(presenceData: PresenceData): void {
	presenceData.details = "Searching for:";
	presenceData.state = parseQueryParams().q || "...";
}

function getOtherDetails(presenceData: PresenceData, showButtons: boolean): void {
	const videoElement = document.querySelector("video"),
	audioElement = document.querySelector("audio");

	if(videoElement === null && audioElement === null) { // viewing a channel
		const channelName = document.querySelector(".css-dv828b"),
		podcastName = document.querySelector(".css-xdl2kn");

		if(channelName === null && podcastName === null)
			return;
	
		if(channelName === null) {
			presenceData.details = "Viewing a podcast";
			presenceData.state = podcastName.innerHTML;
		} else {
			presenceData.details = "Viewing a channel";
			presenceData.state = channelName.innerHTML;
		}

		if (showButtons) {
			presenceData.buttons = [
				{
					label: "View channel",
					url: document.location.href,
				}
			];
		}
	} else if(videoElement === null) { //its a podcast
		const channelElement = document.querySelector(".css-2m8aus");

		presenceData.details = document.querySelector(".css-l7qxoj").innerHTML;
		presenceData.state = channelElement.innerHTML;
		setTimestamps(audioElement, presenceData);

		if (showButtons) {
			presenceData.buttons = [
				{
					label: "Listen to podcast",
					url: document.location.href,
				},
				{
					label: "View channel",
					url: getRootUrl() + channelElement.getAttribute("href"),
				}
			];
		}
	} else { //its a class episode
		const episodeName = document.querySelector(".css-13igzay"),
		className = document.querySelector(".css-1ls4t7r");

		if(episodeName !== null) 
			presenceData.details = `${episodeName.innerHTML} | ${className.innerHTML}`;
		else
			presenceData.details = className.innerHTML;

		presenceData.state = document.querySelector(".css-p7br9k").innerHTML;
		setTimestamps(videoElement, presenceData);

		if (showButtons) {
			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: document.location.href,
				}
			];
		}
	}
}

function setTimestamps(element: HTMLAudioElement | HTMLVideoElement, presenceData: PresenceData): void {
	delete presenceData.startTimestamp;
	presenceData.endTimestamp = presence.getTimestampsfromMedia(element)[1];
	if (element.paused) {
		delete presenceData.endTimestamp;
		presenceData.smallImageKey = Assets.Pause;
	} else 
		presenceData.smallImageKey = Assets.Play;
}

interface QueryParams {
    [key: string]: string;
}

function parseQueryParams(): QueryParams {
    const queryParams: QueryParams = {},
	queryString = window.location.search.split("?")[1];

    if (queryString) {
        const pairs = queryString.split("&");

        for (const pair of pairs) {
            const keyValue = pair.split("=");
            queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1] || "");
        }
    }

    return queryParams;
}

function getRootUrl(): string {
    return `${document.location.protocol}//${document.location.hostname}${document.location.port ? `:${document.location.port}` : ""}`;
}