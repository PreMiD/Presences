const presence = new Presence({
		clientId: "1024006470364315668",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/03uHFM5.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/app.html") {
		const currlesson = document.querySelector("body > div > nav > div > action-bar").shadowRoot.querySelector("div > track-preview").shadowRoot.querySelector("app-ripple > button > div.name").textContent;
		const alllessons = document.querySelector("body > div > nav > course-sidebar").shadowRoot.querySelector("div#tracks > sidebar-tracks").shadowRoot.querySelector("div#start").querySelectorAll("sidebar-track");
		for (let i = 0; i < alllessons.length; i++) {
			if (alllessons[i].shadowRoot.querySelector("div > div > div > span.title").textContent === currlesson) {
				presenceData.details = `Lesson: ${currlesson}`;
			}
			const steps = alllessons[i].shadowRoot.querySelector("div > div.steps-container").querySelectorAll("a");
			for (let l = 0; l < steps.length; l++) {
				if (steps[l].querySelector("div").getAttribute("class").includes("current")) {
					console.log(steps[l].querySelector("div").getAttribute("class") + 'jest równy step current')
					presenceData.state = `Learning: ${steps[l].querySelector("div").textContent} (Page ${l + 1} of ${steps.length})`;
				}
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
