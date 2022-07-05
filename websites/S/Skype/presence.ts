const presence = new Presence({
		clientId: "617500416887881748", // CLIENT ID FOR YOUR PRESENCE
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let typing: HTMLElement, user: HTMLElement, bot: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "fror_why",
	};

	presenceData.startTimestamp = browsingTimestamp;

	switch (document.location.hostname) {
		case "web.skype.com": {
			user = document.querySelector(
				"body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div"
			);
			typing = document.querySelector(
				"body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > br"
			);
			bot = document.querySelector(
				"body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > button > div > div"
			);
			if (user) {
				if (!typing) {
					presenceData.details = "Typing in chat:";
					presenceData.state = user.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Reading chat:";
					presenceData.state = user.textContent;

					presenceData.smallImageKey = "reading";

					presence.setActivity(presenceData);
				}
			} else if (bot) {
				if (!typing) {
					presenceData.details = "Typing in chat:";
					presenceData.state = bot.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Reading chat:";
					presenceData.state = bot.textContent;

					presenceData.smallImageKey = "reading";

					presence.setActivity(presenceData);
				}
			} else presence.setActivity();

			break;
		}
		case "preview.web.skype.com": {
			user = document.querySelector(
				"body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div"
			);
			typing = document.querySelector(
				"body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > span"
			);
			if (user) {
				if (typing) {
					presenceData.details = "Typing in chat:";
					presenceData.state = user.textContent;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Reading chat:";
					presenceData.state = user.textContent;

					presenceData.smallImageKey = "reading";

					presence.setActivity(presenceData);
				}
			} else presence.setActivity();

			break;
		}
		case "www.skype.com": {
			presenceData.details = "Skype";
			presenceData.state = "Browsing...";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		default:
			presence.setActivity();
	}
});
