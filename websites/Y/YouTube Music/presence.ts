const presence = new Presence({
	clientId: "463151177836658699",
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

let prevTitleAuthor = "",
	presenceData: PresenceData,
	mediaTimestamps: [number, number],
	oldPath: string,
	startTimestamp: number,
	videoListenerAttached = false;

presence.on("UpdateData", async () => {
	const { pathname, search, href } = document.location,
		[
			showButtons,
			showTimestamps,
			showCover,
			hidePaused,
			showBrowsing,
			privacyMode,
		] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("hidePaused"),
			presence.getSetting<boolean>("browsing"),
			presence.getSetting<boolean>("privacy"),
		]),
		{ mediaSession } = navigator,
		watchID = document
			.querySelector<HTMLAnchorElement>("a.ytp-title-link.yt-uix-sessionlink")
			.href.match(/v=([^&#]{5,})/)?.[1],
		repeatMode = document
			.querySelector('ytmusic-player-bar[slot="player-bar"]')
			.getAttribute("repeat-Mode_"),
		videoElement =
			document.querySelector<HTMLVideoElement>("video.video-stream");

	if (videoElement) {
		if (!videoListenerAttached) {
			//* If video scrobbled, update timestamps
			videoElement.addEventListener("seeked", updateSongTimestamps);
			//* If video resumes playing, update timestamps
			videoElement.addEventListener("play", updateSongTimestamps);

			videoListenerAttached = true;
		}
		//* Element got removed from the DOM (eg, song with song/video switch)
	} else {
		prevTitleAuthor = "";
		videoListenerAttached = false;
	}

	presenceData = null;

	if (hidePaused && mediaSession.playbackState !== "playing")
		return presence.clearActivity();

	if (["playing", "paused"].includes(mediaSession.playbackState)) {
		if (privacyMode) {
			return presence.setActivity({
				...(mediaSession.playbackState === "playing" && {
					largeImageKey: "https://i.imgur.com/31gvH2b.png",
					details: "Listening to music",
				}),
			});
		}

		if (!mediaSession.metadata?.title || isNaN(videoElement.duration)) return;

		if (
			prevTitleAuthor !==
			mediaSession.metadata.title +
				mediaSession.metadata.artist +
				document
					.querySelector<HTMLSpanElement>("#left-controls > span")
					.textContent.trim()
		) {
			updateSongTimestamps();

			if (mediaTimestamps[0] === mediaTimestamps[1]) return;

			prevTitleAuthor =
				mediaSession.metadata.title +
				mediaSession.metadata.artist +
				document
					.querySelector<HTMLSpanElement>("#left-controls > span")
					.textContent.trim();
		}

		const albumArtistBtnLink = mediaSession.metadata.album
				? [...document.querySelectorAll<HTMLAnchorElement>(".byline a")].at(-1)
						?.href
				: document.querySelector<HTMLAnchorElement>(".byline a")?.href,
			buttons: [ButtonData, ButtonData?] = [
				{
					label: "Listen Along",
					url: `https://music.youtube.com/watch?v=${watchID}`,
				},
			];

		if (albumArtistBtnLink) {
			buttons.push({
				label: `View ${mediaSession.metadata.album ? "Album" : "Artist"}`,
				url: albumArtistBtnLink,
			});
		}

		presenceData = {
			largeImageKey: showCover
				? mediaSession.metadata.artwork.at(-1).src
				: "ytm_lg",
			details: mediaSession.metadata.title,
			state: [mediaSession.metadata.artist, mediaSession.metadata.album]
				.filter(Boolean)
				.join(" - "),
			...(showButtons && {
				buttons,
			}),
			smallImageKey:
				mediaSession.playbackState === "paused"
					? "pause"
					: repeatMode === "ONE"
					? "repeat-one"
					: repeatMode === "ALL"
					? "repeat"
					: "play",
			smallImageText:
				mediaSession.playbackState === "paused"
					? "Paused"
					: repeatMode === "ONE"
					? "On loop"
					: repeatMode === "ALL"
					? "Playlist on loop"
					: "Playing",
			...(showTimestamps &&
				mediaSession.playbackState === "playing" && {
					startTimestamp: mediaTimestamps[0],
					endTimestamp: mediaTimestamps[1],
				}),
		};
	} else if (showBrowsing) {
		if (privacyMode) {
			return presence.setActivity({
				largeImageKey: "https://i.imgur.com/31gvH2b.png",
				details: "Browsing YouTube Music",
			});
		}

		if (oldPath !== pathname) {
			oldPath = pathname;
			startTimestamp = Math.floor(Date.now() / 1000);
		}

		presenceData = {
			largeImageKey: "https://i.imgur.com/31gvH2b.png",
			details: "Browsing",
			startTimestamp,
		};

		if (pathname === "/") presenceData.details = "Browsing Home";

		if (pathname === "/explore") presenceData.details = "Browsing Explore";

		if (pathname.match(/\/library\//)) {
			presenceData.details = "Browsing Library";
			presenceData.state = document.querySelector(
				"#tabs .iron-selected .tab"
			).textContent;
		}

		if (pathname.match(/^\/playlist/)) {
			presenceData.details = "Browsing Playlist";

			if (search === "?list=LM") presenceData.state = "Liked Music";
			else {
				presenceData.state =
					document.querySelector(".metadata .title").textContent;

				presenceData.buttons = [
					{
						label: "Show Playlist",
						url: href,
					},
				];
			}

			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("#thumbnail img").src;
			presenceData.smallImageKey = "ytm_lg";
		}

		if (pathname.match(/^\/search/)) {
			presenceData.details = "Searching";
			presenceData.state = document.querySelector<HTMLInputElement>(
				".search-container input"
			).value;

			presenceData.buttons = [
				{
					label: "View Search",
					url: href,
				},
			];
		}

		if (pathname.match(/^\/channel/)) {
			presenceData.details = "Browsing Channel";
			presenceData.state = document.querySelector("#header .title").textContent;

			presenceData.buttons = [
				{
					label: "Show Channel",
					url: href,
				},
			];
		}

		if (pathname.match(/^\/new_releases/)) {
			presenceData.details = "Browsing New Releases";

			presenceData.buttons = [
				{
					label: "Show New Releases",
					url: href,
				},
			];
		}

		if (pathname.match(/^\/charts/)) {
			presenceData.details = "Browsing Charts";

			presenceData.buttons = [
				{
					label: "Show Charts",
					url: href,
				},
			];
		}

		if (pathname.match(/^\/moods_and_genres/)) {
			presenceData.details = "Browsing Moods & Genres";

			presenceData.buttons = [
				{
					label: "Show Moods & Genres",
					url: href,
				},
			];
		}
	}

	if (!showBrowsing) return presence.clearActivity();

	//* For some bizarre reason the timestamps are NaN eventho they are never actually set in testing, this spread is a workaround
	presence.setActivity(presenceData);
});

function updateSongTimestamps() {
	const element = document
			.querySelector<HTMLSpanElement>("#left-controls > span")
			.textContent.trim()
			.split(" / "),
		[currTimes, totalTimes] = element;

	mediaTimestamps = presence.getTimestamps(
		presence.timestampFromFormat(currTimes),
		presence.timestampFromFormat(totalTimes)
	);
}
