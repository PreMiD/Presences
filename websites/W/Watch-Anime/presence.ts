//#region FUNCTIONS
interface AnimeInfo {
	img: string;
	name: string;
}

// Cache object to store fetched anime info
const animeCache: { [nameAnime: string]: AnimeInfo } = {};

async function getInformationAnime(
	nameAnime: string
): Promise<AnimeInfo | null> {
	// Check if the information is already in the cache
	if (animeCache[nameAnime]) return animeCache[nameAnime];

	try {
		const response = await fetch(
				`https://api.watch-anime.fr/getAnime/${nameAnime}`
			),
			data = await response.json();

		if (data.length > 0) {
			// Store the fetched data in the cache
			const animeInfo = {
				img: data[0].affiche_anime,
				name: data[0].nom_anime,
			};
			animeCache[nameAnime] = animeInfo;
			return animeInfo;
		}
	} catch (error) {
		// Handle errors (e.g., network issues)
		presence.error("Erreur lors de la récupération de l'image de l'anime");
		return null;
	}
}
//#endregion FUNCTIONS

//#region PRESENCEDECLARATION
const presence = new Presence({
		clientId: "1146930741570187385",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://watch-anime.fr/favicon512.png",
}
//#endregion PRESENCEDECLARATION

//#region PRESENCE CALL
presence.on("UpdateData", async () => {
	let details: string | undefined,
		state: string | undefined,
		presenceData: PresenceData,
		animeInfo: AnimeInfo | null = null,
		urlAnime: string | undefined;

	if (document.location.pathname === "/") details = "Dans le menu d'accueil";
	else if (document.location.pathname.startsWith("/search"))
		details = "Recherche un animé dans le catalogue";
	else if (document.location.pathname.startsWith("/settings"))
		details = "Dans les paramètres";
	else if (document.location.pathname.startsWith("/ublock"))
		details = "Cherche à bloquer les publicités";
	else {
		const pathParts = document.location.pathname.split("/");
		if (pathParts[1] === "player" && pathParts.length >= 6) {
			urlAnime = `https://watch-anime.fr/${pathParts[1]}/${pathParts[2]}`;
			animeInfo = await getInformationAnime(decodeURIComponent(pathParts[2]));

			if (animeInfo) {
				details = `Visite la page de l'animé : ${animeInfo.name}`;
				state = `Saison ${pathParts[4].split("-")[1]} • Épisode ${
					pathParts[5].split("-")[1]
				} • ${pathParts[3].toUpperCase()}`;
			}
		}
	}

	if (details) {
		presenceData = {
			details,
			state,
			largeImageKey: animeInfo?.img || Assets.Logo,
			startTimestamp: browsingTimestamp,
			...(animeInfo && {
				buttons: [
					{
						label: "Voir l'animé",
						url: urlAnime || "https://watch-anime.fr/",
					},
				],
			}),
		};
		presence.setActivity(presenceData);
	}
});
//#endregion PRESENCE CALL
