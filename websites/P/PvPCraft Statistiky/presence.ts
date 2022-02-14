const presence = new Presence({
		clientId: "942753835531788348"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "stats",
		startTimestamp: browsingTimestamp
	};

	if (document.location.pathname.includes("/leaderboards/friends")) {
		presenceData.details = "Kouká na leaderboard:";
		presenceData.state = "Podle kamarádů";
	} else if (document.location.pathname.includes("/leaderboards/playtime")) {
		presenceData.details = "Kouká na leaderboard:";
		presenceData.state = "Podle odehraného času";
	} else if (document.location.pathname.includes("/leaderboards/reputation")) {
		presenceData.details = "Kouká na leaderboard:";
		presenceData.state = "Podle reputace";
	} else if (document.location.pathname.includes("/leaderboards/pvpcoins")) {
		presenceData.details = "Kouká na leaderboard:";
		presenceData.state = "Podle PvPCoinů";
	} else if (document.location.pathname.includes("/leaderboards/votes")) {
		presenceData.details = "Kouká na leaderboard:";
		presenceData.state = "Podle hlasů";
	} else if (document.location.pathname.includes("/profile/")) {
		presenceData.details = "Kouká na profil:";
		presenceData.state = (
			document.querySelector("span.player-nick") as HTMLElement
		).textContent;
	} else {
		presenceData.details = "Hledá hráče";
	}

	presence.setActivity(presenceData);
});
