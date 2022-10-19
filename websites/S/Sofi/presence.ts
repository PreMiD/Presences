const presence = new Presence({
		clientId: "1028679580027977839",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	content = {
		ViewingImage: "https://i.imgur.com/9WPWqvT.png",
		BuyingImage: "https://i.imgur.com/JKLNlvT.png",
		ViewingImageText: "Viewing...",
		BuyingImageText: "Buying...",
	};

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IlUpO2s.png",
		details: "Viewing Homepage",
		smallImageKey: content.ViewingImage,
		smallImageText: content.ViewingImageText,
		startTimestamp: browsingTimestamp,
	};
	const { host, pathname, href } = document.location,
		pages: Record<string, PresenceData> = {
			"/backgrounds": {
				details: "Viewing Backgrounds",
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
				buttons: [
					{
						label: "View Backgrounds",
						url: href,
					},
				],
			},
			"/profilebg": {
				details: "Viewing Profile Backgrounds",
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
				buttons: [
					{
						label: "View Profile Backgrounds",
						url: href,
					},
				],
			},
			"/frames": {
				details: "Viewing Frames",
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
				buttons: [
					{
						label: "View Frames",
						url: href,
					},
				],
			},
			"/items": {
				details: "Viewing Items",
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
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
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
				buttons: [
					{
						label: "View Sofi Team",
						url: href,
					},
				],
			},
			"/art": {
				details: "Viewing Art Gallery",
				smallImageKey: content.ViewingImage,
				smallImageText: content.ViewingImageText,
				buttons: [
					{
						label: "View Art Gallery",
						url: href,
					},
				],
			},
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
		} else if (pathname.startsWith("/art")) {
			const data = document.querySelector(
				"div.w-full.font-inter.uppercase.font-bold.text-xl.lg\\:text-3xl.lg\\:relative.text-light-400.text-center"
			);
			presenceData.details = "Viewing Art Gallery";
			presenceData.buttons = [
				{
					label: "View Art Gallery",
					url: href,
				},
			];

			if (data) {
				const artName = data.textContent;
				artName ? (presenceData.state = artName.toUpperCase()) : null;
			}
		}

		for (const [path, data] of Object.entries(pages))
			if (pathname.includes(path)) presenceData = { ...presenceData, ...data };
	} else if (host === "gems.sofi.gg") {
		presenceData.details = "Buying Gems";
		presenceData.smallImageKey = content.BuyingImage;
		presenceData.smallImageText = content.BuyingImageText;
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
