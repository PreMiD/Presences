const presence = new Presence({
	clientId: "1014298173314961481"
});

function timeToString(nbr: number): string {
	let nbrCopy = nbr, 
	nbrString = "",
	quotient = 0,
	remainder = 0;
	if (nbrCopy >= 3600) {
		quotient = Math.floor(nbrCopy / 3600);
		if (isNaN(quotient)) quotient = 0;
		remainder = nbrCopy % 3600;
		if (quotient > 9) 
			nbrString += `${quotient.toString()}:`;
		else 
			nbrString += `0${quotient.toString()}:`;
		
		nbrCopy = remainder;
	}
	quotient = Math.floor(nbrCopy / 60);
	if (isNaN(quotient)) quotient = 0;
	remainder = nbrCopy % 60;
	if (quotient > 9) 
		nbrString += `${quotient.toString()}:`;
	else 
		nbrString += `0${quotient.toString()}:`;
	
	nbrCopy = remainder;
	if (isNaN(nbrCopy)) nbrCopy = 0;
	if (nbrCopy > 9)
		nbrString += nbrCopy.toString();
	else
		nbrString += `0${nbrCopy.toString()}`;
	
	return nbrString;
}

  
interface Video {
	time: number;
	duration: number;
	paused: boolean;
}

let video: Video = null;

presence.on("iFrameData", (data : Video) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
	  	largeImageKey: "nekosama-icon"
	};

	if (document.URL.startsWith("https://www.neko-sama.fr/anime/episode/")) {
		const episodeImage: string = document.querySelector<HTMLMetaElement>('meta[property="og:image"]').content === "https://neko-sama.fr/images/default_thumbnail.png" ? "nekosama-icon" : document.querySelector<HTMLMetaElement>('meta[property="og:image"]').content,
		{paused, time, duration} = video;
		if (!paused) {
			const timestamps = presence.getTimestamps(time, duration);
			presenceData.startTimestamp = timestamps[0];
			presenceData.endTimestamp = timestamps[1];
		}
		presenceData.state = `${timeToString(Math.floor(time))}/${timeToString(Math.floor(duration))}`;
		presenceData.details = `Regarde ${document.querySelector("#watch").querySelectorAll("h1")[0].firstChild.textContent}`;
		presenceData.largeImageKey = episodeImage;
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? "En pause" : "Lecture en cours";
		presenceData.buttons = [
			{
				label: "Voir Épisode",
				url: document.URL
			}
		];
	} else if (document.URL.startsWith("https://www.neko-sama.fr/anime/info/")) {
		const animeImage: string = document.querySelector<HTMLImageElement>(".cover > img").src === "https://neko-sama.fr/images/default_thumbnail.png" ? "nekosama-icon" : document.querySelector<HTMLImageElement>(".cover > img").src;
		presenceData.details = "Regarde la page d'un animé ";
		presenceData.state = document.querySelector("#head").querySelectorAll("h1")[0].childNodes[0].textContent;
		presenceData.largeImageKey = animeImage;
		presenceData.buttons = [
			{
				label: "Voir Animé",
				url: document.URL
			}
		];
	} else if (document.URL.startsWith("https://www.neko-sama.fr/anime/")) 
		presenceData.details = "Cherche un animé en VOSTFR";
	else if (document.URL.startsWith("https://www.neko-sama.fr/anime-vf/")) 
		presenceData.details = "Cherche un animé en VF";
	else 
		presenceData.details = "Navigue sur Neko-sama";
	
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});