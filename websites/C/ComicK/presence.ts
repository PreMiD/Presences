const presence = new Presence({
		clientId: "866604211248824371",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	staticPages: Record<string, PresenceData> = {
		home: { details: "Browsing Homepage" },
		list: { details: "Viewing Followed List" },
		ranking: { details: "Looking at rankings" },
		commentlist: { details: "Looking at comment list" },
		settings: { details: "Settings" },
		languages: { details: "Languages" },
		privacy: { details: "Privacy Policy" },
		installapp: { details: "ComicK App" },
	};
enum Assets {
	Logo = "https://i.imgur.com/DeNqLCB.png",
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
	let presenceData: PresenceData = {
		details: "Browsing",
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	const { pathname, href } = document.location,
		arrPath = pathname.replace("_", "").split("/"),
		[image, buttons] = await Promise.all([
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons"),
		]);

	switch (arrPath[1]) {
		case "comic": {
			const title = document.querySelector<HTMLHeadingElement>("h1");
			if (title) {
				presenceData.details = "Reading Description";
				presenceData.state = title.textContent;
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"meta[property='og:image']"
				).content;
				presenceData.buttons = [
					{
						label: "Read Description",
						url: href,
					},
				];
			} else if (document.querySelector(".images-reader-container")) {
				const img = document.querySelectorAll<HTMLImageElement>(
					".images-reader-container img"
				)[1];
				presenceData.details = `Reading ${img.alt.substring(
					0,
					img.alt.indexOf("chapter")
				)}`;
				presenceData.state = img.alt.substring(
					img.alt.indexOf("chapter"),
					img.alt.indexOf(",")
				);
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"meta[property='og:image']"
				).content;
				presenceData.buttons = [
					{
						label: "Read Chapter",
						url: href,
					},
					{
						label: "Read Description",
						url: href.split(/(.+)[\\/]/)[1],
					},
				];
			}
			break;
		}
		case "group":
			presenceData.details = "Looking at group";
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("h1").textContent;
			break;
		case "search": {
			presenceData.details = "Searching";
			const research = document.querySelector("div > h1")?.textContent;
			if (research) presenceData.state = research;
			break;
		}
		case "user":
			presenceData.details = "Viewing their profile";
			if (arrPath.length > 2) {
				presenceData.details = "Viewing";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1").textContent;
				presenceData.largeImageKey = document
					.querySelector<HTMLImageElement>("#__next div > div > img")
					.src.replace("size=200", "size=640");
			}
			break;
		default:
			if (Object.keys(staticPages).includes(arrPath[1]))
				presenceData = { ...presenceData, ...staticPages[arrPath[1]] };
	}

	if (!image && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
