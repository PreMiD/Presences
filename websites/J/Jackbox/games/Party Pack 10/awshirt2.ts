export const name = "Tee-K.O. 2";
export const logo = "https://i.imgur.com/9XdnSqX.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	switch (playerState.kind) {
		case "lobby": {
			return { state: "Waiting in lobby" };
		}
		case "postGame": {
			return { state: "Viewing the results" };
		}
		case "assembling": {
			return { state: "Assembling a T-Shirt" };
		}
		case "remaking": {
			return { state: "Remaking a T-Shirt" };
		}
		case "drawing": {
			return { state: "Drawing a T-Shirt image" };
		}
		case "writing": {
			return { state: "Writing a T-Shirt slogan" };
		}
		case "voting": {
			return { state: "Voting for a T-Shirt" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
