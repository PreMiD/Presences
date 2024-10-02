const presence = new Presence({
		clientId: "874161536074145833",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, buttons] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("buttons"),
		]),
		playvdo =
			document.querySelector("#info > h1")?.textContent ?? "desconhecido",
		path = document.location,
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/AnimesOnline/assets/logo.jpg",
			startTimestamp: browsingTimestamp,
		};

	// Presence
	if (document.location.pathname === "/") presenceData.details = "Vendo página";
	presenceData.state = "em Página Inicial";
	if (path.search.includes("s")) {
		presenceData.details = "Pesquisando po";
		presenceData.state = `${
			document.querySelector(
				"#contenedor > div.module > div.content.rigth.csearch > header > h1"
			)?.textContent ?? "pesquisa não encontrada"
		}`;
		presenceData.smallImageKey = Assets.Search;
	} else if (path.pathname.includes("legendados")) {
		presenceData.details = "Vendo Legendados";
		presenceData.state = "Lista de Animes Legendados";
	} else if (path.pathname.includes("dublados")) {
		presenceData.details = "Vendo dublados";
		presenceData.state = "Lista de Animes Dublados";
	} else if (path.pathname.includes("donghua")) {
		presenceData.details = "Vendo Chineses";
		presenceData.state = "Lista de Animes Chineses";
	} else if (path.pathname.includes("pedidos")) {
		presenceData.details = "Vendo página";
		presenceData.state = "Pedidos de Animes";
	} else if (path.pathname.includes("calendario")) {
		presenceData.details = "Vendo calendario";
		presenceData.state = "Calendário de Animes";
	} else if (path.pathname.includes("generos")) {
		presenceData.details = "Vendo Gêneros";
		presenceData.state =
			document.querySelector("header > h1")?.textContent ?? "desconhecido";
	} else if (path.pathname.includes("animes")) {
		presenceData.details =
			document.querySelector("div.data > h1")?.textContent ?? "desconhecido";
		presenceData.state = "Selecionando um episódio";
	} else if (
		path.pathname.includes("episodio") ||
		path.pathname.match(/(\W|^)filmes(\W\w|$)/)
	) {
		presenceData.startTimestamp = browsingTimestamp;
		if (playvdo.includes("Episódio")) {
			const info = playvdo.split("- Episódio" || "Episódio");
			[presenceData.details] = info;
			presenceData.state = `Episódio ${info.pop()}`;
		} else if (
			document.querySelector("#info > h2")?.textContent.includes("Sinopse")
		) {
			presenceData.details = "Filmes";
			presenceData.state =
				document.querySelector(
					"#single > div.content.right > div.sheader > div.data > h1"
				)?.textContent ?? "desconhecido";
		} else {
			presenceData.details = playvdo;
			presenceData.state = "Assistir Anime";
		}
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		if (!video.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.current),
					Math.floor(video.duration)
				);
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Assistir Anime",
					url: document.location.href.replace(/#\d+/, ""),
				},
			];
		}
	} else if (path.pathname.match(/(\W|^)filmes(\W|$)/)) {
		presenceData.details = "Vendo filmes";
		presenceData.state = "Lista de Animes filmes";
	} else {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!presenceData.state) presence.setActivity();
	else presence.setActivity(presenceData);
});
