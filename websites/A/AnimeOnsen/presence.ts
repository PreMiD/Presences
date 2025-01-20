interface PlayerData {
	time: {
		progress: number;
		duration: number;
		snowflake: number[];
	};
	title: string;
	episode: number;
	episodeName: string;
	playbackState: string;
}

const presence = new Presence({ clientId: "826806766033174568" }),
	[, page] = document.location.pathname.split("/"),
	qs = document.querySelector.bind(document),
	initMillis = Date.now(),
	rpaImage = {
		general: {
			account: Assets.Account,
			browse: Assets.Browse,
			read: Assets.Read,
			search: Assets.Search,
		},
		player: { play: Assets.Play, pause: Assets.Pause },
	},
	toProperCase = (str: string) => str[0].toUpperCase() + str.slice(1);
let playerData: PlayerData,
	pageLoaded = false;

presence.info("PreMiD extension has loaded");

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeOnsen/assets/logo.png",
	Account = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeOnsen/assets/0.png",
	Browse = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeOnsen/assets/1.png",
	Read = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeOnsen/assets/2.png",
}

function updateData() {
	if (/^watch$/i.test(page)) {
		const player = <HTMLVideoElement>qs("div.ao-player-media video"),
			{ paused, currentTime: progress, duration } = player;
		playerData = {
			time: {
				progress,
				duration,
				snowflake: presence.getTimestamps(progress, duration),
			},
			title: qs("span.ao-player-metadata-title").textContent,
			episode: Number(
				qs('meta[name="ao-content-episode"]').getAttribute("content")
			),
			episodeName: (<HTMLSelectElement>qs("select.ao-player-metadata-episode"))
				.selectedOptions[0].textContent,
			playbackState: paused ? "paused" : "playing",
		};
		if (document.body.contains(player) && !pageLoaded) pageLoaded = true;
	} else pageLoaded = true;
}
setInterval(updateData, 1e3);

presence.on("UpdateData", () => {
	if (!pageLoaded) return;
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		smallImageKey: rpaImage.general.browse,
		smallImageText: "Browsing",
		details: "Browsing",
		startTimestamp: initMillis,
	};
	switch (page.toLowerCase()) {
		case "watch": {
			const { title, episode, episodeName, playbackState, time } = playerData,
				episodeUrl = new URL(window.location.href);
			episodeUrl.searchParams.set("episode", episode.toString());

			presenceData.smallImageKey =
				playbackState === "paused" ? Assets.Pause : Assets.Play;

			presenceData.smallImageText = `Watching - ${toProperCase(playbackState)}`;
			presenceData.details = title;
			presenceData.state = episodeName || "";
			[presenceData.startTimestamp, presenceData.endTimestamp] = time.snowflake;
			presenceData.buttons = [{ label: "Watch", url: episodeUrl.href }];
			break;
		}
		case "genre": {
			presenceData.details = `Genre: ${
				qs("div.content-result span i").textContent
			}`;
			presenceData.smallImageKey = rpaImage.general.browse;
			presenceData.smallImageText = "Browsing";
			break;
		}
		case "genres": {
			presenceData.details = "Genres";
			presenceData.smallImageKey = rpaImage.general.browse;
			presenceData.smallImageText = "Browsing";
			break;
		}
		case "details": {
			presenceData.details = `Viewing ${
				qs('div.title span[lang="en"]').textContent
			}`;
			presenceData.smallImageKey = rpaImage.general.browse;
			presenceData.smallImageText = "Details";
			break;
		}
		case "search": {
			presenceData.details = "Searching";
			presenceData.smallImageKey = rpaImage.general.search;
			presenceData.smallImageText = "Search Page";
			break;
		}
		case "account": {
			presenceData.details = "Managing account";
			presenceData.smallImageKey = rpaImage.general.account;
			presenceData.smallImageText = "Account Page";
			break;
		}
		case "statistics": {
			presenceData.details = "Viewing Statistics";
			presenceData.smallImageKey = rpaImage.general.read;
			presenceData.smallImageText = "Reading";
			break;
		}
		default:
			break;
	}
	presence.setActivity(presenceData);
});
