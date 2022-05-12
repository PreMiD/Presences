const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		};
	if (document.querySelector("input[id^=headlessui]"))
		presenceData.details = "Pesquisando Animes";
	else if (pathname.startsWith("/login")) presenceData.details = "Logando";
	else if (pathname.startsWith("/register"))
		presenceData.details = "Cadastrando";
	else if (pathname.startsWith("/home"))
		presenceData.details = "Página principal";
	else if (pathname.startsWith("/profile/")) {
		presenceData.details = "Visualizando perfil";
		presenceData.state = `${
			document.querySelector("h3").childNodes[0]?.textContent
		} - ${document.querySelector("button[class*=blue] span")?.textContent}`;
		presenceData.buttons = [{ label: "Ver perfil", url: location.href }];
	} else if (pathname.startsWith("/config")) {
		presenceData.details = `Configurando ${
			document.querySelector("button[class*=blue] span")?.textContent
		}`;
	} else if (pathname.startsWith("/anime/")) {
		presenceData.details = "Visualizando anime";
		presenceData.state = document.querySelector(
			"section div[class^=text-3xl]"
		)?.textContent;
		presenceData.buttons = [{ label: "Ver anime", url: location.href }];
	} else if (pathname.startsWith("/watch/")) {
		presenceData.details = document.querySelector(
			"span.text-sm.font-bold.underline"
		)?.textContent;
		presenceData.state = document.querySelector(
			"span.text-lg.font-bold"
		)?.textContent;
		presenceData.buttons = [
			{
				label: "Assistir episódio",
				url: location.href
			},
			{
				label: "Ver anime",
				url: document.querySelector<HTMLAnchorElement>(".mb-4>a").href
			}
		];
		if (
			document.querySelector("video") &&
			!document.querySelector("video").paused &&
			document.querySelector("video").readyState >= 1
		) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					document.querySelector("video").currentTime,
					document.querySelector("video").duration
				);
		}
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
