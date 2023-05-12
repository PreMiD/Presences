const presence = new Presence({
	clientId: "1000664778404016230",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let lastUnique: string,
	lastTimestamp = Date.now();

presence.on("UpdateData", async () => {
	if (document.querySelector(".next-error-h1")) return presence.clearActivity();

	const { pathname, hostname, href } = document.location;

	if (lastUnique !== pathname) {
		lastUnique = pathname;
		lastTimestamp = Date.now();
	}

	let details = `Currently on ${pathname}`,
		buttonLabel = null,
		buttonURL = null,
		state = null;

	const loggedUsername =
			document.querySelector("#premid-username")?.textContent,
		pages: Record<string, PresenceData> = {
			"/": { details: "Viewing the front page" },
			"/terms": { details: "Reading the terms of the service" },
			"/login": { details: "Logging into their dashboard" },

			"/dash": { details: "Watching their general statistics" },
			"/dash/service/account": { details: "Editing account information" },
			"/dash/service/domains": { details: "Changing their domain" },
			"/dash/service/settings": {
				details: "Configuring their upload preferences",
			},
			"/dash/service/subscription": { details: "Viewing subscription options" },
			"/dash/service/gallery": { details: "Viewing their image gallery" },
			"/dash/service/warns": { details: "Viewing their warns" },
			"/dash/service/invites": { details: "Viewing their invite inventory" },
			"/dash/service/upload": {
				details: "Uploading file(s) with the web uploader",
			},
			"/dash/service/email": { details: "Configuring their email preferences" },
			"/dash/connections/discord": {
				details: "Modifying their Discord connection",
			},
			"/dash/bio/customize": { details: "Customizing their bio page" },
			"/dash/bio/css": { details: "Editing their custom CSS" },
		};

	switch (hostname) {
		case "signed.host":
			if (pathname.includes("/dash")) {
				if (loggedUsername) state = `Logged in as ${loggedUsername}`;
				else state = "Not logged in!";
			}

			details = pages[pathname]?.details;

			break;
		case "bio.signed.host":
			if (pathname === "/") {
				details = "Viewing the front bio page";
				break;
			}
			details = `Viewing ${
				document
					.querySelector("#premid-username")
					?.textContent?.replace(/#.*/g, "") ?? "someone"
			}'s bio page`;
			state = `${
				document.querySelector("#premid-status")?.textContent ?? "unknown"
			} | ${
				parseInt(document.querySelector("#premid-bioviews")?.textContent) ||
				0 > 0
					? document.querySelector("#premid-bioviews")?.textContent
					: "no"
			} views | uid ${
				document.querySelector("#premid-uid")?.textContent ?? "no"
			}`;
			buttonLabel = "Visit Bio";
			buttonURL = href;
			break;
	}

	presence.setActivity({
		largeImageKey: "https://i.imgur.com/lpLWPa4.png",
		state,
		startTimestamp: lastTimestamp,
		details,
		buttons:
			buttonLabel && buttonURL
				? [{ label: buttonLabel, url: buttonURL }]
				: null,
	});
});
