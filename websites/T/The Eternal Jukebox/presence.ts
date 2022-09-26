const presence = new Presence({
		clientId: "1023713697866199052",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/espirtf.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

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
				.map(x => +x);
			presenceData.details = "Listening to a song";
			presenceData.state =
				document.querySelector<HTMLSpanElement>("#song-title").textContent;
			presenceData.startTimestamp =
				Math.floor(Date.now() / 1000) - hours * 3600 - mins * 60 - secs;
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
			break;
		}
		case "/jukebox_search.html": {
			presenceData.details = "Searching for a song";
			presenceData.state =
				document.querySelector<HTMLInputElement>("#search").value;
			break;
		}
		case "/faq.html": {
			break;
		}
		case "/retro_index.html": {
			break;
		}
		case "/canonizer_index.html": {
			break;
		}
		case "/canonizer_go.html": {
			break;
		}
		case "/canonizer_search.html": {
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
