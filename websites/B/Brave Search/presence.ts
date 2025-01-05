const presence = new Presence({
		clientId: "1293341957141303307",
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
			details: "In Home",
			state: privacy
				? // eslint-disable-next-line no-undefined
				  undefined
				: document.querySelector<HTMLInputElement>("#searchbox")?.value,
		};

	switch (pathname.split("/")[1]) {
		case "settings": {
			presenceData.details = "Viewing Settings";
			delete presenceData.state;
			break;
		}
		case "help": {
			if (!privacy) {
				presenceData.details = "Viewing Help Page:";
				presenceData.state = document
					.querySelector(".post-title")
					?.textContent?.trim();
			} else presenceData.details = "Viewing Help Pages";
			break;
		}
		case "search": {
			presenceData.details = `Searching${!privacy ? ":" : "..."}`;
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
