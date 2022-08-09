const presence = new Presence({
		clientId: "1006328788147245086",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	urlParams = new URLSearchParams(window.location.search);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "main",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.pathname === "/") presenceData.details = "Home Page";
	else if (
		document.location.pathname.startsWith("/search") &&
		window.location.pathname !== "/"
	)
		presenceData.details = `Searching for ${urlParams.get("text")}`;
	else if (
		document.location.pathname.startsWith("/images/search") &&
		window.location.pathname !== "/"
	)
		presenceData.details = `Looking for Images of ${urlParams.get("text")}`;
	else if (
		document.location.pathname.startsWith("/video/search") &&
		window.location.pathname !== "/"
	)
		presenceData.details = `Looking for Videos of ${urlParams.get("text")}`;
	else if (
		document.location.pathname.startsWith("/news") &&
		window.location.pathname !== "/"
	)
		presenceData.details = `Looking for News on ${urlParams.get("text")}`;
	else if (
		document.location.pathname.startsWith("/maps") &&
		window.location.pathname !== "/"
	)
		presenceData.details = "Using Maps";

	presence.setActivity(presenceData);
});
