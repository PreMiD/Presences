export const name = "Tee K.O.";
export const logo = "https://i.imgur.com/wGbJhoR.png";

export function getPresenceData(): PresenceData {
	const presenceData: PresenceData = {},
		{ id } = document.querySelector<HTMLDivElement>(
			".awshirt-page:not(.pt-page-off)"
		);
	switch (id) {
		case "state-lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "state-logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "state-audience": {
			presenceData.state = "In the audience";
			break;
		}
		case "state-draw": {
			presenceData.state = "Drawing a shirt";
			break;
		}
		case "state-drawing-done": {
			presenceData.state =
				"Waiting for other players to finish drawing their shirt";
			break;
		}
		case "state-input": {
			presenceData.state = "Creating taglines";
			break;
		}
		case "state-prompts-done": {
			presenceData.state = "Waiting for other players to finish their taglines";
			break;
		}
		case "state-shirt": {
			presenceData.state = "Creating a t-shirt";
			break;
		}
		case "state-shirt-done": {
			presenceData.state = "Waiting for other players to finish their t-shirts";
			break;
		}
		case "state-vote": {
			presenceData.state = "Voting on a t-shirt";
			break;
		}
		case "state-voting-done": {
			presenceData.state = "Waiting for other players to finish voting";
			break;
		}
		case "state-audience-suggestions": {
			presenceData.state = "Entering a suggestion";
			break;
		}
		case "state-answer-question-audience":
		case "state-answer-question": {
			presenceData.state = "Answering a question";
			break;
		}
		case "state-done-answering": {
			presenceData.state = "Waiting for other players to finish answering";
			break;
		}
	}
	return presenceData;
}
