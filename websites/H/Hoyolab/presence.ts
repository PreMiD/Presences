const presence = new Presence({
		clientId: "836534947170353173",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = document.location;
	if (pathname === "/genshin/") presenceData.details = "Viewing the Homepage";
	else if (pathname.endsWith("/home/1")) {
		switch (search?.substr(6)) {
			case "create":
				presenceData.details = "Viewing tavern page";
				presenceData.state = "New";
				break;
			case "reply":
				presenceData.details = "Viewing tavern page";
				presenceData.state = "New replies";
				break;
			case "2":
				presenceData.details = "Viewing tavern page";
				presenceData.state = "Featured";
				break;
			default:
				presenceData.details = "Viewing tavern page";
				presenceData.state = "Hot";
		}
	} else if (pathname.endsWith("/home/3")) {
		switch (search?.substr(6)) {
			case "1":
				presenceData.details = "Viewing official page";
				presenceData.state = "Notices";
				break;
			case "3":
				presenceData.details = "Viewing official page";
				presenceData.state = "Info";
				break;
			case "contribution":
				presenceData.details = "Viewing official page";
				presenceData.state = "Submission events";
				break;
			default:
				presenceData.details = "Viewing official page";
				presenceData.state = "Events";
		}
	} else if (pathname.endsWith("/home/2")) {
		switch (search?.substr(6)) {
			case "create":
				presenceData.details = "Viewing billboards page";
				presenceData.state = "New";
				break;
			case "reply":
				presenceData.details = "Viewing billboards page";
				presenceData.state = "New replies";
				break;
			case "2":
				presenceData.details = "Viewing billboards page";
				presenceData.state = "Featured";
				break;
			default:
				presenceData.details = "Viewing billboards page";
				presenceData.state = "Hot";
		}
	} else if (pathname.startsWith("/genshin/article/")) {
		presenceData.details = document.querySelector(
			".mhy-article-page__title > h1"
		).textContent;
		presenceData.state = `by: ${
			document.querySelector(
				".mhy-article-page-author > .mhy-user-card__info > a > span"
			).textContent
		}`;
		presenceData.buttons = [
			{ label: "Visit Article", url: window.location.href },
		];
	} else if (pathname.endsWith("/topic"))
		presenceData.details = "Browsing topics";
	else if (pathname.startsWith("/genshin/topicDetail/")) {
		presenceData.details = "Browsing topic:";
		presenceData.state = document.querySelector(
			".mhy-topic-card__name"
		).textContent;
	} else if (pathname.startsWith("/genshin/search")) {
		presenceData.details = "Searching:";
		presenceData.state = new URLSearchParams(window.location.search).get(
			"keyword"
		);
		presenceData.smallImageKey = "search";
	}
	presence.setActivity(presenceData);
});
