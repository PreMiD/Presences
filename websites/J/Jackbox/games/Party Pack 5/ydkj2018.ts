export const name = "You Don't Know Jack: Full Stream";
export const logo = "https://i.imgur.com/Li8TLXI.png";

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
			switch (playerState.roundType) {
				case "Shortie": {
					presenceData.state = "Answering a short trivia question";
					break;
				}
				case "DisOrDat": {
					presenceData.state = "Answering a dis-or-dat question";
					break;
				}
				case "PlayersChoice": {
					presenceData.state = "Choosing a type of question";
					break;
				}
				case "JackAttack": {
					presenceData.state = "Playing Jack Attack";
					break;
				}
			}
			break;
		}
	}
	return presenceData;
}
