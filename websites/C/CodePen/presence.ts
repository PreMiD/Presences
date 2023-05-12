const presence = new Presence({
	clientId: "670111348130185267",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/fAkYGNA.png",
		smallImageKey: "logo-outline",
		smallImageText: "codepen.io",
		details: "Codepen.io",
		state: "Coding...",
	};

	if (
		window.location.pathname.includes("/fullpage/") ||
		window.location.pathname.includes("/pen/")
	) {
		presenceData.details = "Editing a pen";
		presenceData.state = `${
			document.querySelector("#editable-title-span").textContent
		} by ${
			document
				.querySelectorAll(".ItemTitle_ownerLink-tMhWC")[0]
				.textContent.split("<")[0]
		}`;
	} else if (window.location.pathname.includes("/collection/")) {
		presenceData.details = `Looking at collection ${
			document.querySelector("#collection-name").textContent
		}`;
		if (document.querySelector("#collection-desc").textContent === "") {
			presenceData.state = `Collection by ${
				document
					.querySelectorAll(".content-author")[0]
					.textContent.split("\n")[0]
			}`;
		} else {
			presenceData.state =
				document.querySelector("#collection-desc").textContent;
		}
	} else if (window.location.pathname.includes("/topic/")) {
		presenceData.details = `Looking at topic ${
			document.querySelectorAll(".Topics_topicTitle-3OfJU")[0].textContent
		}`;
		presenceData.state = document
			.querySelectorAll(".Topics_topicDescription-2CNwF")[0]
			.textContent.split("\n")[3];
	} else if (window.location.pathname.includes("/tv/")) {
		presenceData.details = `Watching ${document
			.querySelectorAll(".collection-details")[0]
			.textContent.replace("From “", "")
			.replace("”", "")} on Codepen TV`;
		presenceData.state = `${
			document.querySelectorAll(".item-title")[0].textContent
		} ${document.querySelectorAll(".pen-author")[0].textContent}`;
	} else if (
		window.location.pathname.includes("/project/") ||
		window.location.pathname.includes("/project/")
	) {
		presenceData.details = "Editing a project";
		presenceData.state = `${
			document.querySelector("#editable-title-span").textContent
		} by ${
			document
				.querySelectorAll(".ItemTitle_ownerLink-tMhWC")[0]
				.textContent.split("<")[0]
		}`;
	} else {
		switch (window.location.pathname) {
			case "/write/": {
				presenceData.details = "Making a post";
				if ((document.querySelector("#title") as HTMLInputElement).value === "")
					presenceData.state = "Thinking about what the title should be.";
				else {
					presenceData.state = (
						document.querySelector("#title") as HTMLInputElement
					).value;
				}

				break;
			}
			case "/": {
				presenceData.details = "On the home page";
				presenceData.state = "Looking at code snippets.";

				break;
			}
			case "/dashboard/": {
				presenceData.details = "On dashboard";
				presenceData.state = "Admiring their own pens.";

				break;
			}
			default:
				if (window.location.pathname.includes("/search/")) {
					presenceData.details = "Searching for pens";
					presenceData.state = `Looking for ${location.search.replace(
						"?q=",
						""
					)}`;
				} else if (!document.querySelectorAll(".title-header")[0]) {
					presenceData.details = "Looking at page";
					presenceData.state = document.title;
				} else {
					presenceData.details = "Looking at page";
					[presenceData.state] = document
						.querySelectorAll(".title-header")[0]
						.textContent.split("\n");
				}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
