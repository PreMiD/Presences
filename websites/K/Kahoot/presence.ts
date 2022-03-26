const presence = new Presence({
	clientId: "612793327510749210"
});

function findRanking(rankingSelector: Element) {
	return (
		rankingSelector.textContent === strings.stString ||
		rankingSelector.textContent === strings.ndString ||
		rankingSelector.textContent === strings.rdString ||
		rankingSelector.textContent.replace(/\d+/, "{0}") === strings.topX
	);
}

async function getStrings() {
	return presence.getStrings(
		{
			buttonJoinGame: "kahoot.buttonJoinGame", // Join Game: {0}
			joiningGame: "kahoot.joiningGame", // Joining Game...
			waiting: "kahoot.waiting", // Waiting to Start...
			gameStarting: "kahoot.gameStarting", // Game Starting!
			playing: "kahoot.playing", // Playing...
			questionLoading: "kahoot.questionLoading", // Next Question Loading...
			incorrectAnswer: "kahoot.incorrectAnswer", // Incorrect Answer
			correctAnswer: "kahoot.correctAnswer", // Correct Answer
			pollAnswer: "kahoot.pollAnswer", // + Answered Poll
			resultsQuestion: "kahoot.resultsQuestion", // Looking at Results:
			slideViewing: "kahoot.slideViewing", // - Viewing Slide with Content...
			gameOver: "kahoot.gameOver", // Game Over
			gameCreate: "kahoot.gameCreate", // Creating a Game...
			loadingPage: "kahoot.loadingPage", // Loading Page...
			firstPlace: "kahoot.firstPlace", // First Place: {0}
			points: "kahoot.points", // Points: {0}
			questionsCorrect: "kahoot.questionsCorrect", // Questions Correct: {0}
			slideShowing: "kahoot.slideShowing", // - Showing Slide with Content...
			questionShowing: "kahoot.questionShowing", // Showing Question:
			stString: "kahoot.stString", // 1st place
			ndString: "kahoot.ndString", // 2nd place
			rdString: "kahoot.rdString", // 3rd place
			topX: "kahoot.topX", // Top {0}
			onPodium: "kahoot.onPodium", // + On the Podium
			of: "kahoot.of", // {0} of {1}
			questionNumber: "kahoot.questionNumber", // Question: {0}
			feedback: "kahoot.feedback", // Providing Feedback...
			waitingAnswer: "kahoot.waitingAnswer", // Waiting for Results...
			drumRoll: "kahoot.drumRoll", // + Waiting for Final Ranking...
			position: "kahoot.position", // + Position: {0},
			teamTalk: "kahoot.teamTalk", // + Discussing with Team...
			gameLocked: "kahoot.gameLocked", // + Game Locked
			gameSummary: "kahoot.gameSummary", // + Looking at Game Summary...
			login: "kahoot.login", // + Logging in...
			createHome: "kahoot.createHome", // + Viewing Create Home Page...
			discover: "kahoot.discover", // + Viewing Kahoot! Discover Page...
			searchKahoots: "kahoot.searchKahoots", // + Searching for Kahoots...
			kahootDetails: "kahoot.kahootDetails", // + Viewing Kahoot Details...
			kahootProfile: "kahoot.kahootProfile", // + Viewing Kahoot Profile...
			myKahoots: "kahoot.myKahoots", // + Viewing My Kahoots...
			userReports: "kahoot.userReports", // + Viewing Game Reports...
			myCourses: "kahoot.myCourses", // + Viewing My Courses...,
			editingCourse: "kahoot.editingCourse", // + Editing a Course...
			viewingCourse: "kahoot.viewingCourse", // + Viewing a Course...
			editingKahoot: "kahoot.editingKahoot", // + Editing a Kahoot...
			previewingKahoot: "kahoot.previewingKahoot", // + Previewing a Kahoot...
			liveCourse: "kahoot.liveCourse", // + Conducting a Course...
			liveCourseSummary: "kahoot.liveCourseSummary", // + Viewing Summary: {0}
			liveCourseActivity: "kahoot.liveCourseActivity" // + Doing Activity #{0}: {1}
		},
		await presence.getSetting("lang")
	);
}

let strings: { [key: string]: string },
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "kahoot"
		},
		buttons = await presence.getSetting<boolean>("buttons"),
		newLang = await presence.getSetting<string>("lang");

	oldLang ??= newLang;
	strings ??= await getStrings();
	if (oldLang !== newLang) oldLang = newLang;

	switch (location.host) {
		case "kahoot.it": {
			const path = document.location.pathname;

			if (path === "/" || path.includes("/join") || path === "/v2/") {
				// Home/Join screen
				presenceData.details = strings.joiningGame;
			} else if (path.includes("/instructions")) {
				// Waiting for game to start
				presenceData.details = strings.waiting;
			} else if (path.includes("/start")) {
				// Game is starting
				presenceData.details = strings.gameStarting;
			} else if (path.includes("/gameblock")) {
				// Playing/Answering a question
				const [currentQuestion, totalQuestions] = document
						.querySelector(
							'[data-functional-selector="question-index-counter"]'
						)
						.textContent.match(/\d+/g),
					score = document.querySelector(
						'[data-functional-selector="bottom-bar-score"]'
					).textContent;
				presenceData.details = strings.playing;
				presenceData.state = `${strings.questionNumber.replace(
					"{0}",
					strings.of
						.replace("{0}", currentQuestion)
						.replace("{1}", totalQuestions)
				)} | ${strings.points.replace("{0}", score)}`;
			} else if (path.includes("/getready")) {
				// Next question is loading
				const [currentQuestion, totalQuestions] = document
					.querySelector('[data-functional-selector="question-index-counter"]')
					.textContent.match(/\d+/g);
				presenceData.details = strings.questionLoading;
				presenceData.state = `${strings.questionNumber.replace(
					"{0}",
					strings.of
						.replace("{0}", currentQuestion)
						.replace("{1}", totalQuestions)
				)}`;
			} else if (path.includes("/teamtalk")) {
				// Team discussion time
				presenceData.details = strings.teamTalk;
			} else if (path.includes("/answer") && !path.includes("/result")) {
				// Waiting for question to end
				presenceData.details = strings.waitingAnswer;
			} else if (path.includes("/result")) {
				// Answer result screen
				const rankingSelector = document.querySelector(
					'[data-functional-selector="player-rank"]'
				);
				if (!rankingSelector) {
					presenceData.details = strings.resultsQuestion;
					presenceData.state = strings.pollAnswer;
				} else {
					const score = document.querySelector(
						'[data-functional-selector="bottom-bar-score"]'
					).textContent;
					presenceData.details = strings.resultsQuestion;
					presenceData.state = `${
						document.querySelector(
							'[data-functional-selector="correct-answer"]'
						)
							? strings.correctAnswer
							: strings.incorrectAnswer
					} | ${
						/\d+/.test(rankingSelector.textContent)
							? strings.position.replace(
									"{0}",
									rankingSelector.textContent.match(/\d+/)[0]
							  )
							: strings.onPodium
					} | ${strings.points.replace("{0}", score)}`;
				}
			} else if (path.includes("/contentblock")) {
				// Viewing a slide with content
				presenceData.details = strings.slideViewing;
			} else if (path.includes("/ranking")) {
				// Viewing the final ranking
				const rankingSelector = document.querySelector(
					'[data-functional-selector="ranking-header"],[data-functional-selector="ranking-header-winners"]'
				);
				if (!rankingSelector) presenceData.details = strings.drumRoll;
				else {
					const score = document.querySelector(
						'[data-functional-selector="bottom-bar-score"]'
					).textContent;
					presenceData.details = findRanking(rankingSelector)
						? `${strings.gameOver} | ${
								rankingSelector.textContent
						  } | ${strings.points.replace("{0}", score)}`
						: `${strings.gameOver} | ${strings.points.replace("{0}", score)}`;
				}
			} else if (path.includes("/feedback")) {
				// Providing feedback
				presenceData.details = strings.feedback;
			} else presenceData.details = strings.loadingPage;

			presence.setActivity(presenceData);
			break;
		}
		case "play.kahoot.it": {
			switch (location.pathname) {
				case "/v2/": {
					// Settings/game creation
					presenceData.details = strings.gameCreate;
					break;
				}
				case "/v2/lobby": {
					// Lobby screen
					presenceData.details = strings.waiting;

					if (buttons) {
						presenceData.buttons = [
							{
								label: `${strings.buttonJoinGame.replace(
									"{0}",
									document.querySelector(
										'[data-functional-selector="game-pin"]'
									)?.textContent ?? `(${strings.gameLocked})`
								)}`, // Join Game: ID
								url: "https://kahoot.it/"
							}
						];
					}
					break;
				}
				case "/v2/start": {
					// Game start
					presenceData.details = strings.gameStarting;
					break;
				}
				case "/v2/gameover": {
					presenceData.details = `${strings.firstPlace.replace(
						"{0}",
						document.querySelector('[data-functional-selector="winner"]')
							.textContent
					)} | ${strings.points.replace(
						"{0}",
						document.querySelector(
							'[data-functional-selector="place-1"] > [data-functional-selector="total-score"]'
						).textContent
					)}`;
					const correctCount = document.querySelector(
						'[data-functional-selector="correct-count-gold"]'
					);
					if (correctCount) {
						const [correct, total] = correctCount.textContent.match(/\d+/g);
						presenceData.state = strings.questionsCorrect.replace(
							"{0}",
							strings.of.replace("{0}", correct).replace("{1}", total)
						);
					} else
						presenceData.state = strings.questionsCorrect.replace("{0}", "0");
					break;
				}
				case "/v2/gameblock": {
					if (
						document.querySelector(
							'[data-functional-selector="content-block-page"]'
						)
					) {
						// Showing a Slide with Content
						presenceData.details = strings.slideShowing;
					} else {
						// Question in progress
						const questionCounter = document.querySelector(
							'[data-functional-selector="bottom-bar-question-counter"]'
						);
						if (!questionCounter) {
							// Question is starting
							presenceData.details = strings.questionLoading;
						} else {
							// Question is in progress
							const [currentQuestion, totalQuestions] =
								questionCounter.textContent.split("/");
							presenceData.details = strings.questionShowing;
							presenceData.state = `${strings.questionNumber.replace(
								"{0}",
								`${strings.of
									.replace("{0}", currentQuestion)
									.replace("{1}", totalQuestions)}`
							)}`;
						}
					}
					break;
				}
				case "/v2/game-summary": {
					// Game summary
					presenceData.details = strings.gameSummary;
					break;
				}
				default:
					presenceData.details = strings.loadingPage;
			}

			presence.setActivity(presenceData);
			break;
		}
		case "create.kahoot.it": {
			const { pathname: path } = location;
			switch (path) {
				case "/": {
					// Kahoot! Create home page
					presenceData.details = strings.createHome;
					break;
				}
				case "/after/login":
				case "/auth/login": {
					// Login
					presenceData.details = strings.login;
					break;
				}
				case "/discover": {
					// Discover
					presenceData.details = strings.discover;
					break;
				}
				case "/search": {
					// Search
					presenceData.details = strings.searchKahoots;
					presenceData.state = document.querySelector<HTMLInputElement>(
						'[data-functional-selector="search-box__input-field"]'
					).value;
					break;
				}
				default:
					if (path.startsWith("/details/")) {
						// Kahoot details
						presenceData.details = strings.kahootDetails;
						presenceData.state = document.querySelector(
							'[data-functional-selector="kahoot-detail__title"]'
						).textContent;
					} else if (path.startsWith("/profiles/")) {
						// Kahoot profile
						presenceData.details = strings.kahootProfile;
						presenceData.state = (
							document.querySelector(
								'[data-functional-selector="verified-user-profile-information"] > div > div'
							) ??
							document.querySelector(
								'[data-functional-selector="default-user-profile"] > div > div > div:nth-of-type(2) > div'
							)
						).firstChild.textContent.replace(/\n/g, " ");
					} else if (path.startsWith("/my-library/kahoots/")) {
						// My Kahoots
						presenceData.details = strings.myKahoots;
					} else if (path === "/user-reports") {
						// Game Reports
						presenceData.details = strings.userReports;
					} else if (path === "/my-library/courses") {
						// My Courses
						presenceData.details = strings.myCourses;
					} else if (path.startsWith("/course/")) {
						if (path.endsWith("/edit")) {
							// Editing a course
							presenceData.details = strings.editingCourse;
							presenceData.state = document.querySelector<HTMLInputElement>(
								'[data-functional-selector="course-title-input__course_title_input"]'
							).value;
						} else {
							// Viewing a course
							presenceData.details = strings.viewingCourse;
							presenceData.state = document.querySelector(
								'[data-functional-selector="course-details"] h2'
							).textContent;
						}
					} else if (path.startsWith("/creator/")) {
						// Editing a Kahoot!
						presenceData.details = strings.editingKahoot;
						presenceData.state = document.querySelector(
							'[data-functional-selector="top-bar__kahoot-summary-button"] > span'
						).textContent;
					} else if (path.startsWith("/preview/")) {
						// Previewing a Kahoot!
						presenceData.details = strings.previewingKahoot;
					} else if (path.startsWith("/v2/live-course/")) {
						// Live course
						presenceData.details = strings.liveCourse;
						const preview = document.querySelector(
							'[data-functional-selector="mega-menu__session-title"]'
						);
						if (preview) {
							presenceData.state = strings.liveCourseSummary.replace(
								"{0}",
								preview.textContent
							);
						} else {
							const course = document.querySelector(
									'[data-functional-selector="live-course-menu__toggle-mega-menu"] > span:nth-of-type(2)'
								),
								[number] = course.textContent.match(/^\d+/);
							presenceData.state = strings.liveCourseActivity
								.replace("{0}", number)
								.replace(
									"{1}",
									course.textContent.substring(number.length + 2)
								);
						}
					} else presenceData.details = strings.loadingPage;
			}

			presence.setActivity(presenceData);
			break;
		}
	}
});
