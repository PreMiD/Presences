const presence = new Presence({
		clientId: "1314484095614451822",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/Dek-d/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const sections = {
			quiz: [
				"horoscope",
				"habit",
				"character",
				"love",
				"entertainment",
				"joke",
				"education",
				"knowledge",
				"adventure",
				"music",
				"movie",
				"cartoon",
				"game",
				"novel",
				"sport",
				"pet",
				"other",
			],
			tcas: [
				"dreamcareer",
				"reality",
				"onstage",
				"dreamcampus",
				"ontour",
				"review",
			],
			activity: "",
			studyabroad: [
				"exchange",
				"high_school",
				"bachelor",
				"master",
				"course",
				"work_travel",
				"foreign_culture",
				"global_review",
				"aec",
				"english_issue",
			],
			nugirl: "",
			teentrends: "",
			"pre-admission": "",
			studyabroadfair: "",
			wallet: "",
			board: [
				"tcas",
				"entertainment",
				"knowledge",
				"teen",
				"nugirl",
				"education",
				"studyabroad",
				"writer",
				"problem",
			],
			tag: "",
			visualnovel: "",
			loveroom: "",
			featured: "",
			store: "",
			review: "",
			collection: "",
		},
		titleText = document.querySelector("h1.title")?.textContent ?? "",
		pathSegments = document.location.pathname.split("/"),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
			// initial details in case of no match displaying the 1st path segment
			details: `Browsing ${pathSegments[1]}`,
		}, // board thread play function
		displaySec = (categorys = " ") => {
			presenceData.details = `Viewing${categorys}discussion thread`;
		};

	// main
	switch (document.location.hostname) {
		// handle subdomain ex novels.dek-d.com
		case "www.dek-d.com": {
			if (location.pathname === "/") presenceData.details = "Viewing home page";
			else if (Object.keys(sections).includes(pathSegments[1])) {
				switch (pathSegments[1]) {
					case "board": {
						displaySec(" ");
						if (sections.board.includes(pathSegments[2]))
							displaySec(` ${pathSegments[2]} `);

						if (pathSegments[3] !== "") presenceData.state = `${titleText}`;

						break;
					}
					case "tcas": {
						presenceData.details = `Viewing ${pathSegments[1]} thread`;
						if (!isNaN(Number(pathSegments[2])))
							presenceData.state = `${titleText}`;
						else if (sections.tcas.includes(pathSegments[2]))
							presenceData.details = `Browsing ${pathSegments[2]} on ${pathSegments[1]} thread`;

						break;
					}
					case "quiz": {
						presenceData.details = `Choosing ${pathSegments[1]}`;
						// all quiz type
						if (
							sections.quiz.includes(pathSegments[3]) &&
							pathSegments[2] === "all"
						)
							presenceData.details = `Choosing ${pathSegments[3]} ${pathSegments[1]}`;
						// every type except all type
						else if (pathSegments[2] !== "") {
							presenceData.details = `Choosing ${pathSegments[2]}`;
							// history page
							if (pathSegments[2] === "history")
								presenceData.details = `Watching quiz my ${pathSegments[2]}`;
							// doing quiz
							else if (
								!isNaN(Number(pathSegments[3])) &&
								pathSegments[3] !== ""
							) {
								presenceData.details = `Doing ${pathSegments[2]}`;
								presenceData.state = `${titleText}`;
								const img = document.querySelector("div.thumb-img .image");
								if (img) {
									const urlMatch = window
										.getComputedStyle(img)
										.getPropertyValue("background-image")
										.match(/url\(["']?([^"']*)["']?\)/);
									presenceData.largeImageKey = urlMatch ? urlMatch[1] : "";
								}
							} else if (sections.quiz.includes(pathSegments[3]))
								presenceData.details = `Choosing ${pathSegments[3]} ${pathSegments[2]}`;
						}
						break;
					}
					case "activity": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							presenceData.state = titleText;
							presenceData.largeImageKey = document
								.querySelector("a.link img")
								.getAttribute("src");
							presenceData.smallImageKey = Assets.Logo;
						} else if (
							pathSegments[3] !== "" &&
							!isNaN(Number(pathSegments[3]))
						) {
							const texts = document.querySelector("h2.header");
							presenceData.largeImageKey = document
								.querySelector("img.sharethumb")
								.getAttribute("src");
							presenceData.smallImageKey = Assets.Logo;
							presenceData.details = `Reading ${pathSegments[1]}`;
							presenceData.state = `${texts ? texts.textContent : ""}`;
						}
						break;
					}
					case "studyabroad": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							presenceData.state = titleText;
							presenceData.largeImageKey = document
								.querySelector(".image img")
								.getAttribute("src");
							presenceData.smallImageKey = Assets.Logo;
						} else if (sections.studyabroad.includes(pathSegments[2]))
							presenceData.details = `Browsing ${pathSegments[2]} on ${pathSegments[1]}`;

						break;
					}
					case "nugirl": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							presenceData.state = titleText;
							presenceData.largeImageKey = document
								.querySelector(".image img")
								.getAttribute("src");
							presenceData.smallImageKey = Assets.Logo;
						}
						break;
					}
					case "teentrends": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelector(".image img");
							if (img) presenceData.largeImageKey = img.getAttribute("src");
							presenceData.state = titleText;
							presenceData.smallImageKey = Assets.Logo;
						}
						break;
					}
					case "teentrend": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						break;
					}
					case "loveroom": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						break;
					}
					case "visualnovel": {
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							presenceData.state = titleText;
							presenceData.largeImageKey = document
								.querySelector(".image img")
								.getAttribute("src");
							presenceData.smallImageKey = Assets.Logo;
						}
						break;
					}
				}
			}
			break;
		}
		case "novel.dek-d.com": {
			presenceData.details = "Choosing novel to read";
			if (Object.keys(sections).includes(pathSegments[1]))
				presenceData.details = `Viewing novels ${pathSegments[1]}`;

			switch (pathSegments[1]) {
				// admin novel review
				case "article": {
					const headerTexts = document.querySelector(".special-intro"),
						headerT = headerTexts
							? headerTexts.querySelector("h2").textContent
							: "";
					presenceData.smallImageKey = Assets.Logo;
					presenceData.details = "Reading Admin Novels Review";
					presenceData.largeImageKey = document
						.querySelector("div.header-special picture img")
						.getAttribute("src");
					// assign the name of the novel to the state
					// incase there are white space in infront of the text but it worst for the Novel who have 2 or more words in the title
					for (let i = 0; i < headerT.split(" ").length; i++) {
						if (headerT.split(" ")[i] !== "") {
							presenceData.state = headerT.split(" ")[i];
							break;
						}
					}
					break;
				}
				// reader novel review
				case "novel": {
					const novelCoverElement = document.querySelector(
						"div.novel-cover-img"
					);
					if (novelCoverElement) {
						const urlMatch = window
							.getComputedStyle(novelCoverElement)
							.getPropertyValue("background-image")
							.match(/url\(["']?([^"']*)["']?\)/);
						presenceData.largeImageKey = urlMatch ? urlMatch[1] : Assets.Logo;
						if (presenceData.largeImageKey !== Assets.Logo)
							presenceData.smallImageKey = Assets.Logo;
					}
					presenceData.state = document.querySelector("a.link").textContent;
					presenceData.details = "Reader Novels Review";
					break;
				}
			}
			break;
		}
		case "writer.dek-d.com": {
			presenceData.details = "Viewing Novel home page";

			if (
				pathSegments[2] === "writer" &&
				document.location.href.includes(document.location.href.split("/")[5]) &&
				document.location.href.split("/")[5].split(".")[0] === "view"
			) {
				const novelCoverElement = document.querySelector("div.novel-cover-img");
				if (novelCoverElement) {
					const urlMatch = window
						.getComputedStyle(novelCoverElement)
						.getPropertyValue("background-image")
						.match(/url\(["']?([^"']*)["']?\)/);
					presenceData.largeImageKey = urlMatch ? urlMatch[1] : Assets.Logo;
					if (presenceData.largeImageKey !== Assets.Logo)
						presenceData.smallImageKey = Assets.Logo;
				}
				presenceData.state = document.querySelector("p.novel-name").textContent;
			}
			break;
		}
		// handle in case of no match subdomain
		default: {
			presenceData.details = "Browsing...";
		}
	}
	presence.setActivity(presenceData);
});
