const presence = new Presence({
	clientId: "956879162788958208"
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "vtc_logo"
};

if (document.location.hostname === "spedition-perlhuhn.gq") {
	const { pathname } = document.location;
	switch (pathname) {
		case "/":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Betrachtet die";
			presenceData.state = "Startseite"
			break;
		case "/team/":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Betrachtet die";
			presenceData.state = "Team Liste";
			break;
		case "/events/":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Betrachtet die";
			presenceData.state = "Event Liste";
			break;
		default:
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Betrachet eine";
			presenceData.state = "Unbekannte Seite"
			break;
	}
}

if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
