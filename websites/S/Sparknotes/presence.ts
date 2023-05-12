const presence = new Presence({
		clientId: "714628886222209105",
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
let chapter, titlePage, title, subject;
const path = document.location.pathname;
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/jZEhnvk.png",
	};
	function subjectCondition(subject: string): string {
		title = document.querySelector(
			"body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
		);
		if (path === `/${subject}/`) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = `Viewing ${subject.replace(/-/gi, " ")}`;
		} else if (title) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = title.textContent;
			chapter = document.querySelector(
				"body > header.interior-header > div > div.interior-header__title > div"
			);
			if (chapter) presenceData.state = chapter.textContent;
		}
		return;
	}
	title = document.querySelector(
		"body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
	);
	switch (path) {
		case "/": {
			presenceData.details = "Viewing Home";
			presenceData.startTimestamp = browsingTimestamp;

			break;
		}
		case "/shakespeare/": {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing Shakespheare Literature";

			break;
		}
		case "/lit/": {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing All Literature";

			break;
		}
		default:
			if (path.includes("/blog/")) {
				title = document.querySelector("head > title");
				if (title) {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Viewing: ";
					presenceData.state = title.textContent.replace(
						" | The SparkNotes Blog",
						""
					);
				} else {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Viewing Blog";
				}
			} else if (path.includes("/writinghelp/")) {
				title = document.querySelector(
					"body > header.titleHeader--howTo > div > h1"
				);
				if (title) {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Viewing:";
					presenceData.state = title.textContent;
				}
			} else {
				switch (path) {
					case "/othersubjects/": {
						presenceData.startTimestamp = browsingTimestamp;
						presenceData.details = "Viewing Other Subjects";

						break;
					}
					case "/math/": {
						subjectCondition("math");
						break;
					}
					case "/biology/": {
						subjectCondition("biology");
						break;
					}
					case "/american-government/": {
						subjectCondition("american-government");
						break;
					}
					case "/sociology/": {
						subjectCondition("sociology");
						break;
					}
					case "/poetry/": {
						subjectCondition("poetry");
						break;
					}
					case "/drama/": {
						subjectCondition("drama");
						break;
					}
					case "/cs/": {
						subject = "cs";
						title = document.querySelector(
							"body > header.TitleHeader_header.TitleHeader_header--studyGuide > div > div > h1"
						);
						if (path === `/${subject}/`) {
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = "Viewing Computer Science";
						} else if (title) {
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = title.textContent;
							chapter = document.querySelector(
								"body > header.interior-header > div > div.interior-header__title > div"
							);
							if (chapter) presenceData.state = chapter.textContent;
						}

						break;
					}
					case "/health/": {
						subjectCondition("health");
						break;
					}
					case "/physics/": {
						subjectCondition("physics");
						break;
					}
					case "/biography/": {
						subjectCondition("biography");
						break;
					}
					case "/economics/": {
						subjectCondition("economics");
						break;
					}
					case "/history/": {
						subjectCondition("history");
						break;
					}
					case "/philosophy/": {
						subjectCondition("philosophy");
						break;
					}
					case "/psychology/": {
						subjectCondition("psychology");
						break;
					}
					case "/us-government-and-politics/": {
						subjectCondition("us-government-and-politics");
						break;
					}
					case "/search": {
						title = (
							document.querySelector(
								"#results-search-input"
							) as HTMLInputElement
						).value;
						presenceData.startTimestamp = browsingTimestamp;
						presenceData.details = "Searching:";
						presenceData.state = title;

						break;
					}
					default:
						if (title) {
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = `Viewing: ${title.textContent}`;
							chapter = document.querySelector("#section > h3:nth-child(2)");
							titlePage = document.querySelector(
								"body > header.interior-header > div > div.interior-header__title > div > span.interior-header__title__pagetitle"
							);
							if (chapter) presenceData.state = chapter.textContent;
							else if (titlePage) presenceData.state = titlePage.textContent;
							else presenceData.state = "Viewing Study Guide";
						} else if (
							title === null &&
							document.querySelector(
								"body > header.TitleHeader_header.TitleHeader_header--noFear > div > div > h1"
							)
						) {
							title = document.querySelector(
								"body > header.TitleHeader_header.TitleHeader_header--noFear > div > div > h1"
							);
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = `Viewing: ${title.textContent}`;
							presenceData.state = `${document
								.querySelector(".interior-header__title__umbrella-label")
								.textContent.trim()} ${document
								.querySelector(".interior-header__title__text__pagetitle")
								.textContent.trim()}`;
						} else if (path === "/login/") {
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = "Login Unavailable";
						} else if (path === "/help/") {
							presenceData.startTimestamp = browsingTimestamp;
							presenceData.details = "Viewing Help";
						} else {
							presenceData.details = "Unable to Read Page";
							presenceData.startTimestamp = browsingTimestamp;
						}
				}
			}
	}
	// Used To Start The RPC
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
