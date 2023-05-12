const presence: Presence = new Presence({
		clientId: "612415911877672971",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Ickm2Yv.jpg",
		startTimestamp: browsingTimestamp,
	},
	strings = presence.getStrings({
		browsing: "general.browsing",
	}),
	path: string = window.location.pathname;
let webtoon: string, chapter: string, seriesPage: string;

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
	if (path.includes("list")) {
		webtoon = document.querySelector(".subj").textContent;
		presenceData.details = "Looking at a webtoon";
		presenceData.state = webtoon;
		delete presenceData.smallImageKey;
	} else if (path.includes("viewer")) {
		webtoon = document.querySelector("div.subj_info > a.subj").textContent;
		chapter = `${
			document.querySelector("div.subj_info > .subj_episode").textContent
		} - ${document.querySelector(".tx").textContent}`;
		presenceData.details = `Reading ${webtoon}`;
		presenceData.state = chapter;
		delete presenceData.smallImageKey;
	} else if (path.includes("dailySchedule")) {
		seriesPage = document
			.querySelector("ul > li.completed")
			.getAttribute("class")
			.includes("on")
			? "completed"
			: "ongoing";
		presenceData.details = `Looking through the ${seriesPage} series`;
		delete presenceData.smallImageKey;
	} else if (path.includes("top"))
		presenceData.details = "Looking through popular series";
	else if (path.includes("genre")) {
		presenceData.details = "Looking through genres";
		delete presenceData.smallImageKey;
	} else if (path.includes("search")) {
		presenceData.details = "Searching...";
		presenceData.smallImageKey = Assets.Search;
	} else if (path.includes("about")) {
		presenceData.details = "Reading the about page";
		delete presenceData.smallImageKey;
	} else {
		presenceData.details = (await strings).browsing;
		delete presenceData.smallImageKey;
	}
	presence.setActivity(presenceData, true);
});
