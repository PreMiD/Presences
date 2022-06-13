const presence = new Presence({
		clientId: "631543282601558046",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "akinator",
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
			const hover = document.querySelectorAll(":hover")[12].textContent;
			presenceData.details = `Q: ${
				document.querySelectorAll(".bubble-body")[0].textContent
			}`;
			presenceData.state = `Selecting: ${hover ? hover : "Still Thinking"}`;

			break;
		}
		// No default
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
