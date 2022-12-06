const presence = new Presence({
		clientId: "1046638491435552819",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/m740VV3.jpg",
	};
	const [buttons, timestamp, privacy] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamp"),
			presence.getSetting<boolean>("privacy"),
		]),
		pages: Record<string, PresenceData> = {
			"/about": { details: "Viewing About Page" },
			"/gallery": { details: "Viewing Gallery Page" },
			"/events": { details: "Browsing Events Page" },
			"/newsletter": { details: "Browsing Newsletter" },
			"/rules": { details: "Reading the rules" },
			"/PrivacyPolicy": { details: "Reading Privacy Policy" },
			"/Terms&Condition": { details: "Reading Terms&Condition" },
			"/leaderboard": { details: "Viewing Leaderboard" },
		};

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.pathname.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	switch (document.location.host) {
		case "nexonlogistics.com":
			switch (true) {
				case document.location.pathname.includes("/newsletter/"):
					presenceData.details = "Reading a newsletter";
					presenceData.state = document.querySelector<HTMLHeadingElement>(
						"div.container-fluid > h1"
					).textContent;
					presenceData.buttons = [{ label: "Read Post", url: document.URL }];
					break;
				case document.location.pathname.includes("/convoy"):
					presenceData.details = "Browsing Nexon Events";
					presenceData.state =
						document.querySelectorAll<HTMLHeadingElement>("h1")[1].textContent;
					presenceData.buttons = [{ label: "View Event", url: document.URL }];
					break;
				case document.location.pathname.includes("/register"):
					presenceData.details = "Browsing Nexon Applications";
					presenceData.state =
						document.querySelectorAll<HTMLHeadingElement>("h1")[1].textContent;
					presenceData.buttons = [
						{ label: "View Application", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/index"):
					presenceData.details = "Viewing Nexon Homepage";
					presenceData.state =
						document.querySelectorAll<HTMLHeadingElement>("h1")[1].textContent;
					presenceData.buttons = [
						{ label: "View Nexon Homepage", url: document.URL },
					];
					break;
				case document.location.pathname === "/":
					presenceData.details = "Browsing the homepage";
			}
			break;
		case "hub.nexonlogistics.com":
			switch (true) {
				case document.location.pathname.includes("/profile/"):
					presenceData.details = "Viewing a profile";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h4").textContent;
					presenceData.buttons = [{ label: "View Profile", url: document.URL }];
					break;
				case document.location.pathname.includes("/jobs/"):
					presenceData.details = "Viewing a job";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h3").textContent;
					presenceData.buttons = [{ label: "View Job", url: document.URL }];
					break;
				case document.location.pathname.includes("/events"):
					presenceData.details = "Viewing calendar";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [
						{ label: "View Calendar", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/leaderboard"):
					presenceData.details = "Viewing Leaderboard";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [
						{ label: "View Leaderboard", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/events/"):
					presenceData.details = "Viewing an Event";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h4").textContent;
					presenceData.buttons = [{ label: "View Event", url: document.URL }];
					break;
				case document.location.pathname.includes("/members"):
					presenceData.details = "Viewing Members Page";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h4").textContent;
					presenceData.buttons = [{ label: "View Members", url: document.URL }];
					break;
				case document.location.pathname.includes("/jobs"):
					presenceData.details = "Browsing Jobs";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h4").textContent;
					presenceData.buttons = [{ label: "View Jobs", url: document.URL }];
					break;
				case document.location.pathname.includes("/downloads"):
					presenceData.details = "Browsing Download Section";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [
						{ label: "View Downloads", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/vtcrules"):
					presenceData.details = "Browsing Knowlege Base";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [
						{ label: "View VTC Rules", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/patreons"):
					presenceData.details = "Viewing A Page";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h1").textContent;
					presenceData.buttons = [
						{ label: "View Patreons", url: document.URL },
					];
					break;
				case document.location.pathname.includes("/faqs"):
					presenceData.details = "Viewing A Page";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [{ label: "View FAQs", url: document.URL }];
					break;
				case document.location.pathname.includes("/news"):
					presenceData.details = "Viewing A Page";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [{ label: "View News", url: document.URL }];
					break;
				case document.location.pathname.includes("/loa"):
					presenceData.details = "Applying For";
					presenceData.state =
						document.querySelector<HTMLHeadingElement>("h2").textContent;
					presenceData.buttons = [{ label: "View LOA", url: document.URL }];
					break;
				default:
					presenceData.details = "Browsing Nexon Drivers Hub";
			}
			break;
		case "status.nexonlogistics.com":
			switch (true) {
				case document.location.pathname.includes("/report"):
					presenceData.details = "Viewing Server Report";
					presenceData.state =
						document.querySelector<HTMLTitleElement>("title").textContent;
					presenceData.buttons = [{ label: "View Report", url: document.URL }];
					break;
				default:
					presenceData.details = "Viewing Nexon Server Status";
			}
			break;
	}

	if (!buttons) delete presenceData.buttons;
	if (privacy) delete presenceData.state;
	if (timestamp) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
