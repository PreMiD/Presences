const presence: Presence = new Presence({
		clientId: "614220272790274199",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000),
	strings = presence.getStrings({
		browsing: "presence.activity.browsing",
		reading: "presence.activity.reading",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "anilist_lg",
			startTimestamp,
		},
		{ pathname } = window.location;
	if (pathname.startsWith("/home")) {
		presenceData.details = (await strings).browsing;
		presenceData.state = "Home";
	} else if (pathname.startsWith("/user")) {
		const user = document.querySelector(".name").textContent.trim();
		if (pathname.includes("mangalist"))
			presenceData.details = `Viewing ${user}'s manga list`;
		else if (pathname.includes("animelist"))
			presenceData.details = `Viewing ${user}'s anime list`;
		else presenceData.details = `Viewing ${user}'s profile`;
	} else if (pathname.startsWith("/search")) {
		presenceData.details = "Searching";
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Searching";
	} else if (pathname.startsWith("/anime")) {
		presenceData.details = "Viewing an anime";
		presenceData.state = document
			.querySelector("div.content > h1")
			.textContent.trim();
	} else if (pathname.startsWith("/manga")) {
		presenceData.details = "Viewing a manga";
		presenceData.state = document
			.querySelector("div.content > h1")
			.textContent.trim();
	} else if (pathname.startsWith("/forum")) {
		if (pathname.split("/").length > 3) {
			presenceData.details = "Reading a forum post";
			presenceData.state = `'${document
				.querySelector("h1.title")
				.textContent.trim()}'`;
			presenceData.smallImageKey = "reading";
			presenceData.smallImageText = (await strings).reading;
		} else presenceData.details = "Browsing the forum";
	} else if (pathname.startsWith("/studio")) {
		presenceData.details = "Viewing a studio";
		presenceData.state =
			document.querySelector("div.container > h1").textContent;
	} else if (pathname.startsWith("/review")) {
		presenceData.details = `Reading a '${document
			.querySelector("a.title")
			.textContent.trim()}' review`;
		presenceData.state = `${document
			.querySelector("a.author")
			.textContent.trim()
			.replace("a review ", "")}`;
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = (await strings).reading;
	} else if (pathname.startsWith("/notifications"))
		presenceData.details = "Viewing notifications";
	else if (pathname.startsWith("/settings"))
		presenceData.details = "Changing settings";

	presence.setActivity(presenceData, true);
});
