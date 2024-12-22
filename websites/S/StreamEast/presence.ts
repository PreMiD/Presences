const presence = new Presence({
		clientId: "1316661139672797236",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.ibb.co/gr5gcV8/file.jpg",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (pathname) {
		case "/v85": {
			presenceData.details = "Viewing home page";
			break;
		}
		case "/nflstreams5": {
			presenceData.details = "Viewing NFL streams";
			break;
		}
		case "/nba/streams4": {
			presenceData.details = "Viewing NBA streams";
			break;
		}
		case "/nhl/streams2": {
			presenceData.details = "Viewing NHL streams";
			break;
		}
		case "/cfb/streams2": {
			presenceData.details = "Viewing CFB streams";
			break;
		}
		case "/ncaab/streams": {
			presenceData.details = "Viewing NCAAB streams";
			break;
		}
		case "/boxingstreams13": {
			presenceData.details = "Viewing Boxing streams";
			break;
		}
		case "/mmastreams10": {
			presenceData.details = "Viewing MMA streams";
			break;
		}
		case "/f1/streams": {
			presenceData.details = "Viewing F1 streams";
			break;
		}
		case "/multi-stream": {
			presenceData.details = "Watching multiple streams";
			break;
		}
		default:
			if (pathname.includes("/blog/"))
				presenceData.details = `Viewing blog: ${document.title}`;
			else if (document.title.includes("vs")) {
				presenceData.details = `Watching: [${pathname
					.match(/^\/([^/]+)\//)[1]
					.toUpperCase()}] ${document.title.replace(
					" Live Stream - StreamEast",
					""
				)}`;
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
