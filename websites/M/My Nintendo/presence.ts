const presence = new Presence({
	clientId: "680498892651233310",
});

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

async function getStrings() {
	return presence.getStrings(
		{
			browsing: "general.browsing",
			reading: "general.reading",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const path = window.location.pathname.split("/").slice(1),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/eywFbXQ.png",
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "en");
	oldLang = newLang;
	if (!strings || oldLang !== newLang) strings = await getStrings();

	switch (path[0]) {
		// Reward Categories
		case "reward_categories":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;
			presenceData.smallImageText = strings.browsing;
			presenceData.smallImageKey = Assets.Reading;

			if (path.length > 1) {
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".PageSubHeader_title"
				)?.textContent;
			}
			break;
		// Rewards
		case "rewards":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;
			presenceData.smallImageText = strings.browsing;
			presenceData.smallImageKey = Assets.Reading;

			if (path.length > 1) {
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".RewardHeader_title"
				).textContent;
			}
			break;
		// Missions
		case "missions":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;

			presenceData.smallImageKey = strings.reading;
			presenceData.smallImageText = "reading";
			break;
		// Points
		case "point":
			if (path.length < 2) return presence.setActivity();

			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1").textContent;
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("h2")?.textContent;
			break;
		// News
		case "news":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;
			presenceData.smallImageText = strings.reading;
			presenceData.smallImageKey = Assets.Reading;

			if (path.length > 1) {
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(
						".NewsDetail_title"
					)?.textContent;
			} else {
				presenceData.state = document.querySelector<HTMLHeadingElement>(
					".PageSubHeader_title"
				)?.textContent;
			}
			break;
		// Redeem Point Codes
		case "serial_number":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;
			break;
		// Getting Started, About Points, About Gold Points
		case "getting_started":
		case "about_point":
		case "about_gold_point":
			presenceData.details =
				document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
				document.title;

			presenceData.smallImageKey = strings.reading;
			presenceData.smallImageText = "reading";
			break;
		// Startpage, Unknown
		default:
			return presence.setActivity();
	}
});
