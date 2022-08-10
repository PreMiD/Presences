const presence = new Presence({
		clientId: "1006328788147245086",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	currentPath = document.location.pathname.split("/"),
	textQuery = new URLSearchParams(window.location.search).get("text");
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "main",
		startTimestamp: browsingTimestamp,
	};

	switch (currentPath[1]) {
		case "/": {
			presenceData.details = "Home Page";
			break;
		}
		case "search": {
			presenceData.details = `Searching for ${textQuery}`;
			break;
		}
		case "image": {
			presenceData.details = `Looking for Images of ${textQuery}`;
			break;
		}
		case "news": {
			presenceData.details = `Looking for News on ${textQuery}`;
			break;
		}
		case "maps": {
			presenceData.details = "Using Maps";
			break;
		}
		default:
			if (currentPath[1] === "video" && currentPath[2] === "search")
				presenceData.details = `Looking for Videos of ${textQuery}`;
	}
	presence.setActivity(presenceData);
});
