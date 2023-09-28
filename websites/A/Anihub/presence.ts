const presence = new Presence({
	clientId: "715045665796915250",
});

function NotFound(): boolean {
	const q = document.querySelector("#content>div>div>h1");
	if (window.location.pathname === "/404") return true;
	else if (q && q.textContent === "Página não encontrada!") return true;
	return false;
}
enum PathNames {
	watch = "/videos",
	profile = "/perfil",
	animeInfo = "/anime",
	social = "/postagens",
	forum = "/forum",
	history = "/minha-lista",
	newTopic = "/novo-topico",
	room = "/sala",
}
enum SettingsId {
	/* PathNames.profile */
	showProfile = "showProfile",
	showProfileUsername = "showProfileUsername",
	showProfileSelection = "showProfileSelection",
	/* PathNames.watch */
	showVideos = "showVideos",
	showVideosName = "showVideosName",
	showVideosEpisode = "showVideosEpisode",
	showVideosLTime = "showVideosLTime",
	showVideosComment = "showVideosComment",
	showVideosReport = "showVidoesReport",
	/* PathNames.forum */
	showForum = "showForum",
	showForumTitle = "showForumTitle",
	showForumCategory = "showForumCategory",
	showForumNewTopic = "showForumNewTopic",
	showForumReply = "showForumReply",
	/* PathNames.social */
	showSocial = "showSocial",
	showSocialTitle = "showSocialTitle",
	/* PathNames.animeInfo */
	showAnime = "showAnime",
	showAnimeReview = "showAnimeReview",
	showAnimeTrailer = "showAnimeTrailer",
	showAnimeSelection = "showAnimeSelection",
	showAnimeName = "showAnimeName",
	/* PathNames.room */
	showRoom = "showRoom",
	showRoomEpisode = "showRoomEpisode",
	showRoomName = "showRoomName",
	showRoomUsers = "showRoomUsers",
	showRoomLTime = "showRoomLTime",
}
enum ResourceNames {
	logo = "logo_shadow",
	play = "play",
	pause = "pause",
	stop = "stop",
	search = "search",
	writing = "writing",
	reading = "reading",
	info = "info",
	group = "group",
}
const browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: ResourceNames.logo,
			startTimestamp: browsingTimestamp,
		},
		pathName = window.location.pathname,
		video = document.querySelector("video");
	function DefaultPresence(): void {
		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
	if (
		pathName.startsWith(PathNames.watch) &&
		(await presence.getSetting<boolean>(SettingsId.showVideos)) &&
		!NotFound()
	) {
		const value = ["...", "..."],
			animeNameEP = document.querySelector("#main>article>h1"),
			comment = document.querySelector("textarea"),
			report = document.querySelector("div.modal-header>h1"),
			[, genders] = document.querySelectorAll("div.autofill>span");
		let timestamps: number[] = [];
		if (animeNameEP) {
			value[0] = animeNameEP.textContent.replace(
				animeNameEP.textContent.match(/ - \d+/g).slice(-1)[0],
				""
			);
			[value[1]] = animeNameEP.textContent
				.match(/ - \d+/g)
				.slice(-1)[0]
				.match(/\d+/g);
		}
		if (video && !isNaN(video.duration)) {
			timestamps = presence.getTimestamps(video.currentTime, video.duration);
			if (await presence.getSetting<boolean>(SettingsId.showVideosLTime)) {
				if (!video.paused && video.readyState >= 1) {
					[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
					presenceData.smallImageKey = ResourceNames.play;
				} else if (video.readyState >= 1)
					presenceData.smallImageKey = ResourceNames.pause;
			}
		} else if (await presence.getSetting<boolean>(SettingsId.showVideosLTime))
			presenceData.smallImageKey = ResourceNames.stop;
		[presenceData.details] = value;
		presenceData.state = `Episódio ${value[1]}`;
		if (genders && !genders.textContent.toLowerCase().includes("carregando"))
			presenceData.smallImageText = genders.textContent;
		if (!(await presence.getSetting<boolean>(SettingsId.showVideosName))) {
			presenceData.details = "Assistindo Anime:";
			delete presenceData.smallImageText;
		}
		if (!(await presence.getSetting<boolean>(SettingsId.showVideosEpisode))) {
			delete presenceData.state;
			presenceData.details = presenceData.details.replace(":", "");
		}
		if (
			(await presence.getSetting<boolean>(SettingsId.showVideosReport)) &&
			report &&
			report.textContent.toLowerCase().includes("relatando")
		) {
			presenceData.smallImageKey = ResourceNames.info;
			presenceData.smallImageText = "Reportando...";
		} else if (
			(await presence.getSetting<boolean>(SettingsId.showVideosComment)) &&
			comment &&
			comment.textLength > 0
		) {
			presenceData.smallImageKey = ResourceNames.writing;
			presenceData.smallImageText = "Comentando...";
		}
		if (
			!presenceData.state &&
			(await presence.getSetting<boolean>(SettingsId.showVideosName)) &&
			!(await presence.getSetting<boolean>(SettingsId.showVideosEpisode))
		) {
			presenceData.details = "Assistindo Anime:";
			[presenceData.state] = value;
		}
		if (
			(await presence.getSetting<boolean>(SettingsId.showVideosLTime)) &&
			video &&
			!isNaN(video.duration) &&
			timestamps[0] === timestamps[1]
		) {
			presenceData.details = presenceData.details.replace(/^/, "✔ ");
			presenceData.smallImageKey = ResourceNames.stop;
		}
	} else if (
		pathName.startsWith(PathNames.profile) &&
		(await presence.getSetting<boolean>(SettingsId.showProfile)) &&
		!NotFound()
	) {
		const title = ["Visualizando Perfil", "..."],
			username = document.querySelector("h1>b>font"),
			selected = document.querySelector(
				"#main > div.black.flexContent.subNav.p1 > a.btn.router-link-active"
			),
			selfUsername = document.querySelector("#menu-links>ul>li>div>div>li>a");
		if (
			pathName.startsWith(PathNames.profile) &&
			pathName.includes("/editar") &&
			selfUsername &&
			username.textContent.toLowerCase() ===
				selfUsername.getAttribute("href").split("/").slice(-1)[0].toLowerCase()
		)
			title[0] = "Editando Perfil";
		title[1] = username ? username.textContent : "...";
		if (
			selected &&
			(await presence.getSetting<boolean>(SettingsId.showProfileSelection))
		)
			title[0] += ` - ${selected.childNodes[1].textContent.trim()}`;
		[presenceData.details, presenceData.state] = title;
		if (!(await presence.getSetting<boolean>(SettingsId.showProfileUsername))) {
			delete presenceData.state;
			presenceData.details = title[0].replace(":", "");
		} else presenceData.details += ":";
	} else if (
		pathName.startsWith(PathNames.forum) &&
		(await presence.getSetting<boolean>(SettingsId.showForum)) &&
		!NotFound()
	) {
		const [Thread] = document.querySelectorAll(".thread"),
			NonThread = document.querySelector("#main>article>div>h1>b");
		if (pathName.split("/").join("") === PathNames.forum.split("/").join("")) {
			presenceData.details = "Fórum";
			if (await presence.getSetting<boolean>(SettingsId.showForumCategory)) {
				presenceData.state = "Categorias";
				presenceData.smallImageKey = ResourceNames.search;
			}
		} else if (Thread) {
			presenceData.details = (await presence.getSetting<boolean>(
				SettingsId.showForumCategory
			))
				? `Fórum - ${
						Thread.parentElement.firstChild.textContent.match(/\[(.*?\])/)[0]
				  }`
				: "Fórum";
			const textarea = document.querySelector("div.chill.fill");
			if (await presence.getSetting<boolean>(SettingsId.showForumTitle)) {
				presenceData.state = `${
					document.querySelector("div.flexContent.thread>div>div>a").textContent
				}: ${document
					.querySelector("head>title")
					.textContent.replace(" - Tópico", "")}`;
				presenceData.smallImageKey = ResourceNames.reading;
				presenceData.smallImageText = `Thread Id: ${Thread.getAttribute(
					"id"
				).replace("t", "")}`;
			}
			if (
				textarea &&
				textarea.textContent.length > 0 &&
				(await presence.getSetting<boolean>(SettingsId.showForumReply))
			) {
				presenceData.smallImageKey = ResourceNames.writing;
				presenceData.smallImageText = "Respondendo...";
			}
		} else if (!pathName.endsWith(PathNames.newTopic)) {
			presenceData.details = "Fórum";
			if (await presence.getSetting<boolean>(SettingsId.showForumCategory)) {
				presenceData.state = `Categoria: ${NonThread.childNodes[
					NonThread.childNodes.length - 1
				].textContent.replace(/^\s+|\s+$/g, "")}`;
				presenceData.smallImageKey = ResourceNames.search;
			}
		} else {
			presenceData.details = "Fórum";
			if (await presence.getSetting<boolean>(SettingsId.showForumNewTopic)) {
				presenceData.details += " - [Novo Tópico]";
				const category = document.querySelector("select"),
					selectedCategory =
						category.options[category.selectedIndex].textContent;
				if (await presence.getSetting<boolean>(SettingsId.showForumCategory)) {
					presenceData.state = `Categoria: ${
						isNaN(parseInt(selectedCategory)) ? selectedCategory : "..."
					}`;
				}
				presenceData.smallImageKey = ResourceNames.writing;
			}
		}
	} else if (
		pathName.startsWith(PathNames.social) &&
		(await presence.getSetting<boolean>(SettingsId.showSocial)) &&
		!NotFound()
	) {
		presenceData.details = isNaN(parseInt(pathName.split("/").slice(-1)[0]))
			? "Visualizando Publicações"
			: "Visualizando Postagem";
		if (
			!isNaN(parseInt(pathName.split("/").slice(-1)[0])) &&
			(await presence.getSetting<boolean>(SettingsId.showSocialTitle))
		) {
			presenceData.details += ":";
			presenceData.state = document.querySelector("head>title").textContent;
			presenceData.smallImageText = `Post Id: ${
				pathName.split("/").slice(-1)[0]
			}`;
		}
		presenceData.smallImageKey = ResourceNames.reading;
	} else if (
		pathName.startsWith(PathNames.animeInfo) &&
		!pathName.startsWith(`${PathNames.animeInfo}s`) &&
		(await presence.getSetting<boolean>(SettingsId.showAnime)) &&
		!NotFound()
	) {
		const animeName = document.querySelector("h1>b"),
			modal = document.querySelector("div.modal-header>h1"),
			selected = document.querySelector("a.p1.din.router-link-exact-active");
		for (const item of document.querySelectorAll("div.aniinfos>span")) {
			if (item.previousElementSibling.textContent.includes("Gêneros")) {
				presenceData.smallImageKey = ResourceNames.search;
				presenceData.smallImageText = item.textContent;
			}
		}

		if (
			(await presence.getSetting<boolean>(SettingsId.showAnimeReview)) &&
			modal &&
			modal.textContent.toLowerCase().includes("resenha")
		) {
			selected &&
			(await presence.getSetting<boolean>(SettingsId.showAnimeSelection))
				? (presenceData.details = `Criando Resenha - ${selected.textContent}:`)
				: (presenceData.details = "Criando Resenha:");
		}
		if (
			(await presence.getSetting<boolean>(SettingsId.showAnimeTrailer)) &&
			modal &&
			modal.textContent.toLowerCase().includes("trailer")
		) {
			selected &&
			(await presence.getSetting<boolean>(SettingsId.showAnimeSelection))
				? (presenceData.details = `Assistindo Trailer - ${selected.textContent}:`)
				: (presenceData.details = "Assistindo Trailer:");
		}
		if (!presenceData.details) {
			selected &&
			(await presence.getSetting<boolean>(SettingsId.showAnimeSelection))
				? (presenceData.details = `Visualizando Anime - ${selected.textContent}:`)
				: (presenceData.details = "Visualizando Anime:");
		}
		if (await presence.getSetting<boolean>(SettingsId.showAnimeName))
			presenceData.state = animeName ? animeName.textContent : "...";
		else {
			presenceData.details = presenceData.details.replace(":", "");
			delete presenceData.smallImageText;
		}
	} else if (
		pathName.startsWith(PathNames.room) &&
		(await presence.getSetting<boolean>(SettingsId.showRoom))
	) {
		const usersCount = document.querySelector("#main>article>div>div>b"),
			animeNameEP = document.querySelector("#main>article>h1");
		let timestamps: number[] = [];
		const value = ["...", "..."];
		if (animeNameEP) {
			value[0] = animeNameEP.textContent.replace(
				animeNameEP.textContent.match(/ - \d+/g).slice(-1)[0],
				""
			);
			[value[1]] = animeNameEP.textContent
				.match(/ - \d+/g)
				.slice(-1)[0]
				.match(/\d+/g);
		}
		presenceData.details = !(await presence.getSetting<boolean>(
			SettingsId.showRoomName
		))
			? "Assistindo em Grupo:"
			: value[0];
		presenceData.state = `Episódio ${value[1]}`;
		presenceData.smallImageKey = ResourceNames.group;
		if (
			usersCount &&
			(await presence.getSetting<boolean>(SettingsId.showRoomUsers))
		) {
			presenceData.smallImageText =
				usersCount.textContent.split(" ")[0] === "1"
					? "Assistindo sozinho(a)"
					: `Assistindo com ${
							parseInt(usersCount.textContent.split(" ")[0]) - 1
					  } usuário(s)`;
		} else if (
			!(await presence.getSetting<boolean>(SettingsId.showRoomUsers)) &&
			(await presence.getSetting<boolean>(SettingsId.showRoomName))
		)
			presenceData.smallImageText = "Assistindo em Grupo";
		if (
			video &&
			!isNaN(video.duration) &&
			(await presence.getSetting<boolean>(SettingsId.showRoomLTime))
		) {
			timestamps = presence.getTimestamps(video.currentTime, video.duration);
			if (!video.paused && video.readyState >= 1)
				[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
		}
		if (!(await presence.getSetting<boolean>(SettingsId.showRoomEpisode)))
			delete presenceData.state;
		if (
			!(await presence.getSetting<boolean>(SettingsId.showRoomEpisode)) &&
			!(await presence.getSetting<boolean>(SettingsId.showRoomName))
		) {
			delete presenceData.state;
			presenceData.details = presenceData.details.replace(":", "");
		}
	} else if (!NotFound()) {
		try {
			const pathsAndStrings = [
					"/login=Logando",
					"/registro=Registrando...",
					"/changelogs=Changelogs",
					"/loja=Loja",
					"/caixa-da-sorte",
					"/politica=Políticas do Site",
					"/equipe-membros=Membros da Equipe",
					"/conquistas=Lista de Conquistas",
					"/animes=Lista de Animes",
				],
				customPaths = await presence.getSetting<string>("customPaths"),
				pathsFromCustom = [customPaths.toLowerCase().replace(/[\s\n]+/g, "")];
			for (const item of pathsAndStrings) {
				const splitItem = item.split("=");
				if (
					pathName.startsWith(splitItem[0]) &&
					pathsFromCustom.includes(splitItem[0])
				)
					[, presenceData.details] = splitItem;
				if (pathName === "/" && pathsFromCustom.includes("/"))
					presenceData.details = "Início";
			}
		} finally {
			DefaultPresence();
		}
	}
	DefaultPresence();
});
