const presence = new Presence({
		clientId: "1027249400738750625",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Zzh3YNq.png",
		startTimestamp: browsingTimestamp
	},
	{ pathname } = window.location,
	pathSplit = pathname.split("/").slice(1);

	presence.setActivity(presenceData);
});
