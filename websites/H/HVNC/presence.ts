const presence = new Presence({
		clientId: "941317056589086730",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/VlB7zdS.png",
		startTimestamp: browsingTimestamp,
	};

	if (new URLSearchParams(window.location.search).has("q")) {
		presenceData.details = "Searching For:";
		presenceData.state = `${
			document.querySelector("input").value
		} - Page ${document
			.querySelector("a[class='paginate_button current']")
			.textContent.trim()}`;
		presenceData.smallImageKey = "search";
	} else if (document.location.pathname === "/") {
		presenceData.details = "Viewing Homepage";
		presenceData.state = `Page ${document
			.querySelector("a[class='paginate_button current']")
			.textContent.trim()}`;
	} else if (document.location.pathname.includes("/reader")) {
		presenceData.smallImageKey = "read";
		presenceData.details = "Reading:";
		presenceData.state = `${document
			.querySelector("title")
			.textContent.trim()} - Page ${document
			.querySelector("span[class='current-page']")
			.textContent.trim()}`;
		presenceData.buttons = [
			{
				label: "Read along",
				url: `${document.URL}&p=${document
					.querySelector("span[class='current-page']")
					.textContent.trim()}`,
			},
		];
	} else if (document.location.pathname.includes("/stats")) {
		presenceData.smallImageKey = "read";
		presenceData.details = "Viewing Statistics";
	} else if (document.location.pathname.includes("/login")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Logging In...";
	} else if (document.location.pathname.includes("/logs")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Viewing Logs";
	} else if (document.location.pathname.includes("/upload")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Adding Archives...";
		presenceData.state =
			document.querySelector<HTMLDivElement>(".bar").style.width;
	} else if (document.location.pathname.startsWith("/config/categories/")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Editing Category...";
	} else if (document.location.pathname.includes("/config")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Configuring...";
	} else if (document.location.pathname.includes("/batch")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Running Batch Operations...";
		presenceData.state = document
			.querySelector("div[id='progress']")
			.textContent.trim();
	} else if (document.location.pathname.startsWith("/edit")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = document.querySelector("h2").textContent.trim();
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
