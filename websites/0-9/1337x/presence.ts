const presence = new Presence({
		clientId: "636588416854917130",
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
let title: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zc7kuDN.png",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/home/"
	)
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/movie-library"))
		presenceData.details = "Viewing the movie library";
	else if (document.location.pathname.includes("/series-library"))
		presenceData.details = "Viewing the series library";
	else if (document.location.pathname.includes("/new-episodes"))
		presenceData.details = "Viewing the latest episodes";
	else if (document.location.pathname.includes("/top-100"))
		presenceData.details = "Viewing the top 100";
	else if (document.location.pathname.includes("/trending"))
		presenceData.details = "Viewing what's trending";
	else if (document.location.pathname.includes("/cat/Anime/"))
		presenceData.details = "Viewing Anime torrents";
	else if (document.location.pathname.includes("/sub/")) {
		title = document.querySelector(
			"body > main > div > div > div.box-info.trending > div > h1"
		);

		presenceData.details = "Viewing:";
		presenceData.state = title.textContent;
	} else if (document.location.pathname.includes("/cat/Apps/"))
		presenceData.details = "Viewing Apps Torrents";
	else if (document.location.pathname.includes("/cat/Documentaries/"))
		presenceData.details = "Viewing Documentaries Torrents";
	else if (document.location.pathname.includes("/cat/Games/"))
		presenceData.details = "Viewing Games Torrents";
	else if (document.location.pathname.includes("/cat/Movies/"))
		presenceData.details = "Viewing Movies Torrents";
	else if (document.location.pathname.includes("/cat/Music/"))
		presenceData.details = "Viewing Music Torrents";
	else if (document.location.pathname.includes("/cat/Other/"))
		presenceData.details = "Viewing Other Torrents";
	else if (document.location.pathname.includes("/cat/TV/"))
		presenceData.details = "Viewing TV Torrents";
	else if (document.location.pathname.includes("/cat/XXX/"))
		presenceData.details = "Viewing XXX Torrents";
	else if (document.location.pathname.includes("/upload"))
		presenceData.details = "Uploading something...";
	else if (document.location.pathname.includes("/rules")) {
		presenceData.details = "Reading the rules";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/contact")) {
		presenceData.details = "Writing to 1337x";
		presenceData.smallImageKey = Assets.Writing;
	} else if (document.location.pathname.includes("/about")) {
		presenceData.details = "Reading about 1337x";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/torrent/")) {
		presenceData.details = "Viewing torrent:";
		title = document.querySelector(
			"body > main > div > div > div > div.box-info-heading.clearfix > h1"
		);
		presenceData.state = title.textContent;
	} else if (document.location.pathname.includes("/search")) {
		search = document.querySelector(
			"body > main > div > div > div > div.box-info-heading.clearfix > h1 > span"
		);

		presenceData.details = "Searching for:";
		presenceData.state = search.textContent;
		presenceData.smallImageKey = Assets.Search;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
