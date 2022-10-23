export const name = "Role Models";
export const logo = "https://i.imgur.com/Utg6Fow.png";

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
		case "Camera": {
			presenceData.state = "Taking a photo of themselves";
			break;
		}
		case "Draw": {
			presenceData.state = "Drawing a portrait of themselves";
			break;
		}
		case "MakeSingleChoice": {
			switch (playerState.choiceType) {
				case "SkipTutorial": {
					presenceData.state = "Watching the tutorial";
					break;
				}
				case "Prompt": {
					presenceData.state = "Choosing a category";
					break;
				}
				case "TagResolution": {
					presenceData.state = "Resolving a role conflict";
					break;
				}
				case "RoleModelsChoice": {
					presenceData.state = "Choosing the role that fits best";
					break;
				}
			}
			break;
		}
		case "Sortable": {
			presenceData.state = "Assigning roles to players";
			break;
		}
		case "EnterSingleText": {
			presenceData.state = "Answering a prompt";
			break;
		}
	}
	return presenceData;
}
