const presence = new Presence({
		clientId: "1047847313118351421",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			paused: "general.paused",
			browse: "general.browsing",
			buttonWatchVideo: "general.buttonWatchVideo",
			viewShow: "general.viewShow",
			search: "general.searchFor",
			home: "general.viewHome",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/nofcCPt.png",
	Play = "https://i.imgur.com/OLaz6JN.png",
	Paused = "https://i.imgur.com/4iyMINk.png",
	Search = "https://i.imgur.com/oGQtnIY.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingStamp,
			largeImageKey: Assets.Logo,
		},
		{ href, pathname } = document.location,
		[newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		search = document.querySelector<HTMLInputElement>(
			'input[class*="Component-input-"]'
		);
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}
	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value) {
		presenceData.details = strings.search;
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
		presence.setActivity(presenceData);
		return;
	}

	switch (pathname.split("/")[1]) {
		case "": {
			presenceData.details = strings.home;
			break;
		}
		case "shows":
		case "documentaries": {
			if (pathname === "/shows" || pathname === "documentaries")
				presenceData.details = "Viewing all documentaries";
			else {
				presenceData.details = `${strings.viewShow} ${
					document
						.querySelector('[id="hero-section"]')
						.querySelector('[class*="Component-title-"]')?.textContent
				}`;
				presenceData.state = document
					.querySelector('[aria-label="Select season dropdown"]')
					?.textContent?.replace(/\)k/g, "")
					.replace("(", " - ");
			}
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			break;
		}
		case "topics": {
			presenceData.details = "Viewing shows about";
			presenceData.state = document.querySelector(
				'[data-testid="typography"]'
			)?.textContent;
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			break;
		}
		case "specials": {
			const img = document
				.querySelector('img[class*="Component-imageImg-"]')
				?.getAttribute("src")
				.slice(2);
			presenceData.details = "Viewing show";
			presenceData.state = document
				.querySelector('[class*="Component-contentWrapper"]')
				.querySelector('[data-testid="typography"]')?.textContent;
			if (img) presenceData.largeImageKey = `https://${img}`;
			presenceData.buttons = [
				{
					label: "Browse",
					url: href,
				},
			];
			break;
		}
		default: {
			presenceData.details = strings.browse;
		}
	}

	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
