const presence = new Presence({
		clientId: "958805663532859473",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zaxEjvB.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = location;
	switch (pathname) {
		case "/": {
			presenceData.details = "Browsing the homepage";
			break;
		}
		case "/passage/": {
			if (new URLSearchParams(search).get("search")) {
				presenceData.details = "Reading scripture";
				presenceData.state = Array.from(
					document.querySelectorAll(
						".passage-display > div:first-child .dropdown-display-text"
					)
				)
					.map(el => el.textContent)
					.join(", ");
			} else presenceData.details = "Searching for scripture";
			break;
		}
		case "/keyword/":
		case "/topical/": {
			presenceData.details = "Searching for scripture";
			break;
		}
		case "/topical/topical_searchresults/": {
			const searchQuery = document.querySelector(".current").textContent;
			presenceData.details = "Browsing topical search results";
			presenceData.state = searchQuery.substring(1, searchQuery.length - 1);
			break;
		}
		case "/quicksearch/": {
			const searchQuery = document.querySelector(".search-term").textContent;
			presenceData.details = "Browsing quick search results";
			presenceData.state = searchQuery.substring(1, searchQuery.length - 1);
			break;
		}
		default:
			if (/\/verse\/.+/.test(pathname)) {
				presenceData.details = "Browsing verse translations";
				presenceData.state = document
					.querySelector(".long-heading")
					.textContent.replace(/^\s+/, "")
					.replace(/\s+$/, "");
			} else if (pathname === "/versions/")
				presenceData.details = "Browsing versions";
			else if (/\/versions\/.+/.test(pathname)) {
				presenceData.details = "Browsing version details";
				presenceData.state = document
					.querySelector(".bread-crumb")
					.childNodes[2].textContent.replace(/^\s+\/\s+/, "")
					.replace(/\s+$/, "")
					.replace(/\s+(?=\s\()/, "");
			} else if (/\/devotionals\/.+/.test(pathname)) {
				presenceData.details = "Browsing devotional";
				presenceData.state = document
					.querySelector(".long-heading")
					.textContent.split("/")[1];
			} else if (pathname.startsWith("/blog/")) {
				const blogPath = pathname.substring(5);
				if (blogPath === "/") {
					presenceData.details = "Browsing blog";
					presenceData.state = "Home page";
				} else if (blogPath.startsWith("/author/")) {
					presenceData.details = "Browsing blog author";
					presenceData.state = document.title.match(/.*?(?=,)/)[0];
				} else {
					presenceData.details = "Browsing blog";
					presenceData.state =
						document.querySelector(
							".content-heading"
						).childNodes[3].textContent;
				}
			} else {
				const pageTitle = document.querySelector(".long-heading");
				presenceData.details = "Browsing";
				if (pageTitle) {
					presenceData.state = pageTitle.textContent
						.replace(/^\s+/, "")
						.replace(/\s+$/, "");
				} else presenceData.state = document.title;
			}
	}

	presence.setActivity(presenceData);
});
