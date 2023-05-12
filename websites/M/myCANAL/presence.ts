enum Assets {
	Logo = "https://i.imgur.com/ZpDYxNn.png",
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.pngg",
	Live = "https://i.imgur.com/0HVm46z.png",
}

const presence = new Presence({
		clientId: "844106861711196179",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		live: "general.live",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	containsTerm = (term: string) => document.location.pathname.includes(term);

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		video = document.querySelector<HTMLVideoElement>(".iIZX3IGkM2eBzzWle1QQ"),
		showCover = await presence.getSetting<boolean>("cover"),
		mainTitle = document.querySelector(".bodyTitle___HwRP2");

	switch (document.location.pathname) {
		case "/mes-videos/":
			presenceData.state = "Mes Vidéos";
			break;
		case "/chaines/":
			presenceData.state = "Chaînes";
			break;
		case "/programme-tv/":
			presenceData.state = "Programme TV";
			break;
		case "/cinema/":
			presenceData.state = "Films";
			break;
		case "/series/":
			presenceData.state = "Séries";
			break;
		case "/live/":
			presenceData.state = "Chaînes en direct";
			break;
	}

	if (video && !isNaN(video.duration)) {
		const titleTvShows = document.querySelectorAll(".MGrm26svmXpUhj6dfbGN");
		let channelID = new URLSearchParams(window.location.search).get("channel");
		switch (true) {
			case containsTerm("live"):
				channelID = `${channelID.charAt(0)} ${channelID.substring(1)}`;
				presenceData.details = document.querySelector(
					".A6AH2oNkXUuOKJN5IYrL"
				).textContent;
				presenceData.state = `sur ${
					document.querySelector<HTMLImageElement>(
						`#\\3${channelID} > a > div > div > div > div > div > img`
					).alt
				}`;
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.currentTime, video.duration);
				presenceData.largeImageKey = showCover
					? document.querySelector<HTMLImageElement>(
							`#\\3${channelID} > a > div > div > div > div > div > img`
					  ).src
					: Assets.Logo;
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = "En direct";
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
				presenceData.startTimestamp = browsingTimestamp;
				break;
			case containsTerm("cinema"):
				presenceData.details = document.querySelector(
					".A6AH2oNkXUuOKJN5IYrL"
				).textContent;
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.currentTime, video.duration);
				presenceData.largeImageKey = showCover
					? (presenceData.largeImageKey =
							document.querySelector<HTMLMetaElement>(
								"[property='og:image']"
							)?.content)
					: Assets.Logo;
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				break;
			case containsTerm("series"):
				presenceData.details = titleTvShows[0].textContent.trim();
				presenceData.state = titleTvShows[1].textContent.trim();
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.currentTime, video.duration);
				presenceData.largeImageKey = showCover
					? (presenceData.largeImageKey =
							document.querySelector<HTMLMetaElement>(
								"[property='og:image']"
							)?.content)
					: Assets.Logo;
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				break;
		}
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	} else if (mainTitle) {
		presenceData.details = "Regarde...";
		presenceData.state = mainTitle.textContent;
	} else presenceData.details = "Navigue...";

	presence.setActivity(presenceData);
});
