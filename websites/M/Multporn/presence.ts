const presence = new Presence({
		clientId: "791258115622305813",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const button = await presence.getSetting<boolean>("button"),
		presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/M/Multporn/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		title = document.querySelector(
			"body > div#page-wrapper > div#page > div#main-wrapper.clearfix > div#main.clearfix > div#content.column > div.section > h1#page-title.title"
		);

	if (document.location.hostname === "multporn.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing Homepage";
		else if (document.location.pathname.includes("/comics/")) {
			presenceData.details = "Reading Comic";
			presenceData.state = `Reading: ${title.textContent}`;
		} else if (document.location.pathname.includes("/porn_comics"))
			presenceData.details = "Browsing Porn Comics";
		else if (document.location.pathname.includes("/pictures/")) {
			presenceData.details = "Viewing Images";
			presenceData.state = `Viewing: ${title.textContent}`;
		} else if (document.location.pathname.includes("/pictures"))
			presenceData.details = "Browsing Images";
		else if (document.location.pathname.includes("/video/")) {
			presenceData.details = "Watching Porn";
			presenceData.state = `Watching: ${title.textContent}`;
		} else if (document.location.pathname.includes("/video"))
			presenceData.details = "Browsing Videos";
		else if (document.location.pathname.includes("/hentai_manga/")) {
			presenceData.details = "Reading H-Mangas";
			presenceData.state = `Reading: ${title.textContent}`;
		} else if (document.location.pathname.includes("/hentai_manga"))
			presenceData.details = "Browsing H-Mangas";
		else if (document.location.pathname.includes("/hentai_video/")) {
			presenceData.details = "Watching Hentai";
			presenceData.state = `Watching: ${title.textContent}`;
		} else if (document.location.pathname.includes("/hentai_video"))
			presenceData.details = "Browsing Hentai";
		else if (document.location.pathname.includes("/hentai/")) {
			presenceData.details = "Viewing Hentai";
			presenceData.state = `Viewing: ${title.textContent}`;
		} else if (document.location.pathname.includes("/hentai"))
			presenceData.details = "Browsing Hentai Images";
		else if (document.location.pathname.includes("/gif/" || "/GIF/")) {
			presenceData.details = "Viewing Gifs";
			presenceData.state = `Watching: ${title.textContent}`;
		} else if (document.location.pathname.includes("/GIF" || "/gif"))
			presenceData.details = "Browsing Gifs";
		else if (document.location.pathname.includes("/rule_63/")) {
			presenceData.details = "Viewing Rule 63 Images";
			presenceData.state = `Viewing: ${title.textContent}`;
		} else if (document.location.pathname.includes("/rule_63"))
			presenceData.details = "Browsing Rule 63 Images";
		else if (document.location.pathname.includes("/gay_porn_comics/")) {
			presenceData.details = "Reading Gay Porn Comics";
			presenceData.state = `Reading: ${title.textContent}`;
		} else if (document.location.pathname.includes("/gay_porn_comics"))
			presenceData.details = "Browsing Gay Porn Comics";
		else if (document.location.pathname.includes("/humor/")) {
			presenceData.details = "Reading Adult Humor Comics";
			presenceData.state = `Reading: ${title.textContent}`;
		} else if (document.location.pathname.includes("/humor"))
			presenceData.details = "Browsing Adult Humor Comics";
		else if (document.location.pathname.includes("/gif"))
			presenceData.details = "Browsing Gifs";
		else if (document.location.pathname.includes("/new"))
			presenceData.details = "Browsing Newest Comics";
		else if (document.location.pathname.includes("/best"))
			presenceData.details = "Browsing Top Comics";
		else if (document.location.pathname.includes("/random"))
			presenceData.details = "Browsing Random Comics";
		else if (document.location.pathname.includes("/search")) {
			//TODO Show Searches
			presenceData.details = "Searching for Comics";
		}
	}

	if (button) {
		presenceData.buttons = [
			{ label: "Read Along", url: document.location.href },
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
