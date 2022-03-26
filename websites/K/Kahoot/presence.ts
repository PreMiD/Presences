async function findRanking(rankingSelector: HTMLElement) {
	if (
		rankingSelector.textContent === strings.stString ||
		rankingSelector.textContent === strings.ndString ||
		rankingSelector.textContent === strings.rdString ||
		rankingSelector.textContent.replace(/\d+/, "{0}") === strings.topX
	)
		return true;
	else return false;
}

const presence = new Presence({
	clientId: "612793327510749210"
});

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
			gameLocked: "kahoot.gameLocked" // + Game Locked
		},
		await presence.getSetting<string>("lang")
	);
}

let currentQuestion: string,
	totalQuestions: string,
	score: string,
	ranking: string,
	top5: Promise<boolean>,
	strings: { [key: string]: string },
	oldLang: string = null,
	rankingSelector: HTMLElement;

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
				[currentQuestion, totalQuestions] = document
					.querySelector('[data-functional-selector="question-index-counter"]')
					.textContent.match(/\d+/g);
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
				[currentQuestion, totalQuestions] = document
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
				rankingSelector = document.querySelector(
					'[data-functional-selector="player-rank"]'
				);
				if (!rankingSelector) {
					presenceData.details = strings.resultsQuestion;
					presenceData.state = strings.pollAnswer;
				} else {
					score = document.querySelector(
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
				rankingSelector = document.querySelector(
					'[data-functional-selector="ranking-header"],[data-functional-selector="ranking-header-winners"]'
				);
				if (!rankingSelector) presenceData.details = strings.drumRoll;
				else {
					top5 = findRanking(rankingSelector);
					ranking = rankingSelector.textContent;
					score = document.querySelector(
						'[data-functional-selector="bottom-bar-score"]'
					).textContent;
					presenceData.details = top5
						? `${strings.gameOver} | ${ranking} | ${strings.points.replace(
								"{0}",
								score
						  )}`
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
			const path = document.location.pathname;
			if (path === "/v2/") {
				// Settings/game creation
				presenceData.details = strings.gameCreate;
			} else if (path.includes("/lobby")) {
				// Lobby screen
				presenceData.details = strings.waiting;

				if (buttons) {
					presenceData.buttons = [
						{
							label: `${strings.buttonJoinGame.replace(
								"{0}",
								document.querySelector('[data-functional-selector="game-pin"]')
									?.textContent ?? `(${strings.gameLocked})`
							)}`, // Join Game: ID
							url: "https://kahoot.it/"
						}
					];
				}
			} else if (path.includes("/start")) {
				// Game start
				presenceData.details = strings.gameStarting;
			} else if (path.includes("/gameover")) {
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
			} else if (
				path.includes("/gameblock") ||
				path.includes("/contentblock")
			) {
				if (
					document.querySelector(
						'[data-functional-selector="content-block-page"]'
					)
				) {
					// Showing a Slide with Content
					presenceData.details = strings.slideShowing;
				} else {
					// Question in progress
					const [currentQuestion, totalQuestions] = document
						.querySelector(
							'[data-functional-selector="bottom-bar-question-counter"]'
						)
						.textContent.split("/");
					presenceData.details = strings.questionShowing;
					presenceData.state = `${strings.questionNumber.replace(
						"{0}",
						`${strings.of
							.replace("{0}", currentQuestion)
							.replace("{1}", totalQuestions)}`
					)}`;
				}
			} else presenceData.details = strings.loadingPage;

			presence.setActivity(presenceData);
			break;
		}
		case "create.kahoot.it": {
			break;
		}
	}
});
