const presence = new Presence({
	clientId: "754771926857285782",
});

enum Assets {
	idle = "https://i.imgur.com/m7dbikM.png",
	day = "https://i.imgur.com/cYUWU5G.png",
	night = "https://i.imgur.com/DLiJ9VV.png",
	voting = "https://i.imgur.com/FfmS4Ko.png",
	covenLogo = "https://i.imgur.com/weE0OjD.png",
	regularLogo = "https://i.imgur.com/y7VYTQK.jpg",
}

enum GameState {
	night = "night",
	day = "day",
	end = "end",
	afterGame = "afterGame",
	preGame = "preGame",
}

enum GameType {
	classic = "Classic",
	ranked = "Ranked",
}

interface GameData {
	scene: string;
	page: string;
	day: number;
	type: string;
	state: GameState;
}

let elapsed = Math.round(Date.now() / 1000),
	oldState: GameData = {
		scene: "BigLogin",
		page: "",
		day: 1,
		type: GameType.classic,
		state: GameState.day,
	},
	currentState = oldState,
	logs: string[] = [];

function handleLog(log: string) {
	if (
		log.startsWith("Switched to ") ||
		log.startsWith("Switched additively to")
	) {
		currentState.scene = log
			.match(/^Switched( additively)? to( scene)? (.*) Scene$/m)[1]
			.trim();
	} else if (log.startsWith("Entered HomeSceneController.ShowView()")) {
		currentState.page = log
			.match(
				/^Entered HomeSceneController.ShowView\(\) - View passed in: (.*)$/m
			)[1]
			.trim();
	} else if (log.startsWith("Entered ")) {
		switch (log.match(/^Entered (.*)$/m)[1].trim()) {
			case "HandleStartRanked": {
				currentState.type = GameType.ranked;
				break;
			}
			case "HandleOnLeaveRankedQueue": {
				currentState.type = GameType.classic;
				break;
			}
		}
	} else if (log.startsWith("Creating lobby:")) {
		currentState.type = log.match(/^Creating lobby: (.*?) \|/)[1];
	} else if (/\[Network\] <color=.*?>\[Received\] <b>/.test(log)) {
		const action = log.match(
			/\[Network\] <color=.*?>\[Received\] <b>(.*?)<\/b>/
		)[1];
		switch (action) {
			case "RoleLotsInfo":
			case "RoleAndPosition":
			case "RoleList": {
				currentState.page = action;
				currentState.state = GameState.preGame;
				break;
			}
			case "StartFirstDay": {
				currentState.day = 0;
				currentState.state = GameState.day;
				break;
			}
			case "StartDay": {
				currentState.day++;
				currentState.state = GameState.day;
				break;
			}
			case "StartNight": {
				currentState.state = GameState.night;
				break;
			}
			case "StartDiscussion": {
				currentState.page = action;
				break;
			}
			case "StartDefense": {
				currentState.page = action;
				break;
			}
			case "StartJudgement": {
				currentState.page = action;
				break;
			}
			case "StartVoting": {
				currentState.page = action;
				break;
			}
			case "WhoDiedAndHow": {
				currentState.page = action;
				break;
			}
			case "DeathNote": {
				currentState.page = action;
				break;
			}
			case "TellLastWill": {
				currentState.page = action;
				break;
			}
			case "SomeoneHasWon": {
				currentState.state = GameState.end;
				break;
			}
			case "AfterGameScreenData": {
				currentState.state = GameState.afterGame;
				break;
			}
		}
	}
}

setInterval(async () => {
	const latestLogs: string[] = (await presence.getLogs()).filter(log => {
		return !/(Submitting chat)|(SocketSend\\.)|(Message received)|(> Potion ID)|(Number of)|(Adding game type)|(Clearing any)|(Initializing)|(Entering)|(Unloading)|(Preloading)|(Login Scene)|\\[ApplicationController]|\\[UnityCache]|\\[Subsystems]|\\[CachedXMLHttpRequest]/.test(
			log
		);
	});
	for (let i = latestLogs.length - 1; i >= 0; i--) {
		if (logs.includes(latestLogs[i])) continue;
		handleLog(latestLogs[i]);
	}
	logs = latestLogs;
}, 500);

presence.on("UpdateData", () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.regularLogo,
		startTimestamp: elapsed,
	};

	if (window.location.pathname !== "/TownOfSalem/") {
		presenceData.details = "Browsing BlankMediaGames";
		presenceData.state = document.title;
	} else {
		if (oldState.scene !== currentState.scene) elapsed = Math.round(Date.now() / 1000);
		oldState = currentState;
		switch (currentState.scene) {
			case "BigLogin": {
				presenceData.details = "Logging in";
				break;
			}
			case "BigHome": {
				switch (currentState.page) {
					case "GameModeSelect": {
						presenceData.details = "Selecting Game Mode";
						break;
					}
					case "Customization": {
						presenceData.details = "Customizing Character";
						break;
					}
					case "Party": {
						presenceData.details = "In a Party";
						break;
					}
					default: {
						presenceData.details = "Browsing Main Menu";
						presenceData.state = currentState.page;
					}
				}
				break;
			}
			case "BigLobby": {
				presenceData.details = "Waiting in a Lobby";
				switch (currentState.type) {}
			}
		}
	}

	presence.setActivity(presenceData);
});
