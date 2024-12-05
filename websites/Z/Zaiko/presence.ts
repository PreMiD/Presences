import { IFrameData } from "./iframe";

const presence = new Presence({
		clientId: "1310622511419101235",
	}),
	getStrings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		watching: "general.watching",
		watchingLive: "general.watchingLive",
		buttonWatchStream: "general.buttonWatchStream",
		buttonViewPage: "general.buttonViewPage",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let data: IFrameData;

presence.on("iFrameData", async (receivedData: IFrameData) => {
	data = receivedData;
});

presence.on("UpdateData", async () => {
	const strings = await getStrings,
		privacy = await presence.getSetting("privacy"),
		presenceData: PresenceData = {
			type: ActivityType.Watching,
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/Z/Zaiko/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		eventId = /\/event\/(\d+)\/stream.*/.exec(document.location.pathname)?.[1];

	if (eventId) {
		if (!data) return;

		presenceData.details = strings.watchingLive;

		presenceData.smallImageKey = data.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = data.paused
			? strings.paused
			: strings.playing;

		if (!privacy) {
			const eventTitle = document
				.querySelector<HTMLHeadingElement>("h5.stream-sidebar-header-title")
				?.textContent.trim();

			presenceData.state = eventTitle;
			presenceData.largeImageText = eventTitle;

			if (data.thumbnail) presenceData.largeImageKey = data.thumbnail;
			if (!data.paused && !isNaN(data.duration)) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(data.currentTime),
						Math.floor(data.duration)
					);
			}

			presenceData.buttons = [
				{
					label: strings.buttonWatchStream,
					url: `https://zaiko.io/event/${eventId}`,
				},
			];
		}
	} else if (/(.+).zaiko.io/.test(document.location.hostname)) {
		let eventTitle, eventCover, ownerAvatar;
		if (document.querySelector(".item-page")) {
			// white background pattern e.g. 365423
			eventTitle = document
				.querySelector(
					".item-page > div > div.container > div > div.my-4.col-lg-7 > div > div > div.mb-2 > h1"
				)
				?.textContent.trim();
			eventCover = document.querySelector<HTMLImageElement>(
				".item-page > div > div.container-fluid > div > figure > img"
			)?.src;
			ownerAvatar =
				document.querySelector<HTMLImageElement>(".img-profile-logo")?.src;
		} else {
			// transparent background pattern e.g. 365603
			eventTitle = document.querySelector("h1.title-h1").textContent?.trim();
			eventCover = document.querySelector<HTMLImageElement>(
				"div.event-media > img"
			)?.src;
			ownerAvatar = document.querySelector<HTMLImageElement>(
				"#content-wrapper > header > div.base-header-nav.d-flex.align-items-center > div > a > img"
			)?.src;
		}

		if (document.location.pathname.startsWith("/item/")) {
			presenceData.details = "Browsing event page";

			if (!privacy && eventTitle) {
				presenceData.state = eventTitle;
				presenceData.largeImageKey = eventCover;
				presenceData.largeImageText = eventTitle;

				if (ownerAvatar) presenceData.smallImageKey = ownerAvatar;
				presenceData.smallImageText = document
					.querySelector<HTMLMetaElement>("meta[property='og:site_name']")
					?.content.trim();

				presenceData.buttons = [
					{
						label: strings.buttonViewPage,
						url: document.location.href,
					},
				];
			}
		} else {
			const ownerName = document.querySelector("title")?.textContent.trim();

			switch (document.location.pathname) {
				case "/":
					presenceData.details = "Browsing home page";
					break;
				case "/events":
				case "/news":
					presenceData.details = `Browsing ${document.location.pathname.slice(
						1
					)} page`;
					break;
			}

			if (!privacy) {
				presenceData.state = ownerName;
				presenceData.largeImageText = ownerName;
				if (ownerAvatar) presenceData.largeImageKey = ownerAvatar;
			}
		}
	} else if (document.location.pathname === "/")
		presenceData.details = "Browsing home page";
	else if (document.location.pathname.startsWith("/account"))
		presenceData.details = "Browsing account page";

	presence.setActivity(presenceData);
});
