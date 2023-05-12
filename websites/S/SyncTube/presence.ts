const presence = new Presence({
		clientId: "827892428266274857",
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

let video = {
	current: 0,
	duration: 0,
	paused: true,
	title: "Unknown",
	channel: "Unknown",
	url: <string>null,
};

presence.on("UpdateData", async function () {
	const [timeElapsed, moreDetails, showButtons, privacy, logo] =
			await Promise.all([
				presence.getSetting<boolean>("timeElapsed"),
				presence.getSetting<boolean>("moreDetails"),
				presence.getSetting<boolean>("showButtons"),
				presence.getSetting<boolean>("privacy"),
				presence.getSetting<number>("logo"),
			]),
		presenceData: PresenceData = {
			largeImageKey: logo === 0 ? "logo" : "logo2",
		},
		urlpath = window.location.pathname.split("/");

	if (timeElapsed) presenceData.startTimestamp = browsingTimestamp;

	if (!urlpath[1]) presenceData.details = "Home";
	else if (urlpath[1] === "rooms") {
		if (urlpath[2]) {
			presenceData.details = privacy
				? "In Room"
				: document.querySelector("div.roomName.noselect").textContent;
			if (!privacy) {
				if (moreDetails && video) {
					presenceData.details = video.title;
					presenceData.state = video.channel;

					presenceData.endTimestamp = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					)[1];
				} else {
					presenceData.state = document.querySelector(
						"div.userCount.noselect"
					).textContent;
				}
			}

			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Join Room",
						url: window.location.href,
					},
				];

				if (!privacy && video.url) {
					presenceData.buttons.push({
						label: "Watch Video",
						url: video.url,
					});
				}
			}
		} else presenceData.details = "Browsing Rooms";
	} else presenceData.details = "Other";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

presence.on(
	"iFrameData",
	(data: {
		current: number;
		duration: number;
		paused: boolean;
		title: string;
		channel: string;
		url: string;
	}) => {
		video = data;
	}
);
