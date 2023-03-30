const presence = new Presence({
		clientId: "",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/C2gdkI4.png",
		startTimestamp: browsingTimestamp,
	};

	presence.setActivity(presenceData);

	const currentUrl = window.location.href;

	if (currentUrl.includes("flazebot.com")) {
		const message = "Browsing Flaze website...";
		alert(message);
	} else if (currentUrl.includes("dashboard.flazebot.com")) {
		const message = "Browsing Flaze dashboard...";
		alert(message);
	} else if (currentUrl.includes("dashboard.flazebot.com/flaze-player/")) {
		const message = "Playing music with Flaze!";
		alert(message);
	} else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});