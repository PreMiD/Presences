const presence = new Presence({
		clientId: "872712888375193680",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/BOh9UD4.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		buttons = await presence.getSetting<boolean>("buttons"),
		heading =
			document.querySelector<HTMLHeadingElement>(".content-hub-hero__title") ||
			document.querySelector<HTMLHeadingElement>("h1.collection-hero__title"),
		splitPath = pathname.split("/"),
		search = document.querySelector<HTMLInputElement>(
			"input.search-header__search-input"
		);

	if (search) presenceData.details = `Searching for ${search.value}`;
	else if (pathname.includes("discover"))
		presenceData.details = "Discovering videos";
	else if (heading) presenceData.details = `Looking for ${heading.textContent}`;
	else if (pathname.includes("energydrink")) {
		presenceData.details = "Looking at product info";
		const heading =
			document.querySelector<HTMLHeadingElement>("h1") ||
			document.querySelector<HTMLHeadingElement>("h2");
		if (heading) presenceData.state = heading.textContent;
	} else if (splitPath.length === 3 && splitPath[2] !== "") {
		const title =
			document.querySelector<HTMLHeadingElement>(
				".unified-story-hero__title"
			) || document.querySelector<HTMLHeadingElement>(".story-hero__title");
		if (title) {
			const video = document.querySelector("video");
			if (video) {
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.details = "Watching";
				presenceData.state = title.textContent;
			} else {
				presenceData.details = "Looking at article";
				presenceData.state = title.textContent;
			}
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Article",
					url: href,
				},
			];
		}
	} else if (splitPath.length === 3) presenceData.details = "At homepage";
	else if (pathname.includes("events")) {
		const title = document.querySelector<HTMLHeadingElement>(
			".event-hero__series-and-title__title"
		);
		if (title) {
			presenceData.details = "Looking at event";
			presenceData.state = title.textContent;
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Event",
					url: href,
				},
			];
		}
	} else if (pathname.includes("athlete")) {
		const name =
			document.querySelector<HTMLHeadingElement>(".person-hero__name");
		if (name) {
			presenceData.details = "Looking at Athlete";
			presenceData.state = name.textContent;
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Athlete",
					url: href,
				},
			];
		}
	} else if (
		pathname.includes("films") ||
		pathname.includes("videos") ||
		pathname.includes("channels") ||
		pathname.includes("live")
	) {
		const container = document.querySelector(".rbPlyr-container"),
			video = container ? container.querySelector("video") : null,
			heading =
				document.querySelector<HTMLHeadingElement>("h1.tv-hero__title") ||
				document.querySelector<HTMLHeadingElement>("h2.rbPlyr-headline"),
			subheading =
				document.querySelector<HTMLHeadingElement>("h2.tv-hero__subheading") ||
				document.querySelector<HTMLDivElement>("div.rbPlyr-subheadline"),
			live = pathname.includes("channels");

		if (heading) presenceData.details = `Watching ${heading.textContent}`;
		if (subheading) presenceData.state = subheading.textContent;

		if (video) {
			if (!live)
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
			presenceData.smallImageText = presenceData.smallImageKey = live
				? "live"
				: video.paused
				? "pause"
				: "play";
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch Video",
					url: href,
				},
			];
		}
	}

	if (!presenceData.details) {
		/* Sometimes some elements don't load but video works, the site is weird */
		presenceData.details = document.title;
	}

	presence.setActivity(presenceData);
});
