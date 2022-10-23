export const name = "Civic Doodle";
export const logo = "https://i.imgur.com/6CBskbM.png";

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
		case "Draw": {
			presenceData.state = "Drawing";
			break;
		}
		case "Reaction": {
			presenceData.state = "Reacting to the drawings";
			break;
		}
		case "MakeSingleChoice": {
			switch (playerState.text) {
				case "Which player's addition was better?": {
					presenceData.state = "Voting for the best addition";
					break;
				}
				case "You drew something this round, sit back and relax.": {
					presenceData.state = "Waiting for other players to vote";
					break;
				}
				case "Which title is best?": {
					presenceData.state = "Voting for the best title";
					break;
				}
			}
			break;
		}
		case "EnterSingleText": {
			presenceData.state = "Entering a title for their drawing";
			break;
		}
	}
	return presenceData;
}
