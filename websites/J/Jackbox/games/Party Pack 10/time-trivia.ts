export const name = "TimeJinx";
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
		case "guessing": {
			return { state: "Guessing the answer" };
		}
		case "sussing": {
			return { state: "Sussing out the answer" };
		}
		case "choosing": {
			return { state: "Choosing an answer" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
