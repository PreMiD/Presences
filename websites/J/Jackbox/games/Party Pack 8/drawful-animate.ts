export const name = "Drawful Animate";
export const logo = "https://i.imgur.com/7QPiNMv.png";

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
		case "drawing": {
			if (playerState.prompt === "an animation of yourself")
				presenceData.state = "Drawing an animation of themselves";
			else presenceData.state = "Drawing an animation";
			break;
		}
		case "writing": {
			presenceData.state = "Guessing the original prompt";
			break;
		}
		case "liking": {
			presenceData.state = "Awarding likes to other's guesses";
			break;
		}
		case "choosing": {
			presenceData.state = "Looking for the true prompt";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
		case "ugc": {
			presenceData.state = "Creating a custom game";
			break;
		}
	}
	return presenceData;
}
