type Functionlize<T> = {
	[P in keyof T]: () => T[P];
};

interface Route extends Functionlize<Partial<PresenceData>> {
	path: RegExp;
	playback?(): boolean;
	run?(): PresenceData;
}

const enum Assets {
	Logo = "https://i.imgur.com/SjtqzAF.png",
	PAUSED = "https://raw.githubusercontent.com/PreMiD/Presences/main/.resources/pause.png",
	PLAYED = "https://raw.githubusercontent.com/PreMiD/Presences/main/.resources/play.png",
	SEARCHING = "https://raw.githubusercontent.com/PreMiD/Presences/main/.resources/search.png",
	Discover = "https://raw.githubusercontent.com/PreMiD/Presences/main/.resources/reading.png",
	VIEWING = "https://raw.githubusercontent.com/PreMiD/Presences/main/.resources/viewing.png",
}

enum Settings {
	TIMESTAMP = "timestamp",
	BUTTONS = "buttons",
}

let video = { duration: 0, currentTime: 0, paused: true };

const presence = new Presence({
		clientId: "1146100707959783495",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000),
	router = ({
		path,
		presenceData,
	}: {
		path: string;
		presenceData: PresenceData;
	}): Route => {
		const routes: Route[] = [
				{
					path: /^\/my\//,
					details: () => "On Homepage",
					state: () => {
						return "Dashboard";
					},
					smallImageKey: () => Assets.Discover,
					smallImageText: () => "Browsing Courses",
				},
				{
					path: /^\/user\//,
					details: () => "Viewing a profile",
					state: () => {
						return `${
							document.querySelector("h4.breadcrumb_title").textContent
						}'s profile`;
					},
					smallImageKey: () => Assets.Discover,

					buttons: () => [
						{
							label: "Visit profile",
							url: (() => {
								return window.location.href;
							})(),
						},
					],
				},
				{
					path: /^\/mod\/hvp\/*/,

					run: () => {
						[, presenceData.endTimestamp] = presence.getTimestamps(
							Math.floor(video.currentTime),
							Math.floor(video.duration)
						);

						if (video.paused) presence.getTimestamps;

						return presenceData;
					},
					playback: () => !video.paused,
					smallImageKey: () => (video.paused ? Assets.PAUSED : Assets.PLAYED),
					smallImageText: () => (video.paused ? "Paused" : "Playing"),

					details: () => document.title,
					state: () => {
						return document.querySelector("h4.title.float-left").textContent;
					},
					buttons: () => [
						{
							label: "View Course",
							url: (() => {
								const href = document
									.querySelectorAll(
										".btn.btn-primary.ccn-btn-backtocourse.float-left"
									)[0]
									.getAttribute("href");
								return href;
							})(),
						},
					],
				},

				{
					path: /^\/course\/(.*)/,

					smallImageKey: () => Assets.VIEWING,
					smallImageText: () => "Viewing",
					details: () => "Viewing course",
					state: () => {
						return document.querySelector("h4.breadcrumb_title").textContent;
					},
					buttons: () => [
						{
							label: "View Course",
							url: (() => {
								return window.location.href;
							})(),
						},
					],
				},
				{
					path: /^\/mod\/*/,
					details: () => "Browsing Courses",
					state: () => "Choosing a Course",
					smallImageKey: () => Assets.SEARCHING,
					buttons: () => [
						{
							label: "Search with me?",
							url: (() => {
								return window.location.href;
							})(),
						},
					],
				},
				{
					path: /.*$/,
					details: () => "On Homepage",

					smallImageKey: () => Assets.SEARCHING,
					smallImageText: () => "Browsing website",
				},
			],
			matchedRoute = routes.find(route => route.path?.test(path));
		if (matchedRoute) return matchedRoute;

		return routes[routes.length - 1];
	};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [showTimestamp, showButtons] = await Promise.all([
		presence.getSetting<boolean>(Settings.TIMESTAMP),
		presence.getSetting<boolean>(Settings.BUTTONS),
	]);

	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};

	if (showTimestamp) presenceData.startTimestamp = startTimestamp;

	const route = router({
		presenceData,
		path: location.href.replace(`https://${location.hostname}`, ""),
	});

	if (!route) return presence.setActivity(presenceData);

	if (route.run) presenceData = route.run();
	if (route.state) presenceData.state = route.state();
	if (route.details) presenceData.details = route.details();
	if (showButtons && route.buttons) presenceData.buttons = route.buttons();
	if (route.largeImageKey) presenceData.largeImageKey = route.largeImageKey();
	if (route.smallImageKey) presenceData.smallImageKey = route.smallImageKey();
	if (route.smallImageText)
		presenceData.smallImageText = route.smallImageText();

	if (showTimestamp && route.endTimestamp)
		presenceData.endTimestamp = route.endTimestamp();

	presence.setActivity(presenceData, route.playback ? route.playback() : false);
});
