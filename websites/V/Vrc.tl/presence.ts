const presence = new Presence({
		clientId: "1201575439974543410",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	regexes = {
		detail: /\/admin\/event\/detail\/(\d+)/,
		index: /\/([0-9]+(\|[0-9]+)+)*/,
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		smallImageKey: "search",
		startTimestamp: browsingTimestamp,
		buttons: [
			{
				label: "View Timeline",
				url: "https://vrc.tl/",
			},
		],
	};

	if (regexes.detail.test(window.location.pathname)) {
		presenceData.details = "Editing an event";
		presenceData.state = `Event ID: ${
			window.location.pathname.match(regexes.detail)[1]
		}`;
	} else if (regexes.index.test(window.location.pathname)) {
		switch (window.location.pathname) {
			case "/":
				presenceData.details = "Viewing the timeline";
				break;

			case "/clubs":
				presenceData.details = "Browsing the clubs";
				break;

			case "/login":
				presenceData.details = "Logging in";
				break;

			case "/admin/event":
				presenceData.details = "Viewing created events";
				break;

			case "/admin/event/create":
				presenceData.details = "Creating an event";
				break;
		}
	}

	presence.setActivity(presenceData);
});
