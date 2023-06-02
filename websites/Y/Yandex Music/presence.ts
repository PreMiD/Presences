const presence = new Presence({
		clientId: "745261937092198532",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		pause: "general.paused",
	});

let presenceData: PresenceData;

function getMillisecondsFromString(timeString: string): number {
	const parsedText = timeString.split(":");
	return (Number(parsedText[0]) * 60 + Number(parsedText[1])) * 1000;
}

function isPodcast(): boolean {
	return !!document.querySelectorAll(".track__podcast")[0];
}

setInterval(async () => {
	const startedAt =
			Date.now() -
			getMillisecondsFromString(
				(document.querySelectorAll(".progress__left")[0] as HTMLElement)
					.textContent
			),
		playing =
			document.querySelectorAll(".player-controls__btn_pause").length === 2;

	let artists;
	if (isPodcast()) {
		artists = (document.querySelectorAll(".track__podcast")[0] as HTMLElement)
			.textContent;
	} else {
		artists = (document.querySelectorAll(".track__artists")[0] as HTMLElement)
			.textContent;
	}

	presenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/Y/Yandex%20Music/assets/logo.png",
		smallImageKey: playing ? "play" : "pause",
		smallImageText: playing ? (await strings).playing : (await strings).pause,
		details: (document.querySelectorAll(".track__title")[0] as HTMLElement)
			.textContent,
		state: artists,
		startTimestamp: startedAt,
		endTimestamp:
			startedAt +
			getMillisecondsFromString(
				(document.querySelectorAll(".progress__right")[0] as HTMLElement)
					.textContent
			),
	};

	if (!playing) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
}, 1000);

presence.on("UpdateData", () => {
	if (document.querySelectorAll(".track__title").length !== 0)
		presence.setActivity(presenceData);
	else presence.setActivity();
});
