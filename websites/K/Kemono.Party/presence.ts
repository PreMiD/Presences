const presence = new Presence({
		clientId: "1067711765770682388",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/mwpEkf3.png",
		startTimestamp: browsingTimestamp,
	};

	const pages: Record<string, PresenceData> = {
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
	};

	for (const [path, data] of Object.entries(pages))
		if (location.pathname === path) presenceData = { ...presenceData, ...data };

	switch (document.location.hostname) {
		case "kemono.party": {
			if (location.pathname.includes("/user/")) {
				if (location.pathname.includes("/post/")) {
					presenceData.details = `${
						document.querySelector(
							"#page > header > div.post__info > h1 > span:nth-child(1)"
						).textContent
					}`;
					presenceData.state = `${document
						.querySelector("a[class='post__user-name']")
						.textContent.replace(/\s+/g, "")}`;
				} else {
					presenceData.details = "Checking out:";
					presenceData.state = `${
						document.querySelector(
							"#user-header__info-top > a > span:nth-child(2)"
						).textContent
					}`;
					presenceData.largeImageKey = `${
						(<HTMLImageElement>(
							document.querySelector(
								"#main > section > header > a > picture > img"
							)
						)).src
					}`;
				}
			}

			break;
		}
		case "status.kemono.party": {
			presenceData.details = "Checking server status";
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
