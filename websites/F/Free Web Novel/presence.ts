const presence = new Presence({
		clientId: "965294297048023050"
	}),
	browsingTimestamp = Math.floor(Date.now());

presence.on("UpdateData", async () => {
	let [showCover, showButtons, showBook, showLogo] = await Promise.all([
		presence.getSetting<boolean>("showCover"),
		presence.getSetting<boolean>("showButtons"),
		presence.getSetting<boolean>("showBook"),
		presence.getSetting<boolean>("showLogo")
	]);
	const [privacy, showTimestamp, showReading] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showReading")
		]),
		presenceData: PresenceData = {
			largeImageKey: "nocover",
			smallImageKey: showReading ? "closed" : null,
			smallImageText: showReading ? "Not Reading" : null,
			startTimestamp: showTimestamp ? browsingTimestamp : null
		},
		{ pathname } = window.location,
		pathnames = [
			"/",
			"/history/",
			"/latest-release-novel/",
			"/latest-novel/",
			"/completed-novel/",
			"/most-popular-novel/",
			"/search/",
			"/contact.html",
			"/sitemap.xml",
			"/privacy-terms-of-use.html",
			"/genre/",
			"/author/"
		];
	if (!showReading) {
		showBook = false;
		showCover = false;
		showLogo = true;
		showButtons = false;
	}
	if (!showBook) showCover = false;

	switch (true) {
		case privacy: {
			presenceData.largeImageKey = "incognito";

			if (
				(pathnames.includes(pathname) ||
					document.querySelector<HTMLDivElement>('[class="m-imgtxt"]')) &&
				showReading
			)
				presenceData.details = "Browsing...";
			else if (
				document.querySelector<HTMLAnchorElement>(
					'[title="Read Next chapter"]'
				) &&
				showReading
			) {
				presenceData.details = "Reading...";
				presenceData.smallImageKey = "open";
			}
			break;
		}
		case showLogo: {
			presenceData.largeImageKey = "fwn_1024";
			delete presenceData.smallImageKey;
			delete presenceData.details;
			delete presenceData.state;
			delete presenceData.buttons;
			break;
		}
		case pathname === "/": {
			presenceData.details = "Browsing the homepage";
			break;
		}
		case pathname.includes("/history/"): {
			presenceData.details = "Browsing recently viewed novels";
			break;
		}
		case pathname.includes("/latest-release-novel/"): {
			presenceData.details = "Browsing latest released novels";
			break;
		}
		case pathname.includes("/latest-novel/"): {
			presenceData.details = "Browsing the latest novels";
			break;
		}
		case pathname.includes("/completed-novel/"): {
			presenceData.details = "Browsing fully finished novels";
			break;
		}
		case pathname.includes("/most-popular-novel/"): {
			presenceData.details = "Browsing the most popular novels";
			break;
		}
		case pathname.includes("/genre/"): {
			presenceData.details = `Checking out ${document
				.querySelector<HTMLHeadingElement>('[class="tit"]')
				.textContent.toLowerCase()}`;
			break;
		}
		case pathname.includes("/author/"): {
			presenceData.details = "Checking out an author";
			presenceData.state = document.querySelector<HTMLAnchorElement>(
				"body > div.header > div.cur > div > a:nth-child(5)"
			).title;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View Author",
						url: location.href
					}
				];
			}
			break;
		}
		case pathname === "/search/": {
			presenceData.details = "Searching for a novel";
			break;
		}
		case pathname === "/contact.html": {
			presenceData.details = "Viewing the contact page";
			break;
		}
		case pathname === "/sitemap.xml": {
			presenceData.details = "Viewing the site's sitemap";
			break;
		}
		case pathname === "/privacy-terms-of-use.html": {
			presenceData.details = "Reviewing the terms of use";
			break;
		}
		default: {
			if (document.querySelector<HTMLDivElement>('[class="m-imgtxt"]')) {
				presenceData.largeImageKey = showCover
					? `${
							document.querySelector<HTMLImageElement>(
								"body > div.main > div > div > div.col-content > div.m-info > div.m-book1 > div.m-imgtxt > div.pic > img"
							).src
					  }`
					: "nocover";
				presenceData.details = showReading ? "Viewing a novel" : null;
				presenceData.state = showBook ? document.title.split("-")[0] : null;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Novel",
							url: location.href
						}
					];
				}
			} else if (
				document.querySelector<HTMLAnchorElement>('[title="Read Next chapter"]')
			) {
				presenceData.largeImageKey = showCover
					? document.querySelector<HTMLMetaElement>("head > meta:nth-child(4)")
							.content
					: "nocover";
				presenceData.details = showBook
					? `Reading ${document.title.split("-")[0]}`
					: "Reading a novel";
				presenceData.state = showBook
					? document.querySelector<HTMLSpanElement>('[class="chapter"]')
							.textContent
					: null;
				presenceData.smallImageKey = showReading ? "open" : null;
				presenceData.smallImageText = showReading ? "Reading" : null;

				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Read Novel",
							url: location.href
						}
					];
				}
			}
		}
	}
	presence.setActivity(presenceData);
});
