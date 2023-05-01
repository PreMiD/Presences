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

enum Assets {
	Logo = "https://i.imgur.com/CyVxys5.jpg",
	Home = "https://i.imgur.com/i2EEGId.jpg",
	Pause = "https://i.imgur.com/V8aOlhf.jpg",
	Play = "https://i.imgur.com/vS09FhM.jpg",
	Search = "https://i.imgur.com/BSHGBn1.jpg",
	Emitting = "https://i.imgur.com/TNrq2vU.jpg",
	Login = "https://i.imgur.com/aY4bjzh.jpg",
	Register = "https://i.imgur.com/hdtAwWr.jpg",
	Settings = "https://i.imgur.com/T91Uhm5.jpg",
	Preview = "https://i.imgur.com/1RLd82M.jpg"
}

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
		playback = data.iframeVideo !== null;
		reproductor = data.iframeVideo.reproductor;
		if (playback) {
			({ iFrameVideo, paused, duration } = data.iframeVideo);
			currentTime = data.iframeVideo.currTime;
		}
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
	{ href, pathname } = window.location;

	if (pathname === "/") {
		// Home Page
		presenceData.smallImageKey = Assets.Home;
		presenceData.smallImageText = "Página de inicio";
		presenceData.details = "Viendo la página de inicio";
	}else if(pathname === "/emitiendo"){
		// Emitting animes Page
		presenceData.smallImageKey = Assets.Emitting;
		presenceData.smallImageText = "En Emisión";
		presenceData.details = "Explorando animes en emisión";
	}else if(pathname.startsWith("/ajustes")){
		// Settings Page
		if(pathname === "/ajustes"){
			// Appearance
			presenceData.smallImageKey = Assets.Settings;
			presenceData.smallImageText = "Ajustes";
			presenceData.details = "Personalizando uwu"
		}else if(pathname === "/ajustes/privacidad"){
			// Privacy
			presenceData.details = "Informandose 🧐"
			presenceData.state = "Politicas de privacidad"
		}
	}else if(pathname.startsWith("/auth/")){
		// Auth Page
		if(pathname === "/auth/iniciar-sesion"){
			// Login
			presenceData.smallImageKey = Assets.Login;
			presenceData.smallImageText = "Inicio de sesión";
			presenceData.details = "Iniciando sesión";
		}else if(pathname === "/auth/registrarse"){
			// Register
			presenceData.smallImageKey = Assets.Register;
			presenceData.smallImageText = "Registro de usuario";
			presenceData.details = "¡Creando nueva cuenta!";
		}
	}else if(pathname.startsWith("/serie/")){
		let title = document.querySelector("h1"),
			season = document.querySelector("#season_id");

		presenceData.smallImageKey = "preview";
		presenceData.smallImageText= "Serie";
		presenceData.details = `A punto de ver ${title.textContent}`
		presenceData.state = `Temporada ${season.textContent}`
		presenceData.buttons = [
			{
					label: "¡Ver También!",
					url: href,
				}
			]
	}else if(pathname.startsWith("/buscar")){
		let search = document.querySelector<HTMLInputElement>("div.search-bar > input[type=text]").value
		presenceData.smallImageKey = "search";
		presenceData.smallImageText= "Buscador";
		presenceData.details = "Buscando";
		presenceData.state = search;
	}else if (pathname.startsWith("/watch/")
	){
		let title = document.querySelector(".reproductor-container > div:nth-child(2) > div.reproductor-centralizer > div > a").textContent;
		let cap = pathname.split("/")[2].split("-")[2];

		presenceData.details = `Viendo ${title}`

		if(iFrameVideo && !isNaN(duration)){
	
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused ? 'Pausado' : 'Reproduciendo';
			[, presenceData.endTimestamp] = presence.getTimestamps(
				Math.floor(currentTime),
				Math.floor(duration)
			)
	
			presenceData.details = title ??  "Titulo no encontrado.";
			presenceData.state = paused
			? `Cap. ${cap}｜Pausado`
			: `Cap. ${cap}｜Reproduciendose desde: ${reproductor}`;
		}

		if(paused){
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		
		if(title){
			presenceData.buttons = [
				{
					label: "Ver Episodio",
					url: href,
				},
				{
					label: "Ver serie",
					url: document.querySelector<HTMLAnchorElement>(".reproductor-container > div:nth-child(2) > div.reproductor-centralizer > div > a").href,
				}
			]
		}

	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
