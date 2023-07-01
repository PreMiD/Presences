const presence = new Presence({
		clientId: "969208766807547917",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let search: HTMLInputElement, cached: { id: string; name: string };

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			browsing: "general.browsing",
			searchFor: "general.searchFor",
			searchSomething: "general.searchSomething",
			genre: "general.genre",
			buttonWatchVideo: "general.buttonWatchVideo",
			viewHome: "general.viewHome",
		},
		"en"
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>;

async function cacheIt(type: string, contentID: string) {
	if (!cached || !cached.id || cached.id !== contentID) {
		const fetched = await fetch(
			`https://v3-cinemeta.strem.io/meta/${type.toLowerCase()}/${contentID}.json`
		).then(x => x.json());
		cached = { id: await fetched.meta.id, name: await fetched.meta.name };
		return cached;
	} else return cached;
}
function lowerCaseIt(str: string | null) {
	if (str) return str.toLowerCase();
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/S/Stremio/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ hash, hostname, href } = document.location,
		[privacy, thumbnails, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("thumbnails"),
			presence.getSetting<boolean>("buttons"),
		]),
		sorted = document.querySelector('[title="Select catalog"]')?.textContent;

	if (!strings) strings = await getStrings();

	if (hostname === "web.stremio.com") {
		search =
			document.querySelector('[title="search videos"] > input') ||
			document.querySelector('[placeholder="Search or paste link"]');
		if (search?.value) {
			presenceData.details = !privacy
				? strings.searchFor
				: strings.searchSomething;
			presenceData.smallImageKey = Assets.Search;
			presenceData.state = search.value;
			presence.setActivity(presenceData);
			return;
		}
		switch (hash.split("/")[1]) {
			case "addons": {
				const type = lowerCaseIt(
					document.querySelector('[title="Select type"]')?.textContent
				);
				presenceData.details = !privacy
					? `Browsing ${lowerCaseIt(sorted).replace(" addons", "")} addons`
					: "Browsing addons";
				presenceData.state = type === "all" ? "" : `For ${type}`;
				break;
			}
			case "settings": {
				presenceData.details = !privacy
					? `Viewing ${lowerCaseIt(
							document.querySelector(
								'[class*="side-menu-button-vbkJ1 selected-"]'
							)?.textContent
					  )} settings`
					: "Viewing their settings";
				break;
			}
			case "library": {
				presenceData.details = "Viewing their library";
				break;
			}
			case "discover": {
				const genre = document.querySelector(
					'[title="Select genre"]'
				)?.textContent;
				presenceData.details = !privacy
					? `Browsing ${lowerCaseIt(
							document.querySelector('[title="Select type"]')?.textContent
					  )}s`
					: "Browsing content";
				presenceData.state =
					sorted && genre !== "Select genre"
						? `Sorted by: ${lowerCaseIt(sorted)} | ${
								strings.genre
						  }: ${lowerCaseIt(genre)}`
						: sorted
						? `Sorted by: ${lowerCaseIt(sorted)}`
						: `${strings.genre}: ${lowerCaseIt(genre)}`;
				presenceData.buttons = [
					{
						label: "Browse",
						url: href,
					},
				];
				break;
			}
			case "detail": {
				if (!href.includes("yt_id")) {
					presenceData.largeImageKey = document
						.querySelector('[class*="logo-"]')
						?.getAttribute("src");
				}
				const type = hash.match(/(movie(s)?)|(serie(s)?)|(channel(s)?)/gm)?.[0];
				presenceData.details = !privacy
					? `Viewing a ${type ?? "unknown"}`
					: `Browsing a ${type ?? "unknown"}`;
				presenceData.state =
					document
						.querySelector("[class*='selected meta-item-container-']")
						?.getAttribute("title") ??
					document.querySelector('[class*="logo-"]')?.getAttribute("title") ??
					(await cacheIt(type, hash.split("/")[3])).name;
				presenceData.buttons = [
					{
						label: "View Content",
						url: href,
					},
				];
				break;
			}
			case "player": {
				delete presenceData.startTimestamp;
				const title = document.querySelector('[class*="title-"]')?.textContent;
				if (!href.includes("yt_id")) {
					const video = document.querySelector<HTMLVideoElement>("video");
					presenceData.details = !privacy ? title : "Watching a video";
					presenceData.largeImageKey = document
						.querySelector('[class*="logo-"]')
						?.getAttribute("src");
					if (video && !isNaN(video.duration)) {
						presenceData.smallImageKey = video.paused
							? Assets.Pause
							: Assets.Play;
						presenceData.smallImageText = video.paused
							? strings.pause
							: strings.play;
						if (!video.paused) {
							[, presenceData.endTimestamp] =
								presence.getTimestampsfromMedia(video);
						}
					}
				} else {
					presenceData.smallImageKey =
						document.querySelector('[icon="ic_play"]') ??
						document.querySelector('[title="Play"]')
							? Assets.Pause
							: Assets.Play;
					presenceData.smallImageText =
						document.querySelector('[icon="ic_play"]') ??
						document.querySelector('[title="Play"]')
							? strings.pause
							: strings.play;
					if (
						!document.querySelector('[icon="ic_play"]') ||
						!document.querySelector('[title="Play"]')
					) {
						[, presenceData.endTimestamp] = presence.getTimestamps(
							Number(
								presence.timestampFromFormat(
									document.querySelector('[class*="seek-bar-container-"]')
										?.firstElementChild?.textContent
								)
							),
							Number(
								presence.timestampFromFormat(
									document.querySelector('[class*="seek-bar-container-"]')
										?.lastElementChild?.textContent
								)
							)
						);
					}
					presenceData.details = !privacy
						? title.split(" - ")[1]
						: "Watching a video";
					presenceData.state = title.split(" - ")[0];
				}
				presenceData.buttons = [
					{
						label: strings.buttonWatchVideo,
						url: href,
					},
				];
				break;
			}
			default: {
				if (hash === "#" || hash === "#/")
					presenceData.details = strings.viewHome;
				break;
			}
		}
	} else if (hostname === "stremio.com") {
		if (hash.includes("addon-sdk")) presenceData.details = "Viewing Addon SDK";
		else if (hash.includes("contribute"))
			presenceData.details = "Contributing page";
		else if (hash.includes("community"))
			presenceData.details = "Viewing the Community";
		else if (hash.includes("technology"))
			presenceData.details = "Viewing the technology";
		else if (document.querySelector("#tos-container > h1 > strong")) {
			presenceData.details = `Reading ${
				document.querySelector("#tos-container > h1 > strong").textContent
			}`;
		} else if (
			document.querySelector("[class='active']")?.textContent !== "EN"
		) {
			presenceData.details =
				document.querySelector("[class='active']")?.textContent ??
				strings.browsing;
		}
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (privacy && presenceData.state) delete presenceData.state;
	if (!thumbnails && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
