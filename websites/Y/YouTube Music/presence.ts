const presence = new Presence({
	clientId: "463151177836658699"
});

function getAuthorString(): string {
	//* Get authors
	const authors = document.querySelectorAll<HTMLAnchorElement>(
			"span yt-formatted-string.ytmusic-player-bar a"
		),
		//* Convert to js array for .map function
		authorsArray = Array.from(authors);

	//* Author tags more than one => YouTube Music Song listing with release year etc.
	if (authors.length > 1) {
		//* If song is from a channel and not a video
		if (
			document.querySelector(
				'span yt-formatted-string.ytmusic-player-bar a[href*="channel/"]'
			) &&
			!document.querySelector("ytmusic-player-page[video-mode_]")
		) {
			//* Get release year of song
			let year = document.querySelector(
				"span yt-formatted-string.ytmusic-player-bar"
			).textContent;
			year = year.slice(year.length - 4, year.length);

			//* Build output string
			return `${authorsArray
				.slice(0, authorsArray.length - 1)
				.map(a => a.textContent)
				.join(", ")} - ${
				authorsArray[authorsArray.length - 1].textContent
			} (${year})`;
		} else {
			//* Build output string
			return `${authorsArray
				.slice(0, authorsArray.length - 1)
				.map(a => a.textContent)
				.join(", ")} - ${authorsArray[authorsArray.length - 1].textContent}`;
		}
	} else {
		return (
			document.querySelector<HTMLAnchorElement>(
				"span yt-formatted-string.ytmusic-player-bar a"
			)?.textContent ??
			document.querySelector<HTMLAnchorElement>(
				"span yt-formatted-string.ytmusic-player-bar span:nth-child(1)"
			).textContent
		);
	}
}

let prevMetadata: {
	title: string;
	startedAt: number;
};

presence.on("UpdateData", async () => {
	const title = document.querySelector<HTMLElement>(
			".ytmusic-player-bar.title"
		).textContent,
		video = document.querySelector<HTMLVideoElement>(".video-stream"),
		progressBar = document.querySelector<HTMLElement>("#progress-bar"),
		repeatMode = document
			.querySelector('ytmusic-player-bar[slot="player-bar"]')
			.getAttribute("repeat-Mode_"),
		[buttons, timestamps, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover")
		]);
	if (title !== "" && !isNaN(video.duration)) {
		const endTimestamp =
				Date.now() / 1000 +
				Number(progressBar.getAttribute("aria-valuemax")) -
				Number(progressBar.getAttribute("value")),
			[, watchID] = document
				.querySelector<HTMLAnchorElement>("a.ytp-title-link.yt-uix-sessionlink")
				.href.match(/v=([^&#]{5,})/),
			presenceData: PresenceData = {
				details: title,
				state: getAuthorString(),
				largeImageKey: cover
					? document
							.querySelector<HTMLImageElement>(
								".image.style-scope.ytmusic-player-bar"
							)
							.src.replace("=w60-h60-l90", "=w600-h600-l900")
					: "ytm_lg",
				smallImageKey: video.paused
					? "pause"
					: repeatMode === "ONE"
					? "repeat-one"
					: repeatMode === "ALL"
					? "repeat"
					: "play",
				smallImageText: video.paused
					? "Paused"
					: repeatMode === "ONE"
					? "On loop"
					: repeatMode === "ALL"
					? "Playlist on loop"
					: "Playing",
				startTimestamp: prevMetadata?.startedAt,
				endTimestamp
			};

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Listen Along",
					url: `https://music.youtube.com/watch?v=${watchID}`
				}
			];
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Listen Along",
					url: `https://music.youtube.com/watch?v=${watchID}`
				}
			];
		}

		if (video.paused || !timestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		if (!prevMetadata || prevMetadata.title !== title) {
			prevMetadata = {
				title,
				startedAt: Date.now() / 1000
			};
		}

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
