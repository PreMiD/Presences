const presence = new Presence({
		clientId: "1073255300263591946",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/7ooKWuO.png",
			startTimestamp: browsingTimestamp,
		};
	if (pathname.startsWith("/")) presenceData.details = "Na página principal";
	if (pathname.startsWith("/obras"))
		presenceData.details = "Visualizando Mangás";
	if (pathname.startsWith("/obras/")) {
		presenceData.details = "Visualizando Mangá";
		presenceData.state = document.querySelector("header h1")?.textContent;
		presenceData.buttons = [{ label: "Ver mangá", url: location.href }];
	}
	if (pathname.startsWith("/ler/")) {
		presenceData.details = "Lendo";
		presenceData.state = document.querySelector("header h2")?.textContent;
		presenceData.buttons = [{ label: "Ler capítulo", url: location.href }];
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
