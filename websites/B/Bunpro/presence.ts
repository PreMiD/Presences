const presence: Presence = new Presence({
		clientId: "833430731816173669",
	}),
	levelImages: Record<string, string> = {
		10: "https://i.imgur.com/nQvo9Wo.png",
		20: "https://i.imgur.com/ag1vZVv.png",
		30: "https://i.imgur.com/FvJN63W.png",
		40: "https://i.imgur.com/pN5cZxs.png",
		50: "https://i.imgur.com/ETRB7TM.png",
		60: "https://i.imgur.com/WGCbykC.png",
		70: "https://i.imgur.com/7J4mGPp.png",
		80: "https://i.imgur.com/JOek4w6.png",
		90: "https://i.imgur.com/4s0tT5G.png",
		100: "https://i.imgur.com/VQHYuGy.png",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

function getLevelIcon(level: number) {
	let iconKey = levelImages["10"];
	if (level >= 10 && level < 100)
		iconKey = levelImages[`${Math.floor(level / 10) * 10}`];
	if (level < 10) iconKey = levelImages["10"];
	if (level >= 100) iconKey = levelImages["100"];
	return iconKey;
}

function applyGrammarPointDetails(presenceData: PresenceData) {
	const { pathname, href } = window.location;
	presenceData.details = "Viewing a grammar point";
	presenceData.state = document
		.querySelector<HTMLDivElement>("h1 > .grammar-point__text--main-kanji-new")
		.textContent.trim();
	if (!pathname.startsWith("/learn"))
		presenceData.buttons = [{ label: "View Grammar Point", url: href }];
}

function applyGrammarReviewDetails(presenceData: PresenceData) {
	const SRSLevel = document
			.querySelector<HTMLDivElement>(".review__stats.srs-tracker")
			?.textContent.trim(),
		percent = document
			.querySelector<HTMLDivElement>(".review__stats.review-percent")
			.textContent.trim(),
		[reviewsRemaining] = document
			.querySelector<HTMLDivElement>("#reviews")
			.textContent.match(/\d+/);
	if (SRSLevel)
		presenceData.state = `${SRSLevel} | ${percent} correct | ${reviewsRemaining} remaining`;
	 else
		presenceData.state = `${percent} correct | ${reviewsRemaining} remaining`;
}

presence.on("UpdateData", () => {
	const { pathname, hostname, href } = window.location,
		pathSplit = pathname.split("/").slice(1),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/NkfEDwV.png",
			startTimestamp: browsingTimestamp,
		};

	if (hostname === "community.bunpro.jp") {} else {
		const level = +document
			.querySelector<HTMLParagraphElement>(".header-user-level")
			?.textContent.match(/\d+/)[0];
		if (level) {
			presenceData.smallImageKey = getLevelIcon(level);
			presenceData.smallImageText = `Level ${level}`;
		}
		switch (pathSplit[0]) {
			case "bookmarks": {
				presenceData.details = "Viewing their bookmarks";
				break;
			}
			case "cram": {
				presenceData.details = "Cramming";
				if (
					document.querySelector<HTMLDivElement>(".cram-start").style
						.display === "none"
				)
					presenceData.state = "Selecting grammar to cram";
				 else
					applyGrammarReviewDetails(presenceData);
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				presenceData.state = `${
					document
						.querySelector<HTMLAnchorElement>(".reviews-link")
						.textContent.match(/\d+/)[0]
				} reviews`;
				break;
			}
			case "grammar_points": {
				if (pathSplit[1]) applyGrammarPointDetails(presenceData);
				else presenceData.details = "Browsing grammar points";
				break;
			}
			case "learn": {
				if (document.querySelector(".grammar-point-study"))
					applyGrammarPointDetails(presenceData);
				 else {
					presenceData.details = "Learning new grammar";
					applyGrammarReviewDetails(presenceData);
				}
				break;
			}
			case "lessons": {
				if (pathSplit[1]) {
					presenceData.details = "Practicing reading";
					presenceData.state = document.querySelector("h2").textContent.trim();
					presenceData.buttons = [{ label: "View Lesson", url: href }];
				} else presenceData.details = "Viewing lessons";
				break;
			}
			case "notifications": {
				presenceData.details = "Viewing their notifications";
				break;
			}
			case "paths": {
				if (pathSplit[1]) {
					if (pathSplit[2]) applyGrammarPointDetails(presenceData);
					else {
						presenceData.details = "Viewing a grammar path";
						presenceData.state = document
							.querySelector<HTMLHeadingElement>("h1")
							.childNodes[0].textContent.trim();
						presenceData.buttons = [{ label: "View Grammar Path", url: href }];
					}
				} else presenceData.details = "Browsing grammar paths";
				break;
			}
			case "reading_passages": {
				presenceData.details = "Browsing practice reading passages";
				break;
			}
			case "study": {
				presenceData.details = "Doing reviews";
				applyGrammarReviewDetails(presenceData);
				break;
			}
			case "summary": {
				presenceData.details = "Viewing review summary";
				presenceData.state = `${
					document
						.querySelector<HTMLDivElement>(".tab-highlight")
						.textContent.match(/\w+(?=:)/)[0]
				} - ${document.querySelector("h1").textContent}`;
				break;
			}
			case "user": {
				if (pathSplit[1] === "feedback")
					presenceData.details = "Viewing their feedback";
				 else {
					switch (pathSplit[2] ?? "") {
						case "": {
							presenceData.details = "Viewing their profile";
							const [daysStudied, studyStreak, level, xp] =
								document.querySelector<HTMLDivElement>(
									"h2 + div + div"
								).children;
							presenceData.state = `${
								daysStudied.querySelector<HTMLDivElement>("h3 + div")
									.textContent
							} days studied | ${
								studyStreak.querySelector<HTMLDivElement>("h3 + div")
									.textContent
							} streak | Level ${
								level.querySelector<HTMLDivElement>("h3 + div").textContent
							} (${
								xp.querySelector<HTMLDivElement>("h3 + div").textContent
							} XP)`;
							break;
						}
						case "badges": {
							for (const [i, badgeContainer] of document.querySelectorAll<HTMLDivElement>(
								".bunpro-badge.user-badge"
							).entries()) {
								slideshow.addSlide(
									i.toString(),
									{
										...presenceData,
										details: "Viewing their badges",
										state: `${
											badgeContainer.querySelector("h3").textContent
										} - ${
											badgeContainer.querySelector<HTMLDivElement>(
												".badge-requirement"
											).textContent
										}`,
										largeImageKey:
											badgeContainer.querySelector<HTMLImageElement>(
												".badge-icon"
											).src,
										smallImageText:
											badgeContainer.querySelector<HTMLDivElement>(
												".badge-flavor-text"
											).textContent,
									},
									5000
								);
							}
							break;
						}
						case "reset": {
							presenceData.details = "Resetting their account";
							break;
						}
						case "stats": {
							presenceData.details = "Viewing their stats";
							break;
						}
					}
				}
				break;
			}
			case "vocabs": {
				if (pathSplit[1]) {
					presenceData.details = "Viewing a vocabulary";
					presenceData.state = `${document.querySelector("h2").textContent} - ${
						document.querySelector("h6").textContent
					}`;
					presenceData.buttons = [{ label: "View Vocabulary", url: href }];
				} else {
					presenceData.details = "Searching for vocabulary";
					presenceData.state =
						document.querySelector<HTMLInputElement>("#query").value;
				}
				break;
			}
			default: {
				presenceData.details = "Browsing";
				presenceData.state = document.querySelector("h1")?.textContent.trim();
			}
		}
	}

	if (presenceData.details) {
		presence.setActivity(presenceData);
		slideshow.deleteAllSlides();
	} else if (slideshow.getSlides().length)
		presence.setActivity(slideshow);
	 else {
		presence.setActivity();
		slideshow.deleteAllSlides();
	}
});
