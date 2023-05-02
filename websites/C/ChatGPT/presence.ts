const presence = new Presence({ clientId: "1102935778570547282" });

presence.on("UpdateData", async () => {
	const showTitle = await presence.getSetting<boolean>("showTitle");

	presence.setActivity({
		largeImageKey: "https://i.imgur.com/qw4f6EN.png",
		startTimestamp: Math.floor(Date.now() / 1000),
		details: showTitle ? "Talking with AI about:" : "Talking with AI",
		state: showTitle
			? document.querySelector("div.flex-col > div > div .bg-gray-800")
					?.textContent
			: "",
	});
});
