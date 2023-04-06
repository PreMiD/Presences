export const name = "Quixort";
export const logo = "https://i.imgur.com/zqzsySL.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	switch (playerState.kind) {
		case "lobby": {
			return { state: "Waiting in lobby" };
		}
		case "choices": {
			return { state: "Selecting a topic to sort" };
		}
		case "falling": {
			return { state: "Sorting an item" };
		}
		case "postGame": {
			return { state: "Viewing the results" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
