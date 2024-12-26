const presence = new Presence({
		clientId: "1263373102746964009",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zjBdwQ8.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (pathname) {
		// Projects
		case "/projects": {
			presenceData.details = "Browsing Projects...";
			break;
		}
		// Project Archive
		case "/projects/archive": {
			presenceData.details = "Browsing Project Archives...";
			break;
		}
		default:
			// Project Dashboard
			if (pathname.includes("/projects/") && pathname.includes("/dashboard/")) {
				presenceData.details = "Project Dashboard";
				// Home
				if (pathname.includes("/home")) {
					// Project Settings
					if (pathname.includes("/general"))
						presenceData.state = "Managing Project Settings...";
					// Members
					else if (pathname.includes("/members"))
						presenceData.state = "Managing Members...";
					// Apps
					else if (pathname.includes("/apps"))
						presenceData.state = "Browsing Apps...";
					// Showcase
					else if (pathname.includes("/showcase"))
						presenceData.state = "Viewing Showcase...";
					else presenceData.state = "";
					// CMS
				} else if (pathname.includes("/cms"))
					presenceData.state = "Managing CMS...";
				// CMS - Forms
				else if (pathname.includes("/forms"))
					presenceData.state = "Viewing Forms...";
				// CMS - Analytics
				else if (pathname.includes("/analytics"))
					presenceData.state = "Viewing Analytics...";
				// CMS - Plan
				else if (pathname.includes("/plan"))
					presenceData.state = "Managing Plan...";
				// Payment
			} else if (pathname === "/payment")
				presenceData.details = "Managing Payment Settings...";
			// Editor
			else if (
				pathname.includes("/projects/") &&
				pathname.includes("/editor/")
			) {
				presenceData.details = "Design Editor";
				presenceData.state = "Editing Pages...";
			}
	}

	presence.setActivity(presenceData);
});
