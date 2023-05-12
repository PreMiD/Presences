const presence = new Presence({
		clientId: "846282107462352927",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData;
	if (
		"mediaSession" in navigator &&
		navigator.mediaSession.metadata &&
		!document.querySelector<HTMLAudioElement>("audio")?.paused
	) {
		presenceData = {
			largeImageKey: navigator.mediaSession.metadata.artwork[0].src,
			details: navigator.mediaSession.metadata.title,
			state: navigator.mediaSession.metadata.artist,
			buttons: [
				{
					label: "Listen",
					url: location.href,
				},
			],
		};
	} else {
		presenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/C8eRVDU.jpg",
		};
		switch (location.pathname.replace("/", "")) {
			case "history":
				presenceData.details = "Schaut die Historie an";
				break;
			case "bots":
				presenceData.details = "Interresiert sich für die Bots";
				break;
			case "status":
				presenceData.details = "Schaut sich den Status an";
				presenceData.state = `${
					document.querySelectorAll('[class="online"]')?.length
				} von ${
					document.querySelectorAll('[class="monitor"]')?.length
				} Services Online`;
				break;
			case "impressum":
				presenceData.details = "Schaut sich das Impressum an";
				break;
			case "changelog":
				presenceData.details = "Schaut sich die Änderungen an";
				break;
			case "dashboard":
				presenceData.details = "Schaut sich im Dashboard um";
				break;
			case "datenschutz":
				presenceData.details = "Schaut sich den Datenschutz an";
				break;
			default:
				presenceData.details = "Durch Stöbert die Webseite";
		}
	}
	presence.setActivity(presenceData);
});
