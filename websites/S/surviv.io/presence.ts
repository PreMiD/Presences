const presence = new Presence({
	clientId: "640711877609127976",
});

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

let gametypequery: string,
	gamemodequery: string,
	gametype: string,
	gamemode: string,
	killcount: string,
	alivecount: string,
	place: string;

const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/85KSQGS.png",
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
				presenceData.smallImageKey = gametype.toLowerCase();
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
