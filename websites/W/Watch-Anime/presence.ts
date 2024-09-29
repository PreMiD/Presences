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
		console.error("Erreur lors de la récupération de l'image de l'anime:", error);
		return null;
	}
}

function getTimestampsFromMedia(mediaElement: HTMLMediaElement) {
	if (!mediaElement) {
		throw new Error("L'élément média est invalide.");
	}

	const { currentTime, duration } = mediaElement;
	const startTimestamp = Date.now() - currentTime * 1000;
	const endTimestamp = startTimestamp + duration * 1000;

	return {
		currentTime,
		duration,
		startTimestamp,
		endTimestamp
	};
}

function debugMode(word: unknown) {
	console.log("-------------------");
	console.log(word);
	console.log("-------------------");
}
//#endregion FUNCTIONS

//#region PRESENCE DECLARATION
const presence = new Presence({
	clientId: "1146930741570187385"
});

const strings = presence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused"
});

const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://watch-anime.fr/favicon.png"
}
//#endregion PRESENCE DECLARATION

//#region PRESENCE CALL
presence.on("UpdateData", async () => {
	let details: string | undefined;
	let state: string | undefined;
	let presenceData: PresenceData;
	let animeInfo: AnimeInfo | null = null;
	let urlAnime: string | undefined;

	if (window.location.pathname === "/") {
		details = "Dans le menu d'accueil";
	} else if (window.location.pathname.startsWith("/search")) {
		details = "Recherche un animé dans le catalogue";
	} else if (window.location.pathname.startsWith("/settings")) {
		details = "Dans les paramètres";
	} else if (window.location.pathname.startsWith("/ublock")) {
		details = "Cherche à bloquer les publicités";
	} else {
		const pathParts = window.location.pathname.split("/");
		if (pathParts[1] === "player" && pathParts.length >= 6) {
			const animeName = decodeURIComponent(pathParts[2]);
			animeInfo = await getInformationAnime(animeName);
			const language = pathParts[3];
			const season = pathParts[4].split("-")[1]; // Saison
			const episode = pathParts[5].split("-")[1]; // Episode
			urlAnime = `https://watch-anime.fr/${pathParts[1]}/${pathParts[2]}`;

			if (animeInfo) {
				details = `Visite la page de l'animé : ${animeInfo.name}`;
				state = `Saison ${season} • Épisode ${episode} • ${language.toUpperCase()}`;
			}
		}
	}

	if (window.location.pathname === "/" || window.location.pathname.startsWith("/settings") || window.location.pathname.startsWith("/search") || window.location.pathname.startsWith("/ublock")) {
		presenceData = {
			details: details!,
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp
		};
	} else if (animeInfo) {
		presenceData = {
			details: details!,
			state: state!,
			largeImageKey: animeInfo.img,
			startTimestamp: browsingTimestamp,
			buttons: [
				{
					label: "Voir le site web",
					url: "https://watch-anime.fr/"
				},
				{
					label: "Voir l'animé",
					url: urlAnime!
				}
			] as [ButtonData, ButtonData?]
		};
	}

	presence.setActivity(presenceData);
});
//#endregion PRESENCE CALL
