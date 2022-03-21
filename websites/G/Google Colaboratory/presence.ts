const presence = new Presence({
		clientId: "955447491858432000"
	}),
	time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "meetlogo",
		startTimestamp: time
	};

	if (document.location.pathname.toLowerCase() === "/") {
		presenceData.details = "Choosing a file";
		presenceData.state = "Idling";
	} else {
		presenceData.smallImageKey = "vcall";
		presenceData.details = "Editing a notebook";
		presenceData.state = `${document.title}`;
	}

	presence.setActivity(presenceData);
});
