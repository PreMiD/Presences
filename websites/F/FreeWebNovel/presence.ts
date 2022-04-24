const presence = new Presence({
		clientId: "965294297048023050"
	}),
	browsingTimestamp = Math.floor(Date.now());

presence.on("UpdateData", async () => {
	let [showCover, showButtons, showTimestamp, showBook, showLogo] =
		await Promise.all([
			presence.getSetting<boolean>("showCover"),
			presence.getSetting<boolean>("showButtons"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showBook"),
			presence.getSetting<boolean>("showLogo")
		]);
	const [privacy, showReading] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("showReading")
		]),
		presenceData: PresenceData = {
			largeImageKey: "nocover",
			smallImageKey: showReading ? "closed" : null,
			smallImageText: showReading ? "Not Reading" : null
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
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (!showReading) {
		showBook = false;
		showCover = false;
		showLogo = true;
		showButtons = false;
	}
	if (!showBook) showCover = false;

	if (showButtons === true) {
		presenceData.buttons = [
			{ label: "Visit freewebnovel.com", url: "https://freewebnovel.com/" }
		];
	} else presenceData.buttons = null;
	switch (true) {
		case privacy: {
			showButtons = false;
			presenceData.state = null;
			presenceData.largeImageKey = "incognito";
			if (
				pathnames.includes(pathname) ||
				document.querySelector<HTMLDivElement>('[class="m-imgtxt"]')
			)
				presenceData.details = showReading ? "Browsing..." : null;
			else if (
				document.querySelector<HTMLAnchorElement>('[title="Read Next chapter"]')
			) {
				presenceData.details = showReading ? "Reading..." : null;
				presenceData.smallImageKey = showReading ? "opem" : null;
			}
			break;
		}
		case showLogo: {
			showTimestamp = false;
			showButtons = false;
			showCover = false;
			showBook = false;
			presenceData.largeImageKey = "fwn_1024";
			presenceData.smallImageKey = null;
			presenceData.details = null;
			presenceData.state = null;
			break;
		}
		case pathname === "/": {
			presenceData.details = "Browsing through novels";
			presenceData.state = "Page: Home";
			break;
		}
		case pathname.includes("/history/"): {
			presenceData.details = "Browsing through recently viewed novels";
			presenceData.state = "Page: Your Reading Novels";
			break;
		}
		case pathname.includes("/latest-release-novel/"): {
			presenceData.details = "Browsing through the latest released novels";
			presenceData.state = "Page: Latest Released Novels";
			break;
		}
		case pathname.includes("/latest-novel/"): {
			presenceData.details = "Browsing through the latest novels";
			presenceData.state = "Page: Latest Novels";
			break;
		}
		case pathname.includes("/completed-novel/"): {
			presenceData.details = "Browsing through fully finished novels";
			presenceData.state = "Page: Completed Novels";
			break;
		}
		case pathname.includes("/most-popular-novel/"): {
			presenceData.details = "Browsing through the most popular novels";
			presenceData.state = "Page: Most Popular Novels";
			break;
		}
		case pathname.includes("/genre/"): {
			const genre =
				document.querySelector<HTMLHeadingElement>('[class="tit"]').textContent;
			presenceData.details = `Checking out ${genre.toLowerCase()}`;
			presenceData.state = `Page: ${genre}`;
			break;
		}
		case pathname.includes("/author/"): {
			presenceData.details = "Checking out an author";
			presenceData.state = `${document
				.querySelector('[class="e1"]')
				.textContent.replace("[", "")}`;
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
			presenceData.state = "Page: Search";
			break;
		}
		case pathname === "/contact.html": {
			presenceData.details = "Veiwing the contact page";
			presenceData.state = "Page: Contact";
			break;
		}
		case pathname === "/sitemap.xml": {
			presenceData.details = "Veiwing the site's sitemap";
			presenceData.state = "Page: Sitemap";
			break;
		}
		case pathname === "/privacy-terms-of-use.html": {
			presenceData.details = "Looking through the privacy & terms of use";
			presenceData.state = "Page: Privacy & Terms of Use";
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
