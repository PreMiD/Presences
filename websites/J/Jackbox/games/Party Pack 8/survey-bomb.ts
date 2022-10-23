export const name = "The Poll Mine";
export const logo = "https://i.imgur.com/o4aaUox.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.kind) {
		case "lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "waiting": {
			presenceData.state = "Waiting";
			break;
		}
		case "choices": {
			presenceData.state = "Selecting a door";
			break;
		}
		case "survey": {
			presenceData.state = "Completing survey";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
	}
	return presenceData;
}
