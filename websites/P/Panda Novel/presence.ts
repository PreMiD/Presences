const presence = new Presence({
		clientId: "1064394161807167568",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/0gC8SLN.png",
	Reading = "https://i.imgur.com/wPUmqu5.png",
	Searching = "https://i.imgur.com/UhPgTRn.png",
	Viewing = "https://i.imgur.com/RMg2Qgg.png",
}

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: "Somewhere on the site",
		},
		[privacy, logo, time, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
		]),
		{ pathname, href } = document.location,
		path = pathname.split("/");

	switch (path[1]) {
		case "top":
			presenceData.details = "Home";
			break;

		case "details":
			presenceData.details = "Viewing novel page";
			presenceData.state = textContent(".novel-desc h1");
			if (logo && !privacy) {
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(
						".novel-cover i"
					)?.dataset?.src;
			}
			presenceData.smallImageKey =
				logo && !privacy ? Assets.Logo : Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			presenceData.buttons = [{ label: "Open novel page", url: href }];
			break;

		case "content":
			presenceData.details = privacy
				? "Reading novel"
				: textContent(".breadcrumb li:nth-child(2) h1");
			presenceData.state = textContent(".breadcrumb li:nth-child(3) span");
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
			presenceData.buttons = [
				{
					label: "Open novel page",
					url: document.querySelector<HTMLLinkElement>(
						".breadcrumb li:nth-child(2) a"
					)?.href,
				},
			];
			break;

		case "browsenovel":
			presenceData.details = "Searching novel";
			presenceData.state = textContent(".filter-list .current");
			presenceData.smallImageKey = Assets.Searching;
			presenceData.smallImageText = "Searching";
			break;

		case "rankings":
			presenceData.details = "Viewing reading top";
			presenceData.state = textContent(".ranking-tabs .current");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;

		case "author":
			presenceData.details = "Searching author";
			presenceData.state = textContent(".ranking-tabs .current");
			presenceData.smallImageKey = Assets.Searching;
			presenceData.smallImageText = "Searching";
			if (path[2] === "works") {
				presenceData.details = "Viewing works of the author";
				presenceData.state = textContent(".author-desc dl dd h4");
				if (logo && !privacy) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>(
							".author-portrait i"
						)?.dataset?.src;
				}
				presenceData.smallImageKey =
					logo && !privacy ? Assets.Logo : Assets.Viewing;
				presenceData.smallImageText = "Viewing";
				presenceData.buttons = [
					{
						label: "Open author page",
						url: href,
					},
				];
			}
			break;

		case "manga":
			presenceData.details = "Viewing popular manga";
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			switch (path[2]) {
				case "details":
				case "novel":
					presenceData.details = `Viewing chapters of ${textContent(
						".details-tabs .current"
					).toLowerCase()}`;
					presenceData.state = textContent(".section-title span");
					presenceData.smallImageKey = Assets.Viewing;
					presenceData.smallImageText = "Viewing";
					presenceData.buttons = [
						{
							label: `Open ${textContent(
								".details-tabs .current"
							).toLowerCase()} page`,
							url: href,
						},
					];
					break;

				case "content":
					presenceData.details = privacy
						? "Reading manga"
						: textContent(".breadcrumb li:nth-child(2) h1");
					presenceData.state = textContent(".breadcrumb li:nth-child(3) span");
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Reading";
					presenceData.buttons = [
						{
							label: "Open manga page",
							url: document.querySelector<HTMLLinkElement>(
								".breadcrumb li:nth-child(2) a"
							)?.href,
						},
					];
					break;
			}
			break;

		case "newnovel":
			presenceData.details = "Viewing week new novels";
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;

		case "presearch":
		case "search":
			presenceData.details = "Searching novel";
			presenceData.state =
				document.querySelector<HTMLInputElement>("input")?.value;
			presenceData.smallImageKey = Assets.Searching;
			presenceData.smallImageText = "Searching";
			if (path[2]) presenceData.state = textContent(".header-content h4 i");
			break;

		case "ucenter":
			presenceData.details = "Viewing profile";
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			if (path[2] === "reviews") {
				presenceData.details = "Viewing comments";
				presenceData.state = textContent(".header-tabs .current");
			}
			break;

		case "library":
		case "history":
			presenceData.details = "Viewing library";
			presenceData.state = textContent(".header-tabs .current");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			break;
	}

	if (!buttons || privacy) delete presenceData.buttons;
	if (time) presenceData.startTimestamp = browsingTimestamp;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
