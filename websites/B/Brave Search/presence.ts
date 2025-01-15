const presence = new Presence({
		clientId: "1293341957141303307",
	}),
	strings = presence.getStrings({
		search: "general.searchFor",
		searchPrivate: "general.searchSomething",
		home: "general.viewHome",
		settings: "discord.settings",
		help: "twitch.help",
		viewPage: "general.viewPage",
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
			presenceData.details = `Searching images${!privacy ? ":" : "..."}`;
			break;
		}
		case "news": {
			presenceData.details = `Searching news${!privacy ? ":" : "..."}`;
			break;
		}
		case "videos": {
			presenceData.details = `Searching videos${!privacy ? ":" : "..."}`;
			break;
		}
		case "goggles": {
			presenceData.details = `Searching goggles${!privacy ? ":" : "..."}`;
			break;
		}
		default: {
			delete presenceData.state;
			break;
		}
	}

	presence.setActivity(presenceData);
});
