const presence = new Presence({
	clientId: "463151177836658699",
});

let prevTitleAuthor = "",
	presenceData: PresenceData,
	mediaTimestamps: [number, number],
	oldPath: string,
	startTimestamp: number,
	videoListenerAttached = false,
	useTimeLeftChanged = false;

presence.on("UpdateData", async () => {
	const { pathname, search, href } = document.location,
		[
			showButtons,
			showTimestamps,
			showCover,
			hidePaused,
			showBrowsing,
			privacyMode,
			useTimeLeft,
		] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("hidePaused"),
			presence.getSetting<boolean>("browsing"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("useTimeLeft"),
		]),
		{ mediaSession } = navigator,
		watchID =
			href.match(/v=([^&#]{5,})/)?.[1] ??
			document
				.querySelector<HTMLAnchorElement>("a.ytp-title-link.yt-uix-sessionlink")
				?.href.match(/v=([^&#]{5,})/)?.[1],
		repeatMode = document
			.querySelector('ytmusic-player-bar[slot="player-bar"]')
			?.getAttribute("repeat-Mode_"),
		videoElement =
			document.querySelector<HTMLVideoElement>("video.video-stream");

	if (useTimeLeftChanged !== useTimeLeft && !privacyMode) {
		useTimeLeftChanged = useTimeLeft;
		updateSongTimestamps(useTimeLeft);
	}

	if (videoElement && !privacyMode) {
		if (!videoListenerAttached) {
			//* If video scrobbled, update timestamps
			videoElement.addEventListener("seeked", () =>
				updateSongTimestamps(useTimeLeft)
			);
			//* If video resumes playing, update timestamps
			videoElement.addEventListener("play", () =>
				updateSongTimestamps(useTimeLeft)
			);

			videoListenerAttached = true;
		}
		//* Element got removed from the DOM (eg, song with song/video switch)
	} else {
		prevTitleAuthor = "";
		videoListenerAttached = false;
	}

	presenceData = null;

	if (hidePaused && mediaSession?.playbackState !== "playing")
		return presence.clearActivity();

	if (["playing", "paused"].includes(mediaSession?.playbackState)) {
		if (privacyMode) {
			presenceData.type = ActivityType.Listening;
			return presence.setActivity({
				...(mediaSession.playbackState === "playing" && {
					largeImageKey:
						"https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/logo.png",
					details: "Listening to music",
				}),
			});
		}

		if (!mediaSession?.metadata?.title || isNaN(videoElement?.duration ?? NaN))
			return;

		if (
			prevTitleAuthor !==
			mediaSession.metadata.title +
				mediaSession.metadata.artist +
				document
					.querySelector<HTMLSpanElement>("#left-controls > span")
					?.textContent?.trim()
		) {
			updateSongTimestamps(useTimeLeft);

			if (mediaTimestamps[0] === mediaTimestamps[1]) return;

			prevTitleAuthor =
				mediaSession.metadata.title +
				mediaSession.metadata.artist +
				document
					.querySelector<HTMLSpanElement>("#left-controls > span")
					?.textContent?.trim();
		}

		const albumArtistBtnLink = mediaSession?.metadata?.album
				? [...document.querySelectorAll<HTMLAnchorElement>(".byline a")]?.at(-1)
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
				? mediaSession?.metadata?.artwork?.at(-1)?.src ??
				  "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/1.png"
				: "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/1.png",
			details: mediaSession.metadata.title,
			state: [mediaSession.metadata.artist, mediaSession.metadata.album]
				.filter(Boolean)
				.join(" - "),
			...(showButtons && {
				buttons,
			}),
			smallImageKey:
				mediaSession.playbackState === "paused"
					? Assets.Pause
					: repeatMode === "ONE"
					? Assets.RepeatOne
					: repeatMode === "ALL"
					? Assets.Repeat
					: Assets.Play,
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
			presenceData.type = ActivityType.Listening;
			return presence.setActivity({
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/logo.png",
				details: "Browsing YouTube Music",
			});
		}

		if (oldPath !== pathname) {
			oldPath = pathname;
			startTimestamp = Math.floor(Date.now() / 1000);
		}

		presenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/logo.png",
			details: "Browsing",
			startTimestamp,
		};

		if (pathname === "/") presenceData.details = "Browsing Home";

		if (pathname === "/explore") presenceData.details = "Browsing Explore";

		if (pathname.match(/\/library\//)) {
			presenceData.details = "Browsing Library";
			presenceData.state = document.querySelector(
				"#tabs .iron-selected .tab"
			)?.textContent;
		}

		if (pathname.match(/^\/playlist/)) {
			presenceData.details = "Browsing Playlist";

			if (search === "?list=LM") presenceData.state = "Liked Music";
			else {
				presenceData.state =
					document.querySelector(".metadata .title")?.textContent;

				presenceData.buttons = [
					{
						label: "Show Playlist",
						url: href,
					},
				];
			}

			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("#thumbnail img")?.src;
			presenceData.smallImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/Y/YouTube%20Music/assets/0.png";
		}

		if (pathname.match(/^\/search/)) {
			presenceData.details = "Searching";
			presenceData.state = document.querySelector<HTMLInputElement>(
				".search-container input"
			)?.value;

			presenceData.buttons = [
				{
					label: "View Search",
					url: href,
				},
			];
		}

		if (pathname.match(/^\/channel/)) {
			presenceData.details = "Browsing Channel";
			presenceData.state =
				document.querySelector("#header .title")?.textContent;

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

	presenceData.type = ActivityType.Listening;
	presence.setActivity(presenceData);
});

function updateSongTimestamps(useTimeLeft: boolean) {
	const [currTimes, totalTimes] =
		document
			.querySelector<HTMLSpanElement>("#left-controls > span")
			?.textContent?.trim()
			?.split(" / ") ?? [];

	if (useTimeLeft && currTimes && totalTimes) {
		mediaTimestamps = presence.getTimestamps(
			presence.timestampFromFormat(currTimes),
			presence.timestampFromFormat(totalTimes)
		);
	} else if (currTimes) {
		mediaTimestamps = [
			Date.now() / 1000 - presence.timestampFromFormat(currTimes),
			0,
		];
	}
}
