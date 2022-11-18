const presence = new Presence({
	clientId: "828925279946801162",
});

presence.on("UpdateData", async () => {
	presence.setActivity({
		details: "Blinest",
		state: "Playing on Blinest",
		buttons: [
			{
				label: "Play",
				url: "https://blinest.com/",
			},
		],
	});
});
