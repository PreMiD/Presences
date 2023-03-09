const presence = new Presence({
	clientId: "1083051669996187748",
}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Outros",
		largeImageKey: "https://i.imgur.com/pQeO9sn.png",
		startTimestamp: browsingTimestamp
	},
		urlpath = document.location.pathname.split("/"),
		privacyMode = await presence.getSetting<boolean>("privacy");

	switch (true) {
		case !urlpath[1] || urlpath[1] === "pagina":
			presenceData.details = "Vendo conteúdos relevantes";
			if (urlpath[1] === "pagina") presenceData.state = `Página ${urlpath[2]}`;
			break;
		case urlpath[1].startsWith("recentes"):
			presenceData.details = "Vendo conteúdos recentes";
			if (urlpath[3]) presenceData.state = `Página ${urlpath[3]}`;
			break;
		default:
			if (urlpath[1] && !urlpath[2]) {
				switch (urlpath[1]) {
					case "publicar":
						presenceData.details = "Publicando novo conteúdo";
						break;
					case "perfil":
						presenceData.details = "Editando perfil";
						break;
					case "contato":
						presenceData.details = "Vendo os contatos";
						break;
					case "termos-de-uso":
						presenceData.details = "Lendo os termos de uso";
						break;
					case "status":
						presenceData.details = "Vendo estatísticas do site";
						break;
					case "museu":
						presenceData.details = "Admirando o museu";
						break;
					case "cadastro":
						presenceData.details = "Fazendo o cadastro";
						break;
					case "login":
						presenceData.details = "Fazendo o login";
						break;
					default:
						if (document.querySelector<HTMLHeadingElement>("h1")) {
							presenceData.details = "Vendo perfil de:";
							presenceData.state = !privacyMode
								? document.querySelector<HTMLHeadingElement>("h1")?.textContent
								: "Anônimo";
							if (!privacyMode) {
								presenceData.buttons = [
									{
										label: "Ver perfil",
										url: document.location.href,
									},
								];
							}
						} else presenceData.details = "Vendo outros conteúdos";
						break;
				}
			}
			if (urlpath[2]) {
				switch (urlpath[2]) {
					case "pagina": {
						presenceData.details = `Vendo perfil de ${!privacyMode ? urlpath[1] : "Anônimo"
							} `;
						presenceData.state = `Página ${urlpath[3]}`;
						break;
					}
					case "rss":
						presenceData.details = "Vendo o Feed RSS";
						break;
					default:
						if (!document.querySelector<HTMLHeadingElement>("h1")) {
							presenceData.details = "Lendo resposta a:";
							presenceData.state =
								document.querySelector("strong")?.textContent;
							presenceData.buttons = [
								{
									label: "Ver resposta",
									url: document.location.href,
								},
							];
						} else {
							presenceData.details = "Lendo o conteúdo:";
							presenceData.state =
								document.querySelector<HTMLHeadingElement>("h1")?.textContent;
							presenceData.buttons = [
								{
									label: "Ver conteúdo",
									url: document.location.href,
								},
							];
						}
						break;
				}
				break;
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
