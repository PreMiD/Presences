const presence = new Presence({
		clientId: "969204609845428234"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let cached: JSON;

async function fetchWithoutVideo() {
	if (
		!cached ||
		!JSON.stringify(cached).includes(window.location.href.split("/")[5])
	) {
		const fetched = await fetch(
			`https://v3-cinemeta.strem.io/meta/${
				window.location.href.split("/")[4]
			}/${window.location.href.split("/")[5]}.json`
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
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		video = document.querySelectorAll(
			"[data-v-aacedae0='']"
		)[2] as HTMLVideoElement,
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons")
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
				url: document.location.href
			}
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
			presenceData.buttons = [
				{
					label: `Join Room ${fetched}`,
					url: document.location.href
				}
			];
			if (video.paused || isNaN(video.duration)) {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = "pause";
			} else {
				presenceData.smallImageKey = "play";
				presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			}
		} else {
			const fetched = await fetchWithoutVideo();
			let title;
			if (fetched) title = fetched.meta.name;
			presenceData.details = title;
			presenceData.buttons = [
				{
					label: `Join Room: ${title}`,
					url: document.location.href
				}
			];
		}
	}
	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
