const presence = new Presence({
		clientId: "1028679580027977839",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/IlUpO2s.png",
			startTimestamp: browsingTimestamp,
		},
		{ host, pathname, href } = document.location;

	if (host === "sofi.gg") {
		presenceData.details = "Viewing Homepage";
		presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
		presenceData.smallImageText = "Viewing...";
		presenceData.buttons = [
			{
				label: "View Homepage",
				url: href,
			},
		];
		switch (pathname) {
			case "/backgrounds": {
				presenceData.details = "Viewing Backgrounds";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Backgrounds",
						url: href,
					},
				];
				break;
			}
			case "/profilebg": {
				presenceData.details = "Viewing Profile Backgrounds";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Profile Backgrounds",
						url: href,
					},
				];
				break;
			}
			case "/frames": {
				presenceData.details = "Viewing Frames";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Frames",
						url: href,
					},
				];
				break;
			}
			case "/items": {
				presenceData.details = "Viewing Items";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Items",
						url: href,
					},
				];
				break;
			}
			case "/bump": {
				presenceData.details = "Bumping";
				presenceData.buttons = [
					{
						label: "Wanna Bump?",
						url: href,
					},
				];
				break;
			}
			case "/team": {
				presenceData.details = "Viewing Team";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Sofi Team",
						url: href,
					},
				];
				break;
			}
			default:
				if (pathname.startsWith("/glows")) {
					const data = document.querySelector("div.flex.text-xl.lg\\:text-2xl");

					presenceData.details = "Viewing Glows";
					presenceData.buttons = [
						{
							label: "View Glows",
							url: href,
						},
					];

					if (data) {
						const userTag = data.textContent?.match(/.*#[0-9]+/gi);
						userTag ? (presenceData.state = `Of ${userTag[0]}`) : null;
					}
				}
		}
	} else if (host === "gems.sofi.gg") {
		presenceData.details = "Buying Gems";
		presenceData.smallImageKey = "https://i.imgur.com/JKLNlvT.png";
		presenceData.smallImageText = "Buying...";
		presenceData.buttons = [
			{
				label: "Buy Gems",
				url: href,
			},
		];
	}
	const [privacy, buttons] = await Promise.all([
		presence.getSetting<boolean>("privacy"),
		presence.getSetting<boolean>("buttons"),
	]);

	if (privacy) {
		presenceData.details = "Browsing...";
		presenceData.smallImageKey = "https://i.imgur.com/0tmziN8.png";
		delete presenceData.smallImageText;
		delete presenceData.state;
		delete presenceData.buttons;
	}

	// else if (search?.value) {
	// 	presenceData.details = "Searching for";
	// 	presenceData.state = search.value;
	// 	presenceData.smallImageKey = "https://i.imgur.com/0tmziN8.pngg";
	// } else if (hostname === "store.epicgames.com") {
	// 	if (
	// 		pathname ===
	// 		`/${document
	// 			.querySelector('[data-baseurl="https://store.epicgames.com"]')
	// 			.getAttribute("lang")}/`
	// 	)
	// 		presenceData.details = "Viewing homepage";
	// 	else {
	// 		switch (pathname.split("/")[2]) {
	// 			case "p": {
	// 				if (video?.muted || !video) presenceData.details = "Viewing game";
	// 				else {
	// 					delete presenceData.startTimestamp;
	// 					presenceData.details = "Viewing trailer of";
	// 					if (!video.paused) {
	// 						presenceData.smallImageKey = "https://i.imgur.com/OLaz6JN.png";
	// 						[, presenceData.endTimestamp] =
	// 							presence.getTimestampsfromMedia(video);
	// 					} else
	// 						presenceData.smallImageKey = "https://i.imgur.com/4iyMINk.png";
	// 				}
	// 				presenceData.state =
	// 					JSON.parse(
	// 						document.querySelector('[type="application/ld+json"]')?.innerHTML
	// 					)?.name ??
	// 					document
	// 						.querySelector<HTMLMetaElement>('[property="og:title"]')
	// 						.content.split("|")[0];
	// 				presenceData.buttons = [
	// 					{
	// 						label: "View Game",
	// 						url: href,
	// 					},
	// 				];
	// 				presenceData.largeImageKey = document
	// 					.querySelector('[class="css-7i770w"]')
	// 					.getAttribute("src");

	// 				break;
	// 			}
	// 			case "news": {
	// 				if (document.querySelector('[id="storeNews"]')) {
	// 					presenceData.details = "Reading about";
	// 					presenceData.smallImageKey = "https://i.imgur.com/nese1O7.png";
	// 					presenceData.state = document
	// 						.querySelector("title")
	// 						.textContent.slice(0, 128);
	// 				} else presenceData.details = "Browsing all news";
	// 				presenceData.buttons = [
	// 					{
	// 						label: "Read The News",
	// 						url: href,
	// 					},
	// 				];
	// 				break;
	// 			}
	// 			case "browse": {
	// 				presenceData.buttons = [
	// 					{
	// 						label: "Browse Games",
	// 						url: href,
	// 					},
	// 				];
	// 				if (document.querySelector('[aria-checked="true"]')) {
	// 					presenceData.details = "Viewing results for";
	// 					presenceData.state = document.querySelector(
	// 						'[aria-checked="true"]'
	// 					).textContent;
	// 				} else if (document.querySelector('[class="css-71iht3"]')) {
	// 					delete presenceData.buttons;
	// 					presenceData.details = "Viewing results for";
	// 					presenceData.state = href?.split("?q=")?.at(0)?.split("&")?.at(0);
	// 				} else presenceData.details = "Browsing games";
	// 				break;
	// 			}
	// 			default: {
	// 				presenceData.details = "Browsing";
	// 				break;
	// 			}
	// 		}
	// 	}
	// } else if (hostname === "www.epicgames.com") {
	// 	if (
	// 		pathname ===
	// 		`/site/${document
	// 			.querySelector('[data-baseurl="https://www.epicgames.com/site"]')
	// 			?.getAttribute("lang")}/`
	// 	)
	// 		presenceData.details = "Viewing homepage";
	// 	else if (pathname.includes("/help/")) {
	// 		presenceData.details = "Reading about";
	// 		presenceData.state = document.querySelector(
	// 			'[class*="ArticleAnchorLink--active"]'
	// 		).textContent;
	// 		presenceData.smallImageKey = "https://i.imgur.com/nese1O7.png";
	// 	} else {
	// 		switch (pathname.split("/")[3]) {
	// 			case "epic-games-store-faq": {
	// 				presenceData.details = "Reading the FAQ";
	// 				presenceData.smallImageKey = "https://i.imgur.com/nese1O7.png";
	// 				break;
	// 			}
	// 			default: {
	// 				presenceData.details = "Browsing";
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
	if (!buttons) delete presenceData.buttons;
	// if (!covers) presenceData.largeImageKey = "https://i.imgur.com/CAsgHOc.png";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
