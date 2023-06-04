const presence = new Presence({
	clientId: "1112463096368353300",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/S/Songsterr/assets/logo.png",
	};

	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "Searching";
			break;
		}
		case "/a/wa/favorites": {
			presenceData.details = "Viewing Favorite Tabs";
			break;
		}
		case "/a/wa/mytabs": {
			presenceData.details = "Viewing Owned Tabs";
			break;
		}
		case "/a/wa/submit": {
			presenceData.details = "Submitting Tabs";
			break;
		}
		case "/a/wa/plus": {
			presenceData.details = "Viewing Plans";
			break;
		}
		case "/a/wa/help": {
			presenceData.details = "Viewing Q&A";
			break;
		}
		case "/a/wa/account": {
			presenceData.details = "Viewing Account Settings";
			break;
		}
		default:
			if (document.location.pathname.startsWith("/a/wsa/")) {
				presenceData.details = document.querySelector(
					'[aria-label="title"]'
				).textContent;

				presenceData.state = document.querySelector(
					'[aria-label="artist"]'
				).textContent;
			}
	}

	presence.setActivity(presenceData);
});
