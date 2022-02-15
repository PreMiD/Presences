const presence = new Presence({
		clientId: "941317056589086730"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const inPath = document.location.pathname,
		select = document.querySelector,
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		};

	if (new URLSearchParams(window.location.search).has("q")) {
		presenceData.details = "Searching For:";
		presenceData.state = `${select("input").value} - Page ${select(
			"a[class='paginate_button current']"
		).textContent.trim()}`;
		presenceData.smallImageKey = "search";
	} else if (inPath === "/") {
		presenceData.details = "Viewing Homepage";
		presenceData.state = `Page ${select(
			"a[class='paginate_button current']"
		).textContent.trim()}`;
	} else if (inPath.includes("/reader")) {
		presenceData.smallImageKey = "read";
		presenceData.details = "Reading:";
		presenceData.state = `${select("title").textContent.trim()} - Page ${select(
			"span[class='current-page']"
		).textContent.trim()}`;
		presenceData.buttons = [
			{
				label: "Read along",
				url: `${document.URL}&p=${select(
					"span[class='current-page']"
				).textContent.trim()}`
			}
		];
	} else if (inPath.includes("/stats")) {
		presenceData.smallImageKey = "read";
		presenceData.details = "Viewing Statistics";
	} else if (inPath.includes("/login")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Logging In...";
	} else if (inPath.includes("/logs")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Viewing Logs";
	} else if (inPath.includes("/upload")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Adding Archives...";
		presenceData.state = select<HTMLDivElement>(".bar").style.width;
	} else if (inPath.startsWith("/config/categories/")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Editing Category...";
	} else if (inPath.includes("/config")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Configuring...";
	} else if (inPath.includes("/batch")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Running Batch Operations...";
		presenceData.state = select("div[id='progress']").textContent.trim();
	} else if (inPath.startsWith("/edit")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = select("h2").textContent.trim();
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
