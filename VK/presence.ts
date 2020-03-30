var presence = new Presence({
		clientId: "514771696134389760"
	}),
	strings;

var localeStrings = {
	en: {
		Chatting: "Browsing PM's...",
		Watching: "Watching",
		Browsing: "Browsing",
		BrowsingFeed: "Browsing feed..."
	},
	ru: {
		Chatting: "Смотрит сообщения...",
		Watching: "Смотрит",
		Browsing: "Просматривает",
		BrowsingFeed: "Смотрит ленту..."
	}
};

function getLocale() {
	return window.navigator.language.replace("-", "_").toLowerCase();
}

function getLocalizedString(stringPath) {
	if (localeStrings[getLocale()][stringPath] !== undefined) {
		return localeStrings[getLocale()][stringPath];
	} else {
		console.warn(`Language for [${stringPath}] was not found!`);
		return localeStrings["en"][stringPath];
	}
}

function getVKTrackTimeLeft(): Object {
	let playerDuration = document.querySelector(
		".audio_page_player_duration"
	) as HTMLElement;

	var timeLeft;

	if (playerDuration.innerText.startsWith("-")) {
		timeLeft = playerDuration.innerText;
	} else {
		playerDuration.click();
		timeLeft = playerDuration.innerText;
		playerDuration.click();
	}

	//* Removing the `-` symbol.
	timeLeft = timeLeft.slice(1);

	return timeLeft.split(":");
}

function getVKTrackTimePassed(): Object {
	let playerDuration = document.querySelector(
		".audio_page_player_duration"
	) as HTMLElement;

	var timePassed;

	if (!playerDuration.innerText.startsWith("-")) {
		timePassed = playerDuration.innerText;
	} else {
		playerDuration.click();
		timePassed = playerDuration.innerText;
		playerDuration.click();
	}

	return timePassed.split(":");
}

//* Returns VK track length.
function getVKTrackLength(): Object {
	var timeLeft, timePassed, overallTime;

	timeLeft = getVKTrackTimeLeft();
	timePassed = getVKTrackTimePassed();

	//* Summing minutes and seconds from time passed and left.
	overallTime = [
		Number(timePassed[0]) + Number(timeLeft[0]),
		Number(timePassed[1]) + Number(timeLeft[1])
	];

	//* Checking if overall time have more than 60 seconds and adding 1 minute if it does.
	if (Number(overallTime[1]) > 60) {
		var t1 = overallTime[0] + 1;
		var t2 = overallTime[1] - 60;

		overallTime = [t1, t2];
	}

	return overallTime;
}

var browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	if (!strings)
		strings = await presence.getStrings({
			play: "presence.playback.playing",
			pause: "presence.playback.paused"
		});

	if (
		document.location.pathname.startsWith("/audios") ||
		document.querySelector(".audio_layer_container")
	) {
		var title: string = (document.querySelector(
				".audio_page_player_title_song"
			) as HTMLElement).textContent,
			author: string = (document.querySelector(
				".audio_page_player_title_performer a"
			) as HTMLElement).textContent,
			isPlaying: boolean;

		if (document.querySelector(".audio_playing") == null) {
			isPlaying = true;
		} else {
			isPlaying = false;
		}

		var timestamps = getTimestamps(
			Math.floor(
				Number(getVKTrackTimePassed()[0]) * 60 +
					Number(getVKTrackTimePassed()[1])
			),
			Math.floor(
				Number(getVKTrackLength()[0]) * 60 + Number(getVKTrackLength()[1])
			)
		);

		var presenceData: presenceData = {
			details: title,
			state: author,
			largeImageKey: "vk_logo",
			smallImageKey: isPlaying ? "pause" : "play",
			smallImageText: isPlaying ? strings.pause : strings.play,
			startTimestamp: isPlaying ? null : timestamps[0],
			endTimestamp: isPlaying ? null : timestamps[1]
		};

		presence.setActivity(presenceData, true);
	} else if (window.location.href.match(/https:\/\/vk.com\/.*?z=video.*/)) {
		var isPlaying: boolean;

		document.querySelector(".videoplayer_ui").getAttribute("data-state") ==
		"paused"
			? (isPlaying = true)
			: (isPlaying = false);

		var videoTitle = (document.querySelector(".mv_title") as HTMLElement)
				.innerText,
			videoCurrentTime = (document.querySelector(
				"._time_current"
			) as HTMLElement).innerText.split(":"),
			videoDuration = (document.querySelector(
				"._time_duration"
			) as HTMLElement).innerText.split(":"),
			videoAuthor = (document.querySelector(".mv_author_name a") as HTMLElement)
				.innerText;

		var timestamps = getTimestamps(
			Math.floor(
				Number(videoCurrentTime[0]) * 60 + Number(videoCurrentTime[1])
			),
			Math.floor(Number(videoDuration[0]) * 60 + Number(videoDuration[1]))
		);

		var presenceData: presenceData = {
			details: getLocalizedString("Watching") + " " + videoTitle,
			state: videoAuthor,
			largeImageKey: "vk_logo",
			smallImageKey: isPlaying ? "pause" : "play",
			smallImageText: isPlaying ? strings.pause : strings.play,
			startTimestamp: isPlaying ? null : timestamps[0],
			endTimestamp: isPlaying ? null : timestamps[1]
		};

		presence.setActivity(presenceData, true);
	} else if (document.querySelector(".page_name") !== null) {
		var page_title = (document.querySelector(".page_name") as HTMLElement)
			.innerText;

		var presenceData: presenceData = {
			details: page_title,
			largeImageKey: "vk_logo",
			startTimestamp: browsingTimestamp
		};

		presence.setActivity(presenceData, true);
	} else if (document.location.pathname.startsWith("/feed")) {
		var presenceData: presenceData = {
			details: getLocalizedString("BrowsingFeed"),
			largeImageKey: "vk_logo",
			startTimestamp: browsingTimestamp
		};

		presence.setActivity(presenceData, true);
	} else if (document.location.pathname.startsWith("/im")) {
		var presenceData: presenceData = {
			details: getLocalizedString("Chatting"),
			largeImageKey: "vk_logo",
			startTimestamp: browsingTimestamp
		};

		presence.setActivity(presenceData, true);
	} else {
		browsingTimestamp = Math.floor(Date.now() / 1000);
		presence.clearActivity();
	}
});

/**
 * Get Timestamps
 */
function getTimestamps(currentTime: number, overallTime: number) {
	var startTime = Date.now();
	var endTime = Math.floor(startTime / 1000) - currentTime + overallTime;
	return [Math.floor(startTime / 1000), endTime];
}
