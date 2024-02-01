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
		largeImageKey: "https://files.catbox.moe/dalqh3.png",
		smallImageKey: "https://files.catbox.moe/g66t9n.png",
		startTimestamp: browsingTimestamp,
	};

	if (regexes.detail.test(document.location.pathname)) {
		presenceData.details = "Editing an event";
		presenceData.state = `Event ID: ${
			document.location.pathname.match(regexes.detail)[1]
		}`;
	} else if (regexes.index.test(document.location.pathname)) {
		switch (document.location.pathname) {
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
