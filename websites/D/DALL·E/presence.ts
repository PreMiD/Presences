const presence = new Presence({
		clientId: "1037407267336753152",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/i6UPLX2.png",
		startTimestamp: browsingTimestamp
	},
	{ pathname } = window.location;

	if (pathname === "") {
	} else if (pathname.startsWith("/history")) {
	} else if (pathname.startsWith("/c/")) {
	} else if (pathname.startsWith("/collections")) {
	} else if (pathname.startsWith("/account")) {
	} else if (pathname.startsWith("/e/")) {
	} else if (pathname.startsWith("/s/")) {
	} else {}

	presence.setActivity(presenceData);
});
