export const name = "Patently Stupid";
export const logo = "https://i.imgur.com/yGEE0Aw.png";

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
			switch (html) {
				case "": {
					presenceData.state = "Watching the tutorial";
					break;
				}
				case "<div>Choose an Issue</div><div>to base your invention on.</div>": {
					presenceData.state = "Choosing an issue to work on";
					break;
				}
				case "<div>Present your idea!</div><div>It's your turn to show off your invention!<br /><br />Would you like to present your invention, or would you like the game to do it for you?</div>": {
					presenceData.state = "Choosing presentation options";
					break;
				}
				case "<div>Present your idea!</div><div>You can control the timing!<br />(Show elements in any order.)</div>": {
					presenceData.state = "Presenting their invention";
					break;
				}
				default:
					if (html.startsWith("<div>Invest in the best!</div>"))
						presenceData.state = "Investing in an invention";
					else if (/choose an issue.*?to base your invention on/is.test(html)) {
						presenceData.state = "Choosing the final issue to work on";
					}
			}
			break;
		}
		case "EnterSingleText": {
			const { html } = playerState.prompt;
			if (html.startsWith("<div>Fill in the Blank!</div>"))
				presenceData.state = "Creating a problem";
			else if (html === "<div>Write a title</div><div>for your invention</div>")
				presenceData.state = "Naming their invention";
			else if (
				html === "<div>Write a tagline</div><div>for your invention</div>"
			) {
				presenceData.state = "Creating a tagline for their invention";
			}
			break;
		}
		case "Draw": {
			presenceData.state = "Drawing their invention";
			break;
		}
	}
	return presenceData;
}
