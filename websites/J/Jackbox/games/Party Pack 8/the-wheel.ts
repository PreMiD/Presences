export const name = "The Wheel of Enormous Proportions";
export const logo = "https://i.imgur.com/hoWsjON.png";

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
		case "singleTextEntry": {
			if (playerState.category === "askTheWheel") {
				presenceData.state = `Asking the wheel a question - '${
					document.querySelector<HTMLTextAreaElement>(".input-box textarea")
						.value
				}'`;
			} else presenceData.state = "Answering a question";
			break;
		}
		case "choices": {
			if (playerState.category === "skip-intro")
				presenceData.state = "Watching the tutorial";
			break;
		}
		case "tappingList": {
			presenceData.state = "Selecting answers";
			break;
		}
		case "matching": {
			const [a, b] = playerState.headers as string[];
			presenceData.state = `Matching ${a} to ${b}`;
			break;
		}
		case "placeSlices": {
			presenceData.state = "Placing slices";
			break;
		}
		case "spin": {
			presenceData.state = "Spinning the wheel";
			break;
		}
		case "numeric": {
			presenceData.state = `Answering a numeric question - "${playerState.prompt}"`;
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
		case "typingList": {
			presenceData.state = "Typing answers";
			break;
		}
		case "guessing": {
			presenceData.state = "Guessing what the wheel is thinking of";
			break;
		}
		case "tappingRapid": {
			presenceData.state = "Tapping rapidly";
			break;
		}
		case "choosePlayers": {
			presenceData.state = "Choosing players";
			break;
		}
		case "chooseSlices": {
			presenceData.state = "Choosing slices";
			break;
		}
	}
	return presenceData;
}
