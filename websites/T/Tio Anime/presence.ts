const presence = new Presence({
		clientId: "896323132871299103",
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
			largeImageKey: "https://i.imgur.com/KJUHptb.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		buttons = await presence.getSetting<boolean>("buttons");

	if (document.location.pathname === "/")
		presenceData.details = "En la página de inicio";
	else if (document.location.pathname.includes("/anime/")) {
		if (!privacy) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Ver Anime",
						url: document.URL,
					},
				];
			}
			presenceData.details = "Viendo lista de episodios:";
			presenceData.state = document.querySelector(".title").textContent;
		} else presenceData.details = "Viendo lista de episodios";
	} else if (document.location.pathname.includes("/ver/")) {
		if (!privacy) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Ver Capítulo",
						url: document.URL,
					},
				];
			}
			const capt = document.querySelector("h1").textContent;
			presenceData.details = "Viendo Anime:";
			presenceData.state = `${capt.substring(
				0,
				document.querySelector("h1").textContent.lastIndexOf(" ")
			)} capítulo ${capt.split(" ").pop()}`;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
			presenceData.smallImageKey = video.paused ? "stop" : "play";
			presenceData.smallImageText = video.paused
				? "Capítulo pausado"
				: "Reproduciendo capítulo";
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else {
			presenceData.details = "Viendo anime";
			presenceData.smallImageKey = video.paused ? "stop" : "play";
			presenceData.smallImageText = video.paused
				? "Capítulo pausado"
				: "Reproduciendo capítulo";
		}
	}
	switch (document.location.pathname) {
		case "/directorio":
			presenceData.details = "Viendo el directorio de animes";
			break;
		case "/programacion":
			presenceData.details = "Viendo la programación Semanal";
			break;
		case "/peticiones":
			presenceData.details = "Viendo peticiones";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
