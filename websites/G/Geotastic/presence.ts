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

	if (document.location.pathname === "/home")
		presenceData.details = "Viewing the home page";
	else if (document.location.pathname === "/local-lobby")
		presenceData.details = "Creating a local lobby";
	else if (
		document.location.pathname === "/play" ||
		document.location.pathname.includes("/play-online/")
	) {
		if (document.querySelector(".active-component-prepare"))
			presenceData.details = "Preparing for a round";
		else if (document.querySelector(".active-component-play")) {
			if (document.querySelector(".side-bar")) {
				var info = document
					.querySelector(".meta-infos")
					.querySelectorAll("span");
				presenceData.details = "In an online battle";
				presenceData.state = "Playing map " + info[1].textContent;
			} else {
				var info = document
					.querySelector(".meta-infos")
					.querySelectorAll("span");
				presenceData.details = "Playing map " + info[1].textContent;
				presenceData.state = info[2].textContent + " " + info[3].textContent;
			}
		} else if (document.querySelector(".active-component-result")) {
			presenceData.details = document
				.querySelector(".round-info")
				.querySelector("span").textContent;
			presenceData.state =
				"Score " + document.querySelector(".own-score").textContent;
		} else if (document.querySelector(".active-component-finished")) {
			presenceData.details = "Round finished";
			presenceData.state =
				"Final score " + document.querySelector(".score").textContent;
		} else presenceData.details = "Playing a game";
	} else if (document.location.pathname === "/user-challenges/find")
		presenceData.details = "Browsing unplayed user challenges";
	else if (document.location.pathname === "/user-challenges/played")
		presenceData.details = "Browsing played user challenges";
	else if (document.location.pathname === "/user-challenges/own")
		presenceData.details = "Browing created user challenges";
	else if (document.location.pathname === "/user-challenges/create")
		presenceData.details = "Creating a challenge";
	else if (document.location.pathname.includes("/challenge-details/"))
		presenceData.details = "Viewing a challenge";
	else if (document.location.pathname.includes("/online-lobby/"))
		presenceData.details = "In an online lobby";
	else if (document.location.pathname === "/matchmaking-lobby")
		presenceData.details = "In a matchmaking lobby";
	else if (document.location.pathname === "/community-map")
		presenceData.details = "Viewing the community map";
	else if (document.location.pathname === "/squad/list")
		presenceData.details = "Browsing the list of squads";
	else if (document.location.pathname === "/squad/management")
		presenceData.details = "Viewing the squad management page";
	else if (document.location.pathname === "/map-editor/maps")
		presenceData.details = "Creating a map";
	else if (document.location.pathname === "/map-editor/drop-groups")
		presenceData.details = "Viewing their drop groups";
	else if (document.location.pathname === "/events")
		presenceData.details = "Browsing past and future events";
	else if (document.location.pathname.includes("/events/")) {
		presenceData.details = "Viewing an event";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (document.location.pathname.includes("/help-out/"))
		presenceData.details = "Viewing ways to support Geotastic";
	else if (document.location.pathname === "/account/profile")
		presenceData.details = "Viewing their profile settings";
	else if (document.location.pathname === "/account/statistics")
		presenceData.details = "Viewing their statistics";
	else if (document.location.pathname === "/account/trophies")
		presenceData.details = "Viewing their trophies";
	else if (document.location.pathname === "/account/friends")
		presenceData.details = "Viewing their friends";
	else if (document.location.pathname === "/account/supporter-status")
		presenceData.details = "Viewing their supporter status";
	else if (document.location.pathname === "/account/quota-consumption")
		presenceData.details = "Viewing their quota consumption";
	else if (document.location.pathname === "/account/account-settings")
		presenceData.details = "Viewing their account settings";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
