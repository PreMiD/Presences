const presence = new Presence({ clientId: "869377195682983957" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "logo" },
		{ pathname } = window.location,
		[images, manga, chapter, user, timestamp, adult, privacy] =
			await Promise.all([
				presence.getSetting<boolean>("images"),
				presence.getSetting<boolean>("manga"),
				presence.getSetting<boolean>("chapter"),
				presence.getSetting<boolean>("user"),
				presence.getSetting<boolean>("timestamp"),
				presence.getSetting<boolean>("adult"),
				presence.getSetting<boolean>("privacy"),
			]);

	if (privacy) {
		presenceData.details = "Criando um novo mundo!";
		presenceData.state = "yomumangas.com";
	} else if (pathname.includes("/manga")) {
		const isReader = pathname.includes("/chapter"),
			isAdult = document.querySelector("#premid-adult")?.textContent === "true",
			mangaTitle = document.querySelector("#premid-manga-title")?.textContent,
			mangaSlug = document.querySelector("#premid-manga-slug")?.textContent,
			mangaId = document.querySelector("#premid-manga-id")?.textContent,
			chapterNumber = document.querySelector(
				"#premid-chapter-number"
			)?.textContent,
			chapterTitle = document.querySelector(
				"#premid-chapter-title"
			)?.textContent;

		if (images && !isAdult) {
			presenceData.largeImageKey = (
				document.querySelector<HTMLAnchorElement>("#premid-manga-image")
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
			presenceData.state = `Cap. ${chapterNumber}${
				chapterTitle ? ` - ${chapterTitle}` : ""
			}`;
		}
		if (!chapter && isReader) presenceData.state = "Lendo Capítulo";

		if (manga && ((isAdult && adult) || !isAdult) && !(chapter && isReader)) {
			presenceData.buttons = [
				{
					label: "Ver Mangá",
					url: `https://yomumangas.com/manga/${mangaId}/${mangaSlug}`,
				},
			];
		}
		if (manga && ((isAdult && adult) || !isAdult) && chapter && isReader) {
			presenceData.buttons = [
				{
					label: "Ver Mangá",
					url: `https://yomumangas.com/manga/${mangaId}/${mangaSlug}`,
				},
				{
					label: "Ver Capítulo",
					url: `https://yomumangas.com/manga/${mangaId}/${mangaSlug}/chapter/${chapterNumber}`,
				},
			];
		}
	} else if (pathname.includes("/user")) {
		const userName = document.querySelector("#premid-user-name")?.textContent;
		presenceData.details = user ? `Perfil de ${userName}` : "Stalkeando Alguém";
		presenceData.buttons = [
			{ label: "Ver Perfil", url: `https://yomumangas.com/user/${userName}` },
		];
		if (images && user) {
			presenceData.largeImageKey = (
				document.querySelector<HTMLAnchorElement>("#premid-user-image")
			)?.href;
		}
	} else if (pathname.includes("/signup"))
		presenceData.details = "Registrando-se";
	else if (pathname.includes("/recovery"))
		presenceData.details = "Recuperando a Conta";
	else if (pathname.includes("/login")) presenceData.details = "Fazendo Login";
	else if (pathname.includes("/404")) {
		presenceData.details = "404";
		presenceData.state = "Perdido no Mato";
	} else if (pathname.includes("/tutorial"))
		presenceData.details = "Lendo o Tutorial";
	else if (pathname.includes("/faq")) presenceData.details = "Lendo o FAQ";
	else if (pathname.includes("/terms-of-use"))
		presenceData.details = "Lendo os Termos de Uso";
	else if (pathname.includes("/privacy"))
		presenceData.details = "Lendo as Políticas de Privacidade";
	else if (pathname.includes("/dmca")) presenceData.details = "Lendo o DMCA";
	else if (pathname.includes("/search"))
		presenceData.details = "Busca Avançada";
	else if (pathname.includes("/about")) presenceData.details = "Sobra a Yomu";
	else if (pathname.includes("/donate"))
		presenceData.details = "Página de Doação";
	else if (pathname.includes("/contact"))
		presenceData.details = "Página de Contato";
	else if (pathname.includes("/ranks"))
		presenceData.details = "Página de Ranks";
	else if (pathname.includes("/minigames"))
		presenceData.details = "Página de Minigames";
	else if (pathname.includes("/donators"))
		presenceData.details = "Página de Doadores";
	else if (pathname.includes("/staffs"))
		presenceData.details = "Página da Equipe";
	else if (pathname.includes("/partners"))
		presenceData.details = "Página de Parceiros";
	else if (pathname.includes("/settings"))
		presenceData.details = "Página de Configurações";
	else if (pathname.includes("/admin")) {
		const isStaff = document.querySelector("#premid-admin-panel")?.textContent;

		if (!isStaff) {
			presenceData.details = "404";
			presenceData.state = "Perdido no Mato";
		} else {
			presenceData.details = "Painel Admin";
			presenceData.state = isStaff;
		}
	} else presenceData.details = "Página Inicial";

	if (timestamp) presenceData.startTimestamp = browsingStamp;
	presence.setActivity(presenceData);
});
