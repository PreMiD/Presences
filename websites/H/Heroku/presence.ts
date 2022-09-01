const presence = new Presence({
		clientId: "",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname } = window.location,
		searchParams = new URLSearchParams(window.location.search);

	switch (hostname) {
		case "www.heroku.com": {
			presenceData.details = "Browsing";
			if (pathname === "/home") {
				presenceData.state = "Home page";
			} else {
				presenceData.state = document.title.match(
					/(.*?)(?=(?: \| Heroku|$))/
				)[1];
			}
			break;
		}
		case "help.heroku.com": {
			presenceData.details = "Browsing Heroku Support";
			if (/^\/\d+$/.test(pathname)) {
				presenceData.details = "Viewing Support Ticket";
				presenceData.state = document.querySelector("h2").textContent;
			} else if (
				pathname === "/tickets/new" ||
				(pathname === "/" && searchParams.get("t") === "true")
			) {
				presenceData.state = "Creating a new ticket";
			} else if (pathname === "/tickets") {
				presenceData.state = "Viewing tickets";
			} else {
				presenceData.state =
					document.querySelector("h2")?.textContent ||
					document.querySelector("h1")?.textContent ||
					document.title;
			}
			break;
		}
	}

	if (presenceData.details) {
		presence.setActivity(presenceData);
	}
});
