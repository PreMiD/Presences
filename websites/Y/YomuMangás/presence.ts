const presence = new Presence({ clientId: "869377195682983957" }),
	readingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const { pathname } = window.location,
		presenceData: PresenceData = { largeImageKey: "logo" },
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
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/manga")) {
		const isReader = pathname.includes("/chapter"),
		 isAdult =
			document.querySelector("#premid-adult")?.innerText === "true",
		 mangaTitle = document.querySelector("#premid-manga-title")?.innerText,
		 mangaSlug = document.querySelector("#premid-manga-slug")?.innerText,
		 mangaId = document.querySelector("#premid-manga-id")?.innerText,
		 
		 chapterNumber = document.querySelector(
			"#premid-chapter-number"
		)?.innerText,
		 chapterTitle = document.querySelector(
			"#premid-chapter-title"
		)?.innerText;

		if (images && !isAdult) {
presenceData.largeImageKey = (
			document.querySelector("#premid-manga-image") as HTMLAnchorElement
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
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
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
		const userName = document.querySelector("#premid-user-name")?.innerText
		 ;

		presenceData.details = user ? `Perfil de ${userName}` : "Stalkeando Alguém";
		presenceData.buttons = [
			{ label: "Ver Perfil", url: `https://yomumangas.com/user/${userName}` },
		];
		if (images && user) {
presenceData.largeImageKey = (
			document.querySelector("#premid-user-image") as HTMLAnchorElement
		)?.href;
}
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/signup")) {
		presenceData.details = "Registrando-se";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/recovery")) {
		presenceData.details = "Recuperando a Conta";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/login")) {
		presenceData.details = "Fazendo Login";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/404")) {
		presenceData.details = "404";
		presenceData.state = "Perdido no Mato";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/tutorial")) {
		presenceData.details = "Lendo o Tutorial";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/faq")) {
		presenceData.details = "Lendo o FAQ";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/terms-of-use")) {
		presenceData.details = "Lendo os Termos de Uso";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/privacy")) {
		presenceData.details = "Lendo as Políticas de Privacidade";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/dmca")) {
		presenceData.details = "Lendo o DMCA";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/search")) {
		presenceData.details = "Busca Avançada";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/about")) {
		presenceData.details = "Sobra a Yomu";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/donate")) {
		presenceData.details = "Página de Doação";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/contact")) {
		presenceData.details = "Página de Contato";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/ranks")) {
		presenceData.details = "Página de Ranks";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/minigames")) {
		presenceData.details = "Página de Minigames";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/donators")) {
		presenceData.details = "Página de Doadores";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/staffs")) {
		presenceData.details = "Página da Equipe";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/partners")) {
		presenceData.details = "Página de Parceiros";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/settings")) {
		presenceData.details = "Página de Configurações";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	} else if (pathname.includes("/admin")) {
		const isStaff = document.querySelector("#premid-admin-panel")?.innerText;

		if (!isStaff) {
			presenceData.details = "404";
			presenceData.state = "Perdido no Mato";
			if (timestamp) presenceData.startTimestamp = readingTimestamp;
		} else {
			presenceData.details = "Painel Admin";
			presenceData.state = isStaff;
			if (timestamp) presenceData.startTimestamp = readingTimestamp;
		}
	} else {
		presenceData.details = "Página Inicial";
		if (timestamp) presenceData.startTimestamp = readingTimestamp;
	}

	presence.setActivity(presenceData);
});
