const presence = new Presence({
		clientId: "903690009633247252",
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
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/h2Jxbzn.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/")
		presenceData.details = "En la página de inicio";
	else if (document.location.pathname.includes("/genero/")) {
		presenceData.details = `Viendo género ${
			document.querySelector(".section-title").textContent.split(":")[1]
		}`;
	} else if (document.location.pathname.includes("/ver/")) {
		presenceData.details = "Viendo Hentai:";
		presenceData.state = document.querySelector(".section-title").textContent;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused
			? "Capítulo pausado"
			: "Reproduciendo capítulo";
		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}
	if (document.querySelector(".hentai-single")) {
		presenceData.details = "Viendo lista capítulos:";
		presenceData.state = document.querySelector(".h-title").textContent;
	}
	switch (document.location.pathname) {
		case "/directorio":
			presenceData.details = "Viendo el directorio de Hentai";
			break;
		case "/estrenos-hentai":
			presenceData.details = "Viendo los próximos estrenos";
			break;
		case "/peticiones":
			presenceData.details = "Viendo peticiones";
			break;
		case "/hentai-sin-censura":
			presenceData.details = "Viendo la lista sin censura";
			break;
		case "/login":
			presenceData.details = "Inciando sesión";
			break;
		case "/registro":
			presenceData.details = "Registrándose";
			break;
	}
	presence.setActivity(presenceData);
});
