const presence = new Presence({
		clientId: "609220157910286346",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	});

function getTimesec(
	elapsedString = "00:00",
	durationString = "00:00",
	separator = ":"
): { elapsedSec: number; durationSec: number } {
	const elapsed = elapsedString.split(separator).map(parseInt),
		duration = durationString.split(separator).map(parseInt);

	let elapsedSec: number, durationSec: number;

	switch (elapsed.length) {
		case 3: {
			elapsedSec = elapsed[0] * 60 * 60 + elapsed[1] * 60 + elapsed[2];
			break;
		}
		case 2: {
			elapsedSec = elapsed[0] * 60 + elapsed[1];
			break;
		}
		case 1: {
			[elapsedSec] = elapsed;
			break;
		}
	}

	switch (duration.length) {
		case 3: {
			durationSec = duration[0] * 60 * 60 + duration[1] * 60 + duration[2];
			break;
		}
		case 2: {
			durationSec = duration[0] * 60 + duration[1];
			break;
		}
		case 1: {
			[durationSec] = duration;
			break;
		}
	}

	return { elapsedSec, durationSec };
}

presence.on("UpdateData", async () => {
	switch (location.hostname) {
		case "www.nicovideo.jp": {
			if (
				location.pathname.startsWith("/watch/") &&
				document.querySelector(".VideoPlayer video")
			) {
				const ownerElement =
					document.querySelector(".ChannelInfo-pageLink") ||
					document.querySelector(".VideoOwnerInfo-pageLink") ||
					null;
				let owner;
				if (ownerElement) {
					[, owner] = ownerElement.textContent.match(/(.+) さん$/) || [
						ownerElement.textContent,
					];
				} else owner = "Deleted User";

				const isPlaying = !!document.querySelector(".PlayerPauseButton"),
					presenceData: PresenceData = {
						details: document.querySelector(".VideoTitle").textContent,
						state: `${owner} - ${location.pathname.match(/..\d+$/)[0]}`,
						largeImageKey:
							"https://cdn.rcd.gg/PreMiD/websites/N/niconico/assets/logo.png",
						smallImageKey: isPlaying ? "play" : "pause",
						smallImageText: isPlaying
							? (await strings).play
							: (await strings).pause,
						startTimestamp:
							Math.floor(Date.now() / 1000) -
							Math.floor(
								document.querySelector<HTMLVideoElement>(".VideoPlayer video")
									.currentTime
							),
					};

				presence.setActivity(presenceData);
			}
			break;
		}

		case "live.nicovideo.jp":
		case "live2.nicovideo.jp": {
			if (location.pathname.startsWith("/watch/lv")) {
				const presenceData: PresenceData = {
					details: document.querySelector(
						" [class^='___program-title___'] span "
					).textContent,
					state: `${
						(
							document.querySelector("[class^='___channel-name-anchor___']") ??
							document.querySelector("[class^='___group-name-anchor___']")
						).textContent
					} - ${location.pathname.match(/lv\d+/)[0]}`,
					largeImageKey:
						"https://cdn.rcd.gg/PreMiD/websites/N/niconico/assets/logo.png",
					smallImageKey: Assets.Live,
					smallImageText: (await strings).live,
					startTimestamp:
						Math.floor(Date.now() / 1000) -
						getTimesec(
							document.querySelector(
								" span[class^='___time-score___'] span[class^='___value___'] "
							).textContent
						).elapsedSec,
				};

				presence.setActivity(presenceData);
			} else presence.clearActivity();

			break;
		}

		case "seiga.nicovideo.jp": {
			const presenceData: PresenceData = {
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/N/niconico/assets/logo.png",
			};
			if (location.pathname.startsWith("/seiga/im")) {
				presenceData.details = document.querySelector(".title").textContent;
				presenceData.state = `${
					document.querySelector("#ko_watchlist_header.user .user_name strong")
						.textContent
				} - ${location.pathname.match(/im\d+/)[0]}`;

				presence.setActivity(presenceData);
			} else if (location.pathname.startsWith("/watch/mg")) {
				presenceData.details = document.querySelector(".title").textContent;
				presenceData.state = `${
					document.querySelector(".author_name").textContent
				} - ${location.pathname.match(/mg\d+/)[0]}`;
			}
			if (presenceData.details) presence.setActivity(presenceData);
			else presence.setActivity();

			break;
		}

		default:
			presence.setActivity();
			break;
	}
});
