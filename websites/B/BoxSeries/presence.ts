const presence = new Presence({
		clientId: "955350055034945576",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [logo, cover, privacy, buttons, timestamps] = await Promise.all([
			presence.getSetting<number>("logo"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
		]),
		titleMain =
			document.querySelector("#dt_contenedor > div.module > div > div > h1")
				?.textContent ?? "Pesquisa não encontrada",
		titleEp =
			document.querySelector("#single > h1.epih1")?.textContent.split(" - ") ??
			"Pesquisa não encontrada",
		presenceData: PresenceData = {
			largeImageKey: ["default", "default_horizontal_tp"][logo],
			startTimestamp: browsingTimestamp,
		};
	if (new URLSearchParams(location.search).has("s")) {
		presenceData.details = "Pesquisando por";
		presenceData.state = `${
			document.querySelector(
				"#dt_contenedor > div.module > div > div > div > header > h1 > span"
			)?.textContent ?? "Pesquisa não encontrada"
		}`;
		presenceData.smallImageKey = "search";
	} else {
		switch (document.location.toString().split("/")[3]) {
			case "calendario":
				presenceData.details = "Vendo calendário do dia";
				presenceData.smallImageKey = "reading";
				break;
			case "generos":
				presenceData.details = "Vendo gêneros";
				presenceData.state = titleMain;
				presenceData.smallImageKey = "reading";
				break;
			case "anos":
				presenceData.details = "Vendo anos";
				presenceData.smallImageKey = "reading";
				break;
			case "release":
				presenceData.details = "Vendo liberação";
				presenceData.state = titleMain;
				presenceData.smallImageKey = "reading";
				break;
			case "series":
				presenceData.details = "Vendo séries";
				if (!privacy && cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"div > div > div > div.poster-season > img"
					).src;
				}
				presenceData.state = `${
					document.querySelector("div > div > div > div.data > h1")
						?.textContent ?? "Pesquisa não encontrada"
				}`;
				presenceData.smallImageKey = "reading";
				break;
			case "episodio":
				if (!privacy && cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"#dt_contenedor > div.season-bg-bs > div > a > img"
					).src;
				}
				presenceData.details = `${titleEp[0]}`;
				presenceData.state = `${titleEp[1]}`;
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused ? "Pausado" : "Assistindo";
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (buttons) {
					presenceData.buttons = [
						{
							label: "Assistir episódio",
							url: document.location.href.replace(/#\d+/, ""),
						},
					];
				}
				break;
			case "filmes":
				if (!privacy && cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"#dt_contenedor > div.season-bg-bs > div > img"
					).src;
				}
				presenceData.details = "Vendo filmes";
				presenceData.state = `${
					document.querySelector(
						"#single > div.content.full_width_layout > div.dooplay_player > div.area-season.movie-bs > div.data > h1"
					)?.textContent ?? "Pesquisa não encontrada"
				}`;
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused ? "Pausado" : "Assistindo";
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (buttons) {
					presenceData.buttons = [
						{
							label: "Assistir filmes",
							url: document.location.href.replace(/#\d+/, ""),
						},
					];
				}
				break;
			default:
				presenceData.details = "Página inicial";
				presenceData.smallImageKey = "reading";
				break;
		}
	}
	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
