const presence = new Presence({
		clientId: "708779444541849640",
	}),
	nomeObraAnime: HTMLElement = document.querySelector(
		"#weds > div > div.pageAnime > div > div > div.right > div.animeFirstContainer > h1"
	),
	filtroObraAnime: HTMLElement = document.querySelector(
		"#weds > div > div.pageAnime > div > div > div.right > a > button"
	),
	nomeEpisodio: HTMLElement = document.querySelector(
		"#weds > div > div.headerEP > div > h1"
	),
	numeroEpisodio: HTMLElement = document.querySelector(
		"#weds > div > div.headerEP > div > div.controlesEP > div:nth-child(2) > h2"
	),
	statusLista: HTMLElement = document.querySelector("#ani_status"),
	generolista: HTMLElement = document.querySelector("#ani_genero"),
	paginaAtual: HTMLElement = document.querySelector(
		"#weds > div > div.ultAnis.mwidth > div.paginacao > span.page-numbers.current"
	),
	ultimaPagina: HTMLElement = document.querySelector(
		"#weds > div > div.ultAnis.mwidth > div.paginacao > a:nth-child(5)"
	),
	pesquisaTitulo: HTMLElement = document.querySelector(
		"body > div > div.SectionBusca.mwidth > div.tituloSection"
	);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/IJ9ufN3.png",
		},
		path = document.location.pathname;

	if (path === "/") {
		if (pesquisaTitulo) {
			if (pesquisaTitulo.textContent.includes("VOCÊ PESQUISOU POR")) {
				presenceData.details = "Em pesquisa por: ";
				presenceData.state = pesquisaTitulo.textContent.slice(19);
				presenceData.startTimestamp = Math.floor(Date.now() / 1000);
			}
		} else {
			presenceData.details = "Início";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		}
	} else if (path.includes("/anime/")) {
		if (path === "/anime/") {
			presenceData.details = "Vendo animes";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		} else {
			presenceData.details = nomeObraAnime.textContent;
			presenceData.state = `Filtrar por: ${filtroObraAnime.textContent}`;
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		}
	} else if (path.includes("/video/")) {
		if (path === "/video/") {
			presenceData.details = "Lista de vídeos";
			presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		} else {
			const video = document.querySelector("video");
			presenceData.details = nomeEpisodio.textContent;
			presenceData.state = numeroEpisodio.textContent;
			if (!video.paused) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
				presenceData.smallImageKey = "play";
				presenceData.smallImageText = "Assistindo";
			}
		}
	} else if (path.includes("/lista-de-animes-online")) {
		presenceData.details = `${"Animes" + " | Página: "}${
			paginaAtual.textContent
		} de ${ultimaPagina.textContent}`;
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
		if (
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			statusLista[statusLista.selectedIndex].textContent !==
			"Selecione o Status"
		)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			presenceData.state = statusLista[statusLista.selectedIndex].textContent;
		else if (
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			generolista[generolista.selectedIndex].textContent !==
			"Selecione o Gênero"
		)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			presenceData.state = generolista[generolista.selectedIndex].textContent;
	} else {
		presenceData.details = "Navegando... ";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	}
	presence.setActivity(presenceData);
});
