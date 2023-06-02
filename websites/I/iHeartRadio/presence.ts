const presence = new Presence({
		clientId: "808777200119316521",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

function checkLength(string: string): string {
	if (string.length > 128) return `${string.substring(0, 125)}...`;
	else return string;
}

function parseAudioTimestamps(
	audioTime: string,
	audioDuration: string
): number[] {
	const splitAudioTime = audioTime.split(":"),
		splitAudioDuration = audioDuration.split(":"),
		startTime = Date.now();
	return [
		Math.floor(startTime / 1000),
		Math.floor(startTime / 1000) -
			parseInt(splitAudioTime[0]) * 60 +
			parseInt(splitAudioTime[1]) +
			parseInt(splitAudioDuration[0]) * 60 +
			parseInt(splitAudioDuration[1]),
	];
}

let elapsed = Math.floor(Date.now() / 1000),
	title,
	author,
	song,
	subtitle;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/I/iHeartRadio/assets/logo.png",
	};
	if (!document.querySelector('[data-test="player-container"]')) {
		const playerText = document.querySelector('[data-test="player-text"]');
		if (
			!document.querySelector('[data-test="controls-container"]').children[1]
		) {
			if (
				!document.querySelector(
					'[data-test="controls-container"] [data-test-state="PLAYING"]'
				)
			) {
				title = playerText.children[0].textContent;
				song = playerText.children[1].textContent;
				author = playerText.children[2]?.textContent;
				subtitle = `${song}${author ? ` - ${author}` : ""}`;

				title = checkLength(title);
				presenceData.details = title;
				subtitle = checkLength(subtitle);
				presenceData.state = subtitle;

				presenceData.smallImageKey = "live";
				presenceData.smallImageText = (await strings).live;
				if (!elapsed) elapsed = Math.floor(Date.now() / 1000);

				presenceData.startTimestamp = elapsed;
				presence.setActivity(presenceData);
			} else {
				elapsed = null;
				presence.clearActivity();
			}
		} else {
			const [, timestamp] = document.querySelector(
				'[data-test="controls-container"]'
			).children;

			title = playerText.children[0].textContent;
			song = playerText.children[1].textContent;
			author = playerText.children[2]?.textContent;
			subtitle = `${song}${author ? ` - ${author}` : ""}`;

			const parsedTimestamps = parseAudioTimestamps(
					timestamp.children[0].textContent,
					timestamp.children[2].textContent
				),
				paused = !!document.querySelector('[data-test="play-icon"]');

			title = checkLength(title);
			presenceData.details = title;
			subtitle = checkLength(subtitle);
			presenceData.state = subtitle;
			(presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play),
				(presenceData.smallImageText = paused
					? (await strings).pause
					: (await strings).play),
				([presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(parsedTimestamps[0], parsedTimestamps[1]));

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			presence.setActivity(presenceData);
		}
	} else {
		presenceData.details = "Browsing...";
		presence.setActivity(presenceData);
	}
});
