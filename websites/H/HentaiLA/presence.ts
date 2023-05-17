const presence = new Presence({
		clientId: "903690009633247252",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
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
