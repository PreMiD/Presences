const presence = new Presence({
	//The client ID of the Application created at https://discordapp.com/developers/applications
	clientId: "1013489969379152022"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/gtBvHQH.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);
});
