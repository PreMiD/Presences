// TODO: Update for new Kahoot ranking system
async function findRanking(rankingSelector: HTMLElement) {
	if (
		rankingSelector.textContent === strings.stString ||
		rankingSelector.textContent === strings.ndString ||
		rankingSelector.textContent === strings.rdString ||
		rankingSelector.textContent === strings.topX
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
			buttonJoinGame: "kahoot.buttonJoinGame",
			joiningGame: "kahoot.joiningGame", // Joining game...
			waiting: "kahoot.waiting", // Waiting to start...
			gameStarting: "kahoot.gameStarting", // Game starting!
			playing: "kahoot.playing", // Playing:
			questionLoading: "kahoot.questionLoading", // Question: {0} | Loading...
			incorrectAnswer: "kahoot.incorrectAnswer", // Incorrect answer!
			correctAnswer: "kahoot.correctAnswer", // Correct answer!
			pollAnswer: "kahoot.pollAnswer", // Answered poll
			resultsQuestion: "kahoot.resultsQuestion", // Looking at results:
			slideViewing: "kahoot.slideViewing", // Viewing a slide with content
			gameOver: "kahoot.gameOver", // Game over!
			gameCreate: "kahoot.gameCreate",
			loadingPage: "kahoot.loadingPage",
			firstPlace: "kahoot.firstPlace",
			points: "kahoot.points", // {0} points
			questionsCorrect: "kahoot.questionsCorrect",
			slideShowing: "kahoot.slideShowing",
			questionShowing: "kahoot.questionShowing",
			stString: "kahoot.stString",
			ndString: "kahoot.ndString",
			rdString: "kahoot.rdString",
			topX: "kahoot.topX",
			onPodium: "kahoot.onPodium",
			of: "kahoot.of", // of
			questionNumber: "kahoot.questionNumber",
			feedback: "kahoot.feedback", // Providing feedback...
			waitingAnswer: "kahoot.waitingAnswer", // Waiting for question results...
			drumRoll: "kahoot.drumRoll" // Waiting for ranking results...
		},
		await presence.getSetting<string>("lang")
	);
}

let currentQuestion: string,
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

			if (path === "/" || path.includes("/join") || path === "/v2/")
				presenceData.details = strings.joiningGame;
			else if (path.includes("/instructions"))
				presenceData.details = strings.waiting;
			else if (path.includes("/start"))
				presenceData.details = strings.gameStarting;
			else if (path.includes("/gameblock")) {
				currentQuestion = document.querySelector(
					'[data-functional-selector="question-index-counter"]'
				).textContent;
				score = document.querySelector(
					'[data-functional-selector="bottom-bar-score"]'
				).textContent;
				presenceData.details = strings.playing;
				presenceData.state = `${strings.questionNumber.replace(
					"{0}",
					""
				)} ${currentQuestion} | ${strings.points.replace("{0}", "")} ${score}`;
			} else if (path.includes("/getready")) {
				currentQuestion = document.querySelector(
					'[data-functional-selector="question-index-counter"]'
				).textContent;
				presenceData.details = strings.questionLoading;
				presenceData.state = `${strings.questionNumber.replace(
					"{0}",
					""
				)} ${currentQuestion}`;
			} else if (path === "/answer")
				presenceData.details = strings.waitingAnswer;
			else if (path.includes("/result")) {
				score = document.querySelector(
					'[data-functional-selector="bottom-bar-score"]'
				).textContent;
				presenceData.details = strings.resultsQuestion;
				presenceData.state = `${
					document.querySelector('[data-functional-selector="correct-answer"]')
						? strings.correctAnswer
						: document.querySelector(
								'[data-functional-selector="survey-answer"]'
						  )
						? strings.pollAnswer
						: strings.incorrectAnswer
				} | ${strings.points.replace("{0}", "")} ${score}`;
			} else if (path.includes("/contentblock"))
				presenceData.details = strings.slideViewing;
			else if (path.includes("/ranking")) {
				rankingSelector = document.querySelector(
					'[data-functional-selector="ranking-header-winners"]'
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
								""
						  )} ${score}`
						: `${strings.gameOver} | ${strings.points.replace(
								"{0}",
								""
						  )} ${score}`;
				}
			} else if (path.includes("/feedback"))
				presenceData.details = strings.feedback;
			else presenceData.details = strings.loadingPage;

			presence.setActivity(presenceData);
			break;
		}
		case "play.kahoot.it": {
			const path = document.location.pathname;
			if (path === "/v2/") presenceData.details = strings.gameCreate;
			// Creating a Game...
			else if (path.includes("/lobby")) {
				presenceData.details = strings.waiting; // Waiting to Start...

				if (buttons) {
					presenceData.buttons = [
						{
							label: `${strings.buttonJoinGame.replace(
								"{0}",
								document.querySelector(
									"div.headerstyles__GamePinGrouped-jk6b9n-9"
								).textContent
							)}`, // Join Game: ID
							url: "https://kahoot.it/"
						}
					];
				}
			} else if (path.includes("/gameover")) {
				presenceData.details = `${strings.firstPlace.replace("{0}", "")} ${
					document.querySelector("div.player-name__PlayerName-sc-1m2ooy2-1")
						.textContent
				} | ${strings.points.replace("{0}", "")} ${
					document.querySelector("div.bar-styles__Score-ws2yhg-2").textContent
				}`; // First Place: User | Points: 100000
				presenceData.state = `${strings.questionsCorrect.replace("{0}", "")} ${
					document.querySelector("div.bar-styles__Count-ws2yhg-3").textContent
				}`; // Questions Correct: 1 of 10
			} else if (path.includes("/contentblock")) {
				presenceData.details = strings.slideShowing; // Showing a Slide with Content:
				presenceData.state = `${strings.questionNumber.replace("{0}", "")} ${`${
					document
						.querySelector("div.styles__QuestionCount-sc-17ic93d-8")
						.textContent.split("/")[0]
				} ${strings.of.replace("{0}", "").replace("{1}", "")} ${
					document
						.querySelector("div.styles__QuestionCount-sc-17ic93d-8")
						.textContent.split("/")[1]
				}`}`; // Question: 1 of 3
			} else if (path.includes("/gameblock")) {
				presenceData.details = strings.questionShowing; // Showing Question:
				presenceData.state = `${strings.questionNumber.replace("{0}", "")} ${`${
					document
						.querySelector("div.styles__QuestionCount-sc-17ic93d-8")
						.textContent.split("/")[0]
				} ${strings.of.replace("{0}", "").replace("{1}", "")} ${
					document
						.querySelector("div.styles__QuestionCount-sc-17ic93d-8")
						.textContent.split("/")[1]
				}`}`; // Question: 1 of 3
			} else presenceData.details = strings.loadingPage; // Loading Page:

			presence.setActivity(presenceData);

			break;
		}
		case "create.kahoot.it": {
			break;
		}
	}
});
