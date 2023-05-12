const presence = new Presence({
		clientId: "887996093189742612",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/dPN4dbK.png",
	};

	const { pathname, href } = document.location,
		[showTimestamp, showButtons] = await Promise.all([
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("buttons"),
		]),
		pages: Record<string, PresenceData> = {
			"/about/team": { details: "Viewing page...", state: "Team" },
			"/about/partners": { details: "Viewing page...", state: "Partners" },
			"/discover": { details: "Viewing page...", state: "Discover" },
			"/@me/settings": { details: "Editing my profile..." },
			"/login": { details: "Logging in..." },
			"/register": { details: "Registering..." },
		};

	for (const [path, data] of Object.entries(pages))
		if (pathname.includes(path)) presenceData = { ...presenceData, ...data };

	if (pathname === "/") presenceData.details = "Viewing home page";
	else if (pathname.includes("/u/")) {
		presenceData.details = `Viewing user: ${
			document.querySelector("p.text-5xl.text-white")?.textContent ?? "Unknown"
		}`;
		presenceData.state = `${
			document.querySelector("p.mt-3")?.textContent
		} - ❤️ ${document.querySelector("#likes-count")?.textContent || 0}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	} else if (pathname.includes("/search")) {
		presenceData.details = "Searching for...";
		presenceData.state = href.split("/search/")[1] ?? "Unknown";
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/@me") {
		presenceData.details = "Viewing my profile";
		presenceData.buttons = [
			{
				label: "View profile",
				url: `https://webprofiles.me/u/${
					document.querySelector("a.text-5xl")?.textContent
				}`,
			},
		];
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
