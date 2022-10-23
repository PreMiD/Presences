export const name = "Quiplash XL";
export const logo = "https://i.imgur.com/NAySr0E.png";

export function getPresenceData(): PresenceData {
	const presenceData: PresenceData = {},
		{ id } = document.querySelector<HTMLDivElement>(
			".quiplash-page:not(.pt-page-off)"
		);
	switch (id) {
		case "state-lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "state-logo": {
			presenceData.state = "Watching tutorial";
			break;
		}
		case "state-answer-question-audience": {
			presenceData.state = "Writing audience quip";
			break;
		}
		case "state-answer-question": {
			presenceData.state = "Writing quip";
			break;
		}
		case "state-done-answering": {
			presenceData.state = "Waiting for other players to answer";
			break;
		}
		case "state-vote": {
			presenceData.state = "Voting";
			break;
		}
	}
	return presenceData;
}
