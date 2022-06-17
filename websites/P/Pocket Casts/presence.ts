const presence = new Presence({
	clientId: "661889916635971616",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "icon",
	};

	if (document.querySelectorAll(".player-controls").length === 0) {
		presenceData.smallImageKey = "more";

		if (document.location.pathname === "/podcasts")
			presenceData.details = "Viewing subscriptions";
		else if (
			document.location.pathname.startsWith("/podcasts/") ||
			document.location.pathname.startsWith("/discover/podcast/")
		) {
			presenceData.details = "Viewing podcast";
			presenceData.state =
				document.querySelectorAll(
					".title-and-actions"
				)[0].children[0].textContent;
		} else if (document.location.pathname === "/discover")
			presenceData.details = "Viewing discover page";
		else if (document.location.pathname.startsWith("/discover/list/")) {
			presenceData.details = "Viewing discover page";
			presenceData.state = document.querySelectorAll("h1")[0].textContent;
		} else {
			switch (document.location.pathname) {
				case "/new-releases": {
					presenceData.details = "Viewing new releases";
					break;
				}
				case "/in-progress": {
					presenceData.details = "Viewing in-progress episodes";
					break;
				}
				case "/starred": {
					presenceData.details = "Viewing starred episodes";
					break;
				}
				case "/profile": {
					presenceData.details = "Viewing profile";
					break;
				}
				case "/uploaded-files": {
					presenceData.details = "Viewing uploaded files";
					break;
				}
				case "/history": {
					presenceData.details = "Viewing listening history";
					break;
				}
				case "/stats": {
					presenceData.details = "Viewing listening stats";
					presenceData.state = `Listened for ${
						document.querySelectorAll(".styled__TimeListened-sc-1nd51k4-2")[0]
							.textContent
					}`;

					break;
				}
				default:
					if (document.location.pathname.startsWith("/settings/"))
						presenceData.details = "Changing settings";
			}
		}
	} else {
		presenceData.details = document.querySelectorAll(
			".episode-title.player_episode"
		)[0].textContent;
		presenceData.state = document.querySelectorAll(
			".podcast-title.player_podcast_title"
		)[0].textContent;

		const time = document
			.querySelectorAll(".time-text.current-time")[0]
			.textContent.split(":")
			.map(n => Number(n));
		if (time.length === 3) {
			presenceData.startTimestamp =
				Date.now() - (time[0] * 3600 + time[1] * 60 + time[2]) * 1000;
		} else {
			presenceData.startTimestamp =
				Date.now() - (time[0] * 60 + time[1]) * 1000;
		}

		if (document.querySelectorAll(".pause_button").length === 0) {
			presenceData.smallImageKey = "pause";
			delete presenceData.startTimestamp;
		} else presenceData.smallImageKey = "play";
	}

	presence.setActivity(presenceData);
});
