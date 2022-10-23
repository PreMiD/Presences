export const name = "Fibbage XL";
export const logo = "https://i.imgur.com/LxAtHuy.png";

export function getPresenceData(): PresenceData {
	const currentGamePage = document.querySelector<HTMLDivElement>(
			".fibbage-page:not(.pt-page-off)"
		),
		{ classList } = currentGamePage;
	if (classList.contains("state-lobby")) return { state: "Waiting in lobby" };
	else if (classList.contains("state-round")) {
		return { state: currentGamePage.querySelector("p").textContent };
	} else if (classList.contains("state-notchoosing")) {
		return {
			state: `Waiting for ${
				currentGamePage
					.querySelector("span")
					.textContent.match(/^(.*?) is picking a category$/)[1]
			} to pick a category`,
		};
	} else if (classList.contains("state-nothing")) return { state: "Waiting" };
	else if (classList.contains("state-enterlie"))
		return { state: "Entering a lie" };
	else if (classList.contains("state-lyingdone"))
		return { state: "Lying done" };
	else if (classList.contains("state-liereceived"))
		return { state: "Waiting for other players to enter lies" };
	else if (
		classList.contains("state-chooselie") ||
		classList.contains("state-audience-chooselie")
	)
		return { state: "Finding the truth" };
	else if (
		classList.contains("state-chooselikes") ||
		classList.contains("state-audience-chooselikes")
	)
		return { state: "Liking lies" };
	else if (classList.contains("state-choosing"))
		return { state: "Choosing a category" };
	else if (classList.contains("state-pickbloop"))
		return { state: "Chossing a sound" };
	else if (classList.contains("state-audience-join"))
		return { state: "Joining audience" };
	else if (classList.contains("state-audience-score"))
		return { state: "Viewing audience scores" };
	return {};
}
