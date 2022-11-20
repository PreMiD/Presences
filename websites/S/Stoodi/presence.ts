const presence = new Presence({
		clientId: "1043638037042712637",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	images = {
		play: "https://i.imgur.com/o4FaGfB.png",
		pause: "https://i.imgur.com/kK39yND.png",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/wC4AkjI.png",
			details: "Vendo o Stoodi",
			startTimestamp: browsingTimestamp,
		},
		url = document.location.pathname;

	if (url === "/") presenceData.details = "Navegando pela Home";

	if (url.includes("/materias")) {
		const title = document.querySelector(".c-page-header__title")?.textContent;
		if (!url.split("/materias/")[1]) presenceData.details = "Vendo as matérias";
		else if (title) presenceData.details = `Vendo a matéria de ${title}`;
	}
	if (url.includes("/intensivao") && !url.split("/intensivao/")[1])
		presenceData.details = "Procurando aulas no Intensivão";

	let subject = document.querySelector(".c-subject__subtitle")?.textContent,
		title = document.querySelector(".c-subject__title")?.textContent;

	if (subject && title) {
		presenceData.details = `Vendo módulo de ${subject}:`;
		presenceData.state = title;
	} else if (url.includes("/questao/")) {
		presenceData.details = "Resolvendo uma questão:";
		presenceData.state = document.querySelector(
			".c-sidebar__item.is-active .c-sidebar__item-txt"
		)?.textContent;
	} else {
		subject = document.querySelector(".c-lesson__header-subject")?.textContent;
		title = document.querySelector("h1.c-lesson__header-title")?.textContent;
		if (subject && title) {
			presenceData.details = `Vendo aula de de ${subject}:`;
			presenceData.state = title;

			const player: HTMLVideoElement =
				document.querySelector(".fp-player video");

			if (player) {
				presenceData.smallImageKey = player.paused ? images.pause : images.play;
				presenceData.smallImageText = player.paused
					? (await strings).pause
					: (await strings).play;

				delete presenceData.startTimestamp;
				if (!player.paused) {
					presenceData.endTimestamp =
						presence.getTimestampsfromMedia(player)[1];
				}
			}
		}
		if (url.includes("/exercicios")) {
			title = document.querySelector(".question-list__title")?.textContent;
			const activeItem = document.querySelector(
				".areaTabs .active .areaStoodi"
			)?.textContent;
			if (title || activeItem) {
				presenceData.details = "Vendo o Banco de Exercícios:";
				presenceData.state = activeItem;
			} else presenceData.details = "Resolvendo exercício";
		}
		if (url.includes("/simulados")) {
			title = document.querySelector(".c-page-header__title")?.textContent;
			if (title) {
				presenceData.details = "Vendo os simulados:";
				presenceData.state = title;
			} else presenceData.details = "Resolvendo simulado";
		}
		if (url.includes("/aulas-ao-vivo")) {
			title = document.querySelector(".c-live__title")?.textContent;
			if (title) {
				presenceData.details = "Assistindo a aula ao vivo:";
				presenceData.state = title;
			} else presenceData.details = "Procurando aulas ao vivo";
		}
		if (url.includes("/correcao-de-redacao")) {
			title = document.querySelector(".c-page-header__title")?.textContent;
			if (title) presenceData.details = "Vendo a correção de redação";
			else presenceData.details = "Fazendo uma redação";
		}
		if (url.includes("/provas-do-enem")) {
			title = document.querySelector(".c-page-header__title")?.textContent;
			const breadcrumb = document.querySelector(
				".c-breadcrumb__item.is-active"
			)?.textContent;
			if (title) {
				presenceData.details = "Vendo as provas do ENEM:";
				presenceData.state = title;
			} else if (breadcrumb) {
				presenceData.details = "Resolvendo prova do ENEM:";
				presenceData.state = breadcrumb;
			} else presenceData.details = "Procurando provas do ENEM";
		}
		if (url.includes("/videos/")) {
			title = document.querySelector(".c-page-header__title")?.textContent;

			if (title) {
				presenceData.details = "Procurando vídeoaulas:";
				presenceData.state = document.querySelector(
					".areaTabs .active .areaStoodi"
				)?.textContent;
			}
		}
		if (url.includes("/resumos/")) {
			title = document.querySelector(".c-page-header h1")?.textContent;

			if (title) {
				presenceData.details = "Procurando resumos teóricos:";
				presenceData.state = document.querySelector(
					".areaTabs .active .areaStoodi"
				)?.textContent;
			}
		}
	}

	presence.setActivity(presenceData);
});
