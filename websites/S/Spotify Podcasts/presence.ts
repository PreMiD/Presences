const presence = new Presence({
		clientId: "619561001234464789",
	}),
	browsingStamp = Math.floor(Date.now() / 1000),
	shortenedURLs: Record<string, string> = {};

let search: HTMLInputElement,
	recentlyCleared = 0;

async function getShortURL(url: string) {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			featured: "spotify.featured",
			bestPodcasts: "spotify.bestPodcasts",
			charts: "spotify.charts",
			genres: "spotify.genres",
			latest: "spotify.latest",
			discover: "spotify.discover",
			browse: "spotify.browse",
			podcastLike: "spotify.podcastsLike",
			artistLike: "spotify.artistsLike",
			albumLike: "spotify.albumLike",
			songLike: "spotify.songsLike",
			forMeh: "spotify.madeForYou",
			playlist: "spotify.playlists",
			viewPlaylist: "general.viewPlaylist",
			download: "spotify.download",
			viewing: "general.viewing",
			account: "general.viewAccount",
			search: "general.search",
			searchFor: "general.searchFor",
			searchSomething: "general.searchSomething",
			browsing: "general.browsing",
			listening: "general.listeningMusic",
			show: "general.viewShow",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>> = null,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	//* Update strings if user selected another language.
	const [newLang, privacy, timestamps, cover] = await Promise.all([
		presence.getSetting<string>("lang"),
		presence.getSetting<boolean>("privacy"),
		presence.getSetting<boolean>("timestamps"),
		presence.getSetting<boolean>("cover"),
	]);

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
			largeImageKey: "spotify",
		},
		albumCover = document.querySelector<HTMLAnchorElement>(
			":is(a[data-testid=cover-art-link], a[data-testid=context-link])"
		);
	let searching = false;

	if (
		!(albumCover && /\/(show|episode)\/|your-episodes\?/.test(albumCover.href))
	) {
		if (timestamps) presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "reading";
		switch (document.location.hostname) {
			case "open.spotify.com": {
				if (document.location.pathname.includes("browse/featured")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.featured;
				} else if (document.location.pathname.includes("browse/podcasts")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.bestPodcasts;
				} else if (document.location.pathname.includes("browse/charts"))
					presenceData.details = strings.charts;
				else if (document.location.pathname.includes("browse/genres"))
					presenceData.details = strings.genres;
				else if (document.location.pathname.includes("browse/newreleases"))
					presenceData.details = strings.latest;
				else if (document.location.pathname.includes("browse/discover"))
					presenceData.details = strings.discover;
				else if (document.location.pathname.includes("/search/")) {
					search = document.querySelector("input");
					searching = true;
					presenceData.details = strings.searchFor;
					presenceData.state = search.value;
					if (search.value.length <= 3) presenceData.state = "something...";

					presenceData.smallImageKey = "search";
				} else if (document.location.pathname.includes("/search")) {
					searching = true;
					presenceData.details = strings.search;
					presenceData.smallImageKey = "search";
				} else if (
					document.location.pathname.includes("collection/playlists")
				) {
					presenceData.details = strings.browse;
					presenceData.state = strings.playlist;
				} else if (
					document.location.pathname.includes("collection/made-for-you")
				) {
					presenceData.details = strings.browse;
					presenceData.state = strings.forMeh;
				} else if (document.location.pathname.includes("collection/tracks")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.songLike;
				} else if (document.location.pathname.includes("collection/albums")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.albumLike;
				} else if (document.location.pathname.includes("collection/artists")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.artistLike;
				} else if (document.location.pathname.includes("collection/podcasts")) {
					presenceData.details = strings.browse;
					presenceData.state = strings.podcastLike;
				} else if (document.location.pathname.includes("/playlist/")) {
					presenceData.details = strings.viewPlaylist;
					presenceData.state = document.querySelector(
						"div.main-view-container__scroll-node-child > section > div > div > span > button > h1"
					).textContent;
					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/show/")) {
					presenceData.details = strings.show;
					presenceData.state = document.querySelector(
						"div.main-view-container__scroll-node-child > section > div > div > h1"
					).textContent;
					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/settings")) {
					presenceData.details = strings.account;
					delete presenceData.smallImageKey;
				}

				break;
			}
			case "support.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Support Center";

				break;
			}
			case "investors.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Support Center";

				break;
			}
			case "developer.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Spotify for Developers";

				break;
			}
			case "artists.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Spotify for Artists";

				break;
			}
			case "newsroom.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Spotify for Newsroom";

				break;
			}
			case "podcasters.spotify.com": {
				presenceData.details = strings.browse;
				presenceData.state = "Spotify for Podcasters";

				break;
			}
			case "www.spotify.com": {
				if (document.location.pathname.includes("/premium")) {
					presenceData.details = strings.viewing;
					presenceData.state = "Spotify Premium";
					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/download")) {
					presenceData.details = strings.download;
					presenceData.smallImageKey = "downloading";
				} else if (document.location.pathname.includes("/account")) {
					presenceData.details = strings.account;
					delete presenceData.smallImageKey;
				}

				break;
			}
			// No default
		}
		const control = document.querySelector<HTMLButtonElement>(
			"div.player-controls__buttons > button:nth-child(3)"
		);
		if (
			document.querySelector(".now-playing-bar-hidden") !== null ||
			control === null ||
			control.dataset.testid === "control-button-play"
		) {
			if (!presenceData.details) presence.setActivity();
			else if (privacy) {
				if (searching) {
					presenceData.details = strings.searchSomething;
					delete presenceData.state;
				} else {
					presenceData.details = strings.browsing;
					delete presenceData.state;
					delete presenceData.smallImageKey;
				}
				presence.setActivity(presenceData);
			} else presence.setActivity(presenceData);
		} else {
			if (recentlyCleared < Date.now() - 1000) presence.clearActivity();

			recentlyCleared = Date.now();
		}
	} else {
		const currentTime = presence.timestampFromFormat(
				document.querySelector(".playback-bar").children[0].textContent
			),
			duration = presence.timestampFromFormat(
				document.querySelector(".playback-bar").children[2].textContent
			),
			pause =
				document
					.querySelector("[data-testid=control-button-playpause]")
					.getAttribute("aria-label") === "Play";

		presenceData.smallImageKey = pause ? "pause" : "play";
		presenceData.smallImageText = pause ? strings.pause : strings.play;
		[, presenceData.endTimestamp] = presence.getTimestamps(
			currentTime,
			duration
		);

		if (pause || !timestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (cover) {
			presenceData.largeImageKey = await getShortURL(
				albumCover.querySelector("img").src
			);
		}

		presenceData.details = document.querySelector(
			":is(a[nowplaying-track-link], a[data-testid=context-item-link"
		)?.textContent;
		presenceData.state = document.querySelector(
			":is(div[data-testid=track-info-artists], a[data-testid=context-item-info-show]"
		)?.textContent;

		if (privacy) {
			presenceData.details = strings.listening;
			delete presenceData.state;
		}

		if (presenceData.details && presenceData.state)
			presence.setActivity(presenceData);
		else presence.error("Error while getting podcast name and title");
	}
});
