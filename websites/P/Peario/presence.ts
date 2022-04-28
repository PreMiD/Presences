const presence = new Presence({
		clientId: "969204609845428234"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, title2: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons")
		]);
	if (privacy) presenceData.details = "Browsing...";
	else if (page === "/") presenceData.details = "Bekijkt de homepagina";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
