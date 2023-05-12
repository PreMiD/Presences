const presence = new Presence({
		clientId: "1071365131616915517",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			anime: "general.anime",
			viewHome: "general.viewHome",
			viewing: "general.viewing",
			search: "general.search",
			searchFor: "general.searchFor",
			play: "general.watchingVid",
			pause: "general.paused",
			searchSomething: "general.searchSomething",
			watchVideoButton: "general.buttonWatchVideo",
			watchingSeries: "general.watchingSeries",
			watchingMovie: "general.watchingMovie",
			buttonViewPage: "general.buttonViewPage",
			viewPage: "general.viewPage",
			viewThread: "general.viewThread",
			viewProfile: "general.viewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "es")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/dtmYEl8.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.pngg",
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
}

function getImage(tags: string) {
	return document
		.querySelector<HTMLImageElement>(tags)
		?.style?.backgroundImage?.slice(4, -1)
		?.replace(/"/g, "");
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		[newLang, privacy, logo, time, buttons] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "es"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, href } = document.location,
		path = pathname.split("/")[1];

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (path) {
		case "":
			presenceData.details = strings.viewHome;
			break;

		case "discovery":
		case "trends":
		case "actors":
		case "tv-channels":
		case "categories":
		case "discussions":
		case "collections":
			presenceData.details = `${strings.viewing} ${textContent(
				".app-aside.nav-aside .active"
			)}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "movies":
		case "series":
		case "series-latino":
		case "category":
			presenceData.details = privacy
				? strings.searchSomething
				: `${strings.search} ${strings.anime}`;
			presenceData.state = textContent(".app-section > div > div");
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = strings.search;
			break;

		case "actor":
			presenceData.details = strings.viewPage;
			presenceData.state = textContent(".pl-lg-4 h1");
			presenceData.largeImageKey = getImage(".media");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "tv-channel":
			presenceData.details = `${strings.viewing} ${textContent(
				".app-aside.nav-aside .active"
			)}`;
			presenceData.state = textContent(".caption-content h1");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			if (time) presenceData.startTimestamp = browsingTimestamp;
			break;

		case "discussion":
			presenceData.details = strings.viewThread;
			presenceData.state = textContent(".forum-content h1");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "collection":
			presenceData.details = `${strings.viewing} collecciones`;
			presenceData.state = textContent(".collection-detail h1");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "profile":
			presenceData.details = `${strings.viewProfile} ${textContent(
				".profile-content .username"
			)}`;
			presenceData.state = textContent(".nav.pt-0 li .active");
			presenceData.largeImageKey =
				getImage(".profile-avatar .avatar") || Assets.Logo;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			break;

		case "search":
			presenceData.details = privacy
				? strings.searchSomething
				: `${strings.searchFor} ${textContent(".subtext").split('"')[1]}`;
			presenceData.state = textContent(".subtext").split('"')[0].slice(0, -3);
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = strings.search;
			break;

		case "serie":
			presenceData.details = `${strings.viewPage} ${strings.anime}`;
			presenceData.state =
				textContent(".pl-md-4 h1") || textContent(".caption-content a h1");
			presenceData.largeImageKey = getImage(".media");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			presenceData.buttons = [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			];

			if (!privacy && video.currentTime > 0) {
				presenceData.details = `${strings.watchingSeries} ${textContent(
					".caption-content a h1"
				)}`;
				presenceData.state = `${textContent(
					".episodes .active .active .episode"
				)} ${textContent(".episodes .active .active .name")}`;
			} else if (privacy && video.currentTime > 0)
				presenceData.details = strings.watchingSeries;
			break;

		case "movie":
			presenceData.details = `${strings.viewPage} ${strings.anime}`;
			presenceData.state = textContent(".caption-content h1");
			presenceData.largeImageKey = getImage(".media");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = strings.viewing;
			presenceData.buttons = [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			];

			if (video.currentTime > 0) presenceData.details = strings.watchingMovie;
			break;
	}

	if (!privacy && video.currentTime > 0 && path !== "tv-channel") {
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;
		presenceData.buttons = [
			{
				label: strings.watchVideoButton,
				url: href,
			},
		];

		if (video.paused || !time) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		} else {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
		}
	}

	if (!logo || privacy) presenceData.largeImageKey = Assets.Logo;
	if (!buttons || privacy) delete presenceData.buttons;
	if (!time) delete presenceData.startTimestamp;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
