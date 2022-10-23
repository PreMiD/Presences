export const name = "Job Job";
export const logo = "https://i.imgur.com/FfZYRGL.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.kind) {
		case "lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "Logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "writing": {
			presenceData.state = "Writing a response";
			break;
		}
		case "voting": {
			presenceData.state = "Voting for a response";
			break;
		}
		case "magnets": {
			presenceData.state = "Answering a prompt using magnets";
			break;
		}
		case "resumagnets": {
			presenceData.state = "Filling out their resumé using magnets";
			break;
		}
		case "done": {
			presenceData.state = "Waiting for others to finish";
			break;
		}
		case "postGame": {
			presenceData.state = "Viewing the results";
			break;
		}
	}
	return presenceData;
}
