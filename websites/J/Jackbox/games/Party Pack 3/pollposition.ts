export const name = "Guesspionage";
export const logo = "https://i.imgur.com/wp7HhjP.png";

export function getPresenceData(): PresenceData {
	const presenceData: PresenceData = {},
		currentGamePage = document.querySelector<HTMLDivElement>(
			".pollposition-page:not(.pt-page-off)"
		),
		{ classList } = currentGamePage;
	if (classList.contains("state-lobby"))
		presenceData.state = "Waiting in lobby";
	else if (classList.contains("state-post-lobby"))
		presenceData.state = "Watching the tutorial";
	else if (classList.contains("state-nothing")) presenceData.state = "Waiting";
	else if (classList.contains("state-round"))
		presenceData.state = currentGamePage.querySelector("p").textContent;
	else if (
		classList.contains("state-upordowndone") ||
		classList.contains("state-waitforpercentage") ||
		classList.contains("state-waitforupordown") ||
		classList.contains("state-waitforaudience") ||
		classList.contains("state-upordown-sent") ||
		classList.contains("state-waitforallpercentages")
	)
		presenceData.state = "Waiting for other players to decide";
	else if (classList.contains("state-choosecategory"))
		presenceData.state = "Choosing a category";
	else if (classList.contains("state-waitforcategory"))
		presenceData.state = "Waiting for a category to be chosen";
	else if (classList.contains("state-showquestion"))
		presenceData.state = "Viewing a survey prompt";
	else if (classList.contains("state-chooseupordown"))
		presenceData.state = "Deciding if the true percentage is higher or lower";
	else if (classList.contains("state-choosemultiple"))
		presenceData.state = "Choosing multiple choices";
	else if (
		classList.contains("state-audience-choice-sent") ||
		classList.contains("state-waitformultiple")
	)
		presenceData.state = "Waiting for other players to choose their choices";
	else if (classList.contains("state-audience-wait"))
		presenceData.state = "In the audience";
	else if (classList.contains("state-audience-chose-option"))
		presenceData.state = "Choosing an option in the audience";
	else if (classList.contains("state-choosecharacter"))
		presenceData.state = "Choosing a character";
	return presenceData;
}
