const presence = new Presence({
	clientId: "607875991746117643",
});

presence.on("UpdateData", async () => {
	if (document.location.pathname === "/") {
		presence.setActivity({
			details: "Looking at nekos",
			largeImageKey: "https://i.imgur.com/B23ySSD.png",
		});
	} else if (document.location.pathname === "/lewd") {
		presence.setActivity({
			details: "Looking at lewd nekos",
			largeImageKey: "https://i.imgur.com/B23ySSD.png",
		});
	}
});
