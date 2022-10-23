export const name = "Blather 'Round";
export const logo = "https://i.imgur.com/qLW2Fft.png";

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
			switch (playerState.choiceType) {
				case "skipTutorial": {
					presenceData.state = "Watching the tutorial";
					break;
				}
				case "password": {
					presenceData.state = "Choosing a prompt";
					break;
				}
			}
			break;
		}
		case "MakeSentence": {
			switch ((playerState.sentence as { type: string }).type) {
				case "writing": {
					presenceData.state = "Crafting initial sentence";
					break;
				}
				case "call": {
					presenceData.state = "Crafting a sentence";
					break;
				}
				case "response": {
					presenceData.state = "Crafting a sentence using players' guesses";
					break;
				}
				case "mybad": {
					presenceData.state = "Deciding if they should have known the answer";
					break;
				}
			}
			break;
		}
		case "EnterSingleText": {
			presenceData.state = "Guessing the object";
			break;
		}
	}
	return presenceData;
}
