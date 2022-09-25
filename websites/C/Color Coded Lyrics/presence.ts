const presence = new Presence({
		clientId: "1023360990802366544",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/x6zqFVQ.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pageTitle = document.querySelector<HTMLHeadingElement>("h1")?.textContent;

	if (pathname === "/" || pathname.startsWith("/page/")) {
		presenceData.details = "Browsing";
		presenceData.state = "Home page";
	} else if (pathname.startsWith("/author")) {
		presenceData.details = "Viewing contributions by an author";
		presenceData.state = pageTitle.match(/^Author: (.*?)$/)[1];
	} else if (/^\/\d{4}(\/\d{2}\/?(\d{2})?)?\/?$/.test(pathname)) {
		presenceData.details = "Viewing contributions by a date";
		presenceData.state = pageTitle.match(/^.*?: (.*?)$/)[1];
	} else if (/^\/\d{4}\/\d{2}\/\d{2}\/.*?\/$/.test(pathname)) {
		presenceData.details = "Viewing song lyrics";
		presenceData.state = pageTitle;
		presenceData.buttons = [
			{
				label: "View Song",
				url: href,
			},
		];
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			".inner-article-content img"
		).src;
	} else if (pathname.startsWith("/category")) {
		presenceData.details = "Viewing contributions by a category";
		presenceData.state = pageTitle.match(/^Category: (.*?)$/)[1];
	} else {
		presenceData.details = "Browsing";
		presenceData.state = pageTitle;
	}

	presence.setActivity(presenceData);
});
