const presence = new Presence({
		clientId: "808749649325719562",
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

let username: string,
	mangaId: string = null,
	coverFileName: string = null;

enum Assets {
	Logo = "https://i.imgur.com/zs8myqz.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

async function getCoverImage(newMangaId: string) {
	/**
	 * Use MangaDex API to get the fileName of the cover to obtain the image.
	 * More here : https://api.mangadex.org/docs/get-covers/
	 */
	if (mangaId === newMangaId)
		return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
	mangaId = newMangaId;
	const req = await fetch(
		`https://api.mangadex.org/manga/${mangaId}?includes%5B%5D=cover_art`
	);
	if (!req.ok) return Assets.Logo;
	const { relationships } = (await req.json()).data;
	coverFileName = relationships.find(
		(relation: { type: string }) => relation.type === "cover_art"
	).attributes.fileName;
	return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathArr = pathname.split("/"),
		[showCover, showButtons] = await Promise.all([
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("buttons"),
		]);

	switch (pathArr[1]) {
		case "title":
			presenceData.details = `Viewing a ${
				pathArr[2] === "random" ? "Random" : ""
			} Manga:`;
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace(" - MangaDex", "");
			presenceData.buttons = [{ label: "View Manga", url: href }];
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img.rounded").src;
			break;
		case "titles":
			presenceData.details = {
				"": "Browsing Manga",
				latest: "Browsing Latest Manga",
				feed: "Viewing Feed",
				recent: "Browsing Recents Mangas",
				follows: "Viewing their Library",
			}[pathArr[2]];
			presenceData.smallImageKey = Assets.Search;
			break;
		case "chapter": {
			const title = document.querySelector(".text-primary").textContent.trim();
			presenceData.details = `Reading ${title}`;
			presenceData.state = `Page ${document
				.querySelector("head > title")
				.textContent.replace(` - ${title} - MangaDex`, "")}`;
			presenceData.largeImageKey = await getCoverImage(
				document.querySelector<HTMLLinkElement>("span > a").href.split("/")[4]
			);
			presenceData.smallImageKey = Assets.Reading;
			presenceData.buttons = [{ label: "Read Chapter", url: href }];
			break;
		}
		case "tag":
			presenceData.details = "Viewing a Tag";
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace(" - MangaDex", "");
			break;
		case "group":
		case "user":
			username = document
				.querySelector("head > title")
				.textContent.replace(" - MangaDex", "");
			presenceData.details = `Viewing ${
				pathArr[1] === "group" ? "Viewing a Group" : "User Profile"
			}`;
			presenceData.state = username;
			break;
		case "my":
			presenceData.details = {
				history: "Viewing History",
				lists: "Viewing Lists",
				groups: "Viewing Followed Groups",
			}[pathArr[2]];
			break;
		default:
			presenceData.details = {
				"": "Viewing the Homepage",
				settings: "Viewing the Settings Page",
				about: "Viewing About Page",
				rules: "Viewing Rules",
				list: "Viewing an MDList",
				users: "Viewing Users",
				groups: "Viewing Groups",
			}[pathArr[1]];
	}

	if (!showCover) presenceData.largeImageKey = Assets.Logo;
	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
