const presence = new Presence({
		clientId: "861544419005169675",
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

let iframeData: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

presence.on(
	"iFrameData",
	(data: { currTime: number; duration: number; paused: boolean }) => {
		if (!data.paused) iframeData = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/h38pIwh.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href } = document.location;

	switch (pathname) {
		case "/": {
			presenceData.details = search
				? `Procurando por ${search.substring(3)}`
				: "Explorando animesdublado.com";

			break;
		}
		case "/lista-de-animes": {
			presenceData.details = "Procurando por Animes";
			break;
		}
		case "/lista-de-desenhos": {
			presenceData.details = "Procurando por Desenhos";
			break;
		}
		case "/lista-de-filmes": {
			presenceData.details = "Procurando por Filmes";
			break;
		}
		default:
			if (pathname.startsWith("/lancamento"))
				presenceData.details = "Últimos Lancamentos";
			else if (
				pathname.startsWith("/anime/") ||
				pathname.startsWith("/video/")
			) {
				if (!document.querySelector("iframe")) {
					const title: HTMLHeadingElement = document.querySelector(
						"section.titlePosts > h1"
					);
					presenceData.details = "Vendo Sinopse";
					if (title) presenceData.state = title.textContent;
					presenceData.buttons = [
						{
							label: "Ver Sinopse",
							url: href,
						},
					];
				} else {
					const title: HTMLHeadingElement = document.querySelector(
						"section.titlePost > h1"
					);
					if (title) {
						presenceData.details = title.textContent.substring(
							0,
							title.textContent.indexOf("Episódio")
						);
						presenceData.state = title.textContent.substring(
							title.textContent.indexOf("Episódio")
						);
					}
					if (iframeData && !iframeData.paused) {
						[, presenceData.endTimestamp] = presence.getTimestamps(
							iframeData.currTime,
							iframeData.duration
						);
					}
					presenceData.buttons = [
						{
							label: "Assistir o Episódio",
							url: href,
						},
					];
				}
			}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
