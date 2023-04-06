const presence = new Presence({
	clientId: "630542731701387276",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/T1Zi3qF.png",
	};
	if (
		document.querySelector("#webplayer-region").getAttribute("data-state") ===
		"playing"
	) {
		presenceData.details = document
			.querySelectorAll(".artist-name")[0]
			.textContent.replace("-", "");
		presenceData.state =
			document.querySelectorAll(".track-name")[0].textContent;
		presenceData.smallImageKey = "play";
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"div > section.track-region.col > div > div.artwork > div > img"
		).src;
	} else {
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = "pause";
	}
	presence.setActivity(presenceData);
});
