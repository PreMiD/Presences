import languageStrings from "./strings";

const presence = new Presence({
		clientId: "1233147201559990292",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum PresenceAssets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/K/Kotobade%20Asobou/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const language = await presence.getSetting<number>("displayLanguage"),
		strings = languageStrings[["en", "ja"][language] as "en" | "ja"],
		presenceData: PresenceData = {
			largeImageKey: PresenceAssets.Logo,
			startTimestamp: browsingTimestamp,
			name: strings.title,
		},
		rows = [...document.querySelectorAll<HTMLDivElement>(".grid > div")],
		nextIndex = rows.findIndex(row =>
			[...row.children].every(
				tile =>
					!tile.querySelector<HTMLDivElement>(".letter-container").textContent
			)
		),
		lastRow: HTMLDivElement = rows[nextIndex - 1],
		isComplete = !!(
			(lastRow?.children.length &&
				[...lastRow.children].every(tile =>
					tile.classList.contains("correct")
				)) ||
			nextIndex === -1
		);

	if (isComplete) {
		const finalScore = nextIndex === -1 ? 12 : nextIndex;
		let outcome = "";
		for (let i = 0; i < finalScore; i++) {
			outcome += getRowEmojis(rows[i]);
			outcome += " | ";
		}
		presenceData.details = nextIndex === -1 ? strings.failure : strings.victory;
		presenceData.state = `${finalScore}/12 - ${getRowEmojis(
			rows[finalScore - 1]
		)}`;
		presenceData.smallImageKey = Assets.Question;
		presenceData.smallImageText = outcome;
		presenceData.buttons = [
			{ url: document.location.href, label: strings.play },
		];
	} else {
		presenceData.details = strings.guessing;
		presenceData.state = `${nextIndex}/12 - ${getRowEmojis(lastRow)}`;
	}

	presence.setActivity(presenceData);
});

function getRowEmojis(row: HTMLDivElement): string {
	const darkMode = document.documentElement.classList.contains("dark");
	if (!row) return darkMode ? "⬛".repeat(4) : "⬜".repeat(4);
	let emojis = "";
	for (let i = 0; i < row.children.length; i++) {
		const tile = row.children[i];
		if (tile.classList.contains("correct")) emojis += "🟩";
		else if (tile.classList.contains("present")) emojis += "🟨";
		else if (tile.classList.contains("vowel")) emojis += "↔️";
		else if (tile.classList.contains("consonant")) emojis += "↕️";
		else if (tile.classList.contains("close")) emojis += "🟢";
		else emojis += darkMode ? "⬛" : "⬜";
	}
	return emojis;
}
