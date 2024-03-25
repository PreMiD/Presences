const presence = new Presence({
	clientId: "640711877609127976",
});

let gametypequery: string,
	gamemodequery: string,
	gametype: string,
	gamemode: string,
	killcount: string,
	alivecount: string,
	place: string;

const browsingTimestamp = Math.floor(Date.now() / 1000),
	assets = {
		squad: "https://cdn.rcd.gg/PreMiD/websites/S/surviv.io/assets/0.png",
		duo: "https://cdn.rcd.gg/PreMiD/websites/S/surviv.io/assets/1.png",
		solo: "https://cdn.rcd.gg/PreMiD/websites/S/surviv.io/assets/2.png",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/surviv.io/assets/logo.png",
		},
		broadcasttc = await presence.getSetting<boolean>("broadcasttc"),
		active =
			window.getComputedStyle(document.querySelector("#start-menu-wrapper"))
				.display === "none";
	presenceData.startTimestamp = browsingTimestamp;

	if (document.querySelector(".ui-stats-current")) {
		// Player is looking at match results, this needs to be before checking if active due to the way the active variable is set up
		place = document.querySelector(
			".ui-stats-current .ui-stats-player-rank"
		).textContent;
		presenceData.details = `Placed ${place}`;
	} else if (!active) {
		gametypequery = 'div[id="index-play-type-selected"]';
		gamemodequery = 'div[id="index-play-mode-selected"]';
		if (
			window.getComputedStyle(document.querySelector("#team-menu")).display ===
			"block"
		) {
			// If the player made a team
			if (broadcasttc && (gametype === "Duo" || gametype === "Squad")) {
				presenceData.buttons = [
					{
						label: "Join Game",
						url: document.baseURI,
					},
				];
				presenceData.smallImageKey =
					assets[gametype.toLowerCase() as keyof typeof assets];
				presenceData.smallImageText =
					document.querySelector("#team-code").textContent;
			}
			gametypequery = gametypequery.replace('"]', '-team"]');
			gamemodequery = gamemodequery.replace('"]', '-team"]');
		}

		gametype = document.querySelector(gametypequery).textContent;
		gamemode = document.querySelector(gamemodequery).textContent;
		presenceData.details = "In the menus...";
	} else if (active) {
		// Player is in-game
		presenceData.smallImageText = `Playing ${gametype}s`;
		alivecount = document.querySelector(".ui-players-alive").textContent;
		killcount = document.querySelector(".ui-player-kills").textContent;

		presenceData.details = `${killcount} kill${
			parseInt(killcount) !== 1 ? "s" : ""
		} with ${alivecount} alive`;
		presenceData.state = `${
			gamemode !== "50v50" ? `${gametype} - ` : ""
		}${gamemode}`;
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
