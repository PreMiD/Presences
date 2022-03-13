const presence = new Presence({
		clientId: "952588388379271268"
	}),
	browsingStamp = Math.floor(Date.now() / 1000),
	getPath = document.location.pathname.toLowerCase(),
	getPage = (query: string): string | undefined => {
		return document.querySelector(query)?.textContent.split(":")[1];
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo1",
		details: `Viewing ${getPage("title")}`,
		startTimestamp: browsingStamp,
		buttons: [{ label: "View Page", url: document.location.href }]
	};

	if (getPath == "/game/browser") {
		presenceData.details = "Playing";
		presenceData.startTimestamp = browsingStamp;
	} else if (getPath == "/wiki/item") {
		presenceData.details = "Viewing wiki item:";
		presenceData.state = getPage("title");
		presenceData.startTimestamp = browsingStamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
