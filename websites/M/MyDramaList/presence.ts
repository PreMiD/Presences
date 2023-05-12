const presence = new Presence({
		clientId: "739290632463319141",
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

interface FilmData {
	"@type": string;
	name: string;
	image: string;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/EmAGyTj.png",
			startTimestamp: browsingTimestamp,
		},
		coverEnabled = await presence.getSetting("cover");

	if (document.location.pathname === "/") {
		presenceData.details = "Viewing the homepage";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Browsing";
	} else if (document.location.pathname.startsWith("/episode-calendar")) {
		presenceData.details = "Viewing Upcomming Shows";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/search")) {
		let searchThing = decodeURIComponent(
			document.location.search.substring(3)
		).replaceAll("+", " ");

		if (searchThing.includes("&"))
			searchThing = searchThing.substring(0, searchThing.indexOf("&"));

		presenceData.details = "Searching for a show...";
		presenceData.state = searchThing;
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/article/")) {
		presenceData.details = "Reading an article:";
		presenceData.state = document.querySelector(
			"#article > div.box-header > h1 > a"
		).textContent;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading and article";
	} else if (document.location.pathname === "/articles") {
		presenceData.details = "Browsing articles";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/trailers")) {
		presenceData.details = "Looking at Trailers";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/feeds")) {
		presenceData.details = "Browsing through feeds";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/list")) {
		presenceData.details = "Looking at user lists";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/contributors")) {
		presenceData.details = "Looking at Top Contributors";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/discussions")) {
		presenceData.details = "Browsing forums";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/shows/")) {
		presenceData.details = "Browsing Shows List";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/reviews/")) {
		presenceData.details = "Reading Reviews";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/profile/")) {
		const profilePicture = document.querySelector(
			".box-user-profile :is(video, img)"
		);

		presenceData.details = `Viewing ${document
			.querySelector(".profile-header h1")
			.textContent.trim()}'s profile`;
		presenceData.largeImageKey =
			profilePicture.getAttribute("poster") ??
			profilePicture.getAttribute("src");
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.pathname.startsWith("/recommendations")) {
		presenceData.details = "Looking at personailized recommendations";
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
	} else if (document.location.pathname.startsWith("/people/")) {
		presenceData.details = "Viewing actor:";
		presenceData.state = document.querySelector(".box-header > h1").textContent;
		presenceData.largeImageKey =
			document.querySelector<HTMLImageElement>(".box-body > img").src;
		presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
		presenceData.smallImageText = "MDL";
	} else if (document.location.href.match("/[^-][0-9]{1,5}")) {
		const filmData: FilmData = (() => {
			const title = document.querySelector(".film-title > a")?.textContent;

			if (!title) {
				const jsonData = document.querySelector(
					'[type="application/ld+json"]'
				)?.textContent;

				if (!jsonData) return;
				else return JSON.parse(jsonData);
			}

			return {
				name: title,
				image: document.querySelector<HTMLImageElement>(
					".box-body > .row > div img"
				)?.src,
				"@type": document
					.querySelector(".container-fluid.title-container")
					?.getAttribute("itemtypex")
					?.split("/")
					?.pop(),
			};
		})();

		if (filmData) {
			presenceData.details = `Viewing ${
				filmData["@type"] === "Movie" ? "movie" : "show"
			}:`;
			presenceData.state = filmData.name;
			presenceData.largeImageKey = filmData.image;
			presenceData.smallImageKey = "https://i.imgur.com/EmAGyTj.png";
			presenceData.smallImageText = "MDL";
		}
	}

	if (presenceData.largeImageKey.includes("http") && !coverEnabled)
		presenceData.largeImageKey = "https://i.imgur.com/EmAGyTj.png";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
