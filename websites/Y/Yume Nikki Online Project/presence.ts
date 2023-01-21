const presence = new Presence({
		clientId: "1060269808383430696",
	}),
	elapsed = Math.floor(Date.now() / 1000),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "yume",
		startTimestamp: elapsed,
	};

	if (
		location.pathname === "/" ||
		location.href.split(location.host)[1].toLowerCase() === "/index"
	) {
		presenceData.details = "The Nexus";
		presenceData.state = "(Selecting Game)";
	} else if (document.title.split(" - ")[0].toString() != "YNOproject") {
		presenceData.details = document.title.split(" - ")[0].toString();
		if (document.querySelector("#locationText").textContent)
			presenceData.state = document.querySelector("#locationText").textContent;
		else presenceData.state = "In Menu";
	} else presenceData.details = "Loading...";

	presence.setActivity(presenceData);
});
