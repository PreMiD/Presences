const presence = new Presence({
		clientId: "1101840416866844672",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean,
	playback: boolean,
	reproductor: string;

presence.on(
	"iFrameData",
	(data: {
		iframeVideo: {
			duration: number;
			iFrameVideo: boolean;
			currTime: number;
			paused: boolean;
			reproductor: string;
		};
	}) => {
		playback = data.iframeVideo.duration !== null ? true : false;
		reproductor = data.iframeVideo.reproductor;
		if (playback) {
			({ iFrameVideo, paused, duration } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/CyVxys5.jpg",
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.pathname === "/") {
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Página de inicio";
		presenceData.details = "Viendo la página de inicio";
	}else if(document.location.pathname === "/emitiendo"){
		presenceData.smallImageKey = "emitting";
		presenceData.smallImageText = "En Emisión";
		presenceData.details = "Explorando animes en emisión";
	}else if(document.location.pathname.startsWith("/ajustes")){
		if(document.location.pathname === "/ajustes"){
			presenceData.smallImageKey = "settings";
			presenceData.smallImageText = "Ajustes";
			presenceData.details = "Personalizando uwu"
		}else if(document.location.pathname === "/ajustes/privacidad"){
			presenceData.details = "Informandose 🧐"
			presenceData.state = "Politicas de privacidad"
		}
	}else if(document.location.pathname.startsWith("/auth/")){
		if(document.location.pathname === "/auth/iniciar-sesion"){
			presenceData.smallImageKey = "login";
			presenceData.smallImageText = "Inicio de sesión";
			presenceData.details = "Iniciando sesión";
		}else if(document.location.pathname === "/auth/registrarse"){
			presenceData.smallImageKey = "register";
			presenceData.smallImageText = "Registro de usuario";
			presenceData.details = "¡Creando nueva cuenta!";
		}
	}else if(document.location.pathname.startsWith("/serie/")){
		let title = document.querySelector("h1");
		let season = document.querySelector("#season_id");
		presenceData.smallImageKey = "preview";
		presenceData.smallImageText= "Serie";
		presenceData.details = `A punto de ver ${title.textContent}`
		presenceData.state = `Temporada ${season.textContent}`
		presenceData.buttons = [
			{
					label: "¡Ver También!",
					url: `https://aodesu.com${document.location.pathname}`
				}
			]
	}else if(document.location.pathname.startsWith("/buscar")){
		let search = document.querySelector<HTMLInputElement>("div.search-bar > input[type=text]").value
		presenceData.smallImageKey = "search";
		presenceData.smallImageText= "Buscador";
		presenceData.details = "Buscando...";
		presenceData.state = search;
	}else if (document.location.pathname.startsWith("/watch/")){
		let title = document.querySelector(".reproductor-container > div:nth-child(2) > div.reproductor-centralizer > div > a");
		let cap = document.location.pathname.split("/")[2].split("-")[2];
		let timestamps = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		)

		presenceData.state = `Cargando capitulo ${cap}...`

		if(iFrameVideo === true && !isNaN(duration)){
			if (currentTime === duration) {
				presenceData.smallImageKey = "settings";
				presenceData.smallImageText = `${title.textContent}｜Episodio: ${cap}`;
				presenceData.details = `Pausado: ${title.textContent}`;
				presenceData.state = `Cap. ${cap}`;
			} else if (currentTime !== duration) {
				presenceData.smallImageKey = paused ? "pause" : "play";
				presenceData.smallImageKey = paused ? "pause" : "play";
				presenceData.smallImageText = `${title.textContent}｜Episodio: ${cap}`;
				presenceData.details = `Viendo: ${title.textContent}`;
				presenceData.startTimestamp = paused ? null : timestamps[0];
				presenceData.state = paused
					? `Cap. ${cap}｜Pausado`
					: `Cap. ${cap}｜Reproduciendose desde: ${reproductor}`;
				presenceData.endTimestamp = paused ? null : timestamps[1];
			}
		}	else {
			presenceData.smallImageKey = "play";
			presenceData.smallImageText = `${title}Capitulo: ${cap}`;
			presenceData.details = `Viendo: ${title.textContent}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
