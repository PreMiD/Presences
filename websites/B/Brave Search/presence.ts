const presence = new Presence({
		clientId: "1293341957141303307",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/Oxx2bFw.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			details: "In Home",
			state: document.querySelector<HTMLInputElement>("#searchbox")?.value,
		};

	switch (pathname.split("/")[1]) {
		case "settings": {
			presenceData.details = "Viewing Settings";
			delete presenceData.state;
			break;
		}
		case "help": {
			presenceData.details = "Viewing Help Page:";
			presenceData.state = document
				.querySelector(".post-title")
				?.textContent?.trim();
			break;
		}
		case "search": {
			presenceData.details = "Searching:";
			break;
		}
		case "images": {
			presenceData.details = "Searching images:";
			break;
		}
		case "news": {
			presenceData.details = "Searching news:";
			break;
		}
		case "videos": {
			presenceData.details = "Searching videos:";
			break;
		}
		case "goggles": {
			presenceData.details = "Searching goggles:";
			break;
		}
		default: {
			delete presenceData.state;
			break;
		}
	}

	presence.setActivity(presenceData);
});
