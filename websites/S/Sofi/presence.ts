const presence = new Presence({
		clientId: "1028679580027977839",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/IlUpO2s.png",
			startTimestamp: browsingTimestamp,
		},
		{ host, pathname, href } = document.location;

	if (host === "sofi.gg") {
		presenceData.details = "Viewing Homepage";
		presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
		presenceData.smallImageText = "Viewing...";

		switch (pathname) {
			case "/backgrounds": {
				presenceData.details = "Viewing Backgrounds";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Backgrounds",
						url: href,
					},
				];
				break;
			}
			case "/profilebg": {
				presenceData.details = "Viewing Profile Backgrounds";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Profile Backgrounds",
						url: href,
					},
				];
				break;
			}
			case "/frames": {
				presenceData.details = "Viewing Frames";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Frames",
						url: href,
					},
				];
				break;
			}
			case "/items": {
				presenceData.details = "Viewing Items";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Items",
						url: href,
					},
				];
				break;
			}
			case "/bump": {
				presenceData.details = "Bumping";
				presenceData.buttons = [
					{
						label: "Wanna Bump?",
						url: href,
					},
				];
				break;
			}
			case "/team": {
				presenceData.details = "Viewing Team";
				presenceData.smallImageKey = "https://i.imgur.com/9WPWqvT.png";
				presenceData.smallImageText = "Viewing...";
				presenceData.buttons = [
					{
						label: "View Sofi Team",
						url: href,
					},
				];
				break;
			}
			default:
				if (pathname.startsWith("/glows")) {
					const data = document.querySelector("div.flex.text-xl.lg\\:text-2xl");

					presenceData.details = "Viewing Glows";
					presenceData.buttons = [
						{
							label: "View Glows",
							url: href,
						},
					];

					if (data) {
						const userTag = data.textContent?.match(/.*#[0-9]+/gi);
						userTag ? (presenceData.state = `Of ${userTag[0]}`) : null;
					}
				}
		}
	} else if (host === "gems.sofi.gg") {
		presenceData.details = "Buying Gems";
		presenceData.smallImageKey = "https://i.imgur.com/JKLNlvT.png";
		presenceData.smallImageText = "Buying...";
		presenceData.buttons = [
			{
				label: "Buy Gems",
				url: href,
			},
		];
	}
	const [privacy, buttons] = await Promise.all([
		presence.getSetting<boolean>("privacy"),
		presence.getSetting<boolean>("buttons"),
	]);

	if (privacy) {
		presenceData.details = "Browsing...";
		presenceData.smallImageKey = "https://i.imgur.com/0tmziN8.png";
		delete presenceData.smallImageText;
		delete presenceData.state;
		delete presenceData.buttons;
	}

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
