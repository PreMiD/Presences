const presence = new Presence({
		clientId: "996859957813198990",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			user: "general.viewUser",
			readindArticle: "general.readingArticle",
		},
		await presence.getSetting<string>("lang").catch(() => "pt_BR")
	);
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/mJC39Kz.png",
			details: "Vendo a Alura",
			startTimestamp: browsingTimestamp,
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "pt_BR");
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (
		document.location.pathname.includes("/course") &&
		!document.location.pathname.includes("/courses")
	) {
		presenceData.details = "Vendo um curso";
		if (
			!document.querySelector(
				"div.container.course-header-banner-content > div > div.hreview-aggregate > h1 > strong"
			)
		) {
			presenceData.state = document.querySelector(
				"section.task-menu-header > div > a > h2"
			).textContent;
		} else {
			presenceData.state = document.querySelector(
				"div.container.course-header-banner-content > div > div.hreview-aggregate > h1 > strong"
			).textContent;
		}

		if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "Front-end"
		)
			presenceData.largeImageKey = "https://i.imgur.com/D42AEvv.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "Programação"
		)
			presenceData.largeImageKey = "https://i.imgur.com/p57IsEa.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "DevOps"
		)
			presenceData.largeImageKey = "https://i.imgur.com/RRyEvvR.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "UX & Design"
		)
			presenceData.largeImageKey = "https://i.imgur.com/dIKn6Wz.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "Data Science"
		)
			presenceData.largeImageKey = "https://i.imgur.com/4AQNRB1.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "Mobile"
		)
			presenceData.largeImageKey = "https://i.imgur.com/mLpf7Yz.png";
		else if (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label") === "Inovação & Gestão"
		)
			presenceData.largeImageKey = "https://i.imgur.com/RrC0z8A.png";
	} else if (document.location.pathname.includes("/dashboard"))
		presenceData.details = "Vendo a dashboard";
	else if (document.location.pathname.includes("/formacao")) {
		presenceData.details = "Vendo uma formação";
		presenceData.state = document.querySelector(
			"div.formacao-header-headline > h1"
		).textContent;

		if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"Front-end"
		)
			presenceData.largeImageKey = "https://i.imgur.com/D42AEvv.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"Programação"
		)
			presenceData.largeImageKey = "https://i.imgur.com/p57IsEa.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"DevOps"
		)
			presenceData.largeImageKey = "https://i.imgur.com/RRyEvvR.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"UX & Design"
		)
			presenceData.largeImageKey = "https://i.imgur.com/dIKn6Wz.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"Data Science"
		)
			presenceData.largeImageKey = "https://i.imgur.com/4AQNRB1.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"Mobile"
		)
			presenceData.largeImageKey = "https://i.imgur.com/mLpf7Yz.png";
		else if (
			document.querySelector("div.formacao__info-categoria > a").textContent ===
			"Inovação & Gestão"
		)
			presenceData.largeImageKey = "https://i.imgur.com/RrC0z8A.png";
	} else if (document.location.pathname.includes("/courses"))
		presenceData.details = "Vendo meus cursos";
	else if (document.location.pathname.includes("/user")) {
		if (document.querySelector(".profile-header-name")) {
			presenceData.details = strings.user;
			presenceData.state = document.querySelector(
				".profile-header-name"
			).textContent;
		} else {
			if (document.location.pathname.includes("/planos-de-estudo"))
				presenceData.details = "Vendo planos de estudo"; 
			else if (document.location.pathname.includes("/payments"))
				presenceData.details = "Vendo pegamentos"; 
			else document.location.pathname.includes("/rank");
			presenceData.details = "Vendo o ranking"; 
		}
	} else if (document.location.pathname.includes("/aluraflix")) {
		presenceData.largeImageKey = "https://i.imgur.com/43iG62U.png";
		presenceData.details = "Vendo o Aluraflix"; 
	} else if (document.location.pathname.includes("/carreirasemfronteiras")) {
		presenceData.largeImageKey = "https://i.imgur.com/XbsVEFV.png";
		presenceData.details = 'Ouvindo o "Carreiras sem Fronteiras"'; 
		if (
			document.querySelector(".podcast-header-title") &&
			!document.querySelector(".--margin-left-image")
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/cases")) {
		presenceData.largeImageKey = "https://i.imgur.com/rtevoAV.png";
		presenceData.details = "Assistindo um Case";
		if (
			document.querySelector(".intro__title") &&
			document.location.pathname.includes("/extra")
		) {
			presenceData.state = `"${
				document.querySelector(".intro__title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/scubadev")) {
		presenceData.largeImageKey = "https://i.imgur.com/SMQfe3Y.png";
		presenceData.details = 'Ouvindo o "ScubaDev"';
		if (
			document.querySelector(".podcast-header-title") &&
			!document.querySelector(".--margin-left-image")
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/layerstech")) {
		presenceData.largeImageKey = "https://i.imgur.com/xpUDQWR.png";
		presenceData.details = 'Ouvindo o "Layers.Tech"';
		if (
			document.querySelector(".podcast-header-title") &&
			!document.querySelector(".--margin-left-image")
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/likeaboss")) {
		presenceData.largeImageKey = "https://i.imgur.com/96xQTpM.png";
		presenceData.details = 'Ouvindo o "Like a Boss"';
		if (
			document.querySelector(".podcast-header-title") &&
			!document.querySelector(".--margin-left-image")
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/hipsterstech")) {
		presenceData.largeImageKey = "https://i.imgur.com/T7SMsQU.png";
		presenceData.details = 'Ouvindo o "Hipsters.tech"';
		if (
			document.querySelector(".podcast-header-title") &&
			!document.querySelector(".--margin-left-image")
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/alura-mais")) {
		presenceData.largeImageKey = "https://i.imgur.com/KrviSfF.png";
		presenceData.details = "Vendo Alura+"; 
	} else if (document.location.pathname.includes("/formacoes"))
		presenceData.details = "Vendo formações"; 
	else if (document.location.pathname.includes("/imersoes"))
		presenceData.details = "Vendo imersões"; 
	else if (document.location.pathname.includes("/podcasts"))
		presenceData.details = "Vendo podcasts";
	else if (document.location.pathname.includes("/recommendations"))
		presenceData.details = "Vendo recomendações";
	else if (
		document.location.pathname.includes("/forum") &&
		!document.location.pathname.includes("/topico-")
	)
		presenceData.details = "Vendo fórums";
	else if (
		document.location.pathname.includes("/forum") &&
		document.location.pathname.includes("/topico-")
	) {
		presenceData.details = "Lendo um tópico no fórum";
		presenceData.state = `"${
			document.querySelector(".topic-header-container-title").textContent
		}"`;
	} else if (document.location.pathname.includes("/planos-estudos-publicos"))
		presenceData.details = "Vendo planos de estudo públicos";
	else if (document.location.pathname.includes("/points"))
		presenceData.details = "Vendo pontos";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
