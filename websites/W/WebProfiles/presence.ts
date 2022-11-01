const presence = new Presence({
		clientId: "887996093189742612",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/dPN4dbK.png",
	};

	const showTimestamp = await presence.getSetting<boolean>("timestamp"),
		showButtons = await presence.getSetting<boolean>("buttons"),
		pages: Record<string, PresenceData> = {
			"/about/team": { details: "Viewing page:", state: "Team" },
			"/about/partners": { details: "Viewing page:", state: "Partners" },
			"/discover": { details: "Viewing page:", state: "Discover" },
			"/@me/settings": { details: "Editing my profile" },
			"/login": { details: "Logging in..." },
			register: { details: "Registering..." },
		};

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.pathname.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/u/")) {
		const username = document.querySelector(
			"p.text-5xl.text-white"
		)?.textContent;
		presenceData.details = `Viewing user: ${username || "Unknown"}`;
		presenceData.state = `${
			document.querySelector("p.mt-3")?.textContent
		} - ❤️ ${document.querySelector("#likes-count")?.textContent || 0}`;
		presenceData.buttons = [
			{
				label: `View Profile`,
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/search")) {
		presenceData.details = "Searching for...";
		presenceData.state =
			document.location.href.split("/search/")[1] ?? "Unknown";
		presenceData.smallImageKey = "search";
	} else if (document.location.pathname === "/@me") {
		presenceData.details = "Viewing my profile";
		presenceData.buttons = [
			{
				label: "View profile",
				url: `https://webprofiles.me/u/${
					document.querySelector("a.text-5xl")?.textContent
				}`,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
