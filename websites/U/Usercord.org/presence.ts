const presence = new Presence({
		clientId: "661150919584514067",
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
		largeImageKey: "https://i.imgur.com/cVIFD4l.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.hostname === "usercord.org") {
		presenceData.details = "Viewing Page:";
		presenceData.state = "Usercord Home Page";

		if (document.location.pathname.includes("/leaderboard")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "UserCord Leaderboard";
		} else if (document.location.pathname.includes("/search/")) {
			presenceData.details = "Searching for user:";
			presenceData.state = window.location.href
				.slice(31)
				.replaceAll("+|%20", " ");
		} else if (document.location.pathname.includes("/member")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "UserCord Member List";
		} else if (document.location.pathname.includes("/edit")) {
			presenceData.details = "Editing Info For:";
			presenceData.state = "Own Profile";
		} else if (document.location.pathname.includes("/login")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "UserCord Login Page";
		} else if (document.location.pathname.includes("/reports")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "UserCord Reports Page";
		} else if (document.location.pathname.includes("/pro/")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "UserCord Pro Users";
		} else if (document.location.pathname.includes("/discord")) {
			presenceData.details = "Joining Discord..";
			presenceData.state = "Name: DiscordLabs";
		} else if (document.location.pathname.includes("/u/")) {
			const priceEls = document.querySelectorAll(".usertitle");
			for (const priceEl of priceEls) {
				presenceData.details = "Viewing a profile:";
				presenceData.state = priceEl.textContent;
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
