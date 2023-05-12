const presence = new Presence({
	clientId: "609774216430092298",
});

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

let beatmapTitle: string,
	profileName: string,
	profileRanking: string,
	rank: string,
	pp: string,
	title: string,
	diffName: string,
	selected: Element,
	gamemode: string,
	forumName: string,
	inputSelected: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/IWWqSYR.png",
	};

	if (document.location.pathname === "/home") {
		inputSelected = document.querySelector(
			"body > div:nth-child(23) > div > div > div.quick-search-input > div > input"
		);
		if (inputSelected) {
			presenceData.details = "Searching for:";
			presenceData.state =
				inputSelected.value !== "" ? inputSelected.value : "Nothing";
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = "Viewing...";
			presenceData.state = "The Homepage";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.startsWith("/home/download")) {
		presenceData.details = "Viewing...";
		presenceData.state = "The Download Page";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/home/news")) {
		if (document.location.pathname.split("/")[3]) {
			presenceData.details = "Reading...";
			presenceData.state = "An osu! News Page";
			presenceData.smallImageKey = Assets.Reading;
		} else {
			presenceData.details = "Viewing...";
			presenceData.state = "The osu! News Feed";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.startsWith("/home/support")) {
		presenceData.details = "Viewing...";
		presenceData.state = "The Support Page";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.includes("/beatmapsets")) {
		if (document.location.pathname === "/beatmapsets") {
			presenceData.details = "Browsing...";
			presenceData.state = "Beatmap Listings";
			presenceData.smallImageKey = Assets.Search;
		} else {
			title = document.querySelector(
				".beatmapset-header__details-text--title"
			).textContent;
			diffName = document.querySelector(
				".beatmapset-header__diff-name"
			).textContent;
			if (title && diffName) {
				(beatmapTitle = `${title} [${diffName}]`),
					(presenceData.details = "Looking at the beatmap:");
				presenceData.state = beatmapTitle;
				presenceData.smallImageKey = Assets.Search;
			}
		}
	} else if (document.location.pathname.startsWith("/beatmaps/packs")) {
		presenceData.details = "Browsing...";
		presenceData.state = "Beatmap Packs";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/beatmaps/artists")) {
		presenceData.details = "Browsing...";
		presenceData.state = "Featured Artists";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/store")) {
		presenceData.details = "Browsing...";
		presenceData.state = "The osu! Store";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/rankings")) {
		gamemode = document.location.pathname.split("/")[2];
		if (document.location.pathname.includes("/performance")) {
			if (
				document.querySelector("div.u-ellipsis-overflow").textContent !== "All"
			) {
				selected = document.querySelector("div.u-ellipsis-overflow");
				presenceData.details = "Browsing...";
				presenceData.state = `The Performance Rankings (for ${selected.textContent}) [${gamemode}]`;
				presenceData.smallImageKey = Assets.Search;
			} else {
				presenceData.details = "Browsing...";
				presenceData.state = `The Performance Rankings [${gamemode}]`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else if (document.location.pathname.includes("/charts")) {
			selected = document.querySelector("div.u-ellipsis-overflow");
			presenceData.details = "Browsing...";
			presenceData.state = `The ${gamemode} Spotlights (${selected.textContent})`;
			presenceData.smallImageKey = Assets.Search;
		} else if (document.location.pathname.includes("/score")) {
			presenceData.details = "Browsing...";
			presenceData.state = `The Score Rankings [${gamemode}]`;
			presenceData.smallImageKey = Assets.Search;
		} else if (document.location.pathname.includes("/country")) {
			presenceData.details = "Browsing...";
			presenceData.state = `The Country Rankings [${gamemode}]`;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.includes("kudosu")) {
		presenceData.details = "Browsing...";
		presenceData.state = "The Kudosu Rankings";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/multiplayer/rooms")) {
		selected = document.querySelector("div.u-ellipsis-overflow");
		presenceData.details = "Browsing...";
		presenceData.state = `${selected.textContent}`;
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/community/forums")) {
		if (document.location.pathname.split("/")[3] === "topics") {
			presenceData.details = "Reading...";
			presenceData.state = "A Forum Post";
			presenceData.smallImageKey = Assets.Reading;
		} else if (
			isNaN(parseInt(document.location.pathname.split("/")[3])) === false
		) {
			forumName = document
				.querySelector("h1.forum-title__name a.link--white.link--no-underline")
				.textContent.replace(/[\n|\r][\s\S][\s\S]/g, "")
				.trimStart()
				.trimEnd();
			presenceData.details = "Browsing...";
			presenceData.state = `Forums (${forumName})`;
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = "Browsing...";
			presenceData.state = "The Forums";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.startsWith("/community/chat"))
		presenceData.details = "Chatting...";
	else if (document.location.pathname.startsWith("/community/contests")) {
		presenceData.details = "Browsing...";
		presenceData.state = "Contests";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/community/livestreams")) {
		presenceData.details = "Browsing...";
		presenceData.state = "Livestreams";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/community/tournaments")) {
		presenceData.details = "Browsing...";
		presenceData.state = "Tournaments";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname.startsWith("/home/search")) {
		inputSelected = document.querySelector("#search-input");
		if (inputSelected) {
			presenceData.details = "Searching for:";
			presenceData.state =
				inputSelected.value !== "" ? inputSelected.value : "Nothing";
			presenceData.smallImageKey = Assets.Search;
		} else {
			presenceData.details = "Searching...";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.startsWith("/home/account/edit"))
		presenceData.details = "Changing account settings...";
	else if (document.location.pathname.startsWith("/wiki")) {
		selected = document.querySelector(
			"body > div.osu-layout__section.osu-layout__section--full.js-content.help_show > div.osu-page.osu-page--wiki > div > div.wiki-page__content > div > h1"
		);
		if (selected) {
			presenceData.details = "Reading...";
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/Main_Page")) {
			presenceData.details = "Reading...";
			presenceData.state = "Main Page";
			presenceData.smallImageKey = Assets.Reading;
		} else {
			selected = document.querySelector(
				"body > div.osu-layout__section.osu-layout__section--full.js-content.help_sitemap > div.osu-page.osu-page--generic"
			);
			presenceData.details = "Reading...";
			presenceData.state = selected.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname.startsWith("/home/changelog")) {
		presenceData.details = "Looking at...";
		presenceData.state = "Changelog";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.startsWith("/home/friends")) {
		presenceData.details = "Looking at...";
		presenceData.state = "Their Friend List";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.startsWith("/home/follows")) {
		presenceData.details = "Looking at...";
		presenceData.state = "Their Watchlists";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.startsWith("/users")) {
		profileName = document.querySelector<HTMLElement>(
			"h1.profile-info__name  span.u-ellipsis-pre-overflow"
		).textContent;
		rank = document.querySelector(".textContent-display__value").textContent;
		pp = document.querySelector(
			".textContent-display--pp .textContent-display__value"
		).textContent;
		profileRanking = `Rank: ${rank} / ${pp}pp`;
		presenceData.details =
			document.querySelector("div.u-relative").textContent === profileName
				? `Looking at ${profileName}'s Profile (Their Own)`
				: `Looking at ${profileName}'s Profile`;
		presenceData.state = profileRanking;
		presenceData.smallImageKey = Assets.Reading;
	} else {
		presenceData.details = "Viewing...";
		presenceData.state = "An Unsupported Page";
	}

	presence.setActivity(presenceData);
});
