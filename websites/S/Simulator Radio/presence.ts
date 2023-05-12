const presence = new Presence({
		clientId: "651455140477272065",
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

let currentTitle = "Simulator Radio",
	currentArtist = "Your #1 Simulation Station",
	currentListeners = 0,
	currentDj = "Otto";

function newStats(): void {
	fetch("https://apiv2.simulatorradio.com/metadata/combined?premid").then(
		response => {
			if (response.status === 200) {
				response.json().then(data => {
					currentTitle = data.now_playing.title;
					currentArtist = data.now_playing.artists;
					currentListeners = data.listeners;
					currentDj = data.djs.now.displayname;
				});
			}
		}
	);
}

function pushMusicPresence(presenceData: PresenceData): void {
	presenceData.details = `${currentTitle} - ${currentArtist}`;
	presenceData.state = `Listening to ${currentDj}`;
	presenceData.smallImageText =
		currentListeners !== 0 ? `Listeners: ${currentListeners}` : "";
	presenceData.smallImageKey = Assets.Play;

	if (lastTitle !== currentTitle) {
		lastTitle = currentTitle;
		lastTimeStart = Math.floor(Date.now() / 1000);
	}

	presenceData.startTimestamp = lastTimeStart;
}

setInterval(newStats, 10000);
newStats();

let lastTitle = "",
	lastTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/fUvjEoV.png",
	};

	if (
		document.querySelector(".fas.fa-play") !== null ||
		document.querySelector(".fa.fa-play") !== null /*Paused*/
	) {
		presenceData.startTimestamp = browsingTimestamp;

		if (document.location.pathname.includes("/request")) {
			presenceData.details = "Requesting...";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/timetable")) {
			presenceData.details = "Viewing the Timetable";
			presenceData.state = document.querySelector("#timetable-day").textContent;
		} else if (document.location.pathname.includes("/home"))
			pushMusicPresence(presenceData);
		else if (
			document.location.pathname.includes("/articles") ||
			document.location.pathname.includes("/news")
		)
			presenceData.details = "Browsing the Blog";
		else if (
			document.location.pathname.includes("/post") ||
			document.location.pathname.includes("/blog")
		) {
			presenceData.details = "Reading Blog Post";
			presenceData.state =
				document.querySelector(".blog-title")?.textContent ??
				document.querySelector(".blog-page-title").textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/team"))
			presenceData.details = "Viewing the Team";
		else if (document.location.pathname.includes("/changelog")) {
			presenceData.details = "Reading the Changelog";
			presenceData.smallImageKey = Assets.Reading;
		}
	} else pushMusicPresence(presenceData);

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
