const presence = new Presence({
		clientId: "1293341957141303307",
	}),
	strings = presence.getStrings({
		search: "general.searchFor",
		searchPrivate: "general.searchSomething",
		home: "general.viewHome",
		viewPage: "general.viewPage",
		settings: "bravesearch.settings",
		help: "bravesearch.help",
		searchNews: "bravesearch.searchNewsFor",
		searchNewsPrivate: "bravesearch.searchNewsSomething",
		searchVid: "bravesearch.searchVidFor",
		searchVidPrivate: "bravesearch.searchVidSomething",
		searchImg: "bravesearch.searchImgFor",
		searchImgPrivate: "bravesearch.searchImgSomething",
		searchGoggles: "bravesearch.searchNewsFor",
		searchGogglesPrivate: "bravesearch.searchNewsSomething",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/B/Brave%20Search/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		privacy = await presence.getSetting("privacy"),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			details: (await strings).home,
			state: privacy
				? // eslint-disable-next-line no-undefined
				  undefined
				: document.querySelector<HTMLInputElement>("#searchbox")?.value,
		};

	switch (pathname.split("/")[1]) {
		case "settings": {
			presenceData.details = (await strings).settings;
			delete presenceData.state;
			break;
		}
		case "help": {
			presenceData.details = (await strings).viewPage;
			presenceData.state = !privacy
				? document.querySelector(".post-title")?.textContent?.trim()
				: (await strings).help;
			break;
		}
		case "search": {
			presenceData.details = !privacy
				? (await strings).search
				: (await strings).searchPrivate;
			break;
		}
		case "images": {
			presenceData.details = !privacy
				? (await strings).searchImg
				: (await strings).searchImgPrivate;
			break;
		}
		case "news": {
			presenceData.details = !privacy
				? (await strings).searchNews
				: (await strings).searchNewsPrivate;
			break;
		}
		case "videos": {
			presenceData.details = !privacy
				? (await strings).searchVid
				: (await strings).searchVidPrivate;
			break;
		}
		case "goggles": {
			presenceData.details = !privacy
				? (await strings).searchGoggles
				: (await strings).searchGogglesPrivate;
			break;
		}
		default: {
			delete presenceData.state;
			break;
		}
	}

	presence.setActivity(presenceData);
});
