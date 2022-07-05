const presence = new Presence({
		clientId: "883446187099840562",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
		search: "general.searchFor",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "tv",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.href.includes("search")) {
		presenceData.details = "Searching...";
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = (await strings).search;
	} else if (document.location.href.includes("loginSplash"))
		presenceData.details = "Viewing login page...";
	else if (document.location.href.includes("settings"))
		presenceData.details = "Viewing settings...";
	else if (document.location.href.includes("channels"))
		presenceData.details = "Browsing Channels...";
	else if (document.location.href.includes("privacy"))
		presenceData.details = "Viewing privacy policy...";
	else if (document.location.href.includes("livetv/replaytv"))
		presenceData.details = "Browsing Replay TV...";
	else if (document.location.href.includes("livetv/guide"))
		presenceData.details = "Browsing Live TV Guide...";
	else if (document.location.href.includes("livetv"))
		presenceData.details = "Browsing Live TV...";
	else if (document.location.href.includes("onDemand/FILMS"))
		presenceData.details = "Browsing Films...";
	else if (document.location.href.includes("onDemand/SERIES"))
		presenceData.details = "Browsing Series...";
	else if (document.location.href.includes("onDemand/MOVIES_CLUB"))
		presenceData.details = "Browsing Movies Club...";
	else if (document.location.href.includes("onDemand/SPORTS"))
		presenceData.details = "Browsing Sports...";
	else if (document.location.href.includes("onDemand/DOCUMENTARIES"))
		presenceData.details = "Browsing Documentaries...";
	else if (document.location.href.includes("onDemand/KIDS"))
		presenceData.details = "Browsing Kids content...";
	else if (document.location.href.includes("watchlist"))
		presenceData.details = "Viewing watchlist...";
	else presenceData.details = "Browsing...";

	if (document.querySelector("div[ng-if='showPlayer']") ? true : false) {
		const title = document.querySelector(
				".meta-title[ng-bind='details.title']"
			)?.textContent,
			{ paused, currentTime, duration } =
				document.querySelector<HTMLVideoElement>("video#arxPlayer"),
			live = document.querySelector(".meta-remain") ? true : false;

		if (!live) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;

			presenceData.endTimestamp = presence
				.getTimestamps(Math.floor(currentTime), Math.floor(duration))
				.pop();

			if (
				document.querySelector("span[ng-bind='details.seriesSubs']").textContent
					.length > 0
					? true
					: false
			) {
				presenceData.details = document.querySelector(
					"span[ng-bind='details.seriesSubs']"
				).textContent;
			} else presenceData.details = title;
		} else {
			presenceData.smallImageKey = paused ? "pause" : "live";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).live;

			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
			presenceData.details = title;
		}

		const channel = document.querySelector(
			".meta-title[ng-bind='details.channel.title']"
		)?.textContent;

		if (channel?.length !== 0) {
			if (!live) presenceData.state = `Watching on ${channel}`;
			else presenceData.state = `Live on ${channel}`;

			presenceData.largeImageKey = channel
				.split("")
				.reduce(function (a, b) {
					a = (a << 5) - a + b.charCodeAt(0);
					return a & a;
				}, 0)
				.toString();
		}

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
			presenceData.state = "Paused";
		}
	}
	presence.setActivity(presenceData);
});
