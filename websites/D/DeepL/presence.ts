const presence = new Presence({
	clientId: "614903529240395782",
});

presence.on("UpdateData", async () => {
	if (document.location.pathname === "/translator") {
		presence.setActivity({
			details:
				document.querySelectorAll(".translate_from")[0].parentNode.textContent,
			state:
				document.querySelectorAll(".translate_to")[0].parentNode.textContent,
			largeImageKey: "https://i.imgur.com/Jkb5SDd.png",
		});
	} else {
		presence.setActivity({
			largeImageKey: "https://i.imgur.com/Jkb5SDd.png",
		});
	}
});
