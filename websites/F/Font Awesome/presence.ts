const presence = new Presence({
		clientId: "820023496934817804",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/F/Font%20Awesome/assets/logo.png",
			startTimestamp: browsingTimestamp,
			type: ActivityType.Playing,
			name: "Font Awesome",
		},
		{ pathname, search, href } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0] ?? "/") {
		case "/": {
			presenceData.details = "Browsing Home Page";
			break;
		}
		case "icons": {
			break;
		}
		case "start": {
			presenceData.details = "Getting Started";
			break;
		}
		case "support": {
			presenceData.details = "Browsing Support";
			break;
		}
		case "plans": {
			if (pathList[1]) {
				presenceData.details = "Viewing Plan";
				presenceData.state = document.querySelector("h3");
			} else {
				presenceData.details = "Browsing Plans";
			}
			break;
		}
		case "sessions": {
			presenceData.details = "Signing In";
			break;
		}
	}

	if (!presenceData.details) presence.clearActivity();
	else presence.setActivity(presenceData);
});
