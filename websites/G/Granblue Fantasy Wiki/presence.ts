const presence = new Presence({
		clientId: "914354609370329098",
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
		presenceData.smallImageKey = Assets.Search;
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
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
	}

	presence.setActivity(presenceData);
});
