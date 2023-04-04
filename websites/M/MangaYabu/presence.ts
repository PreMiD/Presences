const presence = new Presence({
		clientId: "704006227276857385",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	nomeObraLeitor: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.manga-reader > h1"
	),
	nomeObraLeitor2: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.manga-reader > h1"
	),
	paginas: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.yabu-list-content > div > div.container.mt-5 > div.mt-3.text-muted > p"
	),
	nomeObra: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.manga-single-list > div.manga-info > div.manga-title > h1"
	),
	generosObra: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.manga-single-list > div.manga-info > div.manga-genres"
	),
	tagTexto: HTMLElement = document.querySelector(
		"#app > div.theme-container.no-sidebar > main > div.features > h3"
	);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/hJfEWAm.png",
		},
		path = document.location.pathname;
	presenceData.startTimestamp = browsingTimestamp;

	if (path === "/") {
		presenceData.details = "Página inicial";
		presenceData.smallImageKey = "inicio";
		presenceData.smallImageText = "Página inicial";
	} else if (path.includes("ler")) {
		nomeObraLeitor.childNodes[1] !== null
			? ((presenceData.details = nomeObraLeitor.childNodes[1].nodeValue.slice(
					1,
					nomeObraLeitor.childNodes[1].nodeValue.search("Capítulo") - 2
			  )),
			  (presenceData.state = nomeObraLeitor.childNodes[1].nodeValue.slice(
					nomeObraLeitor.childNodes[1].nodeValue.search("Capítulo") - 1
			  )))
			: ((presenceData.details = nomeObraLeitor2.textContent.slice(
					1,
					nomeObraLeitor2.textContent.search("Capítulo") - 2
			  )),
			  (presenceData.state = nomeObraLeitor2.textContent.slice(
					nomeObraLeitor2.textContent.search("Capítulo") - 1
			  )));
		presenceData.smallImageKey = "lendo";
		presenceData.smallImageText = "Lendo";
	} else if (path.includes("lista-de-mangas")) {
		presenceData.details = "Lista de mangás";
		paginas.textContent.includes("Gêneros")
			? (presenceData.state = `${paginas.textContent.slice(
					paginas.textContent.search("Página"),
					paginas.textContent.search("Gêneros") - 2
			  )} | ${paginas.textContent.slice(
					paginas.textContent.search("Gêneros") + 8,
					-1
			  )}`)
			: (presenceData.state = paginas.textContent.slice(
					paginas.textContent.search("Página")
			  ));
		presenceData.smallImageKey = "lista";
		presenceData.smallImageText = "Vendo a lista de obras";
	} else if (path.includes("manga")) {
		presenceData.details = nomeObra.textContent;
		presenceData.state = generosObra.textContent;
	} else if (path.includes("/tag/")) {
		presenceData.details = "Página de Tag";
		presenceData.state = tagTexto.textContent.slice(1);
	} else presenceData.details = "Navegando...";

	presence.setActivity(presenceData);
});
