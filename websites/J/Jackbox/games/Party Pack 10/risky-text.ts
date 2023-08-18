export const name = "FixyText";
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
			return { state: "Choosing a text" };
		}
		case "chat-partner": {
			return { state: "Chatting with a partner" };
		}
		case "inbox": {
			return { state: "Viewing their inbox" };
		}
		case "task": {
			return { state: "Completing a task" };
		}
		case "writing": {
			return { state: "Writing a text" };
		}
		case "favorites": {
			return { state: "Voting on their favorite text" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
