const presence = new Presence({
		clientId: "629093766170411014",
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
let user: HTMLElement, search: HTMLInputElement, title: HTMLElement | string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/NaF7FcT.png",
		startTimestamp: browsingTimestamp,
	};
	switch (document.location.hostname) {
		case "hypixel.net": {
			title = document.querySelector<HTMLElement>(
				"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav > fieldset > span > span > a > span"
			);
			if (document.location.pathname.includes("/threads/")) {
				title = document.querySelector<HTMLElement>(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1"
				);
				search = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
				);
				title = title.textContent.replace(search.value, "").replace("»", "");
				presenceData.details = "Forums, viewing thread:";
				if (title.length > 128)
					presenceData.state = `${title.substring(0, 125)}...`;
				else presenceData.state = title;

				delete presenceData.smallImageKey;
				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/forums/")) {
				title = document.querySelector<HTMLElement>(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1"
				);
				if (title) {
					title = document.querySelector<HTMLElement>(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1"
					);
					search = document.querySelector(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
					);
					title = title.textContent.replace(search.value, "").replace("»", "");
					presenceData.details = "Forums, viewing category:";
					presenceData.state = title;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, Browsing...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (
				document.location.pathname.includes("/find-new/") &&
				document.location.pathname.includes("/profile-posts")
			) {
				presenceData.details = "Forums, Viewing the list of";
				presenceData.state = "latest profile posts";

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (
				document.location.pathname.includes("/find-new/") &&
				document.location.pathname.includes("/posts")
			) {
				presenceData.details = "Forums, Viewing the list of";
				presenceData.state = "latest posts";

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (
				document.location.pathname.includes("/find-new/") &&
				document.location.pathname.includes("/media")
			) {
				presenceData.details = "Forums, Viewing the list of";
				presenceData.state = "latest media posts";

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/search/")) {
				search = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1 > a > em"
				);
				if (search) {
					presenceData.details = "Forums, searching for:";
					presenceData.state = search.value;

					presenceData.smallImageKey = Assets.Search;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, about to search";
					presenceData.state = "something up";

					presenceData.smallImageKey = Assets.Search;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/members/")) {
				user = document.querySelector(
					"#content > div > div > div.mainContainer_noSidebar > div > div.mainProfileColumn > div > div > h1"
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
			} else if (document.location.pathname.includes("/watched/")) {
				if (document.location.pathname.includes("/threads")) {
					presenceData.details = "Forums, Viewing their";
					presenceData.state = "watched threads";

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, Viewing their";
					presenceData.state = "watched forums";

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/media/")) {
				if (
					document.querySelector(
						"#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1"
					)
				) {
					title = document.querySelector<HTMLElement>(
						"#content > div > div > div.uix_contentFix > div > div > div.mediaAttribution > h1"
					);
					presenceData.details = "Media, Viewing post:";
					presenceData.state = title.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else if (document.location.pathname.includes("/categories/")) {
					title = document.querySelector<HTMLElement>(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1"
					);
					search = document.querySelector(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
					);
					title = title.textContent.replace(search.value, "").replace("»", "");
					presenceData.details = "Media, Viewing category:";
					presenceData.state = title;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Media, Browsing...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/conversations/")) {
				if (
					document.querySelector(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1"
					)
				) {
					title = document.querySelector<HTMLElement>(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1"
					);
					search = document.querySelector(
						"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
					);
					title = title.textContent
						.replace(search.textContent, "")
						.replace("»", "");
					presenceData.details = "Forums, Reading DM:";
					if (title.length > 128)
						presenceData.state = `${title.substring(0, 125)}...`;
					else presenceData.state = title;

					presenceData.smallImageKey = Assets.Reading;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Forums, Browsing";
					presenceData.state = "through their DMs";

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/players/")) {
				presenceData.details = "Leaderboards, Browsing...";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/player/")) {
				user = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper.shiftedTitle > div > div > h1 > nav > fieldset > span > span:nth-child(2) > a > span"
				);
				presenceData.details = "Players, Viewing:";
				presenceData.state = user.textContent;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/play/")) {
				presenceData.details = "At: Play on Hypixel";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/rules/")) {
				presenceData.details = "Viewing the rules";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/jobs/")) {
				presenceData.details = "Viewing the jobs";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/help/")) {
				presenceData.details = "Help, viewing:";
				title = document.querySelector<HTMLElement>(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1"
				);
				search = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
				);
				title = title.textContent.replace(search.value, "").replace("»", "");
				presenceData.state = title;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/leaderboard")) {
				title = document.querySelector<HTMLElement>(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1"
				);
				search = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
				);
				title = title.textContent
					.replace(search.textContent, "")
					.replace("»", "")
					.replace(" - Leaderboard", "");
				presenceData.details = "Leaderboards, Viewing:";
				presenceData.state = title;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (title && title.textContent === "Games") {
				title = document.querySelector<HTMLElement>(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1"
				);
				search = document.querySelector(
					"#headerFix > div.hypixel_titleWrapper > div > div > h1 > nav"
				);
				title = title.textContent
					.replace(search.textContent, "")
					.replace("»", "");
				presenceData.details = "Viewing game:";
				presenceData.state = title;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else presence.setActivity();

			break;
		}
		case "support.hypixel.net": {
			presenceData.details = "Support Center";
			delete presenceData.state;

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		case "store.hypixel.net": {
			title = document.querySelector<HTMLElement>("head > title");
			presenceData.details = "Store, viewing:";
			presenceData.state = title.textContent.replace(
				"Hypixel Server Store | ",
				""
			);

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		default:
			presence.setActivity();
	}
});
