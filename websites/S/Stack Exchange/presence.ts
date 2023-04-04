const presence = new Presence({
		clientId: "919817726195814431",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/WCho2QO.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = window.location,
		showButtons = await presence.getSetting<boolean>("buttons");

	switch (hostname) {
		case "stackexchange.com": {
			presenceData.details = "Browsing";
			break;
		}
		case "serverfault.com": {
			presenceData.largeImageKey = "serverfault";
			presenceData.details = "Server Fault";
			break;
		}
		case "meta.serverfault.com": {
			presenceData.largeImageKey = "serverfault";
			presenceData.details = "Server Fault Meta";
			break;
		}
		case "superuser.com": {
			presenceData.largeImageKey = "superuser";
			presenceData.details = "Super User";
			break;
		}
		case "meta.superuser.com": {
			presenceData.largeImageKey = "superuser";
			presenceData.details = "Super User Meta";
			break;
		}
		default: {
			const imageKey = hostname.replace(".stackexchange.com", "");
			if (imageKey === "meta") presenceData.smallImageKey = imageKey;
			else presenceData.smallImageKey = imageKey.replace(".meta", "");

			presenceData.smallImageText = document
				.querySelector("meta[property='og:site_name']")
				.getAttribute("content")
				.replace("Stack Exchange", "");
			if (pathname.includes("/questions")) {
				presenceData.details = "Reading a question";
				presenceData.buttons = [
					{
						label: "View Question",
						url: href,
					},
				];
			}
		}
	}

	if (pathname === "/") {
		if (
			[
				"serverfault.com",
				"meta.serverfault.com",
				"superuser.com",
				"meta.superuser.com",
			].includes(hostname)
		)
			presenceData.state = "Main Page";
		else presenceData.details = "Main Page";
	} else if (pathname.includes("/questions")) {
		presenceData.state = document.querySelector(
			".question-hyperlink"
		).textContent;
	} else if (
		[
			"serverfault.com",
			"meta.serverfault.com",
			"superuser.com",
			"meta.superuser.com",
		].includes(hostname)
	)
		presenceData.state = "Browsing";
	else presenceData.details = "Browsing";

	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
