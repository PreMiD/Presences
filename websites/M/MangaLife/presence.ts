const presence = new Presence({ clientId: "906057236927893576" }),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [privacy, cover, timestamps, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("buttons"),
		]),
		path = document.location.pathname,
		pages: Record<string, PresenceData> = {
			"/manga/": {
				details: "Viewing a Manga...",
				state: document.title.split(" | MangaLife")[0],
			},
			"/read-online/": {
				smallImageKey: "reading",
			},
			"/search": {
				smallImageKey: "search",
				details: "Searching...",
			},
			"/discussion": {
				smallImageKey: !privacy ? "discussions" : "",
				state: "Discussions",
			},
			"hot.php": {
				smallImageKey: !privacy ? "hot" : "",
				state: "Hot Manga Updates",
				buttons: [{ label: "Hot Manga Updates", url: `${document.location}` }],
			},
			"subscription.php": {
				smallImageKey: !privacy ? "subscriptions" : "",
				state: "Subscriptions",
			},
			"feed.php": {
				smallImageKey: !privacy ? "subscriptions" : "",
				state: "Subscriptions Feed",
			},
			"bookmark.php": {
				smallImageKey: !privacy ? "bookmark" : "",
				state: "Bookmarks",
			},
			"settings.php": {
				smallImageKey: "settings",
				details: "Editing...",
				state: "User Settings",
			},
			"/contact": {
				smallImageKey: !privacy ? "contact" : "",
				state: "Contact Page",
			},
			"/privacy": {
				smallImageKey: !privacy ? "privacy" : "",
				state: "Privacy Policy Page",
			},
		};
	let presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/M/MangaLife/assets/logo.png",
		smallImageKey: !privacy ? "home" : "",
		details: "Browsing...",
		state: "Home Page",
		startTimestamp: browsingStamp,
	};

	for (const [path, data] of Object.entries(pages)) {
		if (
			document.location.pathname.startsWith(path) ||
			document.location.pathname.includes(path)
		)
			presenceData = { ...presenceData, ...data };
	}

	switch (true) {
		case path.startsWith("/manga/"):
			presenceData.largeImageKey =
				!privacy && cover
					? `https://cover.nep.li/cover/${path.split("/manga/")[1]}.jpg`
					: "logo";
			presenceData.smallImageKey = !privacy && cover ? "logo-png" : "search";
			presenceData.buttons = [
				{
					label:
						presenceData.state.length >= 30 ? "View Manga" : presenceData.state,
					url: `${document.location}`,
				},
			];
			break;
		case path.startsWith("/read-online/"):
			presenceData.largeImageKey =
				!privacy && cover
					? `https://cover.nep.li/cover/${
							path.split("/read-online/")[1].split("-chapter-")[0]
					  }.jpg`
					: "logo";
			presenceData.details = !privacy
				? document.querySelector(".col-12 > a").textContent.trim()
				: "Reading a Manga...";
			presenceData.state = path.includes("-page-")
				? `Chapter ${path.split("-chapter-")[1].split("-page-")[0]} | Page ${
						path.split("-page-")[1].split(".html")[0]
				  }`
				: `Chapter ${path.split("-chapter-")[1].split(".html")[0]}`;
			presenceData.buttons = [
				{
					label:
						presenceData.details.length >= 30
							? "View Manga"
							: presenceData.details,
					url: `${document.location.origin}/manga/${
						path.split("/read-online/")[1].split("-chapter-")[0]
					}`,
				},
				{
					label: `${presenceData.state.replace("|", " ")}`,
					url: `${document.location}`,
				},
			];
			break;
		case path.startsWith("/search"):
			// todo show state as search query, for now just delete state
			delete presenceData.state;
			break;
	}

	if (!timestamps) delete presenceData.startTimestamp;
	if (privacy) delete presenceData.state;
	if (privacy || !buttons) delete presenceData.buttons;
	if (privacy && !presenceData.smallImageKey) delete presenceData.smallImageKey;

	presence.setActivity(presenceData);
});
