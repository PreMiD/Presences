const presence = new Presence({
		clientId: "1052344047911587920",
	}),
	reservedPaths: Record<string, string> = {
		"/": "Viewing the home page",
		"/premium": "Viewing the premium page",
		"/login": "Thinking about logging in",
		"/join": "Thinking about joining",
		"/tos": "Viewing the terms of service",
		"/policy": "Viewing the privacy policy",
		"/dash": "Viewing the dashboard",
		"/welcome_back": "",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/nBWzgJs.png",
		},
		{ pathname, href } = document.location;

	if (reservedPaths[pathname]) presenceData.details = reservedPaths[pathname];
	else {
		presenceData.details = `Viewing ${pathname.slice(1)}'s page on feds.lol`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
