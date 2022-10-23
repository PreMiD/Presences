export const name = "Push the Button";
export const logo = "https://i.imgur.com/OhgGmMQ.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.state) {
		case "Lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "Logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "SuspicionVote": {
			presenceData.state = "Voting on who seems suspicious";
			break;
		}
		case "Probe": {
			presenceData.state = "Probing their fellow players";
			break;
		}
		case "Draw": {
			presenceData.state = "In the Drawing Quarters";
			break;
		}
		case "AnalyzePlayer": {
			presenceData.state = "Using the bioscanner - describing glyphs";
			break;
		}
		case "AnalysisReport": {
			presenceData.state = "Using the bioscanner - reading report";
			break;
		}
		case "MakeSingleChoice": {
			const { choiceType, gameInfo, prompt } = playerState,
				{ activeTest } = gameInfo as {
					activeTest: string;
				};
			if (choiceType) {
				switch (choiceType) {
					case "TutorialOptOut": {
						presenceData.state = "Choosing whether to skip the tutorial";
						break;
					}
					case "ConfirmedIdentity": {
						presenceData.state = "Confirming their identity";
						break;
					}
				}
			} else if (activeTest) {
				if (activeTest === "Push The Button")
					presenceData.state = "Accusing players";
				else presenceData.state = `Taking the ${activeTest} test`;
			} else {
				const html = prompt?.html;
				if (
					html === "You are the Captain.  What test would you like to perform?"
				) {
					presenceData.state = "Choosing a test to perform";
					break;
				} else if (/^Select <strong>.*?<\/strong> to Test!$/.test(html)) {
					presenceData.state = "Choosing players to test";
					break;
				}
			}
			break;
		}
		case "EnterSingleText": {
			const { activeTest } = playerState.gameInfo as {
				activeTest: string;
			};
			if (activeTest) presenceData.state = `Taking the ${activeTest} test`;
			break;
		}
		case "GameOver": {
			presenceData.state = `Viewing results - ${playerState.winningRole}s won`;
		}
	}
	return presenceData;
}
