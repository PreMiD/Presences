const presence = new Presence({
		clientId: "1067711765770682388",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/mwpEkf3.png",
		startTimestamp: browsingTimestamp,
	};

	const service: Record<string, PresenceData> = {
			"Patreon ": { state: "Patreon" },
			"Pixiv Fanbox": { state: "Pixiv Fanbox" },
			"Gumroad ": { state: "Gumroad" },
			"Subscribestar ": { state: "SubscribeStar" },
			"Dlsite ": { state: "DLsite" },
			"Discord ": { state: "Discord" },
			"Fantia ": { state: "Fantia" },
			"Boosty ": { state: "Boosty" },
			"Aftian ": { state: "Aftian" },
		},
		pages: Record<string, PresenceData> = {
			"/": { details: "Viewing Home Page" },
			"/importer": { details: "importing from Paysite" },
			"/importer/tutorial": { details: "Reading FAQ" },
			"/account": { details: "Checking out their account" },
			"/account/keys": { details: "Checking out their keys" },
			"/posts": { details: "Browsing through posts" },
			"/artists": { details: "Browsing through artists" },
			"/artists/updated": { details: "Browsing through updated artists" },
			"/favorites": { details: "Checking out their favorites" },
			"/dmca": { details: "Reading DMCA notice" },
		},
		{ hostname, pathname } = location;

	for (const [path, data] of Object.entries(pages))
		if (pathname === path) presenceData = { ...presenceData, ...data };

	if (hostname === "kemono.party") {
		if (pathname.includes("/user/")) {
			if (pathname.includes("/post/")) {
				presenceData.details = `${
					document.querySelector("{[class=post__title] > span:nth-child(1)}")
						.textContent
				}`;
				presenceData.state = `${document
					.querySelector("a[class='post__user-name']")
					.textContent.replace(/\s+/g, "")}`;
			} else {
				presenceData.details = `${
					document.querySelector("[itemprop=name]").textContent
				}`;
			}
			presenceData.largeImageKey = `${
				(<HTMLImageElement>(
					document.querySelector("a > [class=fancy-image__picture] > img")
				)).src
			}`;

			for (const [platform, name] of Object.entries(service)) {
				if (document.title.includes(platform))
					presenceData = { ...presenceData, ...name };
			}
		}
	} else if (hostname === "status.kemono.party")
		presenceData.details = "Checking server status";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
