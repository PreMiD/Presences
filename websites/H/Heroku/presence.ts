const presence = new Presence({
		clientId: "",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", async () => {
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
		case "brand.heroku.com": {
			presenceData.details = "Browsing";
			presenceData.state = "Brand";
			break;
		}
		case "elements.heroku.com": {
			presenceData.details = "Browsing Elements";
			presenceData.state = document.title.match(
				/(.*?)(?=(?: - Heroku Elements|$))/
			)[1];
			break;
		}
		case "data.heroku.com": {
			presenceData.details = "Browsing Data";
			if (pathname === "/") {
				presenceData.state = "Looking at datastores";
			} else if (pathname === "/dataclips") {
				presenceData.state = "Looking at dataclips";
			} else if (pathname.startsWith("/datastores/")) {
				if (await presence.getSetting<boolean>("showNames")) {
					presenceData.state = `Viewing datastore '${document.title.match(
						/(.*?)(?=(?: \| Heroku Data|$))/
					)}'`;
				} else {
					presenceData.state = "Viewing a datastore";
				}
			} else if (pathname.startsWith("/dataclips/")) {
				if (await presence.getSetting<boolean>("showNames")) {
					presenceData.state = `Viewing dataclip '${document.title.match(
						/(.*?)(?=(?: \| Heroku Data|$))/
					)}'`;
				} else {
					presenceData.state = "Viewing a dataclip";
				}
			}
			break;
		}
		case "devcenter.heroku.com": {
			presenceData.details = "Browsing Dev Center";
			if (pathname === "/") {
				presenceData.state = "Home page";
			} else {
				presenceData.state = document.title.match(
					/(.*?)(?=(?: \| Heroku Dev Center|$))/
				)[1];
			}
			break;
		}
		case "status.heroku.com": {
			presenceData.details = "Viewing Heroku Status";
			if (pathname === "/incidents") {
				presenceData.state = "Past incidents";
			} else if (pathname.startsWith("/incidents/")) {
				presenceData.state = document.title.match(
					/(.*?)(?=(?: \| Heroku Status|$))/
				)[1];
			} else {
				const [appStatus, dataStatus, toolsStatus] = document.querySelectorAll(
					".container.body-container > div a > .status-summary__description"
				);
				presenceData.state = `Apps: ${appStatus.textContent.replace(/\s/g, "")}
Data: ${dataStatus.textContent.replace(/\s/g, "")}
Tools: ${toolsStatus.textContent.replace(/\s/g, "")}`;
			}
			break;
		}
	}

	if (presenceData.details) {
		presence.setActivity(presenceData);
	}
});
