const presence = new Presence({
	clientId: "990204576189808670",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "maliki_1024",
	startTimestamp: browsingTimestamp,
	buttons: [{ label: "Voir le site", url: "https://maliki.com/" }]
};

switch(document.URL) { // Change the detail depending on the current URL
	case "https://maliki.com/strips/":
		presenceData.details = "Parcourt les strips";
		break;
	case "https://maliki.com/actualites/":
		presenceData.details = "Parcourt les actualités";
		break;
	case "https://maliki.com/bonus/":
		presenceData.details = "Parcours les bonus";
		break;
	case "https://maliki.com/radio/":
		presenceData.details = "Écoute la radio";
		break;
	case "https://maliki.com/shop/":
		presenceData.details = "Parcours le shop";
		break;
	case "https://maliki.com/events/":
		presenceData.details = "Se renseigne sur les futurs événements";
		break;
	case "https://maliki.com/faq/":
		presenceData.details = "Lire la foire aux questions";
		break;
	default:
		// If the case "https://maliki.com/strips/" does not match, but there's a part of the url
		presenceData.details = document.URL.includes("https://maliki.com/strips/") ? "Lit un strip" : "Regarde la page principale";
		presenceData.details = document.URL.includes("https://maliki.com/bonus/") ? "Regarde un bonus" : "Regarde la page principale";
		if (document.URL.includes("https://malimode.maliki.com/")) { // If the url is not the standard url, then set a special details
			presenceData.details = "Crée un personnage sur le Malimode";
			presenceData.largeImageKey = "malimode";
		}
		break;
}

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
