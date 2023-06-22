const presence = new Presence({
		clientId: "612746548631044116",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	truncateBefore = function (str: string, pattern: string): string {
		return str.slice(str.indexOf(pattern) + pattern.length);
	},
	truncateAfter = function (str: string, pattern: string): string {
		return str.slice(0, str.indexOf(pattern));
	},
	getSeconds = function (minutes: number, seconds: number): number {
		return Number(Math.floor(minutes * 60)) + Number(seconds);
	},
	pattern = ":";

let musicTitle: HTMLElement,
	minutesDuration: string,
	minutesDurationString: HTMLElement,
	secondsDuration: string,
	secondsDurationString: HTMLElement,
	currentMinutes: string,
	currentMinutesString: HTMLElement,
	currentSeconds: string,
	currentSecondsString: HTMLElement,
	duration: number,
	currentTime: number,
	play: HTMLElement,
	currentUser: HTMLElement,
	albumName: HTMLElement,
	currentArtist: HTMLElement,
	playback = false;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Unknown page",
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/A/Astiga/assets/logo.png",
	};

	currentUser = document.querySelector(
		"#jp_container_1 > div.wrapper > aside.main-sidebar > section > div > div.pull-left.info > p"
	);

	currentArtist = document.querySelector(
		"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-artist.menu-item"
	);

	musicTitle = document.querySelector(
		"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div.song-title.overflow"
	);

	albumName = document.querySelector(
		"footer > div.jp-controls > div.btn-music-container > div:nth-child(1) > div:nth-child(2) > a.song-album.menu-item"
	);

	if (musicTitle.textContent.length > 1) {
		play = document.querySelector(
			"footer > div.jp-controls > div.btn-music-container > div:nth-child(2) > a.jp-play.btn.btn-music.btn-sm"
		);

		currentMinutesString = document.querySelector(
			"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time"
		);

		currentMinutes = truncateAfter(currentMinutesString.textContent, pattern);

		currentSecondsString = document.querySelector(
			"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-current-time"
		);

		currentSeconds = truncateBefore(currentSecondsString.textContent, pattern);

		minutesDurationString = document.querySelector(
			"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration"
		);

		minutesDuration = truncateAfter(minutesDurationString.textContent, pattern);

		secondsDurationString = document.querySelector(
			"#jp_container_1 > div.wrapper > footer > div.jp-controls > div.btn-music-container > div.hidden-xs > span.jp-duration"
		);

		secondsDuration = truncateBefore(
			secondsDurationString.textContent,
			pattern
		);

		currentTime = getSeconds(
			parseInt(currentMinutes),
			parseInt(currentSeconds)
		);

		duration = getSeconds(parseInt(minutesDuration), parseInt(secondsDuration));

		if (!play.style.display || currentTime === 0) playback = false;
		else playback = true;

		const [startTimestamp, endTimestamp] = presence.getTimestamps(
			currentTime,
			duration
		);

		presenceData.details = `Song: ${musicTitle.textContent}`;

		if (
			albumName.textContent.length > 0 &&
			currentArtist.textContent.length > 0
		)
			presenceData.state = `${currentArtist.textContent} / ${albumName.textContent}`;
		else if (
			albumName.textContent.length === 0 &&
			currentArtist.textContent.length > 0
		)
			presenceData.state = `${currentArtist.textContent} / No album`;
		else if (
			albumName.textContent.length > 0 &&
			currentArtist.textContent.length === 0
		)
			presenceData.state = `No artist / ${albumName.textContent}`;
		else if (
			albumName.textContent.length === 0 &&
			currentArtist.textContent.length === 0
		)
			presenceData.state = "No artist / No album";

		presenceData.smallImageKey = playback ? Assets.Play : Assets.Pause;

		presenceData.smallImageText = playback
			? (await strings).play
			: (await strings).pause;

		presenceData.startTimestamp = startTimestamp;

		presenceData.endTimestamp = endTimestamp;

		if (playback === false) {
			delete presenceData.startTimestamp;

			delete presenceData.endTimestamp;
		}
	} else {
		presenceData.details = "No music playing.";

		presenceData.state = `Logged in user: ${currentUser.textContent}`;
	}

	presence.setActivity(presenceData);
});
