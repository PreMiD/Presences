const presence = new Presence({
		clientId: "978557181911773214",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/2gjiXL9.png",
		details: "Viewing an unsupported page",
		startTimestamp: browsingTimestamp,
	};
	const pages: Record<string, PresenceData> = {
		"/home": { details: "Viewing the home page" },
		"/local-lobby": { details: "Creating a local lobby" },
		"/user-challenges/find": { details: "Browsing unplayed user challenges" },
		"/user-challenges/played": { details: "Browsing played user challenges" },
		"/user-challenges/own": { details: "Browsing created user challenges" },
		"/user-challenges/create": { details: "Creating a challenge" },
		"/matchmaking-lobby": { details: "In a matchmaking lobby" },
		"/community-map": { details: "Viewing the community map" },
		"/squad/list": { details: "Browsing the list of squads" },
		"/squad/management": { details: "Viewing the squad management page" },
		"/map-editor/maps": { details: "Creating a map" },
		"/map-editor/drop-groups": { details: "Viewing their drop groups" },
		"/events": { details: "Browsing past and future events" },
		"/account/profile": { details: "Viewing their profile settings" },
		"/account/statistics": { details: "Viewing their statistics" },
		"/account/trophies": { details: "Viewing their trophies" },
		"/account/friends": { details: "Viewing their friends" },
		"/account/supporter-status": {
			details: "Viewing their supporter status",
		},
		"/account/quota-consumption": {
			details: "Viewing their quota consumption",
		},
		"/account/account-settings": { details: "Viewing their account settings" },
	};

	for (const [path, data] of Object.entries(pages)) {
		if (document.location.pathname.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	switch (true) {
		case document.location.pathname.includes("/challenge-details/"):
			presenceData.details = "Viewing a challenge";
			break;
		case document.location.pathname.includes("/online-lobby/"):
			presenceData.details = "In an online lobby";
			break;
		case document.location.pathname.includes("/events/"):
			presenceData.details = "Viewing an event";
			presenceData.state = document.querySelector("h1").textContent;
			break;
		case document.location.pathname.includes("/help-out/"):
			presenceData.details = "Viewing ways to support Geotastic";
			break;
	}

	if (
		document.location.pathname === "/play" ||
		document.location.pathname.includes("/play-online/")
	) {
		if (document.querySelector(".active-component-prepare"))
			presenceData.details = "Preparing for a round";
		else if (document.querySelector(".active-component-play")) {
			if (document.querySelector(".side-bar")) {
				presenceData.details = "In an online battle";
				presenceData.state = `Playing map ${
					document.querySelector(".meta-infos").querySelectorAll("span")[1]
						.textContent
				}`;
			} else {
				const info = document
					.querySelector(".meta-infos")
					.querySelectorAll("span");
				presenceData.details = `Playing map ${info[1].textContent}`;
				presenceData.state = `${info[2].textContent} ${info[3].textContent}`;
			}
		} else if (document.querySelector(".active-component-result")) {
			presenceData.details = document
				.querySelector(".round-info")
				.querySelector("span").textContent;
			presenceData.state = `Score ${
				document.querySelector(".own-score").textContent
			}`;
		} else if (document.querySelector(".active-component-finished")) {
			presenceData.details = "Round finished";
			presenceData.state = `Final score ${
				document.querySelector(".score").textContent
			}`;
		} else presenceData.details = "Playing a game";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
