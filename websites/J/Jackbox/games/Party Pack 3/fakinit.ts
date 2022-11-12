export const name = "Fakin' It";
export const logo = "https://i.imgur.com/hYcvY7w.png";

export function getPresenceData(): PresenceData {
	const currentGamePage = document.querySelector<HTMLDivElement>(
			".fakinit-page:not(.pt-page-off)"
		),
		{ classList } = currentGamePage;
	if (classList.contains("state-lobby")) return { state: "Waiting in lobby" };
	else if (classList.contains("state-nothing")) return { state: "Waiting" };
	else if (classList.contains("state-gameplay"))
		return { state: "Following instructions" };
	else if (classList.contains("state-skip-instructions"))
		return { state: "Watching the tutorial" };
	else if (classList.contains("state-categories"))
		return { state: "Choosing a category" };
	else if (classList.contains("state-notchoosing"))
		return { state: "Waiting for a category to be chosen" };
	else if (classList.contains("state-round"))
		return { state: currentGamePage.querySelector("p").textContent };
	else if (classList.contains("state-vote"))
		return { state: "Voting on a player" };
	else if (classList.contains("state-vote-locked"))
		return { state: "Viewing vote results" };
	return {};
}
