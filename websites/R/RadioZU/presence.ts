const presence = new Presence({ clientId: "959069119012028467" });

let startTime = 0;

presence.on("UpdateData", async () => {
	if (!document.querySelector(".jp-state-playing")) {
		startTime = 0;
		presence.setActivity();
	} else {
		if (!startTime) startTime = Number(Date.now());
		let titleName = "Radio ZU - LIVE";
		const title = document.querySelector(".jp-title>strong");
		if (title) {
			if (title.textContent == "Radio Zu") return;
			titleName = title.textContent;
		}
		presence.setActivity({
			largeImageKey: "logo",
			smallImageKey: "live",
			smallImageText: "Live",
			state: titleName,
			buttons: [{ label: "Play", url: "https://radiozu.ro/live" }],
			startTimestamp: startTime
		});
	}
});
