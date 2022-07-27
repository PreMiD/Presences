const presence = new Presence({
	clientId: "463151177836658699",
});

let prevTitleAuthor = "",
	presenceData: PresenceData,
	mediaTimestamps: [number, number],
	oldPath: string,
	startTimestamp: number,
	videoListenerAttached = false;

presence.on("UpdateData", async () => {
	const [showButtons, showTimestamps, showCover, hidePaused, showBrowsing,privacyMode] =
			await Promise.all([
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
			const videoListener = () => {
				mediaTimestamps = presence.getTimestampsfromMedia(videoElement);
				//* Don't ask me why the above function doesn't floor the end timestamp
				mediaTimestamps[1] = Math.floor(mediaTimestamps[1]);
			}

			//* If video scrobbled, update timestamps
			videoElement.addEventListener("seeked", videoListener);
			//* If video resumes playing, update timestamps
			videoElement.addEventListener("play", videoListener);

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
		if (privacyMode) return mediaSession.playbackState === "playing" ?presence.setActivity( {
			largeImageKey: "ytm_lg",
			details: "Listening to music"
		}) : presence.setActivity()

		if (
			!mediaSession.metadata?.title ||
			//* Check if the video has a duration
			isNaN(videoElement.duration)
		)
			return;

		if (
			prevTitleAuthor !==
			mediaSession.metadata.title + mediaSession.metadata.artist
		) {
			mediaTimestamps = presence.getTimestampsfromMedia(videoElement);
			//* Don't ask me why the above function doesn't floor the end timestamp
			mediaTimestamps[1] = Math.floor(mediaTimestamps[1]);

			prevTitleAuthor =
				mediaSession.metadata.title + mediaSession.metadata.artist;
		}

		const albumArtistBtnLink = mediaSession.metadata.album
			? [...document.querySelectorAll<HTMLAnchorElement>(".byline a")].at(-1)
					?.href
			: document.querySelector<HTMLAnchorElement>(".byline a")?.href;

		const buttons:[ButtonData,ButtonData?] = [
			{
				label: "Listen Along",
				url: `https://music.youtube.com/watch?v=${watchID}`,
			}
		];

		if (albumArtistBtnLink)
			buttons.push({
				label: `View ${mediaSession.metadata.album ? "Album" : "Artist"}`,
				url: albumArtistBtnLink,
			});

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
		if (privacyMode) return presence.setActivity({
			largeImageKey: "ytm_lg",
			details: "Browsing YouTube Music"
		})

		if (oldPath !== document.location.pathname) {
			oldPath = document.location.pathname;
			startTimestamp = Math.floor(Date.now() / 1000);
		}

		presenceData = {
			largeImageKey: "ytm_lg",
			details: "Browsing...",
			startTimestamp,
		};

		if (document.location.pathname === "/")
			presenceData.details = "Browsing Home...";

		if (document.location.pathname === "/explore")
			presenceData.details = "Browsing Explore...";

		if (document.location.pathname.match(/\/library\//)) {
			presenceData.details = "Browsing Library:";
			presenceData.state = document.querySelector(
				"#tabs .iron-selected .tab"
			).textContent;
		}

		if (document.location.pathname.match(/^\/playlist/)) {
			presenceData.details = "Browsing Playlist:";

			if (document.location.search === "?list=LM")
				presenceData.state = "Liked Music";
			else {
				presenceData.state =
					document.querySelector(".metadata .title").textContent;

				presenceData.buttons = [
					{
						label: "Show Playlist",
						url: document.location.href,
					},
				];
			}

			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("#thumbnail img").src;
			presenceData.smallImageKey = "ytm_lg";
		}

		if (document.location.pathname.match(/^\/search/)) {
			presenceData.details = "Searching:";
			presenceData.state = document.querySelector<HTMLInputElement>(
				".search-container input"
			).value;

			presenceData.buttons = [
				{
					label: `Search ${presenceData.state}`,
					url: document.location.href,
				},
			];
		}

		if (document.location.pathname.match(/^\/channel/)) {
			presenceData.details = "Browsing Channel:";
			presenceData.state = document.querySelector("#header .title").textContent;

			presenceData.buttons = [
				{
					label: "Show Channel",
					url: document.location.href,
				},
			];
		}

		if (document.location.pathname.match(/^\/new_releases/)) {
			presenceData.details = "Browsing New Releases...";

			presenceData.buttons = [
				{
					label: "Show New Releases",
					url: document.location.href,
				},
			];
		}

		if (document.location.pathname.match(/^\/charts/)) {
			presenceData.details = "Browsing Charts...";

			presenceData.buttons = [
				{
					label: "Show Charts",
					url: document.location.href,
				},
			];
		}

		if (document.location.pathname.match(/^\/moods_and_genres/)) {
			presenceData.details = "Browsing Moods & Genres...";

			presenceData.buttons = [
				{
					label: "Show Moods & Genres",
					url: document.location.href,
				},
			];
		}
	}

	if (!showBrowsing) return presence.clearActivity();

	//* For some bizarre reason the timestamps are NaN eventho they are never actually set in testing, this spread is a workaround
	presenceData ? presence.setActivity({...presenceData}) : presence.setActivity();
});
