const presence = new Presence({
		clientId: "817856303719907389",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	path = document.location.pathname,
	mangaName = path.split("/")[2];

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/SJmPvgX.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.body.contains(document.querySelector(".titre"))) {
		presenceData.details = "Visite la page du manga :";
		presenceData.state =
			document.querySelector<HTMLElement>(".titre").textContent;
	} else if (path.includes("/forum")) {
		presenceData.details = "Visite une page :";
		presenceData.state = "Page du Forum";
		if (path.includes("/forum/d")) {
			presenceData.details = "Lis un topic du forum :";
			presenceData.state = `[${document
				.querySelector(".TagLabel-text")
				.textContent.trim()}] ${
				document.querySelector(".DiscussionHero-title").textContent
			}`;
			presenceData.smallImageKey = "reading";
		}
	} else if (path.includes("mangas/") + mangaName) {
		presenceData.details = `Entrain de lire ${mangaName
			.split("-")
			.map(value =>
				value.replace(value.charAt(0), value.charAt(0).toUpperCase())
			)
			.join(" ")} :`;
		presenceData.state = `${
			document.querySelector<HTMLElement>(".chapitre-main").textContent
		} | ${document.querySelector<HTMLElement>(".pageLinkAct").textContent}`;
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = "Lis un scan";
		presenceData.buttons = [
			{
				label: "Lire le chapitre",
				url: document.location.href,
			},
		];
	} else if (path.startsWith("/mangas")) {
		presenceData.details = "Visite une page :";
		presenceData.state = "Liste des mangas";
	} else if (
		path.includes("/connexion") ||
		document.location.pathname.includes("/inscription")
	) {
		presenceData.details = "Visite une page :";
		presenceData.state = "Page de Login";
	} else if (path.includes("/planning")) {
		presenceData.details = "Visite une page :";
		presenceData.state = "Page du Planning";
	} else if (path.includes("/rejoindre")) {
		presenceData.details = "Visite une page :";
		presenceData.state = "Page Nous Rejoindre";
	} else {
		presenceData.details = "Visite une page :";
		presenceData.state = "Page d'accueil";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
