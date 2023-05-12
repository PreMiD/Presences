const presence = new Presence({
		clientId: "625795936286932993",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let user: HTMLElement, search: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/GCwhS4p.png",
	};

	presenceData.startTimestamp = browsingTimestamp;
	switch (document.location.hostname) {
		case "www.spigotmc.org": {
			if (document.location.pathname.includes("/threads/")) {
				title = document.querySelector(
					"#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
				);
				if (title === null) {
					title = document.querySelector(
						"#content > div > div > div.mainContainer_noSidebar > div > div.resourceInfo > h1"
					);
					presenceData.details = "Forums, viewing thread:";
					if (title.textContent.length > 128)
						presenceData.state = `${title.textContent.substring(0, 125)}...`;
					else presenceData.state = title.textContent;

					delete presenceData.smallImageKey;
					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, viewing thread:";
					if (title.textContent.length > 128)
						presenceData.state = `${title.textContent.substring(0, 125)}...`;
					else presenceData.state = title.textContent;

					delete presenceData.smallImageKey;
					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/forums/")) {
				title = document.querySelector(
					"#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
				);
				if (title) {
					presenceData.details = "Forums, viewing category:";
					presenceData.state = title.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, Browsing...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/search/")) {
				search = document.querySelector(
					"#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1 > a > em"
				);
				presenceData.details = "Forums, searching for:";
				presenceData.state = search.textContent;

				presenceData.smallImageKey = Assets.Search;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/members/")) {
				user = document.querySelector(
					"#content > div > div > div.mainContainer_noSidebar > div > div > div.mainProfileColumn > div > div > h1"
				);
				presenceData.details = "Forums, viewing user:";
				presenceData.state = user.textContent;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/XenStaff/")) {
				presenceData.details = "Forums, viewing staff list";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/account/")) {
				presenceData.details = "Forums, account settings";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/wiki/")) {
				title = document.querySelector(
					"#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
				);
				presenceData.details = "Wiki, viewing:";
				presenceData.state = title.textContent;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/irc/")) {
				presenceData.details = "Spigot IRC";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/resources/")) {
				if (document.querySelector("#divResourcesFround")) {
					search = document.querySelector("#divResourcesFround");
					if (search.textContent !== "Resources Found: 0") {
						presenceData.details = "Using SpigotSearchEngine:";
						presenceData.state = search.textContent;

						presenceData.smallImageKey = Assets.Search;

						presence.setActivity(presenceData);
					} else {
						presenceData.details = "Resources, Browsing...";
						delete presenceData.state;

						delete presenceData.smallImageKey;

						presence.setActivity(presenceData);
					}
				} else if (document.location.pathname.includes("/authors/")) {
					title = document.querySelector(
						"#authorStats > div > dl.authorName > dd > a"
					);
					presenceData.details = "Resources, Viewing author:";
					presenceData.state = title.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("/categories/")) {
					title = document.querySelector(
						"#content > div > div > div.mainContainer_noSidebar > div > div.titleBar > h1"
					);
					presenceData.details = "Resources, Viewing category:";
					presenceData.state = title.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else if (
					document.querySelector(
						"#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1"
					)
				) {
					title = document.querySelector(
						"#content > div > div > div.uix_contentFix > div > div > div.resourceInfo > h1"
					);
					presenceData.details = "Resources, Viewing:";
					if (title.textContent.length > 128)
						presenceData.state = `${title.textContent.substring(0, 125)}...`;
					else presenceData.state = title.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("/edit")) {
					presenceData.details = "Resources, Doing an edit...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Resources, Browsing...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/conversations/")) {
				if (
					document.querySelector(
						"#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
					)
				) {
					title = document.querySelector(
						"#content > div > div > div.uix_contentFix > div > div > div.titleBar > h1"
					);
					presenceData.details = "Forums, Reading DM:";
					if (title.textContent.length > 128)
						presenceData.state = `${title.textContent.substring(0, 125)}...`;
					else presenceData.state = title.textContent;

					presenceData.smallImageKey = Assets.Reading;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, Browsing";
					presenceData.state = "through their DMs";

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else presence.setActivity();

			break;
		}
		case "irc.spi.gt": {
			presenceData.details = "Spigot IRC";
			delete presenceData.state;

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		case "hub.spigotmc.org": {
			if (document.location.pathname === "/") {
				title = document.querySelector("head > title");
				presenceData.details = "Spigot Developer Hub";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else {
				title = document.querySelector("head > title");
				presenceData.details = "Spigot Developer Hub";
				presenceData.state = title.textContent.replace(
					" · hub.spigotmc.org",
					""
				);

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			}

			break;
		}
		default:
			presence.setActivity();
	}
});
