const presence = new Presence({
	clientId: "630542731701387276",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "dilogo",
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

		const str = document.querySelector(
			"div > section.track-region.col > div > div.artwork > div > img"
		).outerHTML;

		presenceData.largeImageKey = `https:${str
			.match(/"(.*?)"/)[1]
			.replace(/"/g, "")}`;
	} else {
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = "pause";
	}

	presence.setActivity(presenceData);
});
