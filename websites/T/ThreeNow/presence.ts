const presence = new Presence({
	clientId: "691491207356088320",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let currentTime: number, duration: number, paused: boolean;

interface iFrameData {
	currentTime: number;
	duration: number;
	paused: boolean;
}

presence.on("iFrameData", (data: iFrameData) => {
	if (data.duration) ({ currentTime, duration, paused } = data);
});

presence.on("UpdateData", () => {
	const [startTimestamps, endTimestamps] = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/t7j0bcF.png",
		};

	if (document.URL === "https://www.threenow.co.nz/") {
		presenceData.details = "Browsing the main page";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else if (document.location.pathname.includes("/shows/")) {
		if (document.querySelectorAll(".EpisodeSynopsis-subtitle").length >= 1) {
			if (!isNaN(endTimestamps)) {
				presenceData.startTimestamp = startTimestamps;
				presenceData.endTimestamp = endTimestamps;
			}

			presenceData.state = document.querySelectorAll(
				".EpisodeSynopsis-title"
			)[0].textContent;

			if (paused) {
				presenceData.details = "Watching a show";
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = Assets.Pause;
			} else {
				presenceData.details = "Watching a show";
				presenceData.smallImageKey = Assets.Play;
			}
		} else {
			presenceData.details = "Viewing a show";
			presenceData.state = document.querySelectorAll(
				".HeroSynopsis-title"
			)[0].textContent;
		}
	} else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Searching shows";
		presenceData.state = (
			document.querySelectorAll(".SearchInput-input")[0] as HTMLInputElement
		).value;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else {
		switch (document.URL) {
			case "https://www.threenow.co.nz/live-tv-guide": {
				presenceData.details = "Viewing the Live TV guide";
				break;
			}
			case "https://www.threenow.co.nz/live-tv-guide/three": {
				presenceData.details = "Watching Three Live";
				presenceData.startTimestamp = Math.floor(Date.now() / 1000);

				break;
			}
			case "https://www.threenow.co.nz/live-tv-guide/three-life": {
				presenceData.details = "Watching ThreeLife Live";
				presenceData.startTimestamp = Math.floor(Date.now() / 1000);

				break;
			}
			case "https://www.threenow.co.nz/live-tv-guide/bravo": {
				presenceData.details = "Watching The Edge TV Live";
				presenceData.startTimestamp = Math.floor(Date.now() / 1000);

				break;
			}
			default:
				if (
					document.location.pathname.includes("/tv") &&
					document.location.pathname.includes(".html")
				) {
					presenceData.details = "ThreeFans";
					presenceData.state = "Checking out information for fans!";
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
