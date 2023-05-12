const presence = new Presence({
		clientId: "965294297048023050",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
presence.on("UpdateData", async () => {
	let [showCover, showButtons, showBook, showLogo] = await Promise.all([
		presence.getSetting<boolean>("showCover"),
		presence.getSetting<boolean>("showButtons"),
		presence.getSetting<boolean>("showBook"),
		presence.getSetting<boolean>("logoOnly"),
	]);
	const [privacy, showTimestamp, showReading] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("showTimestamp"),
			presence.getSetting<boolean>("showReading"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ePGzX1S.png",
			startTimestamp: browsingTimestamp,
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
			"/author/",
		];
	if (!showReading) {
		showBook = false;
		showCover = false;
		showLogo = true;
		showButtons = false;
	} else {
		presenceData.smallImageKey = "closed";
		presenceData.smallImageText = "Not Reading";
	}
	if (!showBook) showCover = false;
	switch (true) {
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
			presenceData.buttons = [
				{
					label: "View Author",
					url: location.href,
				},
			];
			break;
		}
		case pathname === "/search/": {
			presenceData.details = "Searching for a novel";
			presenceData.state = `"${
				document.querySelector("body > div.main > div.wp > div.m-t1 > em.e2")
					.textContent
			}"`;
			break;
		}
		case pathname === "/contact.html": {
			presenceData.details = "Viewing the contact page";
			break;
		}
		case pathname === "/privacy-terms-of-use.html": {
			presenceData.details = "Reading the terms of use";
			break;
		}
		case privacy: {
			presenceData.largeImageKey = "incognito";
			if (!showReading) break;
			if (
				pathnames.includes(pathname) ||
				document.querySelector<HTMLDivElement>('[class="m-imgtxt"]')
			)
				presenceData.details = "Browsing...";
			else if (
				document.querySelector<HTMLAnchorElement>('[title="Read Next chapter"]')
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
		default: {
			if (document.querySelector<HTMLDivElement>('[class="m-imgtxt"]')) {
				if (showCover) {
					presenceData.largeImageKey = `${
						document.querySelector<HTMLImageElement>(
							"body > div.main > div > div > div.col-content > div.m-info > div.m-book1 > div.m-imgtxt > div.pic > img"
						).src
					}`;
				} else presenceData.largeImageKey = "https://i.imgur.com/ePGzX1S.png";
				if (showReading) presenceData.details = "Viewing a novel";
				if (showBook) presenceData.state = document.title.split("-")[0];
				presenceData.buttons = [
					{
						label: "View Novel",
						url: location.href,
					},
				];
			} else if (
				document.querySelector<HTMLAnchorElement>('[title="Read Next chapter"]')
			) {
				if (showCover) {
					presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
						"head > meta:nth-child(4)"
					).content;
				} else presenceData.largeImageKey = "https://i.imgur.com/ePGzX1S.png";
				if (showBook) {
					presenceData.details = `Reading ${document.title.split("-")[0]}`;
					presenceData.state =
						document.querySelector<HTMLSpanElement>(
							'[class="chapter"]'
						).textContent;
				} else {
					presenceData.details = "Reading a novel";
					delete presenceData.state;
				}
				if (showReading) {
					presenceData.smallImageKey = "open";
					presenceData.smallImageText = "Reading";
				} else {
					delete presenceData.smallImageKey;
					delete presenceData.smallImageText;
				}
				presenceData.buttons = [
					{
						label: "Read Novel",
						url: location.href,
					},
				];
			}
		}
	}
	if (!showButtons) delete presenceData.buttons;
	if (!showTimestamp) delete presenceData.startTimestamp;
	presence.setActivity(presenceData);
});
