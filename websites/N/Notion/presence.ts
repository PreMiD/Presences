const presence = new Presence({
		clientId: "926386695354609684"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		path = document.location.pathname,
		title = await presence.getSetting<boolean>("title"),
		overlayTitle = document.querySelector<HTMLDivElement>(
			"#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div.notion-scroller.vertical > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div"
		);
	if (path.startsWith("/product")) {
		if (path === "/product") presenceData.details = "Viewing Home page";
		else presenceData.details = "Viewing Products page";
	} else if (path.startsWith("/templates"))
		presenceData.details = "Browsing templates";
	else if (path.startsWith("/customers"))
		presenceData.details = "Viewing customers";
	else if (
		path.startsWith("/desktop") ||
		path.startsWith("/mobile") ||
		path.startsWith("/web-clipper")
	)
		presenceData.details = "Viewing Downloads page";
	else if (path.startsWith("/blog")) presenceData.details = "Reading blogs";
	else if (path.startsWith("/guides"))
		presenceData.details = "Reading Guides & Tutorials";
	// Clearly not the best solution but it works(?)
	else if (
		overlayTitle ||
		document.querySelector<HTMLDivElement>(
			"#notion-app > div > div.notion-cursor-listener > div:nth-child(2) > div.notion-frame > div:nth-child(2) > div > div"
		)
	) {
		presenceData.details = "Editing a page";
		if (title) {
			if (!overlayTitle) presenceData.state = document.title;
			else presenceData.state = overlayTitle.textContent;
		}
		presenceData.smallImageKey = "edit";
		presenceData.smallImageText = "Editing";
	} else if (
		document.querySelector<HTMLDivElement>(
			"#notion-app > div > div.notion-cursor-listener > div:nth-child(2) > div:nth-child(1) > div.notion-topbar"
		)
	) {
		presenceData.details = "Reading a page";
		if (title) presenceData.state = document.title;
		presenceData.smallImageKey = "read";
		presenceData.smallImageText = "Reading";
	}
	presence.setActivity(presenceData);
});
