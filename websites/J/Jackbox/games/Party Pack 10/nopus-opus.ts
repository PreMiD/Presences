export const name = "Dodo Re Mi";
export const logo = "https://i.imgur.com/KzAoFzz.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	switch (playerState.kind) {
		case "lobby": {
			return { state: "Waiting in lobby" };
		}
		case "credits": {
			return { state: "Viewing the credits" };
		}
		case "playback": {
			return { state: "Listening to the playback" };
		}
		case "audienceRecording":
		case "recording": {
			return { state: "Recording a song" };
		}
		case "instrumentSelect": {
			return { state: "Selecting an instrument" };
		}
		case "scoreboard": {
			return { state: "Viewing the scoreboard" };
		}
		case "songSelect": {
			return { state: "Selecting a song" };
		}
		default: {
			return { state: "Waiting" };
		}
	}
}
