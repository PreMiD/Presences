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

enum GameEvent {
	night = "night",
	day = "day",
	voting = "voting",
	end = "end",
	judgement = "judgement",
	discussion = "discussion",
	defense = "defense",
	afterGame = "afterGame",
	viewingDeathNote = "viewingDeathNote",
	viewingLastWill = "viewingLastWill",
	preGame = "preGame",
}

enum GameType {
	classic = "Classic",
	ranked = "Ranked",
}

interface GameState {
	scene: string;
	page: string;
	day: number;
	type: string;
	state: GameEvent;
}

let elapsed = Math.round(Date.now() / 1000),
	oldState: GameState = {
		scene: "BigHome",
		page: "Login",
		day: 1,
		type: GameType.classic,
		state: GameEvent.day,
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
		const pageName = log.match(/^Entered (.*)$/m)[1].trim();
		switch (pageName) {
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
				currentState.state = GameEvent.preGame;
				break;
			}
			case "StartFirstDay": {
				currentState.day = 0;
				currentState.state = GameEvent.day;
				break;
			}
			case "StartDay": {
				currentState.day++;
				currentState.state = GameEvent.day;
				break;
			}
			case "StartNight": {
				currentState.state = GameEvent.night;
				break;
			}
			case "StartDiscussion": {
				currentState.state = GameEvent.discussion;
				break;
			}
			case "StartDefense": {
				currentState.state = GameEvent.defense;
				break;
			}
			case "StartJudgement": {
				currentState.state = GameEvent.judgement;
				break;
			}
			case "StartVoting": {
				currentState.state = GameEvent.voting;
				break;
			}
			case "WhoDiedAndHow": {
				break;
			}
			case "DeathNote": {
				currentState.state = GameEvent.viewingDeathNote;
				break;
			}
			case "TellLastWill": {
				currentState.state = GameEvent.viewingLastWill;
				break;
			}
			case "SomeoneHasWon": {
				currentState.state = GameEvent.end;
				break;
			}
			case "AfterGameScreenData": {
				currentState.state = GameEvent.afterGame;
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
	}

	presence.setActivity(presenceData);
});
