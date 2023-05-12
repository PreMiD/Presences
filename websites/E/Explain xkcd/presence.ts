const presence = new Presence({
		clientId: "956341194131116072",
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

function getComicNumber() {
	return document
		.querySelector("table td li:nth-of-type(3)")
		.textContent.match(/\d+(?=\s\()/)[0];
}

function getComicName() {
	return document.querySelector("table tr:nth-of-type(2)").textContent;
}

function getTitleText() {
	let text = document
		.querySelector(".image + br + span")
		.textContent.substring(12);
	if (text.length > 127) text = `${text.substring(0, 124)}...`;

	return text;
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/mZSiamM.png",
			startTimestamp: browsingTimestamp,
		},
		path = window.location.pathname.split("/wiki/index.php/")[1] ?? "";
	if (path === "Main_Page") {
		presenceData.details = "Viewing the main page";
		presenceData.state = `Comic #${getComicNumber()}: ${getComicName()}`;
		presenceData.smallImageKey = "explainer";
		presenceData.smallImageText = getTitleText();
	} else if (/^\d+:_\w+$/.test(path)) {
		// comic page
		presenceData.details = "Viewing a comic explanation";
		presenceData.state = `Comic #${getComicNumber()}: ${getComicName()}`;
		presenceData.smallImageKey = "explainer";
		presenceData.smallImageText = getTitleText();
	} else if (path.startsWith("User:")) {
		// user page
		presenceData.details = "Viewing a user page";
		presenceData.state = `User: ${path.substring(5)}`;
	} else if (
		path.startsWith("Special:Contributions/") ||
		(path === "" && /^\?.*title=Special%3AContributions/.test(location.search))
	) {
		// user contributions
		presenceData.details = "Viewing a user's contributions";
		presenceData.state = `User: ${
			document.querySelector("#contentSub > a").textContent
		}`;
	} else if (path.startsWith("User_talk:")) {
		// user talk page
		presenceData.details = "Viewing a user's talk page";
		presenceData.state = `User: ${path.substring(10)}`;
	} else if (path === "" && /^\?.*action=edit/.test(location.search)) {
		// edit page
		const title = document.querySelector("#firstHeading").textContent;
		if (title.startsWith("Editing")) {
			presenceData.details = "Editing a page";
			presenceData.state = title.substring(8);
		} else if (title.startsWith("Creating")) {
			presenceData.details = "Creating a page";
			presenceData.state = title.substring(9);
		} else {
			// No permission to edit
			presenceData.details = "Viewing a page's source";
			presenceData.state = title.substring(16);
		}
	} else if (path === "" && /^\?.*action=history/.test(location.search)) {
		// history page
		const title = document.querySelector("#firstHeading").textContent;
		presenceData.details = "Viewing a page's history";
		presenceData.state = title.substring(21, title.length - 1);
	} else if (path.startsWith("Talk:")) {
		// talk page
		presenceData.details = "Viewing a talk page";
		presenceData.state = document
			.querySelector("#firstHeading")
			.textContent.substring(5);
	} else if (path.startsWith("Category:")) {
		// category page
		presenceData.details = "Viewing a category";
		presenceData.state = document
			.querySelector("#firstHeading")
			.textContent.substring(9);
	} else if (path === "" && /^\?.*search=/.test(location.search)) {
		// search page
		presenceData.details = "Searching Explain xkcd";
		presenceData.state = document.querySelector<HTMLInputElement>(
			"#searchText > input"
		).value;
	} else {
		presenceData.details = "Viewing a page";
		presenceData.state = document.querySelector("#firstHeading").textContent;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
