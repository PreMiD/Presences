const presence: Presence = new Presence({
		clientId: "833430731816173669",
		injectOnComplete: true,
	}),
	largeImageKey = "logo";

function getLevelIcon(level: number) {
	let iconKey = "level-10";

	if (level >= 10 && level < 100)
		iconKey = `level-${+(level / 100).toPrecision(1) * 100}`;

	if (level < 10) iconKey = "level-10";

	if (level >= 100) iconKey = "level-100";

	return iconKey;
}

function getLevelInHeader() {
	const levelElement: HTMLDivElement =
		document.querySelector(".navbar-user-level");

	if (!levelElement) return null;

	return +levelElement.textContent.slice(6);
}

presence.on("UpdateData", () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			largeImageKey,
		},
		level: number = getLevelInHeader();

	let details: string,
		state: string,
		smallImageText: string,
		startTimestamp: number;

	if (/grammar_points\/\d+/i.test(pathname)) {
		startTimestamp = Date.now();
		details = "Doing Lessons";

		const [lessonType, lessonProgress] = document
			.querySelector(".header__lesson-progress")
			.textContent.split(": ");

		state = `Learning ${
			document.querySelector(
				".grammar-point__title.grammar-point__title--default"
			).textContent
		}`;

		smallImageText = `${lessonType}: ${lessonProgress}`;
	} else {
		switch (pathname) {
			case "/study": {
				startTimestamp = Date.now();
				details = "Doing reviews";

				const hintText = document.querySelector(
						".study-question-english-hint"
					).textContent,
					SRSLevel = document.querySelector(
						".review__stats.srs-tracker"
					).textContent;

				smallImageText = document.querySelector(
					".review__stats.review-percent"
				).textContent;

				state = hintText ? `${hintText} (${SRSLevel})` : SRSLevel;

				break;
			}
			case "/bookmarks":
			case "/lessons":
			case "/grammar_points": {
				details = "Browsing Grammar";

				break;
			}
			case "/learn": {
				startTimestamp = Date.now();

				if (
					(
						document.querySelector(
							"#learn-new-grammar-page"
						) as HTMLStyleElement
					).style.display === "block"
				) {
					details = "Learning New Grammar (Quiz)";
					smallImageText = `${
						document.querySelector(".review__stats#reviews").textContent
					}`;
				} else {
					details = "Learning New Grammar";

					let activeGrammarPoint: HTMLDivElement;

					activeGrammarPoint = document.querySelector(
						'.grammar-point-study[style*="display: block"]'
					);

					activeGrammarPoint ??= document.querySelector(".grammar-point-study");

					smallImageText = activeGrammarPoint.querySelector(
						".header__lesson-progress"
					).textContent;
				}

				break;
			}
			case "/cram": {
				if (
					(document.querySelector(".cram-start") as HTMLStyleElement).style
						.display !== "none"
				) {
					details = "Browsing Grammar";
					break;
				}

				startTimestamp = Date.now();
				details = "Doing Cram";

				state = `Reviewing ${
					document.querySelector(".study-question-english-hint").textContent
				}`;

				smallImageText = document.querySelector(
					".review__stats#reviews"
				).textContent;

				break;
			}
			case "/":
			case "/dashboard":
			case "/login":
			default: {
				const reviews: HTMLDivElement = document.querySelector(
					"#user-dashboard > div:nth-child(1) > div.col-lg-7.col-md-12.height-100.d-flex.flex-column.flex-grow-2.pl-0.pr-xl-3.pr-0 > div:nth-child(1) > div.col-md-6.col-12.pl-md-1.pr-md-0.pr-0.pl-0 > div > div:nth-child(3)"
				);

				if (reviews) {
					details = "Viewing Dashboard";
					state = `${reviews.textContent} reviews`;
				} else details = "Browsing Pages";

				break;
			}
		}
	}

	presenceData.details = details;

	if (state) presenceData.state = state;

	if (level) {
		presenceData.smallImageKey = getLevelIcon(level);

		smallImageText ??= `Level ${level}`;
	}
	if (smallImageText) presenceData.smallImageText = smallImageText;

	if (startTimestamp)
		presenceData.startTimestamp = Math.round(startTimestamp / 1000);

	presence.setActivity(presenceData);
});
