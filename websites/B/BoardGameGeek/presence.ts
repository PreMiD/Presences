const presence = new Presence({
		clientId: "1194078283919274004",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/KxdUXPF.png"
	};

	presence.setActivity(presenceData);
});
