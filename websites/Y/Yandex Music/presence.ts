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
				document.querySelectorAll<HTMLElement>(".progress__left")[0].textContent
			),
		playing =
			document.querySelectorAll(".player-controls__btn_pause").length === 2;

	let artists;
	if (isPodcast()) {
		artists =
			document.querySelectorAll<HTMLElement>(".track__podcast")[0].textContent;
	} else {
		artists =
			document.querySelectorAll<HTMLElement>(".track__artists")[0].textContent;
	}

	const coverImageSizes = document
			.querySelector(".track")
			.querySelector<HTMLImageElement>(".entity-cover__image")
			.srcset // get all images of all sizes
			.split(", "),
		coverImage = coverImageSizes
			.at(-1) // get the last one (the best one)
			.split(" ")
			.at(0),
		largeImageKey = coverImage
			? `https:${coverImage}`
			: "https://cdn.rcd.gg/PreMiD/websites/Y/Yandex%20Music/assets/logo.png";

	presenceData = {
		largeImageKey,
		smallImageKey: playing ? Assets.Play : Assets.Pause,
		smallImageText: playing ? (await strings).playing : (await strings).pause,
		details:
			document.querySelectorAll<HTMLElement>(".track__title")[0].textContent,
		state: artists,
		startTimestamp: startedAt,
		endTimestamp:
			startedAt +
			getMillisecondsFromString(
				document.querySelectorAll<HTMLElement>(".progress__right")[0]
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
