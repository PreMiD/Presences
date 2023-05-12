const presence = new Presence({
	clientId: "660519861742731264",
});

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

let oldLang: string,
	newLang: string,
	strings: Awaited<ReturnType<typeof getStrings>>,
	timestamp: number;

presence.on("UpdateData", async () => {
	const path = window.location.pathname.split("/").slice(1),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Fm5zIJW.png",
		};

	oldLang = newLang;
	newLang = await presence.getSetting<string>("lang").catch(() => "en");
	if (!strings || oldLang !== newLang) strings = await getStrings(newLang);

	switch (path[0]) {
		// Search
		case "search":
			presenceData.details = new URLSearchParams(window.location.search).get(
				"term"
			);
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("h1").textContent;
			presenceData.smallImageText = strings.search;
			presenceData.smallImageKey = Assets.Search;
			break;
		// Privacy policy, Imprint
		case "c":
			presenceData.details = document.title;
			break;
		// Startpage, Radio station, Region, Unknown
		default: {
			const region = [
					...document.querySelectorAll<HTMLAnchorElement>(".region-btn"),
				]
					.find(e => e.classList.contains("active"))
					.pathname?.slice(1),
				station =
					document.querySelector<HTMLSpanElement>(".song-name")?.textContent;

			if (region && path[0] === region) {
				presenceData.details =
					document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
					document.title;
			} else if (station) {
				// Check if the playing icon is shown
				if (
					document.querySelector<HTMLDivElement>(".playbutton-global-playing")
				) {
					// Radio is playing / buffering
					timestamp ||= Date.now();

					presenceData.details = station;
					presenceData.largeImageKey = (
						document.querySelector<HTMLAnchorElement>(
							"#player-station-logo-link"
						).children[0] as HTMLImageElement
					).src;
					presenceData.smallImageText = strings.play;
					presenceData.smallImageKey = Assets.Play;
					presenceData.startTimestamp = timestamp;
				} else {
					// Radio is paused
					timestamp = 0;

					presenceData.details = station;
					presenceData.largeImageKey = (
						document.querySelector<HTMLAnchorElement>(
							"#player-station-logo-link"
						).children[0] as HTMLImageElement
					).src;
					presenceData.smallImageText = strings.pause;
					presenceData.smallImageKey = Assets.Pause;
				}
			}
			break;
		}
	}

	presence.setActivity(presenceData);
});

async function getStrings(lang: string) {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			search: "general.searching",
			browsing: "general.browsing",
		},
		lang
	);
}
