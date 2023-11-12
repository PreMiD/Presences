export const name = "Hypnotorious";
export const logo = "https://i.imgur.com/47yf1dr.png";

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
		case "choices": {
			if (playerState.category === "SKIP") {
				return { state: "Viewing the tutorial" };
			} else {
				return { state: "Choosing the outlier" };
			}
		}
		case "role": {
			return { state: "Viewing their secret role" };
		}
		case "writing": {
			return {
				state: `Answering a prompt: ${playerState.prompt}`,
			};
		}
		case "grouping": {
			return { state: "Grouping themselves" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
