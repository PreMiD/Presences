export const name = "Trivia Murder Party 2";
export const logo = "https://i.imgur.com/9MmGVGD.png";

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
		case "MakeSingleChoice": {
			if (playerState.roundType === "FinalRound")
				presenceData.state = "Answering the final trivia questions";
			else {
				switch (playerState.choiceType) {
					case "SkipTutorial": {
						presenceData.state = "Watching the intro";
						break;
					}
					case "Question": {
						presenceData.state = "Answering trivia";
						break;
					}
					case "Rule": {
						presenceData.state = "Playing a rule game";
						break;
					}
					case "PostGameChoice": {
						presenceData.state = "Choosing a post-game option";
						break;
					}
					default: {
						presenceData.state = "Playing a death game";
					}
				}
			}
			break;
		}
		case "EnterSingleText": {
			const { entryId } = playerState;
			if (entryId.startsWith("MindMeld")) {
				presenceData.state = "Playing the mind meld game";
				break;
			} else if (entryId === "CreatePassword") {
				presenceData.state = "Creating a password for the password game";
				break;
			} else if (entryId === "Quiplash") {
				presenceData.state = `Playing Quiplash - ${playerState.prompt.html}`;
				break;
			} else presenceData.state = "Playing a text death game";
			break;
		}
		case "Draw": {
			presenceData.state = "Playing a drawing death game";
			break;
		}
	}
	return presenceData;
}
