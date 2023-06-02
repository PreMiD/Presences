const presence = new Presence({
	clientId: "608043966285348944",
});

let lastPlaybackState = null,
	reading,
	browsingTimestamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState !== reading) {
	lastPlaybackState = reading;
	browsingTimestamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {};

	reading =
		document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

	if (reading) {
		const [a, b] = document.querySelectorAll<HTMLElement>(
			".margin-bottom-12 h1 a"
		);

		presenceData.details = a.textContent;
		presenceData.state = `${b.textContent} [Page: ${
			document.querySelector<HTMLInputElement>(".page-jump.text-center").value
		}]`;
		presenceData.largeImageKey = "https://cdn.rcd.gg/PreMiD/websites/S/Simply%20Hentai/assets/logo.png";
		presenceData.startTimestamp = browsingTimestamp;
	} else {
		const presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/S/Simply%20Hentai/assets/logo.png",
		};

		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
