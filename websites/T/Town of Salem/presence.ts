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
	day = 1,
	night = 0,
	voting = 2,
	end = 3,
}

interface GameState {
	page: string;
	day: number;
	type: string;
	state: GameEvent;
}

let elapsed = Math.round(Date.now() / 1000),
	oldState: GameState = {
		page: "Login",
		day: 1,
		type: "Classic",
		state: 1,
	},
	currentState = oldState,
	logs: string[] = [];

function decodeHex(hex: string): string {
	const input = hex.split(" ");
	let out = "";
	for (let i = 0; i < input.length; i++) {
		const encoded = input[i].replace(/0x/g, "").replace(/[0-9a-f]{2}/gi, "%$&");
		try {
			out += decodeURIComponent(encoded);
		} catch (err) {
			out += "§" + input[i] + "§";
		}
	}
	return out;
}

function handleLog(log: string) {
	if (log.startsWith("Switched to ")) {
		const pageName = log.split(" \\n")[0].split("Switched to ")[1];
		currentState.page = pageName;
		if (pageName === "BigHome Scene") {
			currentState.day = 1;
			currentState.state = GameEvent.day;
			currentState.type = "Classic";
		}
	} else if (log.startsWith("Creating lobby:")) {
		const type = log.split(" |")[0].split(": ")[1];
		currentState.type = type;
	} else if (log.includes("[Network]") && log.includes("Bytes:")) {
		const hex = log.split("Bytes: ")[1].split("</color>")[0],
			out = decodeHex(hex);
		if (out.includes("§")) {
			const code = out.match(/§.*?§/g)[0];
			switch (code.toLowerCase()) {
				case "§0x91§": {
					// night start
					currentState.state = GameEvent.night;
					break;
				}
				case "§0x92§": {
					// day start
					currentState.state = GameEvent.day;
					currentState.day++;
					break;
				}
				case "§0x93§": {
					// voting end
					currentState.state = GameEvent.day;
					break;
				}
				case "§0x9b§": {
					// voting starts
					currentState.state = GameEvent.voting;
					break;
				}
				case "§0xc2§": {
					// end game
					currentState.state = GameEvent.end;
					break;
				}
			}
		}
	} else if (log.startsWith("Entered HandleStartRanked")) {
		currentState.type = "Ranked";
	} else if (log.startsWith("Entered HandleOnLeaveRankedQueue")) {
		currentState.type = "Classic";
	}
}

setInterval(async () => {
	const latestLogs: string[] = await presence.getLogs(
		/(Submitting chat)|(SocketSend\\.)|(Message received)|(> Potion ID)|(Number of)|(Adding game type)|(Clearing any)|(Initializing)|(Entering)|(Unloading)|(Preloading)|(Login Scene)|\\[ApplicationController]|\\[UnityCache]|\\[Subsystems]|\\[CachedXMLHttpRequest]/gm
	);
	for (let i = latestLogs.length - 1; i >= 0; i--) {
		if (logs.includes(latestLogs[i])) continue;
		handleLog(latestLogs[i]);
	}
	logs = latestLogs;
}, 500);

presence.on("UpdateData", () => {
	let data: PresenceData = {};

	if (window.location.pathname !== "/TownOfSalem/") {
		data = {
			details: "Browsing BlankMediaGames",
			state: document.title,
			startTimestamp: elapsed,
			largeImageKey: Assets.regularLogo,
		};
	} else {
		try {
			if (oldState.page !== currentState.page)
				elapsed = Math.round(Date.now() / 1000);

			let key = Assets.regularLogo;
			if (currentState.type.search(/Coven/g) !== -1) key = Assets.covenLogo;

			let gameType;
			switch (currentState.type) {
				case "ClassicTownTraitor": {
					gameType = "Town Traitor";
					break;
				}
				case "RankedPractice": {
					gameType = "Ranked Practice";
					break;
				}
				case "AllAny": {
					gameType = "All Any";
					break;
				}
				case "RapidMode": {
					gameType = "Rapid Mode";
					break;
				}
				case "DraculasPalace": {
					gameType = "Dracula's Palace";
					break;
				}
				case "CovenCustom": {
					gameType = "Coven Custom";
					break;
				}
				case "CovenLovers": {
					gameType = "Lovers";
					break;
				}
				case "CovenAllAny": {
					gameType = "Coven All Any";
					break;
				}
				case "CovenMafia": {
					gameType = "Mafia Returns";
					break;
				}
				case "CovenRankedPractice": {
					gameType = "Coven Ranked Practice";
					break;
				}
				case "CovenClassic": {
					gameType = "Coven Classic";
					break;
				}
				default: {
					gameType = currentState.type;
					break;
				}
			}
			switch (currentState.page) {
				case "Login": {
					data = {
						details: "Logging in",
						largeImageKey: Assets.regularLogo,
						smallImageKey: Assets.idle,
						startTimestamp: elapsed,
					};
					break;
				}
				case "BigHome Scene": {
					if (currentState.type === "Ranked") {
						data = {
							details: "In a Ranked match",
							state: "Waiting in queue",
							largeImageKey: Assets.regularLogo,
							smallImageKey: Assets.idle,
							startTimestamp: elapsed,
						};
					} else {
						data = {
							details: "Browsing Home Screen",
							largeImageKey: Assets.regularLogo,
							smallImageKey: Assets.idle,
							startTimestamp: elapsed,
						};
					}
					break;
				}
				case "BigLobby Scene": {
					Object.assign(data, {
						details: `In a ${gameType} match`,
						state: "Waiting in lobby",
						elapsed,
						largeImageKey: key,
						smallImageKey: Assets.idle,
					});
					break;
				}
				case "BigPreGame Scene": {
					Object.assign(data, {
						details: `In a ${gameType} match`,
						largeImageKey: key,
						startTimestamp: elapsed,
					});
					switch (currentState.state) {
						case GameEvent.night: {
							data.state = `Night ${currentState.day}`;
							data.smallImageKey = Assets.night;
							break;
						}
						case GameEvent.day: {
							data.state = `Day ${currentState.day}`;
							data.smallImageKey = Assets.day;
							break;
						}
						case GameEvent.voting: {
							data.state = `Day ${currentState.day} | Judgement`;
							data.smallImageKey = Assets.voting;
							break;
						}
						case GameEvent.end: {
							data.state = `Day ${currentState.day} | Game End`;
							data.smallImageKey = Assets.idle;
							break;
						}
					}
					break;
				}
				case "BigEndGame Scene": {
					Object.assign(data, {
						details: "Browsing End-Game Screen",
						largeImageKey: key,
						smallImageKey: Assets.idle,
						startTimestamp: elapsed,
					});
					break;
				}
				default: {
					throw new Error("");
					break;
				}
			}
			oldState = currentState;
		} catch (e) {
			Object.assign(data, {
				details: "Logging in",
				largeImageKey: Assets.regularLogo,
				smallImageKey: Assets.idle,
				startTimestamp: elapsed,
			});
		}
	}

	presence.setActivity(data);
});
