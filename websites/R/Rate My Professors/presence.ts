const presence = new Presence({
		clientId: "1047546230525415535",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Info = "https://i.imgur.com/eIFVRHe.png",
	Logo = "https://i.imgur.com/zN7rsOi.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname.split("/").filter(x => x !== "");

	if (hostname === "www.ratemyprofessors.com") {
		switch (pathList[0]) {
			case "add": {
				switch (pathList[1]) {
					case "school-rating": {
						presenceData.details = "Rating a school";
						presenceData.state = document.querySelector<HTMLSpanElement>(
							"[class*='HeaderDescription__StyledTitleName'] span"
						).textContent;
						break;
					}
				}
				break;
			}
			case "flag": {
				switch (pathList[1]) {
					case "school-rating": {
						presenceData.details = "Reporting a rating for a school";
						break;
					}
				}
				break;
			}
			case "school": {
				presenceData.details = "Viewing a school";
				presenceData.state = document.querySelector<HTMLDivElement>(
					"[class*='StyledTitleName']"
				).textContent;
				presenceData.smallImageKey = Assets.Info;
				presenceData.smallImageText = `Quality: ${
					document.querySelector<HTMLDivElement>(
						"[class*='OverallRating__Number']"
					).textContent
				}`;
				break;
			}
			case "search": {
				presenceData.details = `Searching for a ${
					pathList[1] === "teachers" ? "professor" : "school"
				}`;
				presenceData.state = document
					.querySelector("h1 > span > b")
					.textContent.replace(/^\s*"(.*)"\s*$/, "$1");
				break;
			}
			case "submit-correction": {
				switch (pathList[1]) {
					case "campus": {
						presenceData.details = "Submitting a correction for a campus";
						break;
					}
				}
				break;
			}
			default: {
				presenceData.details = "Browsing";
			}
		}
	} else if (hostname === "help.ratemyprofessors.com") {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
