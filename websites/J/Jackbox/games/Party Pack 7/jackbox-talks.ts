export const name = "Talking Points";
export const logo = "https://i.imgur.com/NMsM7Uo.png";

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
		case "Camera": {
			presenceData.state = "Taking a profile picture";
			break;
		}
		case "EnterSingleText": {
			const { entryId } = playerState;
			if (entryId.startsWith("prompt")) presenceData.state = "Creating topics";
			else if (entryId === "WriteQuote")
				presenceData.state = "Writing a quote about the talk";
			else if (entryId === "NameAward") presenceData.state = "Naming an award";
			break;
		}
		case "Awards": {
			presenceData.state = "Giving out their award";
			break;
		}
		case "MakeSingleChoice": {
			const { classes, choices, prompt } = playerState;
			if (prompt.html === "PICK THE TITLE OF THE TALK YOU WILL GIVE")
				presenceData.state = "Choosing a talk title";
			else {
				switch (classes[0]) {
					case "SkipTutorial": {
						presenceData.state = "Watching the tutorial";
						break;
					}
					case "Presenter": {
						if (prompt.html.startsWith("RATE HOW WELL "))
							presenceData.state = "Rating their assistant";
						else if (prompt.text === "THANK YOU.")
							presenceData.state = "Presenting their talk - thank you";
						else presenceData.state = "Presenting their talk - preparation";

						break;
					}
					case "Assistant": {
						if (prompt.html === "PICK THE BEST PICTURE TO REPRESENT THE TALK")
							presenceData.state = "Choosing a picture for the talk";
						else presenceData.state = "Assisting their presenter";
						break;
					}
					default: {
						if ((choices as { className: string }[])[0].className === "voteUp")
							presenceData.state = "Reacting to the speech";
					}
				}
			}
			break;
		}
		case "Draw": {
			presenceData.state = "Presenting their talk - slide";
			break;
		}
	}
	return presenceData;
}
