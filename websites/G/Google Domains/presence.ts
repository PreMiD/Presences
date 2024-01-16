const presence = new Presence({
		clientId: "735878480318955660",
	}),
	strings = presence.getStrings({
		browse: "general.browsing",
		search: "general.searching",
	}),
	getElement = (query: string): string | undefined => {
		return document.querySelector(query)?.textContent.trim();
	};

let elapsed = Math.floor(Date.now() / 1000),
	prevUrl = document.location.href;

const statics = {
	"/tos/": {
		details: "Viewing Page...",
		state: "Terms of Service",
	},
};

presence.on("UpdateData", async () => {
	const path = location.pathname.replace(/\/?$/, "/"),
		showDomain = await presence.getSetting<boolean>("domain"),
		showSearch = await presence.getSetting<boolean>("search"),
		showTimestamps = await presence.getSetting<boolean>("timestamp");

	let presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/G/Google%20Domains/assets/logo.jpg",
		startTimestamp: elapsed,
	};

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	for (const [k, v] of Object.entries(statics))
		if (path.match(k)) presenceData = { ...presenceData, ...v };

	if (path.includes("/m/registrar/")) {
		const domainName = getElement(".domain-header-title > span");
		presenceData.details = domainName ? "Browsing Domain..." : "Browsing...";

		const tab =
			getElement(".dreg-ogb-menu-item-selected") ||
			getElement(".partner-header") ||
			getElement(".gb_bd");
		presenceData.state =
			domainName && showDomain ? `${domainName} (${tab})` : tab && `${tab} tab`;
	}

	if (path.includes("/m/registrar/cart/")) {
		presenceData.details = "Viewing Cart...";
		presenceData.state = getElement(".item-count")?.slice(1, -1);
	}

	if (path.includes("/m/registrar/checkout/"))
		presenceData.details = "Viewing Checkout...";

	if (path.includes("/m/registrar/search/")) {
		presenceData.details = "Searching...";
		presenceData.state = showSearch && document.querySelector("input")?.value;
	}

	if (path.includes("/m/registrar/search/favorites/")) {
		presenceData.details = "Viewing Favorites...";
		presenceData.state = getElement(".mat-tab-label-active");
	}

	if (presenceData.details && typeof presenceData.details === "string") {
		if (presenceData.details.match("(Browsing|Viewing)")) {
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = (await strings).browse;
		}
		if (presenceData.details.match("(Searching)")) {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = (await strings).search;
		}
		if (!showTimestamps) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		!presenceData.state && delete presenceData.state;

		presence.setActivity(presenceData);
	} else presence.setActivity();
});
