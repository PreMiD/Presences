const presence = new Presence({
	clientId: "990204576189808670",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "1337x",
	startTimestamp: browsingTimestamp,
};
const path_array = document.location.pathname.split("/");
const page_name = path_array.length === 0 ? path_array[0] : path_array[1];

switch(page_name) {
	case "":
		presenceData.details = "Regarde la page principale";
		break;
	case "strips":
		presenceData.details = path_array[2] == "" ? "Parcourt les strips" : "Lit un strip";
		break;
	case "actualites":
		presenceData.details = "Parcourt les actualités";
		break;
	case "bonus":
		presenceData.details = "Parcours les bonus";
		break;
	case "radio":
		presenceData.details = "Écoute la radio";
		break;
	case "shop":
		presenceData.details = "Parcours le shop";
		break;
	case "events":
		presenceData.details = "Se renseigne sur les futurs événements";
		break;
	case "faq":
		presenceData.details = "Lire la foire aux questions";
		break;
}

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
