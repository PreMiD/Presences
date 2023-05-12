const presence = new Presence({
		clientId: "1023713697866199052",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/espirtf.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location;

	switch (pathname) {
		case "/jukebox_index.html": {
			presenceData.details = "Browsing";
			presenceData.state = "The Eternal Jukebox";
			break;
		}
		case "/jukebox_go.html": {
			const [, hours, mins, secs] = document
					.querySelector<HTMLSpanElement>("#time")
					.textContent.match(/(\d+):(\d+):(\d+)/)
					.map(x => +x),
				totalSeconds = hours * 3600 + mins * 60 + secs,
				title = document
					.querySelector<HTMLSpanElement>("#song-title")
					.textContent.trim();
			if (title) {
				presenceData.details = "Listening to a song";
				presenceData.state = title;
				if (totalSeconds > 0) {
					presenceData.startTimestamp =
						Math.floor(Date.now() / 1000) - totalSeconds;
				}
				presenceData.buttons = [
					{
						label: "Listen",
						url: href,
					},
					{
						label: "View source",
						url:
							(await presence.getPageletiable<string>(
								"jukeboxData.ogAudioURL"
							)) || document.querySelector<HTMLAnchorElement>("#song-url").href,
					},
				];
			} else {
				presenceData.details = "Listening to a song";
				presenceData.state = "Loading...";
			}
			break;
		}
		case "/jukebox_search.html": {
			presenceData.details = "Searching for a song";
			presenceData.state =
				document.querySelector<HTMLInputElement>("#search").value;
			break;
		}
		case "/faq.html": {
			presenceData.details = "Browsing";
			presenceData.state = "FAQ";
			break;
		}
		case "/retro_index.html": {
			presenceData.details = "Browsing";
			presenceData.state = "The (Retro) Eternal Jukebox";
			break;
		}
		case "/canonizer_index.html": {
			presenceData.details = "Browsing";
			presenceData.state = "The Autocanonizer";
			break;
		}
		case "/canonizer_go.html": {
			const [, hours, mins, secs] = document
					.querySelector<HTMLSpanElement>("#mtime")
					.textContent.match(/(\d+):(\d+):(\d+)/)
					.map(x => +x),
				totalSeconds = hours * 3600 + mins * 60 + secs,
				audioSource = await presence.getPageletiable<string>(
					"canonizerData.ogAudioURL"
				);
			if (
				document.querySelector<SVGElement>("#tiles > svg")?.childElementCount >
				5
			) {
				presenceData.details = "Listening to an autocanonized song";
				presenceData.state = document
					.querySelector<HTMLSpanElement>("#info")
					.textContent.trim()
					.replace(/\(autocanonized\) /, "");
				if (totalSeconds > 0) {
					presenceData.startTimestamp =
						Math.floor(Date.now() / 1000) - totalSeconds;
				}
				presenceData.buttons = [
					{
						label: "Listen",
						url: href,
					},
					{
						label: "View source",
						url:
							audioSource ??
							`https://open.spotify.com/track/${new URLSearchParams(search).get(
								"id"
							)}`,
					},
				];
			} else {
				presenceData.details = "Listening to an autocanonized song";
				presenceData.state = "Loading...";
			}
			break;
		}
		case "/canonizer_search.html": {
			presenceData.details = "Searching for a song";
			presenceData.state =
				document.querySelector<HTMLInputElement>("#search").value;
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
