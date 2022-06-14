const presence = new Presence({
		clientId: "844109673618735144",
	}),
	elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
		},
		path = document.location.pathname;
	if (path.includes("/folders/") || path.includes("/search/")) {
		if (path.includes("messages")) {
			presenceData.details = "Viewing an Email";
			presenceData.startTimestamp = elapsed;
		} else {
			presenceData.details = "Viewing Mail";
			presenceData.startTimestamp = elapsed;
		}
	} else if (path.includes("/compose/")) {
		presenceData.details = "Composing a New Email";
		presenceData.startTimestamp = elapsed;
	} else if (path.includes("/settings/")) {
		presenceData.details = "Viewing Settings";
		presenceData.startTimestamp = elapsed;
	} else if (path.includes("/contacts")) {
		presenceData.details = "Viewing Contacts";
		presenceData.startTimestamp = elapsed;
	} else {
		presenceData.details = "Viewing Mail";
		presenceData.startTimestamp = elapsed;
	}
	presence.setActivity(presenceData);
});
