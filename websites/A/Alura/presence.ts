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

	// Courses

	if (
		document.location.pathname.includes("/course") &&
		!document.location.pathname.includes("/courses")
	) {
		presenceData.details = "Vendo um curso"; // alura.viewCourse
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
		// Dashboard
		presenceData.details = "Vendo a dashboard"; // alura.viewDashboard
	// Training
	else if (document.location.pathname.includes("/formacao")) {
		presenceData.details = "Vendo uma formação"; // alura.viewTraining
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
		// My courses
		presenceData.details = "Vendo meus cursos"; // alura.viewMycourses
	// User page
	else if (document.location.pathname.includes("/user")) {
		if (document.querySelector(".profile-header-name")) {
			presenceData.details = strings.user; // general.viewUser
			presenceData.state = document.querySelector(
				".profile-header-name"
			).textContent;
		} else {
			// Study Plans
			if (document.location.pathname.includes("/planos-de-estudo"))
				presenceData.details = "Vendo planos de estudo"; // alura.viewStudyPlans
			// Payments
			else if (document.location.pathname.includes("/payments"))
				presenceData.details = "Vendo pegamentos"; // alura.viewPayments
			// Ranking
			else document.location.pathname.includes("/rank");
			presenceData.details = "Vendo o ranking"; // alura.viewRanking
		}
	} else if (document.location.pathname.includes("/aluraflix")) {
		//Aluraflix
		presenceData.largeImageKey = "https://i.imgur.com/43iG62U.png";
		presenceData.details = "Vendo o Aluraflix"; // alura.aluraflix
	} else if (document.location.pathname.includes("/carreirasemfronteiras")) {
		//Alura programs
		presenceData.largeImageKey = "https://i.imgur.com/XbsVEFV.png";
		presenceData.details = 'Ouvindo o "Carreiras sem Fronteiras"'; // alura.carreirassemfronteiras
		if (
			document.querySelector(".podcast-header-title") !== null &&
			document.querySelector(".--margin-left-image") === null
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/cases")) {
		//Alura Cases
		presenceData.largeImageKey = "https://i.imgur.com/rtevoAV.png";
		presenceData.details = "Assistindo um Case"; // alura.cases
		if (
			document.querySelector(".intro__title") !== null &&
			document.location.pathname.includes("/extra")
		) {
			presenceData.state = `"${
				document.querySelector(".intro__title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/scubadev")) {
		//ScubaDev
		presenceData.largeImageKey = "https://i.imgur.com/SMQfe3Y.png";
		presenceData.details = 'Ouvindo o "ScubaDev"'; // alura.scubadev
		if (
			document.querySelector(".podcast-header-title") !== null &&
			document.querySelector(".--margin-left-image") === null
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/layerstech")) {
		//Layers.Tech

		presenceData.largeImageKey = "https://i.imgur.com/xpUDQWR.png";
		presenceData.details = 'Ouvindo o "Layers.Tech"'; // alura.layerstech
		if (
			document.querySelector(".podcast-header-title") !== null &&
			document.querySelector(".--margin-left-image") === null
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/likeaboss")) {
		//Like a Boss
		presenceData.largeImageKey = "https://i.imgur.com/96xQTpM.png";
		presenceData.details = 'Ouvindo o "Like a Boss"'; // alura.likeaboss
		if (
			document.querySelector(".podcast-header-title") !== null &&
			document.querySelector(".--margin-left-image") === null
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/hipsterstech")) {
		// Hipsters.Tech
		presenceData.largeImageKey = "https://i.imgur.com/T7SMsQU.png";
		presenceData.details = 'Ouvindo o "Hipsters.tech"'; // alura.hipsterstech
		if (
			document.querySelector(".podcast-header-title") !== null &&
			document.querySelector(".--margin-left-image") === null
		) {
			presenceData.state = `"${
				document.querySelector(".podcast-header-title").textContent
			}"`;
		}
	} else if (document.location.pathname.includes("/alura-mais")) {
		// Alura+

		presenceData.largeImageKey = "https://i.imgur.com/KrviSfF.png";
		presenceData.details = "Vendo Alura+"; // alura.aluramais
	} else if (document.location.pathname.includes("/formacoes"))
		// Trainings
		presenceData.details = "Vendo formações"; // alura.browseTrainings
	// Immersions
	else if (document.location.pathname.includes("/imersoes"))
		presenceData.details = "Vendo imersões"; // alura.viewImmersions
	// Podcasts
	else if (document.location.pathname.includes("/podcasts"))
		presenceData.details = "Vendo podcasts"; // alura.browsePodcasts
	// Recommendations
	else if (document.location.pathname.includes("/recommendations"))
		presenceData.details = "Vendo recomendações";
	// alura.viewRecommendations
	// Forum
	else if (
		document.location.pathname.includes("/forum") &&
		!document.location.pathname.includes("/topico-")
	)
		presenceData.details = "Vendo fórums"; // alura.browseForums
	// Reading topic
	else if (
		document.location.pathname.includes("/forum") &&
		document.location.pathname.includes("/topico-")
	) {
		presenceData.details = "Lendo um tópico no fórum"; // alura.readingTopic
		presenceData.state = `"${
			document.querySelector(".topic-header-container-title").textContent
		}"`;
	} else if (document.location.pathname.includes("/planos-estudos-publicos"))
		// Public study plans

		presenceData.details = "Vendo planos de estudo públicos";
	// alura.browsePublicStudyPlans
	// Points
	else if (document.location.pathname.includes("/points"))
		presenceData.details = "Vendo pontos"; // alura.viewingPoints

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
