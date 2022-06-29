const presence = new Presence({
		clientId: "990204576189808670",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

interface songPlayingInformations {
	artist: string;
	song: string;
}

let songInfo: songPlayingInformations = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				document.location.hostname === "malimode.maliki.com"
					? "malimode"
					: "maliki_1024",
			startTimestamp: browsingTimestamp,
			buttons: [{ label: "Voir le site", url: "https://maliki.com/" }],
		},
		//* Get options of the presence
		[privacy, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]);
	if (!time) delete presenceData.startTimestamp; // delete the startTimestamp if time option desactivated

	//* Change the detail depending on the current URL
	switch (document.location.pathname) {
		case "/":
			presenceData.details =
				document.location.hostname === "malimode.maliki.com"
					? "Regarde la page principale du malimode"
					: "Regarde la page principale";
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
			if (!songInfo || privacy) presenceData.details = "Écoute la radio";
			else {
				presenceData.details = `Écoute ${songInfo.song}`;
				presenceData.state = `De ${songInfo.artist}`;
			}
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
		case "/personnalisation":
			presenceData.details = "Personnalise son personnage";
			presenceData.largeImageKey = "malimode";
			break;
		case "/partager":
			presenceData.details = "Partage son personnage";
			presenceData.largeImageKey = "malimode";
			break;
		default: {
			if (document.location.pathname.includes("/strips/")) {
				// If we are on a strip page, modify the details
				presenceData.details = privacy ? "Lit un strip" : "Lit le strip :";
				presenceData.state = privacy
					? ""
					: document.querySelector(".singleTitle").textContent;
			}
			if (document.location.pathname.includes("/bonus/")) {
				// If we are on a bonus page, modify the details
				presenceData.details = privacy
					? "Regarde un bonus"
					: "Regarde le bonus :";
				presenceData.state = privacy
					? ""
					: document.querySelector(".singleTitle").textContent;
			}
			if (
				document
					.querySelector(".singleContentShare--title")
					?.textContent.includes("actualité")
			) {
				// If we are on a page about actuality, modify the details
				presenceData.details = privacy
					? "Lit une actualité"
					: "Lit l'actualité :";
				presenceData.state = privacy
					? ""
					: document.querySelector(".singleHeader--title").textContent;
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

presence.on("iFrameData", async (data: songPlayingInformations) => {
	songInfo = data;
});
