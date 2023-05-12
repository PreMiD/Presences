const presence = new Presence({
		clientId: "683924512982433822",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LSo5STJ.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "Página principal";
	// ----------- barra de opções topo ----------- //
	else if (document.location.pathname.startsWith("/lista-de-mangas")) {
		(presenceData.details = "Lista de mangás"),
			(presenceData.state = `Ordenada por: ${
				(
					document.querySelector(
						"#menu-titulos > li.active > a > span"
					) as HTMLElement
				).textContent
			}`);
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/lista-de-categorias")) {
		(presenceData.details = "Lista de Categorias"),
			(presenceData.state = `Ordenada por: ${
				(
					document.querySelector(
						"#menu-categorias > li.active > a > span"
					) as HTMLElement
				).textContent
			}`);
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/grupos")) {
		(presenceData.details = "Lista de Grupos"),
			(presenceData.state = `Ordenada por: ${
				(
					document.querySelector(
						"#menu-grupos > li.active > a > span"
					) as HTMLElement
				).textContent
			}`);
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/destaques")) {
		(presenceData.details = "Mangás em Destaque"),
			(presenceData.startTimestamp = browsingTimestamp);
	} else if (document.location.pathname.startsWith("/mangas")) {
		// ----------- Categorias (Categoria selecionada) e página da scan ----------- //
		(presenceData.details = "Lista de Mangás"),
			(presenceData.state = `Ordenada por: ${(
				document.querySelector("head > title") as HTMLElement
			).textContent.replace("Mangás:", "")}`);
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/scanlator")) {
		presenceData.details = `Scan ${
			(
				document.querySelector(
					"#wraper > div > div.content-wraper.scan-data > div > ul > li > div.series-info.touchcarousel > span.series-title"
				) as HTMLElement
			).textContent
		}`;
		presenceData.state = "Visualizando Principais Mangás da Scan";
		presence.setActivity(presenceData);
	} else if (document.location.pathname.startsWith("/manga")) {
		// ----------- Lendo mangá & Vendo Informações do Mangá ----------- //
		if (
			document.querySelector(
				"#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
			) === null
		) {
			(presenceData.details = "Visualizando Mangá"),
				(presenceData.state = (
					document.querySelector(
						"#series-data > div.series-info.touchcarousel > span.series-title > h1"
					) as HTMLElement
				).textContent);
			presence.setActivity(presenceData);
		} else {
			presenceData.details = (
				document.querySelector(
					"#reader-wrapper > div.reader-navigation.clear-fix > div.series-info-container > div.series-info > div.series-title > span.title"
				) as HTMLElement
			).textContent;
			presenceData.state = `Capítulo ${
				(
					document.querySelector(
						"#reader-wrapper > div.reader-navigation.clear-fix > div.chapter-selection-container > div.chapter-selection > span.current-chapter > em"
					) as HTMLElement
				).textContent
			}`;
			presence.setActivity(presenceData);
		}
		presence.setActivity(presenceData);
	}
	presence.setActivity(presenceData);
});
