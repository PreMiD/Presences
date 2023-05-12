const presence = new Presence({
		clientId: "859440340683325491",
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

let data: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

presence.on(
	"iFrameData",
	async (recievedData: {
		currTime: number;
		duration: number;
		paused: boolean;
	}) => {
		data = recievedData;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SPMSZxI.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");

	if (pathname === "/" || pathname === "/home")
		presenceData.details = "Exploring Zoro.to";
	else if (
		/\/(most-favorite|most-popular|movie|recently-added|recently-updated|tv|top-airing|top-upcoming|ona|ova|special|(genre\/.*))/.test(
			pathname
		)
	) {
		const heading = document.querySelector<HTMLHeadElement>("h2.cat-heading");
		if (heading) presenceData.details = `Looking at ${heading.textContent}`;
	} else if (pathname.startsWith("/news")) {
		presenceData.details = "Looking at Anime news";
		if (pathname !== "/news") {
			const title = document.querySelector<HTMLHeadingElement>("h2.news-title");
			if (title) presenceData.state = title.textContent;
		}
	} else if (pathname === "/search") {
		presenceData.details = "Searching";
		presenceData.state = search.substring(9);
	} else if (pathname.startsWith("/user")) {
		const profile = document.querySelector<HTMLDivElement>("div.ph-title"),
			link = document
				.querySelector<HTMLUListElement>("ul.nav.nav-tabs.pre-tabs")
				.querySelector<HTMLAnchorElement>("a.nav-link.active");
		if (profile) presenceData.details = `Viewing User: ${profile.textContent}`;
		if (link) presenceData.state = `At ${link.textContent}`;
	} else if (
		pathname.startsWith("people") ||
		pathname.startsWith("character")
	) {
		const name = document.querySelector<HTMLHeadingElement>("h4.name");
		if (name) {
			presenceData.details = `Looking at ${
				pathname.startsWith("/people") ? "People" : "Character"
			}`;
			presenceData.state = name.textContent;
		}
	} else if (pathname.startsWith("/az-list")) {
		presenceData.details = "Looking at Anime list";
		if (pathname !== "/az-list") {
			presenceData.state = `Titles starting with ${
				pathname.substring(9) === "other"
					? "Other characters"
					: `${pathname.substring(9)}`
			}`;
		}
	} else if (pathname.startsWith("/watch2gether/")) {
		if (pathname === "/watch2gether/")
			presenceData.details = "Looking for anime rooms";
		else {
			const filmName =
				document.querySelector<HTMLHeadingElement>("h2.film-name");
			presenceData.details = "In a room";
			if (filmName) presenceData.state = `Watching ${filmName.textContent}`;
			if (data && !data.paused) {
				[, presenceData.endTimestamp] = presence.getTimestamps(
					data.currTime,
					data.duration
				);
			}
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: href,
					},
				];
			}
		}
	} else if (pathname.startsWith("/watch")) {
		const title = document.querySelector<HTMLDataListElement>(
				"li.breadcrumb-item.dynamic-name.active"
			),
			episode = document.querySelector<HTMLSpanElement>(
				"a.ep-item.active div.ssli-order"
			);
		if (title) presenceData.details = title.textContent;
		if (episode) presenceData.state = `Episode ${episode.textContent}`;
		if (data && !data.paused) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				data.currTime,
				data.duration
			);
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch Episode",
					url: href,
				},
			];
		}
	} else if (pathname === "/events") presenceData.details = "Looking at events";
	else if (pathname.startsWith("/event/")) {
		const title = document.querySelector<HTMLDivElement>("div.title"),
			description = document.querySelector<HTMLDivElement>("div.description");
		if (title) presenceData.details = `Event: ${title.textContent}`;
		if (description) presenceData.state = description.textContent;
	} else {
		const title = document.querySelector<HTMLHeadingElement>(
			"h2.film-name.dynamic-name"
		);
		if (title) {
			presenceData.details = "Checking Synopsis";
			presenceData.state = title.textContent;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Check Synopsis",
						url: href,
					},
				];
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
