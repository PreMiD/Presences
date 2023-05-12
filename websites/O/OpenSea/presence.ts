const presence = new Presence({
		clientId: "939259686727848069",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const [timestamps, buttons] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("buttons"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1HHTwaN.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href, hostname } = document.location,
		pathArr = pathname.split("/");

	if (hostname === "opensea.io") {
		switch (pathArr[1]) {
			case "": {
				presenceData.details = "Viewing home page";
				break;
			}
			case "explore-collections": {
				presenceData.details = "Browsing collections";
				presenceData.state = document.querySelector(
					`a[href='${pathname}${search}'] > span`
				).textContent;
				break;
			}
			case "assets": {
				if (pathname === "/assets") {
					presenceData.details = "Searching OpenSea";
					presenceData.state = document.querySelector<HTMLInputElement>(
						"input[role='searchbox']"
					).value;
				} else {
					presenceData.details = "Viewing asset";
					presenceData.state = document.querySelector("h1").textContent;
					presenceData.buttons = [
						{
							label: "View Asset",
							url: href,
						},
					];
				}
				break;
			}
			case "collection": {
				presenceData.details = "Viewing collection";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.buttons = [
					{
						label: "View Collection",
						url: href,
					},
				];
				break;
			}
			case "my-watchlist": {
				presenceData.details = "Viewing their watchlist";
				break;
			}
			case "collections": {
				presenceData.details = "Viewing their collections";
				break;
			}
			case "account": {
				presenceData.details = "Viewing their account";
				if (pathArr[2] === "settings")
					presenceData.details = "Viewing their settings";
				break;
			}
			case "category": {
				presenceData.details = "Browsing category";
				presenceData.state = document.querySelector("h1").textContent;
				break;
			}
			case "partners": {
				presenceData.details = "Browsing partners";
				break;
			}
			case "rankings": {
				presenceData.details = "Browsing top NFTs";
				break;
			}
			case "activity": {
				presenceData.details = "Viewing recent activity";
				break;
			}
			case "solana-collections": {
				presenceData.details = "Browsing solana NFTs";
				break;
			}
			case "asset": {
				if (pathArr[2] === "create") presenceData.details = "Creating asset";
				break;
			}
			case "blog": {
				if (pathArr[2] === "category") {
					presenceData.details = "Browsing blogs category";
					presenceData.state =
						document.querySelector(".current-menu-item").textContent;
				} else if (!pathArr[2]) presenceData.details = "Browsing blog posts";
				else {
					presenceData.details = "Viewing blog post";
					presenceData.state =
						document.querySelector(".entry-title")?.textContent;
				}
				break;
			}
			default: {
				if (document.title.endsWith("Profile | OpenSea")) {
					presenceData.details = "Viewing profile";
					presenceData.state = document.querySelector("h1").textContent;
					presenceData.buttons = [
						{
							label: "View Profile",
							url: href,
						},
					];
				}
				break;
			}
		}
	} else if (hostname === "docs.opensea.io") {
		presenceData.details = "Viewing documentation";
		presenceData.state = document.querySelector(".active").textContent;
	}

	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
