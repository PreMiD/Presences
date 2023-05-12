const presence = new Presence({
		clientId: "891749178227695678",
	}),
	path = document.location.pathname,
	browsingTimestamp = Math.floor(Date.now() / 1000),
	genre = document.querySelector("#type-media"),
	title = document.querySelector(
		"#main-fiche > div.fiche-inside.fiche-top > div.fiche-fr > div.fiche-titre > div.dd-flex"
	),
	titleKnownFor = document.querySelector(
		"#app > div.main > div.fiche-inside.fiche-top.fiche-auteur > div:nth-child(2) > div:nth-child(2) > div.subListeHome.edition_manga > div:nth-child(1) > div.hc-info-poster > div.hcip-titre"
	),
	menu = document.querySelector(
		"#app > div.main > div.mainMenu > a:nth-child(1)"
	),
	user = document.querySelector(
		"#app > div.profil-new > div.aPropos-Pro > div.aPP"
	),
	currentUser = document.querySelector(
		"body > div.top > div.top-account > div.ta-main > a > div.ta-nickname"
	),
	character = document.querySelector(
		"#app > div.main > div.fiche-inside.fiche-top.fiche-auteur > div:nth-child(2) > div.fiche-titre > div > h1"
	);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/dP3qhRc.png",
		startTimestamp: browsingTimestamp,
	};

	if (path.includes("/home")) presenceData.details = "Page d'accueil";
	else if (path.startsWith("/explorer")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Explorer";
		switch (document.location.search) {
			case "?type=manga":
				presenceData.details = "Explore les mangas";
				delete presenceData.state;
				break;
			case "?type=film":
				presenceData.details = "Explore les films";
				delete presenceData.state;
				break;
			case "?type=tv":
				presenceData.details = "Explore les animes";
				delete presenceData.state;
				break;
			case "?type=oav":
				presenceData.details = "Explore les OAVs";
				delete presenceData.state;
				break;
			case "?type=special":
				presenceData.details = "Explore les animes spéciaux";
				delete presenceData.state;
				break;
		}
	} else if ((genre || menu) && title) {
		presenceData.details = `Regarde la page ${genre.textContent} de :`;
		presenceData.state = title.textContent;
	} else if (path.includes("/parametre"))
		presenceData.details = "Configure ses paramètres";
	else if (path.includes("/feedback/")) {
		presenceData.details = "Regarde la page :";
		presenceData.state = "Suggestions";
	} else if (path.includes("/@")) {
		presenceData.details = "Regarde le profil de :";
		presenceData.state = user.textContent;
	} else if (path.includes("/collection")) {
		if (
			document.location.search.includes("?") &&
			user.textContent === currentUser.textContent
		) {
			switch (document.location.search) {
				case "?manga":
					presenceData.details = "Regarde sa collection manga";
					break;
				case "?film":
					presenceData.details = "Regarde sa collection film";
					break;
				case "?perso":
					presenceData.details =
						"Regarde sa collection des personnages favoris";
					break;
				case "?biblio":
					presenceData.details = "Regarde sa bibliothèque";
					break;
				default:
					presenceData.details = "Regarde sa collection d'anime";
					break;
			}
		} else {
			switch (document.location.search) {
				case "?manga":
					presenceData.details = "Regarde la collection manga de :";
					presenceData.state = user.textContent;
					break;
				case "?film":
					presenceData.details = "Regarde la collection film de :";
					presenceData.state = user.textContent;
					break;
				case "?perso":
					presenceData.details =
						"Regarde la collection des personnages favoris de :";
					presenceData.state = user.textContent;
					break;
				case "?biblio":
					presenceData.details = "Regarde la bibliothèque de :";
					presenceData.state = user.textContent;
					break;
				default:
					presenceData.details = "Regarde la collection d'anime de :";
					presenceData.state = user.textContent;
					break;
			}
		}
	} else if (character) {
		presenceData.details = "Regarde la page du personnage :";
		presenceData.state = `${character.textContent} de ${titleKnownFor.textContent}`;
	} else {
		presenceData.details = "Page d'accueil";
		presence.info(
			"Si votre statut discord n'affiche pas bien la presence, n'hésitez pas à refresh la page"
		);
	}

	presence.setActivity(presenceData);
});
