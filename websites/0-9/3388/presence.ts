const presence = new Presence({
	clientId: "1094931941616267344",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		smallImageKey: "search",
	};

	if (document.location.pathname.includes("/detail/")) {
		presenceData.details = `Viewing ${!document.querySelector("#season-list") ? "a Movie..." : "a TV Show..."}`;
		presenceData.state = document.querySelector(".film-name").textContent;
	} else if (document.location.pathname === "/movies")
		presenceData.details = "Browsing Movies...";
	else if (document.location.pathname === "/tv-shows")
		presenceData.details = "Browsing TV Shows...";
	else
		presenceData.details = "Browsing...";

	presence.setActivity(presenceData);
});
