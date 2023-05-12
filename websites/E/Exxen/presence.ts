const presence = new Presence({
		clientId: "794408060847390760",
	}),
	strings = presence.getStrings({
		playing: "general.playing",
		paused: "general.paused",
		browsing: "general.browsing",
		episode: "presence.media.info.episode",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/6ZtGZ8v.png",
	};
	if (document.location.pathname.includes("watch")) {
		const video: HTMLVideoElement = document.querySelector(".rmp-video"),
			episodeName = document.querySelector(".content-name").textContent,
			episode = episodeName.split(".Bölüm")[0].split(" ")[
				episodeName.split(".Bölüm")[0].split(" ").length - 1
			],
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				video.currentTime,
				video.duration
			);
		presenceData.details = episodeName
			.replace(`${episode}.Bölüm`, "")
			.replace(`Episode ${episode}`, "");
		presenceData.state = (await strings).episode.replace("{0}", episode);
		if (!video.paused) {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = (await strings).playing;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = (await strings).paused;
		}
	} else {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = (await strings).browsing;
		if (document.location.pathname.includes("detail"))
			presenceData.state = document.querySelector(".title").textContent;
	}
	presence.setActivity(presenceData);
});
