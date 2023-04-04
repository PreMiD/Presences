const presence = new Presence({
		clientId: "755542346367631362",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let item;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/14KOuEk.png",
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (
		document.location.pathname === "/" ||
		(document.location.pathname.includes("/shop/") &&
			document.location.pathname.length <= 25)
	) {
		item = document.querySelector(
			"body > div:nth-child(2) > header > nav > div > div > ul > li.selected"
		) as HTMLElement;

		presenceData.details = "Browsing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = "search";

		presence.setActivity(presenceData);
	} else if (
		document.location.pathname.includes("/shop/") &&
		document.location.pathname.length >= 26
	) {
		item = document.querySelector(
			"body > div:nth-child(2) > div.main > div:nth-child(5) > div > div:nth-child(2) > div:nth-child(2) > div > h1"
		) as HTMLElement;

		presenceData.details = "Browsing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = "search";

		presence.setActivity(presenceData);
	} else if (document.location.pathname.includes("/products/")) {
		item = document.querySelector(
			"body > div:nth-child(2) > div.main > div:nth-child(2) > div > div > h1"
		) as HTMLElement;

		presenceData.details = "Viewing";
		presenceData.state = item.textContent;
		presenceData.smallImageKey = "reading";

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
