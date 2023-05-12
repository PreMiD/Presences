const presence = new Presence({
		clientId: "833644176967991346",
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
	const time = await presence.getSetting<boolean>("time"),
		privacy = await presence.getSetting<boolean>("privacy"),
		buttons = await presence.getSetting<boolean>("buttons"),
		cover = await presence.getSetting<boolean>("cover"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/paPCAuE.png",
			startTimestamp: browsingTimestamp,
		};
	if (document.querySelector("[class*='is-visible']")) {
		presenceData.details = "Searching";
		presenceData.state = (
			document
				.querySelector("[class^='search-box']")
				.children.item(1) as HTMLInputElement
		).value;
	} else if (document.location.pathname.includes("/rankings")) {
		presenceData.details = "Browsing Rankings";
		if (
			document.querySelector<HTMLInputElement>(
				"[class^='ss-input'] > div > input"
			).value !== ""
		) {
			presenceData.state = `Search: ${
				document.querySelector<HTMLInputElement>(
					"[class^='ss-input'] > div > input"
				).value
			}`;
		} else if (document.querySelector("[class^='chip']")) {
			let filters = "";
			for (const element of document.querySelectorAll("[class^='chip']"))
				filters += `${element.textContent.slice(0, -2)},`;

			presenceData.state = `${filters.slice(0, -1)}`;
		}
	} else if (document.location.pathname.includes("/leaderboard")) {
		if (document.location.pathname.includes("/leaderboards")) {
			presenceData.details = "Browsing Leaderboards";
			if (
				document.querySelector<HTMLInputElement>(
					"[class^='ss-input'] > div > input"
				).value !== ""
			) {
				presenceData.state = `Search: ${
					document.querySelector<HTMLInputElement>(
						"[class^='ss-input'] > div > input"
					).value
				}`;
			}
		} else if (document.location.pathname.includes("/leaderboard/")) {
			presenceData.details = "Viewing Leaderboard";
			presenceData.state = document.querySelector(
				"div.title.is-5.mb-0 > a"
			).textContent;
			presenceData.smallImageKey = document
				.querySelector("[class*='selected'] > span")
				.textContent.toLowerCase()
				.replace("+", "_");
			presenceData.smallImageText = `${
				document.querySelector("[class*='selected'] > span").textContent
			} (${document.querySelector("[class^='tag mb-2']").textContent})`;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"[class^='map-cover']"
				).src;
			}
		} else presenceData.details = "Viewing Leaderboard";
	} else if (document.location.pathname.includes("/ranking/requests")) {
		presenceData.details = "Browsing Rank Requests";
		presenceData.state = `${
			document.querySelector("[class^='title level-color']").textContent
		} ${document.querySelector("p.heading").textContent}`;
	} else if (document.location.pathname.includes("/ranking/request")) {
		presenceData.details = "Viewing Rank Request";
		presenceData.state = document.querySelector(
			"div.title.is-5.mb-0 > a"
		).textContent;
		presenceData.smallImageKey = document
			.querySelector("[class*='selected'] > span")
			.textContent.toLowerCase()
			.replace("+", "_");
		presenceData.smallImageText = document.querySelector(
			"[class*='selected'] > span"
		).textContent;
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/u/")) {
		presenceData.details = "Viewing User";
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
		if (
			document.querySelector(
				"[class^='title is-5 player has-text-centered-mobile'] > a > span"
			)
		) {
			presenceData.state = `${
				document.querySelector<HTMLImageElement>("[class^='country']").alt
			} ${
				document.querySelector(
					"[class^='title is-5 player has-text-centered-mobile'] > a > span"
				).textContent
			} (${document.querySelector("[class^='title-header pp']").textContent})`;
		} else {
			presenceData.state = `${
				document.querySelector<HTMLImageElement>("[class^='country']").alt
			} ${
				document.querySelector(
					"[class^='title is-5 player has-text-centered-mobile'] > span"
				).textContent
			} (${document.querySelector("[class^='title-header pp']").textContent})`;
		}
	} else if (document.location.pathname.includes("/legal/privacy"))
		presenceData.details = "Viewing Privacy Policy";
	else if (document.location.pathname.includes("/team"))
		presenceData.details = "Viewing ScoreSaber Team";
	else if (document.location.pathname.startsWith("/scores"))
		presenceData.details = "Viewing Score Feed";
	else if (document.location.pathname === "/")
		presenceData.details = "Viewing Homepage";

	if (!time) delete presenceData.startTimestamp;

	if (!buttons) delete presenceData.buttons;

	if (privacy) delete presenceData.state, delete presenceData.buttons;

	presence.setActivity(presenceData);
});
