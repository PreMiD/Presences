const presence = new Presence({
		clientId: "639208971806310441",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/S/SCP%20Wiki/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "scp-int.wikidot.com")
		presenceData.largeImageKey = "logo-int";
	if (document.location.hostname === "scp-sandbox-3.wikidot.com")
		presenceData.largeImageKey = "logo-sandbox";

	if (document.location.pathname === "/" || !document.location.pathname)
		presenceData.state = "Front Page";
	else {
		presenceData.state = document
			.querySelector("#page-title")
			.textContent.trim();
	}

	presence.setActivity(presenceData);
});
