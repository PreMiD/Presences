const presence = new Presence({ clientId: "1252257462476738580" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://r2.arkhanths.com/logo.jpg",
			startTimestamp: browsingTimestamp,
		},
		path = location.pathname + location.search,
		showUID: boolean = await presence.getSetting<boolean>("uid");

	if (path.includes("/web/oz/login.php")) {
		const uid = new URL(
			window.location.origin + window.location.pathname + window.location.search
		).searchParams.get("uid");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[API] UID: ${uid}`;

			presence.setActivity(presenceData);
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "Via API";

			presence.setActivity(presenceData);
		}
	}

	if (path.includes("/play/?game=719")) {
		const uid = document.querySelector(".server-uid .txt-light");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[R2] UID: ${uid.textContent}`;

			presence.setActivity(presenceData);
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "From r2games.com";

			presence.setActivity(presenceData);
		}
	}

	if (
		path.includes("/games/loginGameServer.action?gameName=LeagueofAngels_GHG")
	) {
		const uid = document.querySelector(".headerID span");

		if (uid && showUID) {
			presenceData.details = "Playing...";
			presenceData.state = `[GHG] UID: ${uid.textContent}`;

			presence.setActivity(presenceData);
		} else {
			presenceData.details = "Playing...";
			presenceData.state = "From gamehollywood.com";

			presence.setActivity(presenceData);
		}
	}
});
