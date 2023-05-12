const presence = new Presence({
		clientId: "1083051669996187748",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Outros",
			largeImageKey: "https://i.imgur.com/pQeO9sn.png",
			startTimestamp: browsingTimestamp,
		},
		[topLevelPath, secondLevelPath, thirdLevelPath, fourLevelPath] =
			document.location.pathname.split("/"),
		privacyMode = await presence.getSetting<boolean>("privacy");

	switch (true) {
		case !topLevelPath || secondLevelPath === "pagina":
			presenceData.details = "Vendo conteúdos relevantes";
			if (secondLevelPath === "pagina")
				presenceData.state = `Página ${thirdLevelPath}`;
			break;
		case secondLevelPath.startsWith("recentes"):
			presenceData.details = "Vendo conteúdos recentes";
			if (fourLevelPath) presenceData.state = `Página ${fourLevelPath}`;
			break;
		default:
			if (secondLevelPath && !thirdLevelPath) {
				switch (secondLevelPath) {
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
			if (thirdLevelPath) {
				switch (thirdLevelPath) {
					case "pagina": {
						presenceData.details = `Vendo perfil de ${
							!privacyMode ? secondLevelPath : "Anônimo"
						}`;
						presenceData.state = `Página ${fourLevelPath}`;
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
