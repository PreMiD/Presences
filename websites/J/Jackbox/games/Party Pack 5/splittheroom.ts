export const name = "Split the Room";
export const logo = "https://i.imgur.com/YyhOPAp.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.state) {
		case "Lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "Logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "MakeSingleChoice": {
			const { html } = playerState.prompt;
			if (html === "Press this to skip the tutorial...")
				presenceData.state = "Watching the tutorial";
			else if (html === "Did this person create an amusing scenario?")
				presenceData.state = "Rating the scenario";
			else if (html.startsWith("For bonus points, which option do you think"))
				presenceData.state = "Predicting a player's choice";
			else presenceData.state = "Responding to a scenario";
			break;
		}
		case "EnterSingleText": {
			presenceData.state = "Completing a scenario";
			break;
		}
	}
	return presenceData;
}
