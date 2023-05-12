const presence = new Presence({
		clientId: "684410680392286247",
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

let iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	playback: boolean;

presence.on(
	"iFrameData",
	(data: {
		iframeVideo: {
			duration: number;
			iFrameVideo?: boolean;
			currentTime?: number;
		};
	}) => {
		playback = data.iframeVideo.duration ? true : false;

		if (playback) ({ iFrameVideo, currentTime, duration } = data.iframeVideo);
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/GA1Vftf.png",
	};

	let title;

	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.pathname.includes("/serie")) {
		title = document.querySelector(".bd-hd");

		if (title) {
			title = title.textContent.replace(
				document.querySelector(".bd-hd > span").textContent,
				""
			);

			const season = document.querySelector(".accordion > li.open > div");

			if (
				document
					.querySelector(".tabs > ul > li.active")
					.textContent.includes("Temporadas") &&
				season
			) {
				if (document.querySelector("body > .modal.fade.in")) {
					presenceData.details = title;
					presenceData.state = season.textContent;

					if (iFrameVideo === true && !isNaN(duration)) {
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
					presenceData.details = `Vendo temporada ${season.textContent.replace(
						"ª Temporada",
						""
					)} da série:`;
					presenceData.state = title;
				}
			} else {
				presenceData.details = "Vendo série:";
				presenceData.state = title;
			}
		} else presenceData.details = "Navegando pelas séries...";
	} else if (document.location.pathname.includes("/filme")) {
		title = document.querySelector(".bd-hd");
		if (title) {
			const year = document.querySelector(".bd-hd > span");
			let rating = document.querySelector(".rate > p > span").textContent;
			rating = `${rating}/10`;
			title = title.textContent.replace(year.textContent, "");

			if (document.querySelector("body > .modal.fade.in")) {
				presenceData.details = title;
				presenceData.state = `${year.textContent} - ${rating}`;

				if (iFrameVideo === true && !isNaN(duration)) {
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
				presenceData.state = title;
			}
		} else presenceData.details = "Navegando pelos filmes...";
	} else if (document.location.pathname.includes("/lancamentos"))
		presenceData.details = "Navegando lançamentos...";
	else if (document.location.pathname.includes("/app"))
		presenceData.details = "Vendo os aplicativos";
	else if (document.location.pathname.includes("/imdb"))
		presenceData.details = "Navegando IMDb...";
	else if (document.location.pathname === "/")
		presenceData.details = "Navegando...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
