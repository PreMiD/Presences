const presence = new Presence({
		clientId: "1322565714128797798",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://img.sflix2.to/xxrz/400x400/100/66/35/66356c25ce98cb12993249e21742b129/66356c25ce98cb12993249e21742b129.png",
}

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on("iFrameData", (data: { duration: number, currentTime: number, paused: boolean }) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		type: ActivityType.Watching,
		startTimestamp: browsingTimestamp,
	},

	[ thumbnail, privacy ] = await Promise.all([
		presence.getSetting<boolean>("thumbnail"),
		presence.getSetting<boolean>("privacy"),
	]),

	variables = await presence.getPageVariable("currPage");

	switch (variables.currPage) {
		case "": {
			presenceData.details = "Searching";
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			presenceData.state = privacy ? "" : `${document.querySelector("h2[class*='cat-heading']").textContent.split('"')[1] || document.querySelector("h2[class*='cat-heading']").textContent}`; 
			break;
		}
		case "home_search":
		case "home": {
			presenceData.details = "Browsing";
			presenceData.state = "Home";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Browsing";
			break;
		}
		case "detail": {
			presenceData.details = "Browsing";
			presenceData.state = privacy ? "" : document.querySelector(".heading-name")?.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Browsing";
			break;
		}
		case "watch": {

			const showTitle = document.querySelector(".heading-name").textContent,
				thumbnailURL = document.querySelector(`img[title*="${showTitle}"]`)?.getAttribute("src");
			
			presenceData.details = privacy ? "Watching" : `${showTitle}`;
			presenceData.state = privacy ? "" : `${document.querySelector(".on-air div h3")?.textContent || ""}`;
			presenceData.largeImageKey = (thumbnail && thumbnailURL && !privacy) ? thumbnailURL : Assets.Logo;
			

			if (!video.paused) {
				const timestamps = presence.getTimestamps(video.currentTime, video.duration);
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Playing";
				if (!privacy) {
					presenceData.startTimestamp = timestamps[0];
					presenceData.endTimestamp = timestamps[1];
				}
			} else {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "Paused";
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
			break;
		}
	}
	presence.setActivity(presenceData);
});
