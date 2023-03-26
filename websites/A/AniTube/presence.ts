const presence = new Presence({ clientId: "801135853433913394" });

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/HgVnakc.png",
		},
		tempo = Math.floor(Date.now() / 1000),
		titulo = document.title;

	if (titulo.includes("Resultados da pesquisa")) {
		presenceData.details = "Página de Busca";
		presenceData.state = `Pesquisando: ${document
			.querySelector("body > div.pagAniTitulo > div > h1")
			.textContent.replace("Você pesquisou por:", "")}`;
		presenceData.startTimestamp = tempo;
	} else {
		switch (document.location.pathname) {
			case "/lista-de-animes-online/": {
				presenceData.details = "Animes Legendados";
				presenceData.startTimestamp = tempo;

				break;
			}
			case "/lista-de-animes-dublados-online/": {
				presenceData.details = "Animes Dublados";
				presenceData.startTimestamp = tempo;

				break;
			}
			case "/lista-de-generos-online/": {
				presenceData.details = "Gêneros";
				presenceData.startTimestamp = tempo;

				break;
			}
			case "/calendario/": {
				presenceData.details = "Calendário de Animes";
				presenceData.startTimestamp = tempo;

				break;
			}
			default:
				if (titulo.includes("Todos os Epi")) {
					presenceData.details = document
						.querySelector("body > div.pagAniTitulo > div > h1")
						.textContent.replace(" – Todos os Episódios", "");
					presenceData.state = document.querySelector(
						"#anime > div.animeFlexContainer > div.right > div > div:nth-child(2)"
					).textContent;
					presenceData.startTimestamp = tempo;
				} else if (titulo.includes(" – Episód")) {
					const AniN = document
							.querySelector("body > div.pagEpiTitulo > div > h1")
							.textContent.split(" ")
							.join(" ")
							.replace(" HD", "")
							.replace(" [SEM CENSURA]", "")
							.slice(0, -2)
							.replace(" – Episódio", ""),
						AniEp = document
							.querySelector("body > div.pagEpiTitulo > div > h1")
							.textContent.replace(AniN, "");
					presenceData.details = AniN;
					presenceData.state = AniEp.replace(" – Episódio", "Episódio: ");
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = "Pausado";

					const video: HTMLVideoElement = document.querySelector(".jw-video");

					if (video && !isNaN(video.duration)) {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(
								Math.floor(video.currentTime),
								Math.floor(video.duration)
							);
						presenceData.smallImageKey = video.paused ? "pause" : "play";
						presenceData.smallImageText = video.paused
							? "Pausado"
							: "Assistindo";
						presenceData.state = AniEp.replace("– ", "").replace(
							" [SEM CENSURA]",
							""
						);

						if (video.paused) {
							delete presenceData.startTimestamp;
							delete presenceData.endTimestamp;
						}
					}
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
