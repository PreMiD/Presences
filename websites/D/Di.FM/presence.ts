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
		let str1 = document.querySelector("div > section.track-region.col > div > div.artwork > div > img");
		let str = str1.outerHTML
		let match = str.match(/"(.*?)"/);
		let betweenQuotes = match[1].replace(/"/g,'');
		presenceData.largeImageKey = 'https:' + betweenQuotes
	} else {
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = "pause";
	}

	presence.setActivity(presenceData);
});
