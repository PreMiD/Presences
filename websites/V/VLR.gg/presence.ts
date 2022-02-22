const presence = new Presence({
	clientId: "939236497985536070"
}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement
let rankinginfo: HTMLElement
let teamicon: HTMLImageElement
let eventicon: HTMLImageElement
let playername: HTMLElement

presence.on("UpdateData", async () => {
	title = document.querySelector("head > title");
	rankinginfo = document.querySelector(".wf-tmp-h .normal");
	teamicon = document.querySelector(".wf-avatar.team-header-logo img")
	eventicon = document.querySelector(".wf-avatar.event-header-thumb img")
	playername = document.querySelector(".player-real-name.ge-text-light")

	const presenceData: PresenceData = {
		largeImageKey: "vlr",
		details: "Browsing page",
		startTimestamp: browsingTimestamp,
		state: title.textContent.replace(' | VLR.gg', '')
	};
	/*Clear title in important pages*/
	if (title.textContent.includes("Valorant esports coverage | VLR.gg")) {
		presenceData.details = "On home";
		delete presenceData.state;
	}

	/*Main pages*/

	else if (document.location.pathname.includes("/threads")) {
		presenceData.details = "Browsing threads";
		delete presenceData.state;
	}
	else if (document.location.pathname.includes("/matches")) {
		presenceData.details = "Browsing matches";
		delete presenceData.state;
	}
	else if (document.location.pathname.includes("/events")) {
		presenceData.details = "Browsing events";
		delete presenceData.state;
	}
	else if (document.location.pathname.includes("/rankings")) {
		presenceData.details = "Viewing rankings";
		presenceData.state = rankinginfo.textContent.replace('Valorant Team Rankings:', '');
	}
	else if (document.location.pathname.includes("/stats")) {
		presenceData.details = "Viewing statistics";
		delete presenceData.state;
	}
	else if (document.location.pathname.includes("/user")) {
		presenceData.details = ("Viewing" + title.textContent.replace("Profile | VLR.gg", '') + "profile");
		delete presenceData.state;
	}
	else if (document.location.pathname.includes("/settings")) {
		presenceData.details = "Viewing settings";
		delete presenceData.state;
	}

	/*Show event name and logo*/

	else if (document.location.pathname.includes("/event")) {
		presenceData.details = "Viewing event";
		presenceData.state = title.textContent;
		presenceData.state = title.textContent.replace(": Brackets, Groups, and Standings | Valorant Event | VLR.gg", "")
		presenceData.largeImageKey = eventicon.src
	}

	/*Show team logo*/
	else if (document.location.pathname.includes("/team")) {
		presenceData.details = "Viewing team page";
		presenceData.state = title.textContent.replace(": Valorant Team Profile | VLR.gg", "")
		presenceData.largeImageKey = teamicon.src
	}

	/*Viewing player's page*/
	else if (document.location.pathname.includes("/player")) {
		presenceData.details = "Viewing player's page";
		presenceData.state = (title.textContent.replace(": Valorant Player Profile | VLR.gg", "") + "(" + playername.textContent + ")")
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
