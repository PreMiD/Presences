const presence = new Presence({
	clientId: "1000664778404016230",
});

let lastUnique: string | undefined,
	lastTimestamp: number | undefined = Date.now();

presence.on("UpdateData", async () => {
	if (document.querySelector(".next-error-h1")) return presence.clearActivity();

	const { pathname, hostname } = document.location;

	if (lastUnique !== pathname) {
		lastUnique = pathname;
		lastTimestamp = Date.now();
	}

	let details = `Currently on ${pathname}`,
		buttonLabel = "Visit page",
		buttonURL = document.location.toString(),
		state = null;

	const loggedUsername = document.querySelector("#premid-username")?.innerHTML;

	switch (hostname) {
		case "signed.host":
			if (pathname.includes("/dash")) {
				loggedUsername
					? (state = `Logged in as ${loggedUsername}`)
					: (state = "Not logged in!");
				buttonLabel = "Join signed.host";
				buttonURL = "https://signed.host/";
			}
			switch (pathname) {
				// Design/Frontend routes
				case "/":
					details = "Viewing the front page";
					break;
				case "/terms":
					details = "Reading the terms of the service";
					break;

				case "/login":
					details = "Logging into their dashboard";
					buttonLabel = "Join signed.host";
					buttonURL = "https://signed.host/";
					break;

				// Dashboard routes
				case "/dash":
					details = "Watching their general statistics";
					break;
				case "/dash/service/account":
					details = "Editing account information";
					break;
				case "/dash/service/domains":
					details = "Changing their domain";
					break;
				case "/dash/service/settings":
					details = "Configuring their upload preferances";
					break;
				case "/dash/service/subscription":
					details = "Viewing subscription options";
					break;
				case "/dash/service/gallery":
					details = "Viewing their image gallery";
					break;
				case "/dash/service/warns":
					details = "Viewing their warns";
					break;
				case "/dash/service/invites":
					details = "Viewing their invite inventory";
					break;
				case "/dash/service/upload":
					details = "Uploading file(s) with the web uploader";
					break;
				case "/dash/service/email":
					details = "Configuring their email preferances";
					break;
				case "/dash/connections/discord":
					details = "Modifying their Discord connection";
					break;
				case "/dash/bio/customize":
					details = "Customizing their bio page";
					break;
				case "/dash/bio/css":
					details = "Editing their custom CSS";
					break;
			}
			break;
		case "bio.signed.host":
			if (pathname === "/") details = "Viewing the front bio page";
			else {
				details = `Viewing ${
					document
						.querySelector("#premid-username")
						?.innerHTML?.replace(/#.*/g, "") ?? "someone"
				}'s bio page`;
				state = `${
					document.querySelector("#premid-status")?.innerHTML ?? "unknown"
				} | ${
					parseInt(document.querySelector("#premid-bioviews")?.innerHTML) ||
					0 > 0
						? document.querySelector("#premid-bioviews")?.innerHTML
						: "no"
				} views | uid ${
					document.querySelector("#premid-uid")?.innerHTML ?? "no"
				}`;
				buttonLabel = "Visit bio";
			}
			break;
	}

	presence.setActivity({
		largeImageKey: "logo",
		state,
		startTimestamp: lastTimestamp,
		details,
		buttons: [{ label: buttonLabel, url: buttonURL }],
	});
});
