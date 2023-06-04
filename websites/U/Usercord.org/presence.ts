const presence = new Presence({
		clientId: "661150919584514067",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/U/Usercord.org/assets/logo.png",
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
