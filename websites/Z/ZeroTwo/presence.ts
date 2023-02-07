const presence = new Presence({
		clientId: "752067809214857298",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	if (!(await presence.getSetting<boolean>("incognito"))) {
		presenceData.details = document.querySelector("#premid").textContent;
		if (await presence.getSetting<boolean>("showTimestamp"))
			presenceData.startTimestamp = browsingTimestamp;
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
