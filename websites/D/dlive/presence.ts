const presence = new Presence({
	clientId: "609531561389588480",
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
let lastPlaybackState = null,
	playback: boolean,
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

if (lastPlaybackState !== playback) {
	lastPlaybackState = playback;
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
}

presence.on("UpdateData", async () => {
	playback =
		document.querySelector("video.dplayer-video.dplayer-video-current") !== null
			? true
			: false;

	if (!playback) {
		const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/pScqtTz.png",
		};

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;

		presence.setActivity(presenceData, true);
	}

	if (document.querySelector("video.dplayer-video.dplayer-video-current")) {
		const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/pScqtTz.png",
			smallImageKey: "live",
		};

		presenceData.details = document.querySelector<HTMLElement>(
			".info-line-left.flex-box .flex-column.flex-justify-center div"
		).textContent;
		presenceData.state = document.querySelector<HTMLElement>(
			"div.channel-header span.dlive-name span.overflow-ellipsis"
		).textContent;
		presenceData.startTimestamp = browsingTimestamp;

		presence.setActivity(presenceData, true);
	}
});
