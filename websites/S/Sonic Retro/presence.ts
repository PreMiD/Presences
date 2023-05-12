const presence = new Presence({
		clientId: "970743721404530798",
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
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, hostname, href } = window.location;
	switch (hostname) {
		case "sonicretro.org": {
			presenceData.smallImageKey = "home_512";
			if (search) {
				presenceData.largeImageKey = "search";
				if (!new URLSearchParams(search).get("s"))
					presenceData.details = "Searching for something...";
				else {
					presenceData.details = `Searching for "${
						document.querySelector("#main > div.archive-box > h1").textContent
					}"`;
				}
			} else if (
				!search &&
				(pathname === "/" || pathname === "/#" || pathname.includes("/page/"))
			) {
				presenceData.largeImageKey = "home";
				presenceData.details = "Zooming through the main page";
			} else if (pathname.includes("/category/")) {
				presenceData.largeImageKey = "search";
				presenceData.details = `Looking through ${
					document.querySelector("#main > div.archive-box > h1").textContent
				}`;
			} else if (
				/https:\/\/sonicretro.org\/\d{4}\/\d{2}\/(\d{2})*\//.test(pathname)
			) {
				presenceData.largeImageKey = "search";
				presenceData.details = `Looking for posts from ${
					document.title.split("-")[0]
				}`;
			} else if (
				/https:\/\/sonicretro.org\/([0-9]+(\/[0-9]+)+)\/+((\w|-|\d)*)\//g.test(
					href
				)
			) {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Reading an article";
				presenceData.state = document.title.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "Read Article",
						url: href,
					},
				];
			} else {
				presenceData.largeImageKey = "logo_1024";
				presenceData.details = "Viewing an unsupported page";
			}
			break;
		}
		case "info.sonicretro.org": {
			// a full on wiki or index for the site
			const unsupported = [
				"Cite This Page - Sonic Retro",
				"Compare pages - Sonic Retro",
				"Export pages - Sonic Retro",
				"What links here - Sonic Retro",
				"Create account - Sonic Retro",
				"Log in - Sonic Retro",
				"Reset password - Sonic Retro",
				"Login required - Sonic Retro",
				"Preferences - Sonic Retro",
				"Watchlist - Sonic Retro",
				"Reset tokens - Sonic Retro",
				"Blocked users - Sonic Retro",
				"File list - Sonic Retro",
			];
			presenceData.smallImageKey = "info_512";
			if (
				pathname === "/" ||
				pathname.includes("/Main_Page") ||
				(pathname.includes("/index.php") && !search)
			) {
				presenceData.largeImageKey = "info";
				presenceData.details = "Zooming through the main page";
			} else if (pathname.includes("Special:")) {
				if (unsupported.includes(document.title)) {
					presenceData.largeImageKey = "logo_1024";
					presenceData.details = "Viewing an unsupported page";
				} else if (pathname.includes("/Special:SpecialPages")) {
					presenceData.largeImageKey = "search";
					presenceData.details = "Browsing special pages";
				} else if (pathname.includes("/Special:Search")) {
					presenceData.largeImageKey = "search";
					presenceData.details = "Searching for something...";
				} else {
					presenceData.largeImageKey = "category";
					presenceData.details = "Browsing a special page:";
					presenceData.state = document.title.split(" - Sonic Retro")[0];
					presenceData.buttons = [
						{
							label: "View Special Page",
							url: href,
						},
					];
				}
			} else if (document.title.startsWith("Category:")) {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Reading an article:";
				presenceData.state = document.title
					.split("Category:")[1]
					.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "View Article",
						url: href,
					},
				];
			} else if (document.title.startsWith("Talk:")) {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Browsing a talk page:";
				presenceData.state = document.title
					.split("Talk:")[1]
					.split(" - Sonic Retro")[0];
			} else if (document.title.startsWith("Sonic Retro:")) {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Reading an article:";
				presenceData.state = document.title
					.split("Sonic Retro:")[1]
					.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "View Article",
						url: href,
					},
				];
			} else if (document.title.startsWith("User:")) {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Viewing a user's page:";
				presenceData.state = `@${
					document.title.split("User:")[1].split(" - Sonic Retro")[0]
				}`;
				presenceData.buttons = [
					{
						label: "View User",
						url: href,
					},
				];
			} else if (
				pathname.includes("/File:") ||
				pathname.includes("/Sonic_Retro:General_disclaimer")
			) {
				presenceData.largeImageKey = "logo_1024";
				presenceData.details = "Viewing an unsupported page";
			} else if (pathname === "/index.php" && search.includes("search=")) {
				presenceData.largeImageKey = "search";
				if (document.title.startsWith("Search -"))
					presenceData.details = "Searching for something...";
				else {
					presenceData.details = `Searching for ${
						document.title
							.split("Search results for ")[1]
							.split(" - Sonic Retro")[0]
					}`;
				}
			} else if (
				pathname === "/index.php" ||
				pathname.startsWith("User_talk:")
			) {
				presenceData.largeImageKey = "logo_1024";
				presenceData.details = "Viewing an unsupported page";
			} else {
				presenceData.largeImageKey = "reading";
				presenceData.details = "Reading an article:";
				presenceData.state = document.title.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "Read Article",
						url: href,
					},
				];
			}
			break;
		}
		case "forums.sonicretro.org": {
			presenceData.smallImageKey = "forums_512";
			if (search) {
				const forumTitle = document.title.split(
					" | Sonic and Sega Retro Forums"
				)[0];
				presenceData.largeImageKey = "search";
				if (search.includes("?watched/forums"))
					presenceData.details = "Browsing watched forums";
				else if (search.startsWith("?watched/threads"))
					presenceData.details = "Browsing watched threads";
				else if (search.startsWith("?find-new/") && search.includes("/posts"))
					presenceData.details = "Browsing new posts";
				else if (
					search.startsWith("?find-new/") &&
					search.includes("/profile-posts")
				)
					presenceData.details = "Browsing new profile posts";
				else if (search.startsWith("?forums/")) {
					presenceData.details = "Browsing a forum:";
					presenceData.state = forumTitle;
					presenceData.buttons = [
						{
							label: "View Forum",
							url: href,
						},
					];
				} else if (search.startsWith("?threads/")) {
					presenceData.largeImageKey = "reading";
					presenceData.details = "Reading a thread:";
					presenceData.state = forumTitle;
					presenceData.buttons = [
						{
							label: "Read Thread",
							url: href,
						},
					];
				} else if (search.startsWith("?members/")) {
					if (document.title.startsWith("Notable Members")) {
						presenceData.largeImageKey = "search";
						presenceData.details = "Browsing notable members";
					} else {
						presenceData.largeImageKey = "reading";
						presenceData.details = "Viewing a member's page";
						presenceData.state = `@${forumTitle}`;
						presenceData.buttons = [
							{
								label: "View Member",
								url: href,
							},
						];
					}
				} else if (search.startsWith("?search/")) {
					presenceData.largeImageKey = "search";
					if (
						document.title.startsWith("Error") ||
						document.title.startsWith("Search")
					)
						presenceData.details = "Searching for something...";
					else {
						presenceData.details = `Searching for ${
							document.title
								.split("Search Results for Query: ")[1]
								.split(" | Sonic and Sega Retro Forums")[0]
						}`;
					}
				} else if (
					/(\?conversations\/|\?account\/|\?help\/|\?forums\/-\/index.rss)/.test(
						search
					)
				) {
					presenceData.largeImageKey = "logo_1024";
					presenceData.details = "Viewing an unsupported page";
				}
			} else if (pathname === "/index.php" && !search) {
				presenceData.largeImageKey = "forums";
				presenceData.details = "Zooming through the main page";
			} else {
				presenceData.largeImageKey = "logo_1024";
				presenceData.details = "Viewing an unsupported page";
			}
			break;
		}
		default: {
			presenceData.smallImageKey = "unsupported_512";
			presenceData.smallImageText = "Unknown Page";
			presenceData.largeImageKey = "logo_1024";
			presenceData.details = "Viewing an unsupported page";
		}
	}
	presence.setActivity(presenceData);
});
