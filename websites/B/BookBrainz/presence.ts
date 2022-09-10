const presence = new Presence({
	clientId: "1017866651053596795"
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ja94dWW.png",
		startTimestamp: browsingTimestamp
	},
	{pathname} = window.location

	presence.setActivity(presenceData)

});
