const presence = new Presence({
		clientId: "941317056589086730"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title, searchstr, page, edit, progress;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp
	};

	if (new URLSearchParams(window.location.search).has("q")) {
		searchstr = document.querySelector("input").value;
		page = document
			.querySelector("a[class='paginate_button current']")
			.textContent.trim();
		presenceData.details = "Searching For:";
		presenceData.state = `${searchstr} - Page ${page}`;
		presenceData.smallImageKey = "search";
	} else if (document.location.pathname === "/") {
		page = document
			.querySelector("a[class='paginate_button current']")
			.textContent.trim();
		presenceData.details = "Viewing Homepage";
		presenceData.state = `Page ${page}`;
	} else if (document.location.pathname.includes("/reader")) {
		presenceData.smallImageKey = "read";
		title = document.querySelector("title").textContent.trim();
		page = document
			.querySelector("span[class='current-page']")
			.textContent.trim();
		presenceData.details = "Reading:";
		presenceData.state = `${title} - Page ${page}`;
		presenceData.buttons = [
			{
				label: "Read along",
				url: `${document.URL}&p=${page}`
			}
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
	} else if (document.location.pathname.startsWith("/config/categories/")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Editing Category...";
	} else if (document.location.pathname.includes("/config")) {
		presenceData.smallImageKey = "sett";
		presenceData.details = "Configuring...";
	} else if (document.location.pathname.includes("/batch")) {
		progress = document
			.querySelector("div[id='progress']")
			.textContent.trim();
		presenceData.smallImageKey = "sett";
		presenceData.details = "Running Batch Operations...";
		presenceData.state = progress;
	} else if (document.location.pathname.startsWith("/edit")) {
		presenceData.smallImageKey = "sett";
		edit = document.querySelector("h2").textContent.trim();
		presenceData.details = edit;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
