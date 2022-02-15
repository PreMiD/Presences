const presence = new Presence({
		clientId: "543380687466528772"
	}),
	browsingStamp = Math.floor(Date.now() / 1000),
	urlpath = document.location.pathname.split("/"),
	getElement = (query: string): string | undefined => {
		return document.querySelector(query)?.textContent;
	},
	getEpisode = (query: string): string | undefined => {
		return document
			.querySelector(query)
			?.textContent.split("E")[1]
			.replace(/- Bstation/gi, "");
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "icon",
			details: "Idle"
		},
		path = document.location.pathname.toLowerCase();

	// Main Site

	if (path === "/en" || path === "/vi" || path === "/th" || path === "/id") {
		presenceData.smallImageKey = "idle";
		presenceData.details = "Currently browsing";
		presenceData.state = "Homepage";
	} else if (path.search("/play") > -1) {
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = "Watching a show";
		const nameandep = document.querySelectorAll("span.breadcrumb__item-text");
		presenceData.details = `${(nameandep)[0]?.textContent}`;
		presenceData.state = `${(nameandep)[1]?.textContent}`;
		presenceData.startTimestamp = browsingStamp;
		presenceData.buttons = [
			{
				label: "Watch this show",
				url: `https://www.bilibili.tv/${urlpath[1]}/play/${urlpath[3]}`
			}
		];
	} else if (path.search("/video") > -1) {
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = "Watching a video";
		presenceData.details = getElement("h1.video-info__title");
		presenceData.state = `by ${getElement(".video-info__creator--nickname")}`;
		presenceData.startTimestamp = browsingStamp;
		presenceData.buttons = [
			{
				label: "Watch this video",
				url: `https://www.bilibili.tv/${urlpath[1]}/video/${urlpath[3]}`
			}
		];
	} else if (path.search("/space") > -1) {
		presenceData.smallImageText = "Viewing Space";
		presenceData.details = `Viewing ${getElement("h1.user-title")}`;
		presenceData.state = getElement("p.user-data__number");
		presenceData.buttons = [
			{
				label: "View this creator",
				url: `https://www.bilibili.tv/${urlpath[1]}/space/${urlpath[3]}`
			}
		];
	} else if (path.search("/index") > -1) {
		presenceData.details = "Finding a show";
		presenceData.state = "Index";
	} else if (path.search("/popular") > -1) {
		presenceData.details = "Finding popular videos";
		presenceData.state = "Videos";
	} else if (path.search("/history") > -1) {
		presenceData.details = "Looking at their history";
		presenceData.state = "History";
	} else if (path.search("/download") > -1) {
		presenceData.details = "App Download";
		presenceData.state = "Download";
	} else if (path.search("/search-result") > -1) {
		const urlParams = new URLSearchParams(window.location.search);
		const myParam = urlParams.get('q');
		presenceData.details = "Search Result";
		presenceData.state = `Finding: ${myParam}`;
	}

	// Studio
	if (document.location.hostname === "studio.bilibili.tv") {
		if (path.startsWith("/archive/new")) {
			presenceData.details = "Uploading a video";
			presenceData.state = "Bilibili Studio";
		} else if (path.startsWith("/archive-list")) {
			presenceData.details = "Viewing uploaded videos";
			presenceData.state = "Bilibili Studio";
		} else if (path.startsWith("/data-analysis")) {
			presenceData.details = "Checking analytics";
			presenceData.state = "Bilibili Studio";
		} else if (path.startsWith("/reply")) {
			presenceData.details = "Replying to comments";
			presenceData.state = "Bilibili Studio";
		} else {
			presenceData.details = "Viewing dashboard";
			presenceData.state = "Bilibili Studio";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
