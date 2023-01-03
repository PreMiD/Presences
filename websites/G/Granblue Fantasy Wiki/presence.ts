const presence = new Presence({
		clientId: "914354609370329098",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/k5QiAPC.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/Main_Page")
		presenceData.details = "Viewing Wiki home page";
	else if (document.querySelector("#wpLoginAttempt")) {
		presenceData.details = "Logging in";
		presenceData.smallImageKey = "login";
		presenceData.smallImageText = "Logging in";
	} else if (document.querySelector("#wpCreateaccount")) {
		presenceData.details = "Creating an account";
		presenceData.smallImageKey = "newaccount";
		presenceData.smallImageText = "Creating an account";
	} else if (document.location.pathname.startsWith("/Character_Tier_List")) {
		presenceData.details = "Viewing the character tier list";
		presenceData.smallImageKey = "tierlist";
		presenceData.smallImageText = "Viewing tier list";
	} else if (document.location.pathname === "/Collection_Tracker")
		presenceData.details = "Making a collection tracker";
	else if (document.location.pathname.startsWith("/search"))
		presenceData.details = "Making a collection tracker";
	else if (document.querySelector(".searchresults")) {
		presenceData.details = "Searching for:";
		presenceData.state = (
			document.querySelector("input[type=search]") as HTMLInputElement
		).value;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Searching";
	} else if (document.location.href.includes("Special:Preferences"))
		presenceData.details = "Editing preferences";
	else if (document.location.href.includes("Special:Watchlist"))
		presenceData.details = "Viewing watchlist";
	else if (document.location.href.includes("Special:Contributions"))
		presenceData.details = "Looking up contributions";
	else if (document.location.href.includes("history")) {
		presenceData.details = "Viewing revision history of:";
		presenceData.state = document.querySelector(".firstHeading").textContent;
	} else if (document.location.href.includes("edit")) {
		presenceData.details = "Editing:";
		presenceData.state = document.querySelector(".firstHeading").textContent;
		presenceData.smallImageKey = "edit";
		presenceData.smallImageText = "Editing";
	} else if (document.querySelector(".firstHeading")) {
		presenceData.details = "Viewing page:";
		presenceData.state = document.querySelector(".firstHeading").textContent;
		presenceData.smallImageKey = "reading";
		presenceData.smallImageText = "Reading";
	}

	presence.setActivity(presenceData);
});
