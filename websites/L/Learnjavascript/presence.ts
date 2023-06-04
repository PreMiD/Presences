const presence = new Presence({
		clientId: "1024006470364315668",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/L/Learnjavascript/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/app.html") {
		const currlesson = document
				.querySelector("body > div > nav > div > action-bar")
				.shadowRoot.querySelector("div > track-preview")
				.shadowRoot.querySelector("app-ripple > button > div.name").textContent,
			alllessons = document
				.querySelector("body > div > nav > course-sidebar")
				.shadowRoot.querySelector("div#tracks > sidebar-tracks")
				.shadowRoot.querySelector("div#start")
				.querySelectorAll("sidebar-track");
		for (const alllesson of alllessons) {
			if (
				alllesson.shadowRoot.querySelector("div > div > div > span.title")
					.textContent === currlesson
			) {
				const steps = alllesson.shadowRoot
					.querySelector("div > div.steps-container")
					.querySelectorAll("a");
				for (let l = 0; l < steps.length; l++) {
					if (
						steps[l]
							.querySelector("div")
							.getAttribute("class")
							.includes("current")
					) {
						presenceData.state = `Learning: ${
							steps[l].querySelector("div").textContent
						}`;
						presenceData.details = `Lesson: ${currlesson} (Page ${l + 1} of ${
							steps.length
						})`;
					}
				}
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
