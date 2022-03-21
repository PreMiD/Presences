const presence = new Presence({
		clientId: "955350055034945576"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [Logo, Cover, Privacy, Buttons, Timestamps] = await Promise.all([
			presence.getSetting<number>("logo"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps")
		]),
		titleMain =
			document.querySelector("#dt_contenedor > div.module > div > div > h1")
				?.textContent ?? "pesquisa não encontrada",
		titleEp =
			document.querySelector("#single > h1.epih1")?.textContent.split(" - ") ??
			"pesquisa não encontrada",
		pathArray = document.location.toString().split("/"),
		presenceData: PresenceData = {
			largeImageKey: ["default", "default_horizontal_tp"][Logo],
			startTimestamp: browsingTimestamp
		};
	if (location.search.includes("s")) {
		presenceData.details = "Pesquisando po";
		presenceData.state = `${
			document.querySelector(
				"#dt_contenedor > div.module > div > div > div > header > h1 > span"
			)?.textContent ?? "pesquisa não encontrada"
		}`;
		presenceData.smallImageKey = "search";
	} else {
		switch (pathArray[3]) {
			case "calendario":
				presenceData.details = "Vendo Calendário do Dia";
				presenceData.smallImageKey = "reading";
				break;
			case "generos":
				presenceData.details = "Vendo Gêneros";
				if (!Privacy && pathArray[4]) presenceData.state = titleMain;
				presenceData.smallImageKey = "reading";
				break;
			case "anos":
				presenceData.details = "Vendo anos";
				presenceData.smallImageKey = "reading";
				break;
			case "release":
				presenceData.details = "Vendo Liberação";
				if (!Privacy && pathArray[4]) presenceData.state = titleMain;
				presenceData.smallImageKey = "reading";
				break;
			case "series":
				presenceData.details = "Vendo Séries";
				if (Cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"div > div > div > div.poster-season > img"
					).src;
				}
				if (!Privacy && pathArray[4]) {
					presenceData.state = `${
						document.querySelector("div > div > div > div.data > h1")
							?.textContent ?? "pesquisa não encontrada"
					}`;
					presenceData.smallImageKey = "reading";
				}
				break;
			case "episodio":
				if (Cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"#dt_contenedor > div.season-bg-bs > div > a > img"
					).src;
				}
				presenceData.details = `${titleEp[0]}`;
				presenceData.state = `${titleEp[1]}`;
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (Buttons) {
					presenceData.buttons = [
						{
							label: "Assistir episodio",
							url: document.location.href.replace(/#\d+/, "")
						}
					];
				}
				break;
			case "filmes":
				if (Cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"#dt_contenedor > div.season-bg-bs > div > img"
					).src;
				}
				presenceData.details = "Vendo filmes";
				presenceData.state = `${
					document.querySelector(
						"#single > div.content.full_width_layout > div.dooplay_player > div.area-season.movie-bs > div.data > h1"
					)?.textContent ?? "pesquisa não encontrada"
				}`;
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (Buttons) {
					presenceData.buttons = [
						{
							label: "Assistir filmes",
							url: document.location.href.replace(/#\d+/, "")
						}
					];
				}
				break;
			default:
				presenceData.details = "Vendo página";
				presenceData.state = "em Página Inicial";
				presenceData.smallImageKey = "reading";
				break;
		}
	}
	if (!Buttons) delete presenceData.buttons;
	if (!Timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (Privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
