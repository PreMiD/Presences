const presence = new Presence({
		clientId: "1059611780520874044",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const { pathname, href } = window.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/MqvvhSw.png",
		};

	if (/^\/(page\/\d+\/?)?$/.test(pathname))
		presenceData.details = "Sur la Page d'Accueil";
	else if (/^\/catalogues\/?$/.test(pathname))
		presenceData.details = "Sur la Page des Mangas";
	else if (
		href.startsWith("https://mangas-origines.fr/manga/") &&
		href.split("/").length === 6
	) {
		presenceData.details = "Consulte la Page d'une Oeuvre";
		presenceData.state =
			document.querySelector<HTMLDivElement>(".post-title h1").textContent;
		presenceData.buttons = [
			{
				label: "Voir l'oeuvre",
				url: href,
			},
		];
	} else if (/\/chapitre-[0-9]+\/?$/i.test(pathname)) {
		const progress =
			(document.documentElement.scrollTop /
				(document.querySelector<HTMLDivElement>(".reading-content")
					.scrollHeight -
					window.innerHeight)) *
			100;
		presenceData.details = "En Train de Lire";
		presenceData.state = `${
			document.querySelector<HTMLHeadingElement>("#chapter-heading").textContent
		} - ${(progress > 100 ? 100 : progress).toFixed(1)}%`;
		const allLinks = document.querySelectorAll<HTMLAnchorElement>(
			".c-breadcrumb > .breadcrumb > li > a"
		);

		presenceData.buttons = [
			{
				label: "Voir l'Oeuvre",
				url: allLinks[allLinks.length - 1].href,
			},
			{
				label: "Accéder au Chapitre",
				url: href,
			},
		];
	} else {
		presenceData.details = "Navigue sur Mangas-Origines.fr";
		presenceData.state = document.title;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
