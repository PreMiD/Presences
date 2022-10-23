export const name = "Junktopia";
export const logo = "https://i.imgur.com/5vqvCuK.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {},
		{ prompt, kind, responseKey } = playerState;
	switch (kind) {
		case "lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
		case "ranking": {
			presenceData.state = "Ranking items";
			break;
		}
		case "choosing": {
			if (responseKey.startsWith("skip"))
				presenceData.state = "Watching the tutorial";
			else if (responseKey.startsWith("shopping"))
				presenceData.state = "Shopping for an item";
			else if (responseKey.startsWith("presentationChoice")) {
				if (prompt === "Ready to present?")
					presenceData.state = "Preparing to present";
				else presenceData.state = "Presenting their item";
			} else if (responseKey.startsWith("reaction"))
				presenceData.state = "Reacting to an item";
			else if (responseKey.startsWith("voting"))
				presenceData.state = "Voting on a collection";
			break;
		}
		case "fact": {
			presenceData.state = "Creating facts about an item";
			break;
		}
		case "writing": {
			if (prompt === "This piece is entitled:")
				presenceData.state = "Naming their item";
			else if (
				prompt ===
				'Your two items are part of a collection called "[blank][/blank]"'
			)
				presenceData.state = "Naming their collection";
			break;
		}
		case "waiting": {
			presenceData.state = "Waiting";
			break;
		}
	}
	return presenceData;
}
