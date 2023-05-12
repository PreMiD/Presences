const presence = new Presence({
		clientId: "972246349917610054",
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
presence.on("UpdateData", () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/8MP205p.png",
			startTimestamp: browsingTimestamp,
		};
	if (document.querySelector("input[id^=headlessui]"))
		presenceData.details = "Pesquisando Animes";
	else if (pathname.startsWith("/login")) presenceData.details = "Entrando";
	else if (pathname.startsWith("/register"))
		presenceData.details = "Cadastrando";
	else if (pathname.startsWith("/home"))
		presenceData.details = "Na página principal";
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
				url: location.href,
			},
			{
				label: "Ver anime",
				url: document.querySelector<HTMLAnchorElement>(".mb-4>a").href,
			},
		];
		const video = document.querySelector("video");
		if (video && !video.paused && video.readyState >= 1) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
		}
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
