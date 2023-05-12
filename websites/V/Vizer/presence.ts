const presence = new Presence({
		clientId: "684199669424848970",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		search: "general.searching",
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

let iFrameVideo: boolean, currentTime: number, duration: number;

interface IFrameData {
	iframeVideo: {
		iFrameVideo: boolean;
		currTime: number;
		dur: number | null;
	};
}

presence.on("iFrameData", (data: IFrameData) => {
	if (data.iframeVideo.dur) {
		({ iFrameVideo } = data.iframeVideo);
		currentTime = data.iframeVideo.currTime;
		duration = data.iframeVideo.dur;
	}
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Hi3hvJk.png",
	};

	let title;

	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.pathname.includes("/serie")) {
		title = document.querySelector("#lp > section > h2");

		if (title) {
			const season = document.querySelector(
					"#seasons > div > div:nth-child(2) > div > div > .owl-item.active > .item.active"
				),
				episodeNumber = document.querySelector(
					"#episodes > div > div > div > div > .owl-item.active > div > .poster.active > .title"
				),
				episodeName = document.querySelector(
					"#episodes > div > div > div > div > .owl-item.active > div > .poster.active > .title"
				);

			if (season) {
				if (episodeNumber && episodeName) {
					presenceData.details = title.textContent;
					presenceData.state = `S${season.textContent}E${
						episodeNumber.textContent.split(".")[0]
					} - ${episodeName.textContent.split(".")[1]}`;

					if (iFrameVideo && !isNaN(duration)) {
						const [startTimestamp, endTimestamp] = presence.getTimestamps(
							Math.floor(currentTime),
							Math.floor(duration)
						);
						presenceData.startTimestamp = startTimestamp;
						presenceData.endTimestamp = endTimestamp;
						presenceData.smallImageKey = Assets.Play;
						presenceData.smallImageText = (await strings).play;
					} else {
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = (await strings).pause;
					}
				} else {
					presenceData.details = `Vendo temporada ${season.textContent} da série:`;
					presenceData.state = title.textContent;
				}
			} else {
				presenceData.details = "Vendo série:";
				presenceData.state = title.textContent;
			}
		} else presenceData.details = "Navegando pelas séries...";
	} else if (document.location.pathname.includes("/filme")) {
		title = document.querySelector("#ms > div.wrap > section > h2");
		if (title) {
			if (
				document.querySelector("#watchMovieButton > div.tit").textContent ===
				"audio"
			) {
				presenceData.details = title.textContent;
				presenceData.state = `${
					document.querySelector(".year").textContent
				} - ${document.querySelector(".rating").textContent}`;

				if (iFrameVideo && !isNaN(duration)) {
					const [startTimestamp, endTimestamp] = presence.getTimestamps(
						Math.floor(currentTime),
						Math.floor(duration)
					);
					presenceData.startTimestamp = startTimestamp;
					presenceData.endTimestamp = endTimestamp;
					presenceData.smallImageKey = Assets.Play;
					presenceData.smallImageText = (await strings).play;
				} else {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = (await strings).pause;
				}
			} else {
				presenceData.details = "Vendo filme:";
				presenceData.state = title.textContent;
			}
		} else presenceData.details = "Navegando pelos filmes...";
	} else if (document.location.pathname.includes("/animes"))
		presenceData.details = "Navegando pelos animes...";
	else if (document.location.pathname.includes("/aplicativo"))
		presenceData.details = "Vendo os aplicativos";
	else if (document.location.pathname.includes("/pesquisar")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = (await strings).search;

		if (document.location.pathname.includes("/pesquisar/")) {
			presenceData.details = "Procurando por:";
			presenceData.state = document.location.pathname.replace(
				"/pesquisar/",
				""
			);
		} else presenceData.details = "Procurando por algo...";
	} else if (document.location.pathname === "/")
		presenceData.details = "Navegando...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
