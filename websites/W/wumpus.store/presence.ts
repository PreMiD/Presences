const presence = new Presence({
		clientId: "998532462755979275",
	}),
	browsingUnix = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/W/wumpus.store/assets/logo.png",
			details: "Viewing Home Page",
			startTimestamp: browsingUnix,
		},
		{ pathname, href } = document.location;

	let title: HTMLElement, logo: HTMLElement;

	switch (pathname) {
		case "/bot/add": {
			presenceData.details = "Adding a new bot";
			break;
		}
		case "/search": {
			presenceData.details = "Searching for a new bot";
			presenceData.smallImageKey = Assets.Search;
			break;
		}
		case "/": {
			presenceData.details = "Viewing Home Page";
			break;
		}
	}

	if (
		pathname.startsWith("/bot/") &&
		document.querySelector('b[class*="chakra-text"]')
	) {
		title = document.querySelector('b[class*="chakra-text"]');
		logo =
			document
				.querySelectorAll('[class*="chakra-container"]')?.[1]
				?.querySelector('[class*="chakra-avatar__img"]') ??
			document.querySelector('[class*="chakra-avatar__img"]');
		presenceData.details = "Viewing Bot:";
		presenceData.state = title.textContent;
		presenceData.smallImageKey = logo.getAttribute("src");

		presenceData.buttons = [
			{
				label: "Visit Bot Page",
				url: href,
			},
			{
				label: `Vote for ${title.textContent}`,
				url: `${href}/vote`,
			},
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
