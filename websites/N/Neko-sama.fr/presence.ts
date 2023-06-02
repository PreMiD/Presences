const presence = new Presence({
	clientId: "1014298173314961481",
});

interface Video {
	time: number;
	duration: number;
	paused: boolean;
}

function timeToString(nbr: number): string {
	let nbrCopy = nbr,
		nbrString = "",
		quotient = 0,
		remainder = 0;
	if (nbrCopy >= 3600) {
		quotient = Math.floor(nbrCopy / 3600);
		if (isNaN(quotient)) quotient = 0;
		remainder = nbrCopy % 3600;
		if (quotient > 9) nbrString += `${quotient.toString()}:`;
		else nbrString += `0${quotient.toString()}:`;

		nbrCopy = remainder;
	}
	quotient = Math.floor(nbrCopy / 60);
	if (isNaN(quotient)) quotient = 0;
	remainder = nbrCopy % 60;
	if (quotient > 9) nbrString += `${quotient.toString()}:`;
	else nbrString += `0${quotient.toString()}:`;

	nbrCopy = remainder;
	if (isNaN(nbrCopy)) nbrCopy = 0;
	if (nbrCopy > 9) nbrString += nbrCopy.toString();
	else nbrString += `0${nbrCopy.toString()}`;

	return nbrString;
}

let video: Video = null;

presence.on("iFrameData", (data: Video) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/N/Neko-sama.fr/assets/logo.png",
			details: "Navigue sur Neko-sama",
		},
		{ pathname } = document.location,
		pathSplit = pathname.split("/");

	switch (pathSplit[1]) {
		case "anime":
			switch (pathSplit[2]) {
				case "episode": {
					const episodeImage: string = document.querySelector<HTMLMetaElement>(
						'meta[property="og:image"]'
					).content;
					if (video === null) {
						presenceData.details = `Regarde ${
							document.querySelector<HTMLMetaElement>(
								'meta[property="og:title"]'
							).content
						}`;
						presenceData.largeImageKey =
							episodeImage ===
							"https://cdn.rcd.gg/PreMiD/websites/N/Neko-sama.fr/assets/0.png"
								? "nekosama-icon"
								: episodeImage;
						presenceData.buttons = [
							{
								label: "Voir Épisode",
								url: document.URL,
							},
						];
						break;
					}
					const { paused, time, duration } = video;
					if (!paused) {
						const timestamps = presence.getTimestamps(time, duration);
						presenceData.startTimestamp = timestamps[0];
						presenceData.endTimestamp = timestamps[1];
					}
					presenceData.state = `${timeToString(
						Math.floor(time)
					)}/${timeToString(Math.floor(duration))}`;
					presenceData.details = `Regarde ${
						document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
							.content
					}`;
					presenceData.largeImageKey =
						episodeImage ===
						"https://cdn.rcd.gg/PreMiD/websites/N/Neko-sama.fr/assets/0.png"
							? "nekosama-icon"
							: episodeImage;
					presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
					presenceData.smallImageText = paused
						? "En pause"
						: "Lecture en cours";
					presenceData.buttons = [
						{
							label: "Voir Épisode",
							url: document.URL,
						},
					];
					break;
				}
				case "info": {
					const animeImage: string = document.querySelector<HTMLMetaElement>(
						'meta[property="og:image"]'
					).content;
					presenceData.details = "Regarde la page d'un animé :";
					presenceData.state =
						document.querySelector("h1").firstChild.textContent;
					presenceData.largeImageKey =
						animeImage ===
						"https://cdn.rcd.gg/PreMiD/websites/N/Neko-sama.fr/assets/0.png"
							? "nekosama-icon"
							: animeImage;
					presenceData.buttons = [
						{
							label: "Voir Animé",
							url: document.URL,
						},
					];
					break;
				}
				default:
					presenceData.details = "Cherche un animé en VOSTFR";
					break;
			}
			break;
		case "anime-vf":
			presenceData.details = "Cherche un animé en VF";
			break;
	}

	presence.setActivity(presenceData);
});
