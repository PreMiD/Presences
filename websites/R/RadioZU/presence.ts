const presence = new Presence({ clientId: "959069119012028467" });

let startTime = 0;

presence.on("UpdateData", async () => {
	if (!document.querySelector(".jp-state-playing")) {
		startTime = 0;
		presence.setActivity();
	} else {
		if (!startTime) startTime = Number(Date.now());
		let titleName = "Unknown title";
		const title = document.querySelector(".jp-title>strong");
		if (title) titleName = title.textContent;
		presence.setActivity({
			largeImageKey: "logo",
			smallImageKey: "live",
			smallImageText: "Live",
			details: "LIVE",
			state: titleName,
			buttons: [{ label: "Play", url: "https://radiozu.ro/live" }],
			startTimestamp: startTime
		});
	}
});
