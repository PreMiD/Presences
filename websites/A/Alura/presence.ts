const presence = new Presence({
		clientId: "999738497546059907",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/mJC39Kz.png",
			details: "Vendo a Alura",
			startTimestamp: browsingTimestamp,
		},
		video = document.querySelector("video");

	if (
		document.location.pathname.includes("/course") &&
		!document.location.pathname.includes("/courses") &&
		!document.location.pathname.includes("/task")
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

		switch (
			document
				.querySelector("a.course-header-banner-breadcrumb__category")
				.getAttribute("aria-label")
		) {
			case "Front-end": {
				presenceData.largeImageKey = "https://i.imgur.com/D42AEvv.png";
				break;
			}
			case "Programação": {
				presenceData.largeImageKey = "https://i.imgur.com/p57IsEa.png";
				break;
			}
			case "DevOps": {
				presenceData.largeImageKey = "https://i.imgur.com/RRyEvvR.png";
				break;
			}
			case "UX & Design": {
				presenceData.largeImageKey = "https://i.imgur.com/dIKn6Wz.png";
				break;
			}
			case "Data Science": {
				presenceData.largeImageKey = "https://i.imgur.com/4AQNRB1.png";
				break;
			}
			case "Mobile": {
				presenceData.largeImageKey = "https://i.imgur.com/mLpf7Yz.png";
				break;
			}
			case "Inovação & Gestão":
				{
					presenceData.largeImageKey = "https://i.imgur.com/RrC0z8A.png";
				}
				break;
		}
	} else if (
		document.location.pathname.includes("/course") &&
		document.location.pathname.includes("/task")
	) {
		presenceData.details = document.querySelector(
			"a.task-menu-header-info-title > h2"
		).textContent;
		presenceData.state = document.querySelector(
			"span.task-body-header-title-text"
		).textContent;
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? "Pausado" : "Reproduzindo";

		delete presenceData.startTimestamp;
		if (!video.paused)
			presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
	} else if (document.location.pathname.includes("/dashboard"))
		presenceData.details = "Vendo a dashboard";
	else if (document.location.pathname.includes("/formacao")) {
		presenceData.details = "Vendo uma formação";
		presenceData.state = document.querySelector(
			"div.formacao-header-headline > h1"
		).textContent;

		switch (
			document.querySelector("div.formacao__info-categoria > a").textContent
		) {
			case "Front-end": {
				presenceData.largeImageKey = "https://i.imgur.com/D42AEvv.png";
				break;
			}
			case "Programação": {
				presenceData.largeImageKey = "https://i.imgur.com/p57IsEa.png";
				break;
			}
			case "DevOps": {
				presenceData.largeImageKey = "https://i.imgur.com/RRyEvvR.png";
				break;
			}
			case "UX & Design": {
				presenceData.largeImageKey = "https://i.imgur.com/dIKn6Wz.png";
				break;
			}
			case "Data Science": {
				presenceData.largeImageKey = "https://i.imgur.com/4AQNRB1.png";
				break;
			}
			case "Mobile": {
				presenceData.largeImageKey = "https://i.imgur.com/mLpf7Yz.png";
				break;
			}
			case "Inovação & Gestão":
				{
					presenceData.largeImageKey = "https://i.imgur.com/RrC0z8A.png";
				}
				break;
		}
	} else if (document.location.pathname.includes("/courses"))
		presenceData.details = "Vendo meus cursos";
	else if (document.location.pathname.includes("/user")) {
		if (document.querySelector(".profile-header-name")) {
			presenceData.details = "Vendo o perfil de um usuário";
			presenceData.state = document.querySelector(
				".profile-header-name"
			).textContent;
		} else {
			if (document.location.pathname.includes("/planos-de-estudo"))
				presenceData.details = "Vendo planos de estudo";
			else if (document.location.pathname.includes("/payments"))
				presenceData.details = "Vendo pagamentos";
			else document.location.pathname.includes("/rank");
			presenceData.details = "Vendo o ranking da comunidade";
		}
	} else if (document.location.pathname.includes("/aluraflix")) {
		presenceData.largeImageKey = "https://i.imgur.com/43iG62U.png";
		presenceData.details = "Vendo o Aluraflix";
	} else if (document.location.pathname.includes("/carreirasemfronteiras")) {
		title = document.querySelector(".podcast-header-title");
		presenceData.largeImageKey = "https://i.imgur.com/XbsVEFV.png";
		presenceData.details = 'Ouvindo o "Carreiras sem Fronteiras"';
		if (title && !document.querySelector(".--margin-left-image"))
			presenceData.state = `"${title.textContent}"`;
	} else if (document.location.pathname.includes("/scubadev")) {
		title = document.querySelector(".podcast-header-title");
		presenceData.largeImageKey = "https://i.imgur.com/SMQfe3Y.png";
		presenceData.details = 'Ouvindo o "ScubaDev"';
		if (title && !document.querySelector(".--margin-left-image"))
			presenceData.state = `"${title.textContent}"`;
	} else if (document.location.pathname.includes("/layerstech")) {
		title = document.querySelector(".podcast-header-title");
		presenceData.largeImageKey = "https://i.imgur.com/xpUDQWR.png";
		presenceData.details = 'Ouvindo o "Layers.Tech"';
		if (title && !document.querySelector(".--margin-left-image"))
			presenceData.state = `"${title.textContent}"`;
	} else if (document.location.pathname.includes("/likeaboss")) {
		title = document.querySelector(".podcast-header-title");
		presenceData.largeImageKey = "https://i.imgur.com/96xQTpM.png";
		presenceData.details = 'Ouvindo o "Like a Boss"';
		if (title && !document.querySelector(".--margin-left-image"))
			presenceData.state = `"${title.textContent}"`;
	} else if (document.location.pathname.includes("/hipsterstech")) {
		title = document.querySelector(".podcast-header-title");
		presenceData.largeImageKey = "https://i.imgur.com/T7SMsQU.png";
		presenceData.details = 'Ouvindo o "Hipsters.Tech"';
		if (title && !document.querySelector(".--margin-left-image"))
			presenceData.state = `"${title.textContent}"`;
	} else if (document.location.pathname.includes("/cases")) {
		title = document.querySelector(".intro__title");
		presenceData.largeImageKey = "https://i.imgur.com/rtevoAV.png";
		presenceData.details = "Assistindo um case";
		if (title && document.location.pathname.includes("/extra"))
			presenceData.state = `"${title.textContent}"`;
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
