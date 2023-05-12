const presence = new Presence({
	clientId: "715667985267949649",
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
let title, subTitle, chapter, quiz, search;
const browsingTimestamp = Math.floor(Date.now() / 1000),
	path = document.location.pathname;
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/t370zFk.png",
		startTimestamp: browsingTimestamp,
	};
	if (path === "/") presenceData.details = "Viewing Home";
	else if (path.includes("/literature/")) {
		title = document.querySelector(
			"#mainTag > section > div:nth-child(1) > div.small-12.medium-9.columns > div.title-wrapper > h1"
		) as HTMLTextAreaElement;
		subTitle = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2 > span:nth-child(2)"
		) as HTMLTextAreaElement;
		chapter = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
		) as HTMLTextAreaElement;
		quiz = document.querySelector("#headerid");
		if (title && chapter) {
			presenceData.details = title.textContent;
			presenceData.state = chapter.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (title && subTitle) {
			presenceData.details = title.textContent;
			presenceData.state = subTitle.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (quiz) presenceData.details = "Taking a Quiz";
		else {
			title = document.querySelector(
				"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > div > div > div > div.small-12.medium-12.columns.clear-padding > article > h2"
			) as HTMLTextAreaElement;
			if (title) presenceData.details = title.textContent;
		}
	} else if (path.includes("/test-prep")) {
		title = document.querySelector(
			"#mainTag > section > div:nth-child(1) > div.small-12.medium-9.columns > div.title-wrapper > h1"
		) as HTMLTextAreaElement;
		subTitle = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2 > span:nth-child(2)"
		) as HTMLTextAreaElement;
		chapter = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
		) as HTMLTextAreaElement;
		quiz = document.querySelector("#headerid");
		if (title && chapter) {
			presenceData.details = title.textContent;
			presenceData.state = chapter.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (title && subTitle) {
			presenceData.details = title.textContent;
			presenceData.state = subTitle.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (quiz) presenceData.details = "Taking a Quiz";
		else presenceData.details = "Viewing Test Prep";
	} else if (path.includes("/study-guides/")) {
		title = document.querySelector(
			"#phsubheader_0_headerTitle"
		) as HTMLTextAreaElement;
		subTitle = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > div > div > h2"
		) as HTMLTextAreaElement;
		chapter = document.querySelector(
			"#mainTag > div.row.background-white > div.small-12.medium-9.columns.left-rail-column.clear-padding-for-small-only > div > div.small-12.medium-9.columns > article > h2"
		) as HTMLTextAreaElement;
		quiz = document.querySelector("#headerid");
		if (title && chapter) {
			presenceData.details = title.textContent;
			presenceData.state = chapter.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (title && subTitle) {
			presenceData.details = title.textContent;
			presenceData.state = subTitle.textContent;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Reading";
		} else if (quiz) presenceData.details = "Taking a Quiz";
		else presenceData.details = "Viewing Study Guides";
	} else if (path.includes("/search")) {
		search = document.querySelector(
			"#phsection1_1_phmiddlesection_0_searchResults > div > h3 > span"
		) as HTMLTextAreaElement;
		if (search) {
			presenceData.details = "Searching:";
			presenceData.state = search.textContent;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
		}
	} else if (path.includes("/discover-")) {
		title = document.querySelector(
			"#mainTag > section > div:nth-child(1) > div > div > h1"
		) as HTMLTextAreaElement;
		presenceData.details = `Viewing ${title.textContent}`;
	} else if (path === "/disclaimer")
		presenceData.details = "Viewing Disclaimer";
	else presenceData.details = "Viewing a Special Page";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
