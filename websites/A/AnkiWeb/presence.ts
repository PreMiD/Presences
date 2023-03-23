const presence = new Presence({
		clientId: "1050466196220289104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zg32aGw.png",
		startTimestamp: browsingTimestamp,
	},
	{ pathname, hostname } = document.location;

	switch (hostname) {
		case "ankiweb.net": {
			break;
		}
		case "ankiuser.net": {
			break;
		}
		case "apps.ankiweb.net": {
			presenceData.details = "Downloading Anki";
			break;
		}
		case "changes.ankiweb.net": {
			break;
		}
		case "docs.ankiweb.net": {
			presenceData.details = "Reading the docs";
			presenceData.state = document.querySelector<HTMLAnchorElement>(".header").textContent;
			break;
		}
		case "faqs.ankiweb.net": {
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
