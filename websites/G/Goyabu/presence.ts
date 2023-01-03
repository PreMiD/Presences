const presence = new Presence({
		clientId: "629768767987122217",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/poILuXD.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		host = document.location.hostname;

	if (host === "goyabu.com" && path === "/") {
		if (
			document
				.querySelector("#home-content > h1 > span")
				.textContent.includes("VOCÊ PESQUISOU POR:")
		) {
			presenceData.details = "Pesquisando Animes";
			presenceData.state = `Pesquisou: ${document
				.querySelector("#home-content > h1 > span")
				.textContent.replace("Você pesquisou por: ", "")}`;
			presenceData.smallImageText = "Pesquisando";
			presenceData.smallImageKey = "search";
		} else presenceData.details = "Página Inicial";
	} else if (
		host === "goyabu.com" &&
		path.startsWith("/anime/") &&
		path.replace("/anime/", "")
	) {
		presenceData.details = "Visualizando Anime";
		presenceData.state = document.querySelector(
			"#channel-content > div.row > div.left20.right20 > h1"
		).textContent;
		presenceData.smallImageText = "Visualizando";
		presenceData.smallImageKey = "visualizando";
	} else if (
		host === "goyabu.com" &&
		path.startsWith("/lista-de-animes-online")
	) {
		presenceData.details = "Procurando Anime";
		presenceData.state = "Lista de Animes";
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Procurando";
	} else if (host === "goyabu.com" && path.startsWith("/tag/filmes")) {
		presenceData.details = "Procurando Anime";
		presenceData.state = "Lista de Filme de Animes";
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Procurando";
	} else if (host === "goyabu.com" && path.startsWith("/tag/calendario")) {
		presenceData.details = "Procurando Anime";
		presenceData.state = "Calendário de Animes";
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Procurando";
	} else if (host === "goyabu.com" && path.startsWith("/dmca"))
		presenceData.details = "DMCA";
	else if (host === "goyabu.com" && path.includes("/wp-login.php"))
		presenceData.details = "Iniciando Seção";
	else if (host === "goyabu.com" && path.includes("/wp-admin/profile.php")) {
		presenceData.details = "Visualizando Perfil";
		presenceData.smallImageText = "Perfil";
		presenceData.smallImageKey = "perfil";
	} else if (host === "goyabu.com" && path.includes("/user.php")) {
		presenceData.details = "Visualizando Perfil";
		presenceData.state = (
			document.querySelector("#home-content > h1") as HTMLElement
		).textContent.replace("Olá! ", "");
		presenceData.smallImageText = "Perfil";
		presenceData.smallImageKey = "perfil";
	} else if (
		host === "goyabu.com" &&
		path === `/video${path.replace("/video", "")}`
	) {
		const title: HTMLHeadingElement = document.querySelector(
			"#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div.user-container.full.top20.bottom20 > div.pull-left.user-box > div > a:nth-child(1) > h3"
		);
		presenceData.details = title.textContent;
		presenceData.state = document
			.querySelector(
				"#wrapper > div.row.block.page.p-video > div.video-holder.row > div.video-under.col-md-8.col-xs-12 > div:nth-child(1) > div.row.vibe-interactions > h1"
			)
			.textContent.replace("(Assistido)", "")
			.replace(title.textContent, "")
			.replace(" – ", "")
			.replace("(HD)", "");
		if (!document.querySelector("video").paused) {
			const video = document.querySelector<HTMLVideoElement>("video");
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
			presenceData.smallImageKey = "play";
			presenceData.smallImageText = "Assistindo";
		} else if (document.querySelector("video").currentTime > 0) {
			presenceData.smallImageKey = "pause";
			presenceData.smallImageText = "Pausado";
		}
	}
	presence.setActivity(presenceData);
});
