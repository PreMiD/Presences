const presence = new Presence({
	clientId: "714001239351885904",
});

enum ResourceNames {
	logo = "logo",
	reading = "reading",
	search = "search",
	writing = "writing",
	history = "history",
	info = "info",
}

/* eslint-disable camelcase */
const assets = {
	logo_cloud_dark:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/0.png",
	logo_book_dark:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/1.png",
	logo_book:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/2.png",
	logo_cloud:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/3.png",
	reading_dark: Assets.Reading,
	writing: Assets.Writing,
	reading: Assets.Reading,
	search_dark: Assets.Search,
	search: Assets.Search,
	writing_dark: Assets.Writing,
	history_dark:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/4.png",
	history:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/5.png",
	info: "https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/6.png",
	info_dark:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/7.png",
	hatsune_miku:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/8.png",
	bell: "https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/9.png",
	bell_dark:
		"https://cdn.rcd.gg/PreMiD/websites/T/Tsuki%20Mang%C3%A1s/assets/10.png",
};
/* eslint-enable camelcase */

async function Resource(ResourceSelected: ResourceNames): Promise<string> {
	let value = ResourceSelected.toString();
	const logo = await presence.getSetting<number>("logo"),
		darkmode = await presence.getSetting<boolean>("darkResource");
	if (ResourceSelected === ResourceNames.logo)
		logo !== 0 ? (value += "_book") : (value += "_cloud");
	if (darkmode) value += "_dark";
	return assets[value as keyof typeof assets];
}

function getPagination(pagN: number): number[] {
	const pagination = document.querySelectorAll(".pagination")[pagN];
	let current = 1,
		max = 1;
	if (pagination) {
		current = parseInt(pagination.querySelectorAll(".active")[0].textContent);
		for (const item of pagination.childNodes) {
			if (
				item.nodeName === "LI" &&
				!isNaN(parseInt(item.textContent)) &&
				parseInt(item.textContent) > max
			)
				max = parseInt(item.textContent);
		}
	}
	return [current, max];
}
let browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const pathName = window.location.pathname,
		notfound =
			window.location.pathname === "/404" ||
			document.querySelectorAll(".notfound").length !== 0,
		presenceData: PresenceData = {
			largeImageKey: await Resource(ResourceNames.logo),
		};
	if (await presence.getSetting<boolean>("resetTimestamp"))
		browsingTimestamp = Math.floor(Date.now() / 1000);
	if (pathName === "/") {
		let lancamentos = "...";
		const qlancamentos = document.querySelectorAll("div.leflist > div");
		if (qlancamentos.length > 0) {
			for (const item of qlancamentos) {
				if (item.className.includes("activedlanca"))
					lancamentos = item.textContent;
			}
		}
		presenceData.details = "Início";
		presenceData.state = `Lançamentos: ${lancamentos}`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/login") && !notfound) {
		presenceData.details = "Logando...";
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/registrar") && !notfound) {
		presenceData.details = "Registrando...";
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/lista-mangas") && !notfound) {
		presenceData.details = `Lista de Mangás - Página ${getPagination(0)[0]}/${
			getPagination(0)[1]
		}`;
		let Generos = "";
		const GenerosN = document.querySelectorAll(
			"div.multiselect>div>div>span>span"
		);
		if (GenerosN.length > 0) {
			for (const item of GenerosN) {
				if (Generos.length === 0) Generos += item.textContent;
				else Generos += `, ${item.textContent}`;
			}
		}
		presenceData.state = `Gêneros: ${!Generos.trim() ? "Todos" : Generos}`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/perfil/") && !notfound) {
		const username = document.querySelector("#capapl > b"),
			[sessionUsername] = (
				document.querySelector("#menu>li>ul>a") as HTMLLinkElement
			).href
				.split("/")
				.slice(-1),
			usernameValue = [0, "...", true];
		if (!(await presence.getSetting<boolean>("showUserName"))) {
			usernameValue[1] = "👁‍🗨👁‍🗨";
			usernameValue[3] = false;
		} else usernameValue[3] = true;
		if (
			username &&
			username.textContent.trim() &&
			pathName.split("/").slice(-1)[0] !== "editar"
		) {
			usernameValue[0] = 0;
			if (usernameValue[3]) usernameValue[1] = username.textContent;
		} else if (
			pathName.split("/").length === 4 &&
			sessionUsername &&
			sessionUsername.trim() &&
			sessionUsername === pathName.split("/").slice(-2)[0]
		) {
			usernameValue[0] = 1;
			if (usernameValue[3]) usernameValue[1] = sessionUsername;
		} else if (
			pathName.split("/").length === 4 &&
			sessionUsername &&
			sessionUsername.trim() &&
			pathName.split("/").slice(-1)[0] === "editar" &&
			sessionUsername !== pathName.split("/").slice(-2)[0]
		) {
			usernameValue[0] = 0;
			if (usernameValue[3]) [usernameValue[1]] = pathName.split("/").slice(-2);
		}
		presenceData.details =
			usernameValue[0] === 0 ? "Vizualizando Perfil:" : "Editando Perfil:";
		presenceData.state = usernameValue[1].toString();
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/manga/") && !notfound) {
		const MangaDefaultName = document.querySelector(
				"#app > div.manga.mtopmanga > div.all > div.rigt > div.tity > h2 > b"
			),
			qMangaAltNames = document.querySelector(
				"#app > div.manga.mtopmanga > div.all > div.lef > div.altt"
			);
		let MangaAltNames = "",
			MangaName = "...";
		if (MangaDefaultName && MangaDefaultName.textContent.trim()) {
			if (qMangaAltNames && qMangaAltNames.textContent.trim())
				MangaAltNames = ` (${qMangaAltNames.textContent})`;
			MangaName = MangaDefaultName.textContent + MangaAltNames;
		}
		presenceData.details = "Visualizando Mangá:";
		presenceData.state = MangaName;
		const qgender = document.querySelector("div.mtop>span");
		let gender = "";
		if (qgender) {
			for (const item of qgender.childNodes) {
				if (item.textContent === "Gêneros:") continue;
				if (gender !== "") gender += ", ";
				gender += item.textContent.replace(/^\s+|\s+$/g, "");
			}
		}
		if (gender !== "") {
			presenceData.smallImageKey = await Resource(ResourceNames.search);
			presenceData.smallImageText = gender;
		}
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith("/leitor/") && !notfound) {
		const overlay = document.querySelector(
				"#app > div.manga > div.v--modal-overlay"
			),
			qmanga = document.querySelector("b.f20"),
			qchapter = document.querySelector("b.f14c"),
			qpage = document.querySelector("select.backgsla.frightrr"),
			manga = qmanga ? qmanga.textContent : "...";
		let chapter = qchapter ? qchapter.textContent : "...",
			page = "...";
		if (qpage) {
			page = (qpage as HTMLInputElement).value;
			isNaN(parseInt(page))
				? page.trim()
					? (page = " - Páginas abertas")
					: (page = "...")
				: (page = ` - Página ${page}`);
		}
		presenceData.smallImageKey = await Resource(ResourceNames.reading);
		presenceData.smallImageText = "Lendo...";
		presenceData.details = manga.trim() ? manga : "...";
		if (chapter.trim() && chapter.includes("-")) {
			chapter = chapter.replace(/^\s+|\s+$/g, "");
			chapter = `${chapter.split(" - ")[0]} - "${chapter.split(" - ")[1]}"`;
		}
		presenceData.state = chapter + page;
		if (
			(await presence.getSetting<boolean>("showComment")) &&
			overlay &&
			overlay.getAttribute("data-modal").includes("comentarios")
		) {
			presenceData.smallImageKey = await Resource(ResourceNames.writing);
			presenceData.smallImageText = "Comentando...";
		} else if (
			(await presence.getSetting<boolean>("showReport")) &&
			overlay &&
			overlay.getAttribute("data-modal").includes("report")
		) {
			presenceData.smallImageKey = await Resource(ResourceNames.info);
			presenceData.smallImageText = "Reportando...";
		}
		presenceData.startTimestamp = browsingTimestamp;
	} else if (
		pathName.startsWith("/scan/") &&
		pathName !== "/scan/" &&
		!notfound
	) {
		const scanName = document.querySelector(
				"#app > div.scan > div.contentscan > div > h2"
			),
			qscanMembers = document.querySelectorAll(
				"#app > div.scan > div.contentscan > div > div.membrosscan > b"
			).length;
		let scanMembers;
		qscanMembers > 0
			? (scanMembers = ` - ${qscanMembers.toString()} Membros`)
			: (scanMembers = " - 0 Membros");
		presenceData.details = "Visualizando Grupo:";
		presenceData.state = `${
			(scanName !== null && scanName.textContent.trim()
				? scanName.textContent
				: "...") + scanMembers
		} - Página ${getPagination(0)[0]}/${getPagination(0)[1]}`;
		presenceData.startTimestamp = browsingTimestamp;
	}
	if (
		(await presence.getSetting<boolean>("showHistory")) &&
		document.querySelectorAll(".historicob").length !== 0 &&
		parseInt(
			document
				.querySelectorAll(".historicob")[0]
				.parentElement.style.width.replace("%", "")
		) !== 0
	) {
		let hSession;
		for (const item of document.querySelectorAll("div.selecths")) {
			if (item.classList[item.classList.length - 1].includes("selecths"))
				hSession = `${item.childNodes[0].textContent} ${item.childNodes[1].textContent}`;
		}
		const qUser = document.querySelector("#menu>li>ul>a");
		let user = qUser
			? (qUser as HTMLLinkElement).href.split("/").slice(-1)[0]
			: "...";
		presenceData.details = "Vizualizando Histórico:";
		presenceData.state = `${document
			.querySelectorAll(".activmancap")[0]
			.textContent.replace(/^\s+|\s+$/g, "")} - ${hSession} - Página ${
			getPagination(0)[0]
		}/${getPagination(0)[1]}`;
		if (!(await presence.getSetting<boolean>("showUserName"))) user = "👁‍🗨👁‍🗨";
		presenceData.smallImageKey = await Resource(ResourceNames.history);
		presenceData.smallImageText = `Username: ${user}`;
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
