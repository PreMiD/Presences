const presence = new Presence({
  clientId: "783221588057260044"
});

presence.on("UpdateData", async() => {
	const presenceData: PresenceData = {
		details: "https://t1c.dev",
		largeImageKey: "pfp"
	};
	if (presenceData.details == null) {
        presence.setTrayTitle();
		presence.setActivity();
	} else {
		presence.setActivity(presenceData); 
}
});
