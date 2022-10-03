const presence = new Presence({
	clientId: "754771926857285782",
});

enum Assets {
	day = "https://i.imgur.com/HfHbMyP.png",
	discussion = "https://i.imgur.com/jPqjrgn.png",
	night = "https://i.imgur.com/20YDTvV.png",
	voting = "https://i.imgur.com/QONtFlc.png",
	judgement = "https://i.imgur.com/6VbV24O.png",
	defense = "https://i.imgur.com/bsl0JU0.png",
	logo = "https://i.imgur.com/y7VYTQK.jpg",
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
	gameMode: string;
	state: GameState;
}

interface Log {
	content: string;
	id: number;
}

const gameTypeNames: Record<string, string> = {
		RankedPractice: "Ranked Practice",
		RapidMode: "Custom Rapid Mode",
		DraculasPalace: "Dracula's Palace",
		ClassicTownTraitor: "Town Traitor",
		CovenClassic: "Classic Coven",
		CovenRankedPractice: "Coven Ranked Practice",
		CovenMafia: "Mafia Returns",
		CovenCustom: "Custom Coven",
		CovenTownTraitor: "Coven Town Traitor",
		CovenAllAny: "Coven All Any",
		AllAny: "All Any",
	},
	oldState: GameData = {
		scene: "BigLogin",
		page: "",
		day: 1,
		gameMode: GameType.classic,
		state: GameState.day,
	},
	currentState = Object.assign({}, oldState);

let elapsed = Math.round(Date.now() / 1000),
	lastId = -1;

function handleLog(log: string) {
	if (
		log.startsWith("Switched to ") ||
		log.startsWith("Switched additively to")
	) {
		const scene = log
			.match(/^Switched(?: additively)? to(?: scene)? (.*) Scene/m)[1]
			.trim();
		currentState.scene = scene;
		if (scene === "BigPreGame") currentState.state = GameState.preGame;
	} else if (log.startsWith("Entered HomeSceneController.ShowView()")) {
		currentState.page = log
			.match(
				/^Entered HomeSceneController.ShowView\(\) - View passed in: (.*)$/m
			)[1]
			.trim();
	} else if (log.startsWith("Entered ")) {
		switch (log.match(/^Entered (.*)$/m)[1].trim()) {
			case "HandleStartRanked": {
				currentState.scene = "BigLobby";
				currentState.gameMode = GameType.ranked;
				break;
			}
			case "HandleOnLeaveRankedQueue": {
				currentState.scene = "BigHome";
				currentState.gameMode = GameType.classic;
				break;
			}
		}
	} else if (log.startsWith("Creating lobby:"))
		currentState.gameMode = log.match(/^Creating lobby: (.*?) \|/)[1];
	else if (/\[Network\] <color=.*?>\[Received\] <b>/.test(log)) {
		const action = log.match(
			/\[Network\] <color=.*?>\[Received\] <b>(.*?)<\/b>/
		)[1];
		switch (action) {
			case "PickNames":
			case "RoleAndPosition": {
				currentState.page = action;
				currentState.state = GameState.preGame;
				break;
			}
			case "StartFirstDay": {
				currentState.day = 1;
				currentState.state = GameState.day;
				currentState.page = "StartDiscussion";
				break;
			}
			case "StartDay": {
				currentState.day++;
				currentState.state = GameState.day;
				currentState.page = "";
				break;
			}
			case "StartNight": {
				currentState.state = GameState.night;
				currentState.page = "";
				break;
			}
			case "FullMoonNight":
			case "StartDiscussion":
			case "StartDefense":
			case "StartJudgement":
			case "StartVoting":
			case "WhoDiedAndHow": {
				currentState.page = action;
				break;
			}
			case "SomeoneHasWon": {
				currentState.state = GameState.end;
				break;
			}
		}
	}
}

/**
 * Overwrites the default console.log to be able to read the logs.
 * Built-in readLogs causes performance problems, as hundreds of logs can be created in half a second.
 * It is also hard to determine which logs have not been read yet.
 */
const injectedLoggerScript = document.createElement("script");
injectedLoggerScript.type = "text/javascript";
injectedLoggerScript.textContent = `
{
	let counter = 0;
	console.stdlog = console.log.bind(console);
	console.logs = [];
	console.log = function() {
		const log = arguments[0];
		if (/^Switched |^Entered |^Creating |\\[Network\\] <color=.*?>\\[Received\\] <b>/.test(log)) {
			console.logs.push({
				content: log,
				id: counter,
			});
			counter++;
		}
		while (console.logs.length > 100) console.logs.shift();
		console.stdlog.apply(console, arguments);
	};
}
`;
document.head.appendChild(injectedLoggerScript);

setInterval(async () => {
	const logs: Log[] = await presence.getPageletiable('console"]["logs');
	let lastUnreadLogIndex = 0;
	for (let i = logs.length - 1; i >= 0; i--) {
		if (logs[i].id === lastId) {
			lastUnreadLogIndex = i + 1;
			break;
		}
	}
	for (let i = lastUnreadLogIndex; i < logs.length; i++)
		handleLog(logs[i].content);
	if (logs.length > 0) lastId = logs[logs.length - 1].id;
}, 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.logo,
	};

	if (window.location.pathname !== "/TownOfSalem/") {
		presenceData.details = "Browsing BlankMediaGames";
		presenceData.state = document.title;
	} else {
		if (oldState.scene !== currentState.scene)
			elapsed = Math.round(Date.now() / 1000);
		presenceData.startTimestamp = elapsed;
		Object.assign(oldState, currentState);
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
				presenceData.state =
					gameTypeNames[currentState.gameMode] ?? currentState.gameMode;
				break;
			}
			case "BigPreGame": {
				presenceData.details = "Loading Game";
				presenceData.state =
					gameTypeNames[currentState.gameMode] ?? currentState.gameMode;
				break;
			}
			case "BigGame": {
				presenceData.details = `Playing a ${
					gameTypeNames[currentState.gameMode] ?? currentState.gameMode
				} Game`;
				switch (currentState.state) {
					case GameState.preGame: {
						switch (currentState.page) {
							case "PickNames": {
								presenceData.state = "Choosing Names";
								break;
							}
							case "RoleAndPosition": {
								presenceData.state = "Getting a Role";
								break;
							}
						}
						break;
					}
					case GameState.day: {
						presenceData.smallImageKey = Assets.day;
						switch (currentState.page) {
							case "StartDiscussion": {
								presenceData.state = `Discussion | Day ${currentState.day}`;
								presenceData.smallImageKey = Assets.discussion;
								break;
							}
							case "StartVoting": {
								presenceData.state = `Voting | Day ${currentState.day}`;
								presenceData.smallImageKey = Assets.voting;
								break;
							}
							case "WhoDiedAndHow": {
								presenceData.state = `Viewing a Death | Day ${currentState.day}`;
								break;
							}
							case "StartDefense": {
								presenceData.state = `Defense | Day ${currentState.day}`;
								presenceData.smallImageKey = Assets.defense;
								break;
							}
							case "StartJudgement": {
								presenceData.state = `Judgement | Day ${currentState.day}`;
								presenceData.smallImageKey = Assets.judgement;
								break;
							}
						}
						break;
					}
					case GameState.night: {
						presenceData.smallImageKey = Assets.night;
						if (currentState.page === "FullMoonNight")
							presenceData.state = `Night ${currentState.day} (Full Moon)`;
						else presenceData.state = `Night ${currentState.day}`;
						break;
					}
					case GameState.end: {
						presenceData.state = "Viewing End Screen";
						break;
					}
				}
				break;
			}
			case "BigEndGame": {
				presenceData.state = "Viewing After Game Screen";
				break;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
