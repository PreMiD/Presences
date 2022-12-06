const presence = new Presence({
		clientId: "846282107462352927",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData;
	if ("mediaSession" in navigator && navigator.mediaSession.metadata !== null) {
		presenceData = {
			largeImageKey: navigator.mediaSession.metadata.artwork[0].src,
			details: navigator.mediaSession.metadata.title,
			state: navigator.mediaSession.metadata.artist,
		};
		presence.setActivity(presenceData);
	} else {
		const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/C8eRVDU.jpg",
		};
		let onlineService = 0;
		const children =
			document.querySelectorAll(".monitors").length !== 0
				? document.querySelectorAll(".monitors")[0].children
				: null;

		switch (location.pathname.toString().replace("/", "")) {
			case "history":
				presenceData.details = "Schaut die Historie an";
				break;
			case "bots":
				presenceData.details = "Interresiert sich für die Bots";
				break;
			case "status":
				for (let i = 0; i < children.length; i++) {
					if (children.item(i).children.item(1).textContent === "Online")
						onlineService++;
				}
				presenceData.details = "Schaut sich den Status an...";
				presenceData.state = `${onlineService} von ${children.length} Services Online`;
				break;
			case "impressum":
				presenceData.details = "Schaut sich das Impressum an...";
				break;
			case "changelog":
				presenceData.details = "Schaut sich die Änderungen an...";
				break;
			case "dashboard":
				presenceData.details = "Schaut sich im Dashboard um...";
				break;
			case "datenschutz":
				presenceData.details = "Schaut sich den Datenschutz an...";
				break;
			default:
				presenceData.details = "Durch Stöbert die Webseite";
				break;
		}
		presence.setActivity(presenceData);
	}
});
