import { QueryParams, IFrameData } from "./interfaces";

const presence = new Presence({
		clientId: "1240164154682249227",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	logo = "https://i.ibb.co/hCK6Lj3/dropout-logo.png";

let duration: number, currentTime: number, paused: boolean, playback: boolean;

presence.on("iFrameData", (data: IFrameData) => {
	playback = data.duration ? true : false;
	if (playback) ({ duration, currentTime, paused } = data);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		showButtons = await presence.getSetting<boolean>("buttons"),
		path = pathname.split("/");

	path.shift();
	if (pathname.endsWith("/")) path.pop();

	getDetails(presenceData, path, showButtons, href);
	presence.setActivity(presenceData);
});

function getDetails(
	presenceData: PresenceData,
	path: string[],
	showButtons: boolean,
	href: string
): void {
	switch (path[0].toLowerCase()) {
		case "browse":
			presenceData.details = "Browsing home page";
			break;
		case "continue-watching":
			presenceData.details = "Browsing Continue Watching playlist";
			break;
		case "my-list":
			presenceData.details = "Browisng my list";
			break;
		case "new-releases":
			presenceData.details = "Browsing new releases";
			break;
		case "recommended-new-shelf":
			presenceData.details = "Browsing trending page";
			break;
		case "series":
			presenceData.details = "Browsing series";
			break;
		case "search":
			getSearchDetails(presenceData);
			break;
		default:
			getVideoDetails(presenceData, showButtons, href);
	}
}

function getSearchDetails(presenceData: PresenceData): void {
	presenceData.details = "Searching for:";
	presenceData.state = parseQueryParams().q || "...";
	presenceData.smallImageKey = Assets.Search;
}

function getVideoDetails(
	presenceData: PresenceData,
	showButtons: boolean,
	href: string
): void {
	const mainSelector = "main > section > section > div > div > div",
		seriesNameElement = document.querySelector(`${mainSelector} > h1`);

	if (seriesNameElement !== null) {
		// Viewing a series
		const selectElement = document.querySelector(
			`${mainSelector} > form:nth-child(1) > select`
		) as HTMLSelectElement;
		presenceData.details = "Viewing a series";

		if (selectElement === null)
			presenceData.state = seriesNameElement.textContent.trim();
		else {
			presenceData.state = `${seriesNameElement.textContent.trim()}: ${selectElement.options[
				selectElement.selectedIndex
			].textContent.trim()}`;
		}
			
		if (showButtons) {
			presenceData.buttons = [
				{
					label: "View Series",
					url: href,
				},
			];
		}
	} else {
		const videoInfoString = "#watch-info > div > div > div > div > div",
			videoNameElement = document.querySelector(`${videoInfoString} > h1`),
			seriesLinkElement = document.querySelector(`${videoInfoString} > h3 > a`),
			episodeElement = document.querySelector(`${videoInfoString} > h5 > a`);

		if (!videoNameElement) return;
		presenceData.details = videoNameElement.textContent.trim();

		if (!seriesLinkElement && !episodeElement) {
			//no series name or episode indicator
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Watch Video",
						url: href,
					},
				];
			}
		} else if (!seriesLinkElement && episodeElement) {
			//no series, has episode indicator
			presenceData.state = episodeElement.textContent.trim();

			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Watch Video",
						url: href,
					},
					{
						label: "View Series",
						url: episodeElement.getAttribute("href"),
					},
				];
			}
		} else if (seriesLinkElement && episodeElement) {
			//has series and episode indicator
			const match = episodeElement.textContent.trim().match(/(\d+)[^\d]+(\d+)/);

			presenceData.state = seriesLinkElement.textContent.trim();

			if (match) {
				presenceData.details = `S${match[1]}E${
					match[2]
				}: ${videoNameElement.textContent.trim()}`;
			}

			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Watch Episode",
						url: href,
					},
					{
						label: "View Series",
						url: getUrl(seriesLinkElement.getAttribute("href")),
					},
				];
			}
		}

		setTimestamps(presenceData);
	}
}

function setTimestamps(presenceData: PresenceData): void {
	delete presenceData.startTimestamp;
	presenceData.endTimestamp = presence.getTimestamps(currentTime, duration)[1];
	if (paused) {
		delete presenceData.endTimestamp;
		presenceData.smallImageKey = Assets.Pause;
	} else presenceData.smallImageKey = Assets.Play;
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

function getUrl(url: string): string {
	if (url.startsWith("/")) return getRootUrl() + url;
	else return url;
}

function getRootUrl(): string {
	return `${document.location.protocol}//${document.location.hostname}${
		document.location.port ? `:${document.location.port}` : ""
	}`;
}
