const presence = new Presence({
		clientId: "767140375785111562",
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

presence.on(
	"iFrameData",
	(data: {
		iframevideo: boolean;
		currentTime: number;
		duration: number;
		paused: boolean;
	}) => {
		if (data.iframevideo === true) ({ currentTime, duration, paused } = data);
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/BGc0jtj.jpg",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;

	if (path === "/") presenceData.details = "Browsing...";
	else if (path.includes("/news"))
		presenceData.details = "Viewing the latest news";
	else if (path.includes("/schedule"))
		presenceData.details = "Browsing the schedule";
	else if (path.includes("/live/")) {
		if (path.includes("/worlds")) presenceData.details = "Watching Worlds";
		else presenceData.details = "Watching Live";

		presenceData.state = document
			.querySelector("div.teams")
			.textContent.replace("VS", " vs ");
		presenceData.smallImageKey = "live";
	} else if (path.includes("/article/")) {
		presenceData.details = "Reading news article:";
		presenceData.state = document.querySelector("div.title").textContent;
		presenceData.smallImageKey = Assets.Reading;
	} else if (path.includes("/vods/")) {
		presenceData.details = "VODS";
		presenceData.state = "Looking at past matches";
	} else if (path.includes("/vod/")) {
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));
		presenceData.smallImageKey = paused ? "pause" : "play";
		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		presenceData.details = "Watching a replay";
		presenceData.state = `${document
			.querySelector("div.teams")
			.textContent.replace("VS", " vs ")} - Game ${
			document.querySelector(".game.selected").textContent
		}`;
	} else if (path.includes("/standings/"))
		presenceData.details = "Looking at the standings";

	presenceData.buttons = [
		{
			label: "Watch Broadcast",
			url: document.URL,
		},
	];
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
