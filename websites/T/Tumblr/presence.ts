const presence = new Presence({
		clientId: "640963335826833418",
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

let user: HTMLElement, search: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/AE5bq1T.png",
	};

	if (document.location.hostname === "www.tumblr.com") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("/u/")) {
			presenceData.startTimestamp = browsingTimestamp;
			user = document.querySelector(
				"#container > div.page > div.main-wrap > div > section > header > h2"
			);
			presenceData.details = "Viewing user:";
			presenceData.state = user.textContent;
		} else if (
			document.querySelector(
				"#container > div.page > div.main-wrap > div.profile > section > header > h2"
			) !== null
		) {
			user = document.querySelector(
				"#container > div.page > div.main-wrap > div.profile > section > header > h2"
			);
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing catagory:";
			presenceData.state = user.textContent;
		} else if (document.location.pathname.includes("/dashboard")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their dashboard";
		} else if (document.location.pathname.includes("/new")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Making a new post...";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/trending")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing what's trending";
		} else if (document.location.pathname.includes("/staff-picks")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing staff picks";
		} else if (document.location.pathname.includes("/photos")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing photos";
		} else if (document.location.pathname.includes("/gif")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing GIF's";
		} else if (document.location.pathname.includes("/audio")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing audio's";
		} else if (document.location.pathname.includes("/inbox")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their inbox";
		} else if (document.location.pathname.includes("/video")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing video's";
		} else if (document.location.pathname.includes("/text")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Reading texts";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/recommended-for-you")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing recommendations";
		} else if (document.location.pathname.includes("/settings")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their settings";
		} else if (document.location.pathname.includes("/asks")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Reading questions";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/quotes")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Reading quotes";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/chats")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Reading chats";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/search")) {
			search = document.querySelector(
				"#search_actions_search > div.l-container.l-container--flex > div > div > div.search_sub_header > h1"
			);
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Searching for:";
			presenceData.state = search.textContent;
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (
		document.querySelector(
			"#header > div.blog-title-wrapper.content > div > h1 > a"
		) !== null
	) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing user:";
		presenceData.state = document.querySelector(
			"#header > div.blog-title-wrapper.content > div > h1 > a"
		).textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
