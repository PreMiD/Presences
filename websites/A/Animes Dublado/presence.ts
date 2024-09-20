const presence = new Presence({
		clientId: "861544419005169675",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/A/Animes%20Dublado/assets/0.png",
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
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(iframeData.currTime, iframeData.duration);
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
