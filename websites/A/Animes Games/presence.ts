const presence = new Presence({
		clientId: "860857600203554816",
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
			largeImageKey: "https://i.imgur.com/R56JzLO.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href } = document.location,
		fav: HTMLDivElement = document.querySelector(".favFixed");

	if (fav && fav.style.display === "block")
		presenceData.details = "Olhando os favoritos";
	else {
		switch (pathname) {
			case "/": {
				if (search) {
					presenceData.details = "Procurando";
					presenceData.state = `Procurando por ${search.substring(3)}`;
				} else presenceData.details = "Explorando animesgames.net";

				break;
			}
			case "/lancamentos": {
				presenceData.details = "Navegando os lançamentos";
				break;
			}
			case "/lista-de-animes": {
				presenceData.details = "Vendo Lista de Animes";
				break;
			}
			case "/filmes": {
				presenceData.details = "Vendo Lista de Filmes";
				if (search)
					presenceData.state = `Procurando por ${search.substring(8)}`;

				break;
			}
			case "/desenhos": {
				presenceData.details = "Olhando para desenhos";
				if (search)
					presenceData.state = `Procurando por ${search.substring(8)}`;

				break;
			}
			case "/calendario": {
				const day: HTMLLIElement = document.querySelector(
					"ul#calen-nav > li.active"
				);
				presenceData.details = "Olhando o Calendário";
				if (day) presenceData.state = `No dia: ${day.textContent}`;

				break;
			}
			default:
				if (pathname.startsWith("/genero/")) {
					const genre: HTMLHeadingElement = document.querySelector(
						"body > div.conteudoAlinhado > div.conteudoGen > section:nth-child(1) > section > h1"
					);
					presenceData.details = "Procurando por gênero";
					if (genre) presenceData.state = genre.textContent;
				} else if (/\/[a-z]\/animes\//.test(pathname)) {
					const anime: HTMLHeadingElement = document.querySelector(
						"body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section.tituloPrincipal > h1"
					);
					presenceData.details = "Vendo Sinopse";
					if (anime) presenceData.state = anime.textContent;
					presenceData.buttons = [
						{
							label: "Vendo Sinopse",
							url: href,
						},
					];
				} else {
					const anime: HTMLHeadingElement = document.querySelector(
							"body > div.conteudoAlinhado > div.conteudo > section:nth-child(1) > section > h1"
						),
						video: HTMLVideoElement = document.querySelector("video");
					if (anime) {
						const episode = parseInt(anime.textContent.split(" ").pop());
						[presenceData.details] = anime.textContent.split("-");
						if (!isNaN(episode)) presenceData.state = `Episódio: ${episode}`;
						if (video) {
							[, presenceData.endTimestamp] =
								presence.getTimestampsfromMedia(video);
						}

						presenceData.buttons = [
							{
								label: "Assistir Episódio",
								url: href,
							},
						];
					}
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
