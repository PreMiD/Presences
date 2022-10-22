export const name = "Word Spud";
export const logo = "https://i.imgur.com/gFUB4EX.png";

export function getPresenceData(): PresenceData {
	const { classList } = document.querySelector<HTMLDivElement>(
		".wordspud-page:not(.pt-page-off)"
	);
	if (classList.contains("state-waiting")) return { state: "Waiting in lobby" };
	else if (classList.contains("state-startbutton"))
		return { state: "Waiting for other players to join" };
	else if (classList.contains("state-writing"))
		return { state: "Writing something" };
	else if (classList.contains("state-vote"))
		return { state: "Voting on a word" };
	else if (classList.contains("state-vote-wait"))
		return { state: "Being judged" };
	else if (classList.contains("state-nothing")) return { state: "Waiting" };
	else if (classList.contains("state-voted"))
		return { state: "Waiting for other players to vote" };
	else if (classList.contains("state-gameover")) return { state: "Game over" };
}
