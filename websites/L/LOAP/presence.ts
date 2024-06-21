const presence = new Presence({ clientId: "1252257462476738580" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://r2.arkhanths.com/logo_512.jpg",
			startTimestamp: browsingTimestamp,
		},
		path = location.pathname + location.search,
		showUID: boolean = await presence.getSetting<boolean>("uid");

	if (path.includes("/web/oz/login.php")) {
		const uid = new URL(
			document.location.href
		).searchParams.get("uid");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[API] UID: ${uid}`;
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "Via API";
		}
	}

	if (path.includes("/play/?game=719")) {
		const uid = document.querySelector(".server-uid .txt-light");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[R2] UID: ${uid.textContent}`;
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "From r2games.com";
		}
	}

	if (
		path.includes("/games/loginGameServer.action?gameName=LeagueofAngels_GHG")
	) {
		const uid = document.querySelector(".headerID span");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[GHG] UID: ${uid.textContent}`;
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "From gamehollywood.com";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
