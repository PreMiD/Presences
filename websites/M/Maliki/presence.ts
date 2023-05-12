const presence = new Presence({
		clientId: "990204576189808670",
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

interface SongPlayingData {
	artist: string;
	song: string;
}

let songInfo: SongPlayingData = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				document.location.hostname === "malimode.maliki.com"
					? "malimode"
					: "maliki_1024",
			startTimestamp: browsingTimestamp,
		},
		[privacy, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]);
	if (!time) delete presenceData.startTimestamp;

	switch (document.location.pathname) {
		case "/":
			presenceData.details =
				document.location.hostname === "malimode.maliki.com"
					? "Regarde la page principale du malimode"
					: "Regarde la page principale";
			break;
		case "/strips/":
			presenceData.details = "Parcours les strips";
			break;
		case "/actualites/":
			presenceData.details = "Parcours les actualités";
			break;
		case "/bonus/":
			presenceData.details = "Parcours les bonus";
			break;
		case "/radio/":
			if (!songInfo || privacy) presenceData.details = "Écoute la radio";
			else {
				presenceData.details = `Écoute ${songInfo.song}`;
				presenceData.state = `De ${songInfo.artist}`;
			}
			break;
		case "/shop/":
			presenceData.details = "Parcours le shop";
			break;
		case "/events/":
			presenceData.details = "Se renseigne sur les futurs événements";
			break;
		case "/faq/":
			presenceData.details = "Lis la foire aux questions";
			break;
		case "/personnalisation":
			presenceData.details = "Personnalise son personnage";
			presenceData.largeImageKey = "malimode";
			break;
		case "/partager":
			presenceData.details = "Partage son personnage";
			presenceData.largeImageKey = "malimode";
			break;
		default: {
			if (document.location.pathname.includes("/strips/")) {
				// If we are on a strip page, modify the details
				presenceData.details = privacy ? "Lis un strip" : "Lis le strip :";
				if (!privacy) {
					presenceData.state =
						document.querySelector(".singleTitle").textContent;
				}
			}
			if (document.location.pathname.includes("/bonus/")) {
				// If we are on a bonus page, modify the details
				presenceData.details = privacy
					? "Regarde un bonus"
					: "Regarde le bonus :";
				if (!privacy) {
					presenceData.state =
						document.querySelector(".singleTitle").textContent;
				}
			}
			if (
				document
					.querySelector(".singleContentShare--title")
					?.textContent.includes("actualité")
			) {
				// If we are on a page about actuality, modify the details
				presenceData.details = privacy
					? "Lis une actualité"
					: "Lis l'actualité :";
				if (!privacy) {
					presenceData.state = document.querySelector(
						".singleHeader--title"
					).textContent;
				}
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

presence.on("iFrameData", (data: SongPlayingData) => {
	songInfo = data;
});
