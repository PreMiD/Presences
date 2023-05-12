const presence = new Presence({
		clientId: "631543282601558046",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/mQreXyR.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "Starting Akinator";
			break;
		}
		case "/theme-selection": {
			presenceData.details = "Selecting Theme";
			break;
		}
		case "/game": {
			presenceData.details = `Q: ${
				document.querySelectorAll(".bubble-body")[0].textContent
			}`;
			presenceData.state = `Selecting: ${
				document.querySelectorAll(":hover")[12].textContent ?? "Still Thinking"
			}`;

			break;
		}
		// No default
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
