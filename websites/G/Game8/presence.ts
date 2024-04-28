const presence = new Presence({
		clientId: "1031628776209141892",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/NPFtbsz.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location,
		searchParams = new URLSearchParams(search),
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0] ?? "/") {
		case "/": {
			presenceData.details = "Browsing home page";
			break;
		}
		case "articles": {
			if (pathList[1]) {
				if (pathList[2]) {
					if (pathList[1] === "author") {
						presenceData.details = "Browsing articles by an author";
						presenceData.state = document.querySelector<HTMLDivElement>(
							".p-authorListItem__lead"
						);
						presenceData.smallImageKey =
							document.querySelector<HTMLImageElement>(
								".p-authorListItem__img"
							);
					} else {
						presenceData.details = "Reading an article";
						presenceData.state = document.querySelector("h1");
						presenceData.buttons = [{ label: "Read article", url: href }];
					}
				} else if (pathList[1] === "author") {
					presenceData.details = "Browsing authors";
				} else {
					presenceData.details = "Browsing articles by category";
					presenceData.state = document.querySelector("h1");
				}
			} else {
				presenceData.details = "Browsing articles";
			}
			break;
		}
		case "archives": {
			if (pathList[1] === "search") {
				presenceData.details = "Searching for articles";
				presenceData.state = searchParams.get("query");
			} else {
				presenceData.details = "Browsing game walkthroughs";
			}
			break;
		}
		case "games": {
			if (pathList[2]) {
				const gameTitle = document
					.querySelector<HTMLParagraphElement>(".p-gameHeader__game_title")
					.textContent.replace(/Walkthrough & Guides Wiki$/, "");
				presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
					".p-gameHeader__game_logo img"
				);
				presenceData.smallImageText = gameTitle;
			} else {
				presenceData.details = "Browsing games";
			}
			break;
		}
	}

	presence.setActivity(presenceData);
});
