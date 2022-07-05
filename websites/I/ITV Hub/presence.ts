const presence = new Presence({
	clientId: "645290651604221999",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "itv_logo",
			startTimestamp: Date.now(),
		},
		path = document.location.pathname;

	switch (path) {
		case "/": {
			presenceData.details = "Browsing ITV Hub";
			presenceData.state = "Home Page";

			break;
		}
		case "/hub/itv": {
			presenceData.details = "Watching ITV live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/itv2": {
			presenceData.details = "Watching ITV2 live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/itvbe": {
			presenceData.details = "Watching ITVBe live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/itv3": {
			presenceData.details = "Watching ITV3 live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/itv4": {
			presenceData.details = "Watching ITV4 live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/citv": {
			presenceData.details = "Watching CITV live";
			presenceData.state = document.querySelectorAll(
				".schedule__title--now"
			)[0].textContent;

			break;
		}
		case "/hub/tv-guide": {
			presenceData.details = "Browsing ITV";
			presenceData.state = "Viewing the TV-Guide";

			break;
		}
		case "/hub/shows": {
			presenceData.details = "Browsing ITV";
			presenceData.state = "Viewing shows";

			break;
		}
		case "/hub/categories": {
			presenceData.details = "Browsing ITV";
			presenceData.state = "Viewing categories";

			break;
		}
		default:
			if (path.startsWith("/hub/categories/")) {
				presenceData.details = "Browsing ITV";
				presenceData.state = `Viewing ${
					path.split("/")[path.split("/").length - 1]
				} category`;
			} else if (
				/^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/.test(
					path.split("/")[path.split("/").length - 1]
				)
			) {
				// Last path is a valid hex (Show ID)
				delete presenceData.startTimestamp;
				const showDetails = {
						name: document.querySelector("#programme-title").textContent,
						episode: document
							.querySelectorAll(".episode-info__episode-title")[0]
							.textContent.trim(),
					},
					[video] = document.querySelectorAll("video");
				if (!video.paused) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(
							Math.floor(video.currentTime),
							Math.floor(video.duration)
						);

					presenceData.details = `Watching ${showDetails.name}`;
					presenceData.state = showDetails.episode;
					presenceData.smallImageKey = "play";
					presenceData.smallImageText = "Playing";
				} else {
					presenceData.details = `Watching ${showDetails.name}`;
					presenceData.state = showDetails.episode;
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = "Paused";
				}
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
