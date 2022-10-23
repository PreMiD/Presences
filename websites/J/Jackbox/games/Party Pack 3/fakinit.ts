export const name = "Fakin' It";
export const logo = "https://i.imgur.com/hYcvY7w.png";

export function getPresenceData(): PresenceData {
	const presenceData: PresenceData = {},
		currentGamePage = document.querySelector<HTMLDivElement>(
			".fakinit-page:not(.pt-page-off)"
		),
		{ classList } = currentGamePage;
	if (classList.contains("state-lobby"))
		presenceData.state = "Waiting in lobby";
	else if (classList.contains("state-nothing")) presenceData.state = "Waiting";
	else if (classList.contains("state-gameplay"))
		presenceData.state = "Following instructions";
	else if (classList.contains("state-skip-instructions"))
		presenceData.state = "Watching the tutorial";
	else if (classList.contains("state-categories"))
		presenceData.state = "Choosing a category";
	else if (classList.contains("state-notchoosing"))
		presenceData.state = "Waiting for a category to be chosen";
	else if (classList.contains("state-round")) {
		presenceData.state = currentGamePage.querySelector("p").textContent;
	} else if (classList.contains("state-vote"))
		presenceData.state = "Voting on a player";
	else if (classList.contains("state-vote-locked"))
		presenceData.state = "Viewing vote results";
	return presenceData;
}
