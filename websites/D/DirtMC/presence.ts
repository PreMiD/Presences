const presence = new Presence({
		clientId: "631995227132919819", // CLIENT ID FOR YOUR PRESENCE
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/hevy5Kg.png",
	};

	presenceData.startTimestamp = browsingTimestamp;
	if (document.location.hostname === "dirtmc.net") {
		switch (document.location.pathname) {
			case "/": {
				presenceData.details = "Viewing home page";
				break;
			}
			case "/rules/": {
				presenceData.details = "Reading the rules";

				presenceData.smallImageKey = "reading";

				break;
			}
			case "/how-to-play/": {
				presenceData.details = "Viewing how to play";

				presenceData.smallImageKey = "reading";

				break;
			}
			default:
				if (
					document.querySelector("#site-main > article > header > h1") !== null
				) {
					title = document.querySelector("#site-main > article > header > h1");
					presenceData.details = "Reading thread:";
					if (title.textContent.length > 128)
						presenceData.state = `${title.textContent.substring(0, 125)}...`;
					else presenceData.state = title.textContent;

					presenceData.smallImageKey = "reading";
				}
		}
	} else if (document.location.hostname === "buy.dirtmc.net") {
		title = document.querySelector("head > title");
		presenceData.details = "Store, viewing:";
		presenceData.state = title.textContent.replace("DirtMC | ", "");
	}
	presence.setActivity(presenceData);
});
