export const name = "Trivia Murder Party";
export const logo = "https://i.imgur.com/zHOvymB.png";

export function getPresenceData(): PresenceData {
	const presenceData: PresenceData = {},
		{ id } = document.querySelector<HTMLDivElement>(
			".triviadeath-page:not(.pt-page-off)"
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
		case "state-make-single-choice": {
			presenceData.state = "Answering a single choice question";
			break;
		}
		case "state-make-many-choices": {
			presenceData.state = "Answering a multiple choice question";
			break;
		}
		case "state-enter-single-text": {
			presenceData.state = "Answering a text prompt";
			break;
		}
		case "state-enter-single-drawing": {
			presenceData.state = "Drawing a picture";
			break;
		}
		case "state-grid": {
			presenceData.state = "Playing a grid game";
			break;
		}
		case "state-game-results": {
			presenceData.state = "Viewing game results";
			break;
		}
	}
	return presenceData;
}
