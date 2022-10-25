const presence = new Presence({ clientId: "869377195682983957" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = { largeImageKey: "logo" };
	const { pathname, href } = window.location,
		[images, manga, chapter, user, timestamp, adult, privacy] =
			await Promise.all([
				presence.getSetting<boolean>("images"),
				presence.getSetting<boolean>("manga"),
				presence.getSetting<boolean>("chapter"),
				presence.getSetting<boolean>("user"),
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<boolean>("adult"),
				presence.getSetting<boolean>("privacy"),
			]),
		pages: Record<string, PresenceData> = {
			"/": { details: "Página Inicial" },
			"/signup": { details: "Registrando-se" },
			"/login": { details: "Fazendo Login" },
			"/recovery": { details: "Recuperando a Conta" },
			"/404": { details: "Erro 404", state: "Perdido no Mato" },
			"/500": { details: "Erro 500", state: "O barco afundou" },
			"/tutorial": { details: "Lendo o Tutorial" },
			"/faq": { details: "Lendo o FAQ" },
			"/tos": { details: "Lendo os Termos de Uso" },
			"/privacy": { details: "Lendo as Políticas de Privacidade" },
			"/dmca": { details: "Lendo DMCA" },
			"/search": { details: "Fazendo uma Busca Avançada" },
			"/about": { details: "Lendo Sobre a Yomu" },
			"/contact": { details: "Página de Contato" },
			"/donate": { details: "Página de Doação" },
			"/donators": { details: "Lista de Doadores" },
			"/partners": { details: "Lista de Parceiros" },
			"/staffs": { details: "Lista da Equipe" },
			"/ranks": { details: "Página de Ranks" },
			"/settings": { details: "Configurações" },
			"/minigames": { details: "Página de Minigames" },
		};

	if (privacy) {
		presenceData.details = "Criando um novo mundo!";
		presenceData.state = "yomumangas.com";
	} else if (pathname.includes("/manga")) {
		const isReader = pathname.includes("/chapter"),
			isAdult = document.querySelector("#premid-adult")?.textContent === "true",
			mangaTitle = document.querySelector("#premid-manga-title")?.textContent,
			chapterTitle = document.querySelector(
				"#premid-chapter-title"
			)?.textContent;

		if (images && !isAdult) {
			presenceData.largeImageKey = document.querySelector<HTMLAnchorElement>(
				"#premid-manga-image"
			)?.href;
		}
		if (!manga || (isAdult && !adult))
			presenceData.details = isReader ? "Lendo um Mangá" : "Página de um Mangá";
		if (manga && ((isAdult && adult) || !isAdult)) {
			presenceData.details = isReader
				? `Lendo ${mangaTitle}`
				: `Página de ${mangaTitle}`;
		}
		if (chapter && isReader) {
			presenceData.state = `Cap. ${
				document.querySelector("#premid-chapter-number")?.textContent
			}${chapterTitle ? ` - ${chapterTitle}` : ""}`;
		}
		if (manga && ((isAdult && adult) || !isAdult)) {
			presenceData.buttons = [
				{
					label: "Ver Mangá",
					url: !(chapter && isReader) ? href : href.split("/chapter")[0],
				},
				{ label: "Ver Capítulo", url: href },
			];
		}
		if (!chapter && isReader) presenceData.state = "Lendo Capítulo";
		if (!(chapter && isReader)) delete presenceData.buttons[1];
	} else if (pathname.includes("/user")) {
		presenceData.details = user
			? `Perfil de ${document.querySelector("#premid-user-name")?.textContent}`
			: "Stalkeando Alguém";
		presenceData.buttons = [{ label: "Ver Perfil", url: href }];
		if (images && user) {
			presenceData.largeImageKey =
				document.querySelector<HTMLAnchorElement>("#premid-user-image")?.href;
		}
	} else if (pathname.includes("/admin")) {
		const isStaff = document.querySelector("#premid-admin-panel")?.textContent;

		if (!isStaff) {
			presenceData.details = "404";
			presenceData.state = "Perdido no Mato";
		} else {
			presenceData.details = "Painel Admin";
			presenceData.state = isStaff;
		}
	} else {
		for (const [path, data] of Object.entries(pages))
			if (pathname.includes(path)) presenceData = { ...presenceData, ...data };
	}

	if (timestamp) presenceData.startTimestamp = browsingTimestamp;
	presence.setActivity(presenceData);
});
