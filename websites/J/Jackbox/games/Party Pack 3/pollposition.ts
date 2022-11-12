export const name = "Guesspionage";
export const logo = "https://i.imgur.com/wp7HhjP.png";

export function getPresenceData(): PresenceData {
	const currentGamePage = document.querySelector<HTMLDivElement>(
			".pollposition-page:not(.pt-page-off)"
		),
		{ classList } = currentGamePage;
	if (classList.contains("state-lobby"))
		return { state: "Waiting in lobby" };
	else if (classList.contains("state-post-lobby"))
		return { state: "Watching the tutorial" };
	else if (classList.contains("state-nothing")) return { state: "Waiting" };
	else if (classList.contains("state-round"))
		return { state: currentGamePage.querySelector("p").textContent };
	else if (
		classList.contains("state-upordowndone") ||
		classList.contains("state-waitforpercentage") ||
		classList.contains("state-waitforupordown") ||
		classList.contains("state-waitforaudience") ||
		classList.contains("state-upordown-sent") ||
		classList.contains("state-waitforallpercentages")
	)
		return { state: "Waiting for other players to decide" };
	else if (classList.contains("state-choosecategory"))
		return { state: "Choosing a category" };
	else if (classList.contains("state-waitforcategory"))
		return { state: "Waiting for a category to be chosen" };
	else if (classList.contains("state-showquestion"))
		return { state: "Viewing a survey prompt" };
	else if (classList.contains("state-chooseupordown"))
		return { state: "Deciding if the true percentage is higher or lower" };
	else if (classList.contains("state-choosemultiple"))
		return { state: "Choosing multiple choices" };
	else if (
		classList.contains("state-audience-choice-sent") ||
		classList.contains("state-waitformultiple")
	)
		return { state: "Waiting for other players to choose their choices" };
	else if (classList.contains("state-audience-wait"))
		return { state: "In the audience" };
	else if (classList.contains("state-audience-chose-option"))
		return { state: "Choosing an option in the audience" };
	else if (classList.contains("state-choosecharacter"))
		return { state: "Choosing a character" }
	return {};
}
