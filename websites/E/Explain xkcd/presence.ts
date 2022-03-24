const presence = new Presence({
		clientId: "956341194131116072"
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

function getComicNumber() {
	const comicHeaderText = document.querySelector("table td li:nth-of-type(3)").textContent,
		[comicNumber] = comicHeaderText.match(/\d+(?=\s\()/);
	return comicNumber;
}

function getComicName() {
	return document.querySelector("table tr:nth-of-type(2)").textContent;
}

function getTitleText() {
	const titleText = document.querySelector(".image + br + span").textContent;
	return titleText.substring(12);
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp
		},
		path = window.location.pathname.split("/wiki/index.php/")[1] ?? "";
	if (path === "Main_Page") {
		presenceData.details = "Viewing the main page";
		presenceData.state = `Comic #${getComicNumber()}: ${getComicName()}`;
		presenceData.smallImageKey = "explainer";
		presenceData.smallImageText = getTitleText();
	} else if (/^\d+:_\w+$/.test(path)) { // comic page
		presenceData.details = "Viewing a comic explanation";
		presenceData.state = `Comic #${getComicNumber()}: ${getComicName()}`;
		presenceData.smallImageKey = "explainer";
		presenceData.smallImageText = getTitleText();
	} else if (/^User:/.test(path)) { // user page
		presenceData.details = "Viewing a user page";
		presenceData.state = `User: ${path.substring(5)}`;
	} else if (/^Special:Contributions\/\w+/.test(path)) { // user contributions
		presenceData.details = "Viewing a user's contributions";
		presenceData.state = `User: ${path.substring(22)}`;
	} else if (/^User_talk:/.test(path)) { // user talk page
		presenceData.details = "Viewing a user's talk page";
		presenceData.state = `User: ${path.substring(10)}`;
	} else if (path === "" && /^\?.*action=edit/.test(location.search)) { // edit page
		const title = document.getElementById("firstHeading").textContent;
		if (title.startsWith("Editing")) {
			presenceData.details = "Editing a page";
			presenceData.state = title.substring(8);
		} else if (title.startsWith("Creating")) {
			presenceData.details = "Creating a page";
			presenceData.state = title.substring(9);
		} else { // No permission to edit
			presenceData.details = "Viewing a page's source";
			presenceData.state = title.substring(16);
		}
	} else if (path === "" && /^\?.*action=history/.test(location.search)) { // history page
		const title = document.getElementById("firstHeading").textContent;
		presenceData.details = "Viewing a page's history";
		presenceData.state = title.substring(21, title.length - 1);
	} else if (/^Talk:/.test(path)) { // talk page
		const title = document.getElementById("firstHeading").textContent;
		presenceData.details = "Viewing a talk page";
		presenceData.state = title.substring(5);
	} else if (/^Category:/.test(path)) { // category page
		const title = document.getElementById("firstHeading").textContent;
		presenceData.details = "Viewing a category";
		presenceData.state = title.substring(9);
	} else if (path === "" && /^\?.*search=/.test(location.search)) { // search page
		presenceData.details = "Searching Explain xkcd";
		presenceData.state = (document.querySelector("#searchText > input") as HTMLInputElement).value;
	} else {
		const title = document.getElementById("firstHeading").textContent;
		presenceData.details = "Viewing a page";
		presenceData.state = title;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});