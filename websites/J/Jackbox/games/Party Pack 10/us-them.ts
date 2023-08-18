export const name = "Hypnotorious";
export const logo = "TODO";

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
			return { state: "Choosing the outlier" };
		}
		case "role": {
			return { state: "Viewing their role" };
		}
		case "playerPrompt": {
			return { state: "Viewing their prompt" };
		}
		case "writing": {
			return { state: "Answering a prompt" };
		}
		case "grouping": {
			return { state: "Grouping themselves" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
