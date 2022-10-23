export const name = "Quixort";
export const logo = "https://i.imgur.com/zqzsySL.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.kind) {
		case "lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "choices": {
			presenceData.state = "Selecting a topic to sort";
			break;
		}
		case "falling": {
			presenceData.state = "Sorting an item";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
		default: {
			presenceData.state = "Waiting";
		}
	}
	return presenceData;
}
