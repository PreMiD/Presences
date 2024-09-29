//#region FUNCTIONS
interface AnimeInfo {
	img: string;
	name: string;
}

async function getInformationAnime(nameAnime: string): Promise<AnimeInfo | null> {
	try {
		const response = await fetch(`https://api.watch-anime.fr/getAnime/${nameAnime}`);
		const data = await response.json();

		if (data.length > 0) {
			return {
				img: data[0].affiche_anime,
				name: data[0].nom_anime
			};
		} else {
			throw new Error("Aucun anime trouvé");
		}
	} catch (error) {
		// Remplace console.error par un autre mécanisme de gestion des erreurs
		alert("Erreur lors de la récupération de l'image de l'anime");
		return null;
	}
}

async function getVideoAnime(path: string[]) {
	let urlAnime
	let animeInfo
	let details
	let state
	if (path[1] === "player" && path.length >= 6) {
		const animeName = decodeURIComponent(path[2]);
		const language = path[3];
		const season = path[4].split("-")[1];
		const episode = path[5].split("-")[1];

		urlAnime = `https://watch-anime.fr/${path[1]}/${path[2]}`;
		animeInfo = await getInformationAnime(animeName);

		if (animeInfo) {
			details = `Visite la page de l'animé : ${animeInfo.name}`;
			state = `Saison ${season} • Épisode ${episode} • ${language.toUpperCase()}`;
		}
		return {
			url: urlAnime,
			details: details,
			state: state
		}
	}
}
//#endregion FUNCTIONS

//#region PRESENCEDECLARATION
const presence = new Presence({
	clientId: "1146930741570187385"
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://watch-anime.fr/favicon.png"
}
//#endregion PRESENCEDECLARATION

//#region PRESENCE CALL
presence.on("UpdateData", async () => {
	let details: string | undefined;
	let state: string | undefined;
	let presenceData: PresenceData;
	let animeInfo: AnimeInfo | null = null;
	let urlAnime: string | undefined;

	switch (window.location.pathname) {
		case "/":
			details = "Dans le menu d'accueil";
			presenceData = {
				details: details,
				largeImageKey: "https://watch-anime.fr/favicon.png",
				startTimestamp: browsingTimestamp,
			};
			break;
		case "/settings":
			details = "Dans les paramètres";
			presenceData = {
				details: details,
				largeImageKey: "https://watch-anime.fr/favicon.png",
				startTimestamp: browsingTimestamp,
			};
			break;
		case "/search":
			details = "Recherche un animé dans le catalogue";
			presenceData = {
				details: details,
				largeImageKey: "https://watch-anime.fr/favicon.png",
				startTimestamp: browsingTimestamp,
			};
			break;
		case "/ublock":
			details = "Cherche à bloquer les publicités";
			presenceData = {
				details: details,
				largeImageKey: "https://watch-anime.fr/favicon.png",
				startTimestamp: browsingTimestamp,
			};
			break;
	}

	getVideoAnime(window.location.pathname.split("/")).then(res => {
		try {
			if (res.details && res.state) {
				presenceData = {
					details: details,
					state: state,
					largeImageKey: animeInfo.img,
					startTimestamp: browsingTimestamp,
					buttons: [
						{
							label: "Voir le site web",
							url: "https://watch-anime.fr/"
						},
						{
							label: "Voir l'animé",
							url: urlAnime
						}
					]
				};
			}
		} catch (error) {
			return null
		}
	})
	presence.setActivity(presenceData);
});
//#endregion PRESENCE CALL