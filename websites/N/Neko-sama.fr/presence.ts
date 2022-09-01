const presence = new Presence({
	clientId: "1014298173314961481"
}),
//You can use this to get translated strings in their browser language
strings = presence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused"
});
  
/*
function myOutsideHeavyLiftingFunction(){
	//Grab and process all your data here
  
	// element grabs //
	// api calls //
	// variable sets //
}
  
setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up
*/

function timeToString(nbr: number): string{
	let nbrCopy = nbr; 
	let nbrString: string = "";
	if (nbrCopy >= 3600) {
		let quotient = Math.floor(nbrCopy/3600);
		if (isNaN(quotient)) quotient = 0
		let remainder = nbrCopy%3600;
		if (quotient > 9) {
			nbrString += quotient.toString() + ":";
		} else {
			nbrString += "0" + quotient.toString() + ":";
		}
		nbrCopy = remainder;
	}
	let quotient = Math.floor(nbrCopy/60);
	if (isNaN(quotient)) quotient = 0
	let remainder = nbrCopy%60;
	if (quotient > 9) {
		nbrString += quotient.toString() + ":";
	} else {
		nbrString += "0" + quotient.toString() + ":";
	}
	nbrCopy = remainder;
	if (isNaN(nbrCopy)) nbrCopy = 0
	if (nbrCopy > 9) {
		nbrString += nbrCopy.toString();
	} else {
		nbrString += "0" + nbrCopy.toString();
	}
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
	  	largeImageKey: "nekosama-icon",
		buttons: [
				{
					label: "Voir site",
					url: "https://www.neko-sama.fr/"
				}
		]
	};

	if (document.URL.startsWith("https://www.neko-sama.fr/anime/episode/")) {
		let episodeTitle: string = document.getElementById("watch").getElementsByTagName("h1")[0].firstChild.textContent;
		let episodeImage: string = document.head.getElementsByTagName("meta")[13].content;
		if (episodeImage == "https://neko-sama.fr/images/default_thumbnail.png") episodeImage = "nekosama-icon";
		let documentUrl: string = document.URL;
		let paused: boolean = video.paused;
		let time: number = Math.floor(video.time);
		let duration: number = Math.floor(video.duration);
		let timeString = timeToString(time);
		let durationString = timeToString(duration);
		if (!paused){
			let timestamps = presence.getTimestamps(video.time, video.duration);
			let timestampStart = timestamps[0];
			let timestampEnd = timestamps[1];
			presenceData.startTimestamp = timestampStart,
			presenceData.endTimestamp = timestampEnd
		}
		presenceData.state = timeString + "/" + durationString;
		presenceData.details = episodeTitle;
		presenceData.largeImageKey = episodeImage;
		presenceData.smallImageKey = video.paused ? "pause" : "";
		presenceData.smallImageText = video.paused ? "En pause" : "Lecture en cours";
		presenceData.buttons = [
			{
				label: "Voir site",
				url: "https://www.neko-sama.fr/"
			},
			{
				label: "Voir Épisode",
				url: documentUrl
			}
		]
	} else if (document.URL.startsWith("https://www.neko-sama.fr/anime/info/")) {
		let animeTitle: string = document.getElementById("head").getElementsByTagName("h1")[0].childNodes[0].textContent;
		let animeImage: string = document.getElementById("details").getElementsByTagName("img")[0].src;
		if (animeImage == "https://neko-sama.fr/images/default_thumbnail.png") animeImage = "nekosama-icon";
		let documentUrl: string = document.URL;
		presenceData.details = "Regarde la page d'un animé ";
		presenceData.state = animeTitle;
		presenceData.largeImageKey = animeImage;
		presenceData.buttons = [
			{
				label: "Voir site",
				url: "https://www.neko-sama.fr/"
			},
			{
				label: "Voir Animé",
				url: documentUrl
			}
		]
	} else if (document.URL === "https://www.neko-sama.fr/anime/") {
		presenceData.details = "Cherche un animé en VOSTFR";
	} else if (document.URL === "https://www.neko-sama.fr/anime-vf/") {
		presenceData.details = "Cherche un animé en VF";
	} else {
		presenceData.details = "Navigue sur Neko-sama";
	}
	if (presenceData.details!="") presence.setActivity(presenceData);
	else presence.setActivity();
});