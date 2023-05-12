const presence = new Presence({
		clientId: "640194732718292992",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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

let user: HTMLElement | Element | string, title: HTMLElement | Element | string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/24VLERu.png",
	};

	if (document.location.hostname === "ani.gamer.com.tw") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.querySelector("#ani_video_html5_api")) {
			const video = document.querySelector<HTMLVideoElement>(
				"#ani_video_html5_api"
			);
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
			if (!isNaN(video.duration)) {
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;

				title = document.querySelector<HTMLElement>(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
				);
				presenceData.details = title.textContent;

				user = document.querySelector<HTMLElement>(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > div > p"
				);

				if (user) presenceData.state = user.textContent;

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(video.duration)) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Looking at: ";
				title = document.querySelector(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
				);
				presenceData.state = title.textContent;
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (document.location.pathname.includes("/animeList")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all animes";
		}
	}

	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing page:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" - 巴哈姆特動畫瘋", "");
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
