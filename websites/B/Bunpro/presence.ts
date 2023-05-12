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
	slideshow = presence.createSlideshow();

let browsingTimestamp = Math.floor(Date.now() / 1000),
	oldPath: string;

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
	presenceData.state = (
		document.querySelector(".grammar-point-study[style*='block']") ?? document
	)
		.querySelector<HTMLDivElement>(".grammar-point__text--main-kanji-new")
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

	if (oldPath !== pathname) {
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
		oldPath = pathname;
	}

	if (hostname === "community.bunpro.jp") {
		switch (pathSplit[0]) {
			case "":
			case "categories": {
				presenceData.details = "Browsing the community";
				break;
			}
			case "c": {
				presenceData.details = "Browsing community category";
				presenceData.state =
					document.querySelector<HTMLSpanElement>(".category-name").textContent;
				break;
			}
			case "latest": {
				presenceData.details = "Browsing latest topics";
				break;
			}
			case "new": {
				presenceData.details = "Browsing new topics";
				break;
			}
			case "search": {
				presenceData.details = "Searching the community";
				presenceData.state = document.querySelector<HTMLInputElement>(
					".search-bar > input"
				).value;
				break;
			}
			case "t": {
				presenceData.details = "Viewing a community topic";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.buttons = [{ label: "View Topic", url: href }];
				break;
			}
			case "top": {
				presenceData.details = "Browsing top topics";
				break;
			}
			case "u": {
				presenceData.details = `Viewing ${document
					.querySelector("h1")
					.textContent.trim()}'s community profile`;
				presenceData.state = document.querySelector<HTMLAnchorElement>(
					".user-primary-navigation .active"
				).textContent;
				presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
					".user-profile-avatar > img"
				).src;
				presenceData.smallImageText = `Level ${
					document
						.querySelector<HTMLDivElement>(".user-profile-avatar .avatar-flair")
						.title.match(/\d+/)[0]
				}`;
				presenceData.buttons = [{ label: "View Profile", url: href }];
				break;
			}
			case "unread": {
				presenceData.details = "Browsing unread topics";
				break;
			}
			default: {
				presenceData.details = "Browsing the community";
				presenceData.state = document.title.match(
					/^(.*?)( - Bunpro Community)?$/
				)[1];
			}
		}
	} else {
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
						.display !== "none"
				)
					presenceData.state = "Selecting grammar to cram";
				else applyGrammarReviewDetails(presenceData);
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				presenceData.state = `${
					document
						.querySelector<HTMLAnchorElement>(".reviews-link")
						.textContent.match(/\d+/)[0]
				} review${
					document
						.querySelector<HTMLAnchorElement>(".reviews-link")
						.textContent.match(/\d+/)[0] === "1"
						? ""
						: "s"
				}`;
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
							for (const [i, badgeContainer] of document
								.querySelectorAll<HTMLDivElement>(".bunpro-badge.user-badge")
								.entries()) {
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
	} else if (slideshow.getSlides().length) presence.setActivity(slideshow);
	else {
		presence.setActivity();
		slideshow.deleteAllSlides();
	}
});
