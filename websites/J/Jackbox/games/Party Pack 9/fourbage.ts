export const name = "Fibbage 4";
export const logo = "https://i.imgur.com/DnqcuUX.png";

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
		case "choosing": {
			switch (playerState.context) {
				case "pick-category": {
					presenceData.state = "Choosing a category";
					break;
				}
				case "pick-truth": {
					presenceData.state = "Looking for the truth";
					break;
				}
				case "pick-likes": {
					presenceData.state = "Awarding likes to other's answers";
					break;
				}
				case "final-round-1":
				case "final-round-2": {
					presenceData.state = "Looking for the truth - Final Round";
					break;
				}
			}
			break;
		}
		case "writing": {
			presenceData.state = "Writing lies";
			break;
		}
		case "voting": {
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
	}
	return presenceData;
}
