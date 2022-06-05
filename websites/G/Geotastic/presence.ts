const presence = new Presence({
		clientId: "978557181911773214"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		details: "Viewing an unsupported page",
		startTimestamp: browsingTimestamp
	};

	switch (document.location.pathname) {
		case "/home": {
			presenceData.details = "Viewing the home page";
			break;
		}
		case "/local-lobby": {
			presenceData.details = "Creating a local lobby";
			break;
		}
		case "/user-challenges/find": {
			presenceData.details = "Browsing unplayed user challenges";
			break;
		}
		case "/user-challenges/played": {
			presenceData.details = "Browsing played user challenges";
			break;
		}
		case "/user-challenges/own": {
			presenceData.details = "Browing created user challenges";
			break;
		}
		case "/user-challenges/create": {
			presenceData.details = "Creating a challenge";
			break;
		}
		case "/matchmaking-lobby": {
			presenceData.details = "In a matchmaking lobby";
			break;
		}
		case "/community-map": {
			presenceData.details = "Viewing the community map";
			break;
		}
		case "/squad/list": {
			presenceData.details = "Browsing the list of squads";
			break;
		}
		case "/squad/management": {
			presenceData.details = "Viewing the squad management page";
			break;
		}
		case "/map-editor/maps": {
			presenceData.details = "Creating a map";
			break;
		}
		case "/map-editor/drop-groups": {
			presenceData.details = "Viewing their drop groups";
			break;
		}
		case "/events": {
			presenceData.details = "Browsing past and future events";
			break;
		}
		case "/account/profile": {
			presenceData.details = "Viewing their profile settings";
			break;
		}
		case "/account/statistics": {
			presenceData.details = "Viewing their statistics";
			break;
		}
		case "/account/trophies": {
			presenceData.details = "Viewing their trophies";
			break;
		}
		case "/account/friends": {
			presenceData.details = "Viewing their friends";
			break;
		}
		case "/account/supporter-status": {
			presenceData.details = "Viewing their supporter status";
			break;
		}
		case "/account/quota-consumption": {
			presenceData.details = "Viewing their quota consumption";
			break;
		}
		case "/account/account-settings": {
			presenceData.details = "Viewing their account settings";
			break;
		}
		default:
			if (document.location.pathname.includes("/challenge-details/"))
				presenceData.details = "Viewing a challenge";
			else if (document.location.pathname.includes("/online-lobby/"))
				presenceData.details = "In an online lobby";
			else if (document.location.pathname.includes("/events/")) {
				presenceData.details = "Viewing an event";
				presenceData.state = document.querySelector("h1").textContent;
			} else if (document.location.pathname.includes("/help-out/"))
				presenceData.details = "Viewing ways to support Geotastic";
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
