export const name = "The Devils and the Details";
export const logo = "https://i.imgur.com/dcJq65O.png";

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
			switch (playerState.choiceId) {
				case "ChangeCharacter": {
					presenceData.state = "Choosing a character";
					break;
				}
				default: {
					if (playerState.choiceType === "SkipIntro")
						presenceData.state = "Watching the intro";
					else if (playerState.choiceType === "ShowTutorial")
						presenceData.state = "Deciding if they want to watch the tutorial";
				}
			}
			break;
		}
		case "CancelerMechanic": {
			presenceData.state = "Blocking a member from their selfish task";
			break;
		}
		case "TaskList": {
			presenceData.state = "Choosing a task";
			break;
		}
		case "NothingMechanic": {
			presenceData.state = "Doing nothing";
			break;
		}
		case "ScrubMechanic": {
			presenceData.state = "Scrubbing something";
			break;
		}
		case "RotateMechanic": {
			presenceData.state = "Rotating something";
			break;
		}
		case "TapMechanic": {
			presenceData.state = "Tapping something";
			break;
		}
		case "SwipeMechanic": {
			presenceData.state = "Swiping something";
			break;
		}
		case "TravelMechanicParticipant": {
			presenceData.state = "Travelling as a passenger";
			break;
		}
		case "TravelMechanicCaptain": {
			presenceData.state = "Travelling as the driver";
			break;
		}
		case "PhoneMechanic": {
			presenceData.state = "Calling someone";
			break;
		}
		case "DialogMechanic": {
			presenceData.state = "Talking to someone";
			break;
		}
		case "SearchMechanicCaptain":
		case "SearchMechanicParticipant": {
			presenceData.state = "Searching for something";
			break;
		}
		case "TextMechanicParticipant": {
			presenceData.state = "Writing a text";
			break;
		}
		case "TextMechanicCaptain": {
			presenceData.state = "Reading a text";
			break;
		}
		case "InstructionsMechanicCaptain": {
			presenceData.state = "Following instructions";
			break;
		}
		case "InstructionsMechanicParticipant": {
			presenceData.state = "Giving instructions";
			break;
		}
		case "HoldMechanic": {
			presenceData.state = "Holding something";
			break;
		}
	}
	return presenceData;
}
