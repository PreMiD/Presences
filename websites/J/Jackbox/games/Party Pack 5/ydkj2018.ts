export const name = "You Don't Know Jack: Full Stream";
export const logo = "https://i.imgur.com/Li8TLXI.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	switch (playerState.state) {
		case "Lobby": {
			return {state:"Waiting in lobby"};
		}
		case "Logo": {
			return {state:"Waiting"};
		}
		case "MakeSingleChoice": {
			switch (playerState.roundType) {
				case "Shortie": {
					return {state:"Answering a short trivia question"};
				}
				case "DisOrDat": {
					return {state:"Answering a dis-or-dat question"};
				}
				case "PlayersChoice": {
					return {state:"Choosing a type of question"};
				}
				case "JackAttack": {
					return {state:"Playing Jack Attack"};
				}
			}
			break;
		}
	}
	return {};
}
