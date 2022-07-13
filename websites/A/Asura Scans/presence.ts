const presence = new Presence({
		clientId: "864304063804997702",
	}),
	elapsed = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
	const { pathname, origin } = window.location,
		presenceData: PresenceData = {
			startTimestamp: elapsed,
			largeImageKey: "logo",
		};

	let state, details, buttons: [ButtonData, ButtonData?];

	if (/^\/$/.test(pathname)) details = "Viewing Home Page";
	else if (/^\/comics\/?$/.test(pathname)) details = "Viewing Comic List";
	else if (/^\/comics\/[0-9a-z-]+\/?$/i.test(pathname)) {
		details = "Viewing Comic Page";
		state = document.querySelector(".entry-title").textContent;
		buttons = [
			{
				label: "Visit Comic Page",
				url: origin + pathname,
			},
		];
	} else if (/\/[a-z-19]+(chapter|ch)-[0-9]+\/?$/i.test(pathname)) {
		details = "Reading Comic";
		state = document.querySelector(".entry-title").textContent;
		buttons = [
			{
				label: "Visit Comic Page",
				url: `${origin} + ${
					(document.querySelector(".allc > a") as HTMLAnchorElement).href
				}`,
			},
			{
				label: "Visit Chapter",
				url: origin + pathname,
			},
		];
	} else {
		details = "Browsing Asura Scans";
		state = document.title;
	}

	presenceData.details = details;
	presenceData.state = state;
	presenceData.buttons = buttons;

	if (presenceData.details) presence.setActivity(presenceData);
});
