const presence = new Presence({
		clientId: "877352306100813944",
	}),
	pages: Record<string, PresenceData> = {
		"/assinatura/": {
			details: "Na página de premium",
			state: "Vendo sobre os planos premiums",
		},
		"/login/": {
			details: "Fazendo login no site",
			state: "Login...",
		},
		"/perfil/": {
			details: "Vendo seu próprio perfil",
			state: "Vendo o perfil.",
		},
		"/generos/": {
			details: "Vendo todos os gêneros de anime.",
			state: "Vendo...",
		},
		"/calendario/": {
			details: "Vendo o calendário de animes",
			state: "Vendo...",
		},
	},
	presenceTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/hkqIL8Q.png",
		startTimestamp: presenceTimestamp,
	};
	const page = document.location.pathname,
		params = new URLSearchParams(document.location.search.substring(1));

	if (page in pages) presenceData = Object.assign(presenceData, pages[page]);
	else {
		switch (page) {
			case "/": {
				presenceData.details = "Na página inicial";
				presenceData.state = "Procurando animes...";
				if (params.get("s")) {
					presenceData.details = "Procurando animes.";
					presenceData.state = `Procurando por ${params.get("s")}`;
				}

				break;
			}
			case "/lista-de-animes/": {
				presenceData.details = "Procurando animes";
				presenceData.state = "Na lista de animes";
				if (params.get("search") !== "0")
					presenceData.state = `Procurando por ${params.get("search")}`;

				break;
			}
			case "/filmes/": {
				presenceData.details = "Procurando filmes de animes";
				presenceData.state = "Na lista de filmes de animes";
				if (params.get("search") !== "0" && params.get("search"))
					presenceData.state = `Procurando por ${params.get("search")}`;

				break;
			}
			default:
				if (page.includes("/anime/")) {
					if (page.includes("/episodio")) {
						const video = document.querySelector(
							"#video > div > div > video"
						) as HTMLMediaElement;
						presenceData.details = "Assistindo um anime";
						presenceData.state = `${
							document.querySelector("#anime_title").textContent
						}`;
						presenceData.smallImageKey = "play";
						if (video.paused) {
							delete presenceData.endTimestamp;
							delete presenceData.startTimestamp;
							presenceData.smallImageKey = "pause";
						}
						[, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(video);
						presenceData.buttons = [
							{
								label: "Assista também",
								url: `https://animes.gg/${page}`,
							},
						];
					} else {
						const animeTitleFull = document.querySelector(
								".ani_titulo_original"
							).textContent,
							showFullName = await presence.getSetting<boolean>("fullName");
						presenceData.details = "Vendo sobre um anime";
						if (showFullName && animeTitleFull)
							presenceData.state = `Vendo sobre ${animeTitleFull}`;
						else {
							presenceData.state = `Vendo sobre ${
								document.querySelector(".ani_titulo > h1").textContent
							}`;
						}
					}
				} else if (page.startsWith("/usuario")) {
					presenceData.details = "Vendo a página de um usuário";
					presenceData.state = `Vendo a página do ${
						document.querySelector(".profile-name").textContent
					}`;
				} else if (page.startsWith("/filme")) {
					const animeTitleFull = document.querySelector(
							".ani_titulo_original"
						).textContent,
						showFullName = await presence.getSetting<boolean>("fullName"),
						video = document.querySelector(
							"#video > div > div > video"
						) as HTMLMediaElement;
					presenceData.details = "Assistindo um filme de anime";
					if (showFullName && animeTitleFull)
						presenceData.state = `${animeTitleFull}`;
					else {
						presenceData.state = `${
							document.querySelector(".ani_titulo > h1").textContent
						}`;
					}
					[, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);
					presenceData.buttons = [
						{
							label: "Assista também",
							url: `https://animes.gg/${page}`,
						},
					];
					presenceData.smallImageKey = "play";
					if (video.paused) {
						delete presenceData.endTimestamp;
						delete presenceData.startTimestamp;
						presenceData.smallImageKey = "pause";
					}
				} else if (page.startsWith("/genero")) {
					presenceData.details = "Procurando um gênero de anime";
					presenceData.state = `Procurando ${page
						.substring("/genero/".length)
						.slice(0, -1)}`;
				} else if (page.startsWith("/lancamentos")) {
					presenceData.details = "Vendo os ultimos lançamentos no site";
					presenceData.state = "Vendo...";
				}
		}
	}

	if (presenceData.details && presenceData.state)
		presence.setActivity(presenceData);
	else presence.setActivity();
});
