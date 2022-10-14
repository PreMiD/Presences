const presence = new Presence({
		clientId: "1028679580027977839",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	content = {
		viewingImage: "https://i.imgur.com/9WPWqvT.png",
		buyingImage: "https://i.imgur.com/JKLNlvT.png",
		viewingImageText: "Viewing...",
		buyingImageText: "Buying...",
	};

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IlUpO2s.png",
		details: "Viewing Homepage",
		smallImageKey: content.viewingImage,
		smallImageText: content.viewingImageText,
		startTimestamp: browsingTimestamp,
	};
	const { host, pathname, href } = document.location,
		pages: Record<string, PresenceData> = {
			"/backgrounds": {
				details: "Viewing Backgrounds",
				smallImageKey: content.viewingImage,
				smallImageText: content.viewingImageText,
				buttons: [
					{
						label: "View Backgrounds",
						url: href,
					},
				],
			},
			"/profilebg": {
				details: "Viewing Profile Backgrounds",
				smallImageKey: content.viewingImage,
				smallImageText: content.viewingImageText,
				buttons: [
					{
						label: "View Profile Backgrounds",
						url: href,
					},
				],
			},
			"/frames": {
				details: "Viewing Frames",
				smallImageKey: content.viewingImage,
				smallImageText: content.viewingImageText,
				buttons: [
					{
						label: "View Frames",
						url: href,
					},
				],
			},
			"/items": {
				details: "Viewing Items",
				smallImageKey: content.viewingImage,
				smallImageText: content.viewingImageText,
				buttons: [
					{
						label: "View Items",
						url: href,
					},
				],
			},
			"/bump": {
				details: "Bumping",
				smallImageKey: null,
				smallImageText: null,
				buttons: [
					{
						label: "Wanna Bump?",
						url: href,
					},
				],
			},
			"/team": {
				details: "Viewing Team",
				smallImageKey: content.viewingImage,
				smallImageText: content.viewingImageText,
				buttons: [
					{
						label: "View Sofi Team",
						url: href,
					},
				],
			},
			"/profile/settings": { details: "Viewing profile settings" },
			"/vtc": { details: "Viewing the VTC center" },
			"/vtc/search": { details: "Searching for a VTC" },
			"/vtc/create": { details: "Creating a VTC" },
			"/blog": { details: "Browsing the blog" },
			"/events": { details: "Viewing the events system" },
			"/events/manage": { details: "Managing their events" },
			"/events/manage/past": { details: "Viewing their past events" },
			"/events/create": { details: "Creating an event" },
			"/events/search": { details: "Searching for an event" },
			"/api": { details: "Viewing the API" },
			"/live": { details: "Viewing the live stats" },
			"/history": { details: "Viewing the history" },
			"/settings": { details: "Viewing the settings" },
		};

	if (host === "sofi.gg") {
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

		for (const [path, data] of Object.entries(pages))
			if (pathname.includes(path)) presenceData = { ...presenceData, ...data };
	} else if (host === "gems.sofi.gg") {
		presenceData.details = "Buying Gems";
		presenceData.smallImageKey = content.buyingImage;
		presenceData.smallImageText = content.buyingImageText;
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
