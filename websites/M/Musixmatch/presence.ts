const presence = new Presence({
		clientId: "797128590524153889",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		path = (text: string): boolean => {
			return document.location.pathname.includes(text);
		};

	if (path("/explore/genre/")) {
		presenceData.details = "Viewing a genre";
		presenceData.state = document
			.querySelector("#content > div > div.explore-panel > h1 > div")
			.textContent.replace("lyrics", "")
			.trim();
	} else if (path("/explore")) presenceData.details = "Exploring lyrics";
	else if (path("/lyrics/")) {
		presenceData.details = document
			.querySelector("#site h1")
			.textContent.replace("Lyrics", "");
		presenceData.state = document.querySelector(
			"#site h2 > span > a"
		).textContent;
		presenceData.smallImageKey = "reading";
	} else if (path("/community")) presenceData.details = "Viewing community";
	else if (path("/profile/")) {
		presenceData.details = "Viewing the profile:";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (path("/artist/")) {
		presenceData.details = "Viewing an artist:";
		presenceData.state = document.querySelector("#content h1").textContent;
	} else if (path("/search/")) {
		presenceData.details = "Searching";
		presenceData.state = document.querySelector(
			"#content span > span"
		).textContent;
		presenceData.smallImageKey = "search";
	}

	presence.setActivity(presenceData);
});
