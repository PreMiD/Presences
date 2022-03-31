const iframe = new iFrame();
{
	let browsingTimestamp = Math.floor(Date.now() / 1000),
		timestampUpdateState = 0;

	iframe.on("UpdateData", async () => {
		const presenceData: KahootFrameData = {
			largeImageKey: "kahoot",
			startTimestamp: browsingTimestamp
		};
		switch (location.pathname) {
			case "/v2/": {
				// Settings/game creation
				presenceData.details = "gameCreate";
				break;
			}
			case "/v2/lobby": {
				// Lobby screen
				presenceData.details = "waiting";
				// Set start timestamp after game has been created
				if (timestampUpdateState === 0) {
					browsingTimestamp = Math.floor(Date.now() / 1000);
					presenceData.startTimestamp = browsingTimestamp;
					timestampUpdateState = 1;
				}
				const pin = document.querySelector(
					'[data-functional-selector="game-pin"]'
				)?.textContent;
				if (pin) {
					presenceData.buttons = [
						{
							label: "buttonJoinGame",
							content: [pin],
							url: `https://kahoot.it/?pin=${pin}`
						}
					];
				}
				break;
			}
			case "/v2/start": {
				// Game start
				presenceData.details = "gameStarting";
				// Allow timestamp to be reset upon a potential replay
				if (timestampUpdateState === 1) timestampUpdateState = 0;
				break;
			}
			case "/v2/gameover": {
				presenceData.details = "firstPlace";
				presenceData.detailsContent = [
					[
						"firstPlace",
						document.querySelector('[data-functional-selector="winner"]')
							.textContent
					],
					"|",
					[
						"points",
						document.querySelector(
							'[data-functional-selector="place-1"] > [data-functional-selector="total-score"]'
						).textContent
					]
				];
				const correctCount = document.querySelector(
					'[data-functional-selector="correct-count-gold"]'
				);
				if (correctCount) {
					const [correct, total] = correctCount.textContent.match(/\d+/g);
					presenceData.state = "questionsCorrect";
					presenceData.stateContent = [["of", correct, total]];
				} else presenceData.state = "questionsCorrect";
				presenceData.stateContent = ["0"];
				break;
			}
			case "/v2/gameblock": {
				if (
					document.querySelector(
						'[data-functional-selector="content-block-page"]'
					)
				) {
					// Showing a Slide with Content
					presenceData.details = "slideShowing";
				} else {
					// Question in progress
					const questionCounter = document.querySelector(
						'[data-functional-selector="bottom-bar-question-counter"]'
					);
					if (!questionCounter) {
						// Question is starting
						presenceData.details = "questionLoading";
					} else {
						// Question is in progress
						const [currentQuestion, totalQuestions] =
							questionCounter.textContent.split("/");
						presenceData.details = "questionShowing";
						presenceData.state = "questionNumber";
						presenceData.stateContent = [
							["of", currentQuestion, totalQuestions]
						];
					}
				}
				break;
			}
			case "/v2/game-summary": {
				// Game summary
				presenceData.details = "gameSummary";
				break;
			}
			default:
				presenceData.details = "loadingPage";
		}

		iframe.send(presenceData);
	});
}
