export const name = "Nonsensory";
export const logo = "https://i.imgur.com/JH3JgaM.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.kind) {
		case "lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
		case "drawing": {
			presenceData.state = "Drawing a picture";
			break;
		}
		case "guess": {
			presenceData.state = "Guessing the value in the range";
			break;
		}
		case "postGuess": {
			presenceData.state = "Waiting for other players to guess";
			break;
		}
		case "singleTextEntry": {
			presenceData.state = "Answering a prompt";
			break;
		}
		case "choices": {
			if (playerState.category === "walkthrough")
				presenceData.state = "Watching the tutorial";
			else presenceData.state = "Making a choice";
			break;
		}
		default: {
			presenceData.state = "Waiting";
		}
	}
	return presenceData;
}
