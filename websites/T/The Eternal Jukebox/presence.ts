const presence = new Presence({
		clientId: "1023713697866199052",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/espirtf.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (pathname) {
		case "/jukebox_index.html": {
			break;
		}
		case "/jukebox_go.html": {
			break;
		}
		case "/jukebox_search.html": {
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
