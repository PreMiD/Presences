export const name = "Drawful";
export const logo = "https://i.imgur.com/TOaYCE3.png";

export function getPresenceData(): PresenceData {
	const currentGamePage = document.querySelector<HTMLDivElement>(
			".drawful-page:not(.pt-page-off)"
		),
		{ classList, id } = currentGamePage;
	if (classList.contains("state-lobby")) return { state: "Waiting in lobby" };
	else if (
		classList.contains("state-lyingdone") ||
		classList.contains("state-nothing") ||
		classList.contains("state-drawing-done")
	)
		return { state: "Waiting" };
	else if (classList.contains("state-round")) {
		return { state: currentGamePage.querySelector("span").textContent };
	} else if (classList.contains("state-drawing-sent")) {
		return { state: "Waiting for other players to finish drawing" };
	} else if (classList.contains("state-enterlie"))
		return { state: "Entering a lie" };
	else if (classList.contains("state-chooselie"))
		return { state: "Looking for the truth" };
	else if (classList.contains("state-chooselikes"))
		return { state: "Liking lies" };
	else if (classList.contains("state-liereceived"))
		return { state: "Waiting for other players to enter lies" };
	else if (classList.contains("state-notchoosing")) {
		return { state: "Waiting for other players to discover the truth" };
	} else if (classList.contains("state-draw"))
		return { state: "Drawing something" };
	else if (classList.contains("state-audience-choose"))
		return { state: "Choosing a lie" };
	else if (id === "state-ugc") return { state: "Creating a custom game" };
	else if (classList.contains("state-audience"))
		return { state: "In the audience" };
}
