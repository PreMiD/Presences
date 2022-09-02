const presence = new Presence({
		clientId: "1015299454292725760",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	strings = presence.getStrings({
		browsing: "general.browsing",
		forums: "general.forums",
		readingPost: "general.readingPost",
		readingArticle: "general.readingArticle",
		readingAbout: "general.readingAbout",
		viewThread: "general.viewThread",
		reading: "general.reading",
		searching: "general.search",
		searchingFor: "general.searchFor",
		viewHome: "general.viewHome",
		viewing: "general.viewing",
		viewList: "general.viewList",
		viewCategory: "general.viewCategory",
		viewProfile: "general.viewProfile",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LWQZ2xQ.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname, search } = window.location,
		{
			browsing,
			readingAbout,
			forums,
			viewing,
			viewList,
			readingPost,
			readingArticle,
			viewThread,
			reading,
			viewProfile,
			viewCategory,
			searching,
			searchingFor,
			viewHome,
		} = await strings;
	switch (hostname) {
		case "warthunder.com": {
			presenceData.details = browsing;
			if (/^\/[a-z]{2}\/?$/i.test(pathname)) {
				presenceData.state = viewHome;
			} else if (pathname.substring(3) === "/game/about") {
				presenceData.state = readingAbout;
			} else {
				presenceData.state =
					document.querySelector(".content__title")?.textContent ||
					document.title.match(/(.*?)(?: - War Thunder$|$)/)[1];
			}
			break;
		}
		case "forum.warthunder.com": {
			presenceData.details = `${viewing} ${forums}`;
			const searchPath = search.match(/(?:\?)(.*?)(?:&.*|$)/)[1],
				searchParams = new URLSearchParams(search),
				pageTitle =
					document.querySelector<HTMLHeadingElement>(
						".ipsType_pageTitle"
					)?.textContent;
			if (searchPath === "") {
				presenceData.state = viewHome;
			} else if (searchPath.startsWith("/calendar/")) {
				presenceData.state = `${viewing} Calendar`;
			} else if (searchPath.startsWith("/search/")) {
				if (searchParams.get("q")) {
					presenceData.state = `${searchingFor} ${searchParams.get("q")}`;
				} else {
					presenceData.state = searching;
				}
			} else if (searchPath.startsWith("/forum/")) {
				presenceData.state = `${viewCategory} ${pageTitle}`;
			} else if (searchPath.startsWith("/topic/")) {
				presenceData.state = `${viewThread} ${pageTitle}`;
			} else if (searchPath.startsWith("/profile/")) {
				presenceData.state = `${viewProfile} ${document
					.querySelector<HTMLHeadingElement>(".ipsPageHead_barText")
					.textContent.replace(/^\s*|\s*$/g, "")}`;
			} else if (searchPath.startsWith("/submit")) {
				presenceData.state = "Creating new thread";
			} else if (searchPath.startsWith("/messenger/")) {
				if (/^\d+/.test(searchPath.substring(11))) {
					presenceData.state = `${reading} DM: ${pageTitle}`;
				} else if (searchPath.startsWith("/messenger/compose")) {
					presenceData.state = "Composing new message";
				} else {
					presenceData.state = `${viewing} private messages`;
				}
			} else {
				presenceData.state =
					pageTitle ||
					document.title.match(
						/(.*?)(?: - War Thunder - Official Forum$|$)/
					)[1];
			}
			break;
		}
		case "live.warthunder.com": {
			break;
		}
		case "tss.warthunder.com": {
			break;
		}
		case "wiki.warthunder.com": {
			break;
		}
	}
	if (presenceData.details) {
		presence.setActivity(presenceData);
	}
});
