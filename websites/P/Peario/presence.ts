const presence = new Presence({
		clientId: "969204609845428234",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

interface Data {
	meta: {
		name: string;
	}[];
}
let cached: Data;

async function fetchWithoutVideo() {
	const split = window.location.href.split("/");
	if (!cached || !JSON.stringify(cached).includes(split[5])) {
		if (
			document.querySelector(
				"#app > div > div > div > div.loading > div > ion-icon"
			)
		)
			return;
		const fetched = await fetch(
			`https://v3-cinemeta.strem.io/meta/${split[4]}/${split[5]}.json`
		).then(x => x.json());
		cached = fetched;
		return fetched;
	} else return cached;
}
async function fetchWithVideo(video: HTMLMediaElement) {
	if (
		!cached ||
		!JSON.stringify(cached).includes(window.location.href.split("/")[5])
	) {
		const fetched = await fetch(
			`https://v3-cinemeta.strem.io/meta/movie/${
				video.getAttribute("poster").split("/")[5]
			}.json`
		).then(x => x.json());
		cached = fetched;
		return fetched;
	} else return cached;
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LPckbQY.png",
			startTimestamp: browsingTimestamp,
		},
		video = document.querySelector<HTMLVideoElement>(
			"#app > div > div > div > div.player > video"
		),
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy && !video) presenceData.details = "Browsing...";
	else if (privacy && video) presenceData.details = "Watching...";
	else if (document.querySelector("#addons")) presenceData.details = "Addons";
	else if (
		document.querySelector(
			"#app > div.modal > div.inner > div.title.secondary > ion-icon"
		)
	)
		presenceData.details = "Settings";
	else if (page.includes("search")) {
		const search = document.querySelector<HTMLInputElement>(
			"#app > div > div > div > div > input"
		);
		if (search?.value) {
			presenceData.details = "Searching for:";
			presenceData.state = search.value;
		} else presenceData.details = "Browsing...";
	} else if (page.includes("stream") || page.includes("room")) {
		presenceData.buttons = [
			{
				label: "Join Room",
				url: document.location.href,
			},
		];
		if (
			document.querySelector(
				"#app > div > div > div > div.player > div.lock-screen > div > button"
			)
		)
			presenceData.details = "Waiting...";
		else if (video) {
			delete presenceData.startTimestamp;
			const fetched = await fetchWithVideo(video);
			if (fetched) presenceData.details = fetched.meta.name;
			presenceData.smallImageText = `${
				document.querySelector("#app > div > div > div > div.users.show > div")
					.textContent
			} Viewers`;
			if (video.paused || isNaN(video.duration)) {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = Assets.Pause;
			} else {
				presenceData.smallImageKey = Assets.Play;
				presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			}
		} else {
			const fetched = await fetchWithoutVideo();
			if (fetched) presenceData.details = fetched.meta.name;
		}
	} else presenceData.details = "Browsing...";
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
