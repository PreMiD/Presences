const presence = new Presence({
		clientId: "998532462755979275",
	}),
	browsingUnix = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://imgur.com/QCtoeEM.png",
		},
		{ pathname } = document.location;
	presenceData.details = "Viewing Home Page";

	let title: HTMLElement, logo: HTMLElement;
	presenceData.startTimestamp = browsingUnix;

	switch (pathname) {
		case "/bot/add": {
			presenceData.details = "Adding a new bot";
			break;
		}
		case "/search": {
			presenceData.details = "Searching for a new bot";
			break;
		}
		case "/": {
			presenceData.details = "Viewing Home Page";
			break;
		}
	}

	if (
		pathname.startsWith("/bot/") &&
		document.querySelector(".css-1igwmid > b")
	) {
		title = document.querySelector('b[class*="chakra-text"]')
		logo = document.querySelectorAll('[class*="chakra-container"]')?.[1]?.querySelector('[class*="chakra-avatar__img"]') ?? document.querySelector('[class*="chakra-avatar__img"]')
		presenceData.details = "Viewing Bot:";
		presenceData.state = title.textContent;
		presenceData.smallImageKey = logo.getAttribute("src");

		presenceData.buttons = [
			{
				label: "Visit Bot Page",
				url: `${document.location.origin}/bot/${pathname.split("/")[2]}/`,
			},
			{
				label: `Vote for ${title.textContent}`,
				url: `${document.location.origin}/bot/${pathname.split("/")[2]}/vote`,
			},
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
