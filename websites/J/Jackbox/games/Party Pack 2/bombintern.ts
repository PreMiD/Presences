export const name = "Bomb Corp";
export const logo = "https://i.imgur.com/1srbKlq.png";

export function getPresenceData(): PresenceData {
	const { classList } = document.querySelector<HTMLDivElement>(
		".bombintern-page:not(.pt-page-off)"
	);
	if (classList.contains("state-lobby")) return { state: "Waiting in lobby" };
	else if (classList.contains("state-dayend")) return { state: "Day end" };
	else if (classList.contains("state-gameover")) return { state: "Game over" };
	else if (classList.contains("state-nothing")) return { state: "Waiting" };
	else if (classList.contains("state-message"))
		return { state: "Reading a message" };
	else if (classList.contains("state-smashpuzzle"))
		return { state: "Defusing a smash puzzle bomb" };
	else if (classList.contains("state-wiredbomb"))
		return { state: "Defusing a wired bomb" };
	else if (classList.contains("state-coffeebomb"))
		return { state: "Defusing a coffee bomb" };
	else if (classList.contains("state-filingbomb"))
		return { state: "Defusing a filing bomb" };
	else if (classList.contains("state-keypadbomb"))
		return { state: "Defusing a keypad bomb" };
	else if (classList.contains("state-copierbomb"))
		return { state: "Defusing a copier bomb" };
	return {};
}
