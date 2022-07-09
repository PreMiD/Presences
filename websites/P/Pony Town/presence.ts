const presence = new Presence({
		clientId: "995451252588695663",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "main",
	};
	if (document.location.pathname === "/") presenceData.details = "In-Game";
	else if (document.location.pathname.includes("help"))
		presenceData.details = "Viewing the help page.";
	else if (document.location.pathname.includes("about"))
		presenceData.details = "Viewing the about page.";
	else if (document.location.pathname.includes("character"))
		presenceData.details = "Customizing their character.";
	else if (document.location.pathname.includes("account"))
		presenceData.details = "Editing their account settings.";
	presenceData.startTimestamp = websiteLoadTimestamp;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
