const presence = new Presence({
		clientId: "990204576189808670",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "maliki_1024",
		startTimestamp: browsingTimestamp,
		buttons: [{ label: "Voir le site", url: "https://maliki.com/" }],
	};

	switch (
		document.location.pathname // Change the detail depending on the current URL
	) {
		case "/":
			presenceData.details = "Regarde la page principale";
			break;
		case "/strips/":
			presenceData.details = "Parcourt les strips";
			break;
		case "/actualites/":
			presenceData.details = "Parcourt les actualités";
			break;
		case "/bonus/":
			presenceData.details = "Parcours les bonus";
			break;
		case "/radio/":
			presenceData.details = "Écoute la radio";
			break;
		case "/shop/":
			presenceData.details = "Parcours le shop";
			break;
		case "/events/":
			presenceData.details = "Se renseigne sur les futurs événements";
			break;
		case "/faq/":
			presenceData.details = "Lire la foire aux questions";
			break;
		default: {
			if (document.location.pathname.includes("/strips/")) {
				presenceData.details = "Lit le strip :";
				presenceData.state = document.querySelector(".singleTitle").textContent;
			}
			if (document.location.pathname.includes("/bonus/")) {
				presenceData.details = "Regarde le bonus :";
				presenceData.state = document.querySelector(".singleTitle").textContent;
			}
			if (document.URL.includes("https://malimode.maliki.com/")) {
				// If the url is not the standard url, then set a special details
				presenceData.details = "Crée un personnage sur le Malimode";
				presenceData.largeImageKey = "malimode";
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
