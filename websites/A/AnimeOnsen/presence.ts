/* eslint-disable no-one-time-vars/no-one-time-vars */
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
	[, page] = window.location.pathname.split("/"),
	qs = document.querySelector.bind(document),
	initMillis = Date.now(),
	rpaImage = {
		general: {
			account: "icon-g-account",
			browse: "icon-g-browse",
			read: "icon-g-read",
			search: "icon-g-search",
		},
		player: { play: "icon-p-play", pause: "icon-p-pause" },
	},
	toProperCase = (str: string) => str[0].toUpperCase() + str.slice(1);
let playerData: PlayerData,
	pageLoaded = false;

presence.info("PreMiD extension has loaded");

function updateData() {
	if (/^watch$/i.test(page)) {
		const player = <HTMLVideoElement>qs("div.ao-player-media video"),
			title = qs("span.ao-player-metadata-title").textContent,
			episode = Number(
				qs('meta[name="ao-content-episode"]').getAttribute("content")
			),
			[currentEpisodeOption] = (<HTMLSelectElement>(
				qs("select.ao-player-metadata-episode")
			)).selectedOptions,
			{ paused, currentTime: progress, duration } = player,
			snowflake = presence.getTimestamps(progress, duration);
		playerData = {
			time: { progress, duration, snowflake },
			title,
			episode,
			episodeName: currentEpisodeOption.textContent,
			playbackState: paused ? "paused" : "playing",
		};
		if (document.body.contains(player) && !pageLoaded) pageLoaded = true;
	} else pageLoaded = true;
}
setInterval(updateData, 1e3);

presence.on("UpdateData", () => {
	if (!pageLoaded) return;
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/O99W6aY.png",
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
				rpaImage.player[playbackState === "paused" ? "pause" : "play"];
			presenceData.smallImageText = `Watching - ${toProperCase(playbackState)}`;
			presenceData.details = title;
			presenceData.state = episodeName || "";
			presenceData.startTimestamp = time.snowflake[0];
			presenceData.endTimestamp = time.snowflake[1];
			presenceData.buttons = [{ label: "Watch", url: episodeUrl.href }];
			break;
		}
		case "genre": {
			const genre = qs("div.content-result span i").textContent;
			presenceData.details = `Genre: ${genre}`;
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
			const title = qs('div.title span[lang="en"]').textContent;
			presenceData.details = `Viewing ${title}`;
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
