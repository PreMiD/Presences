const presence = new Presence({
		clientId: "630239297521319953",
	}),
	capitalize = (text: string): string => {
		return text
			.replace(/[[{(_)}\]]/g, " ")
			.split(" ")
			.map(str => str.charAt(0).toUpperCase() + str.slice(1))
			.join(" ");
	},
	whitelist = ["HTML", "CSS", "SQL", "PHP", "W3.CSS", "JQUERY", "XML"];

let elapsed: number, oldUrl: string;

presence.on("UpdateData", () => {
	if (window.location.href !== oldUrl) {
		oldUrl = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/W/W3Schools/assets/logo.png",
			startTimestamp: elapsed,
		},
		language = document.querySelector(".w3-bar-item.w3-button.active"),
		lesson = document.querySelector("#main > h1"),
		exercise = document.querySelector("#completedExercisesNo");

	if (language) {
		presenceData.details = `Learning ${capitalize(
			language.textContent.toLowerCase()
		)}`;
		if (whitelist.includes(language.textContent))
			presenceData.details = `Learning ${language.textContent}`;
	}

	if (lesson) presenceData.state = lesson.textContent;

	if (exercise) {
		presenceData.details = `${capitalize(
			window.location.pathname.split("/")[1]
		)} Exercise`;
		[presenceData.state] = exercise.textContent.match("[0-9](.*)[0-9]");
	}

	presence.setActivity(presenceData);
});
