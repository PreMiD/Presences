// TODO
import { GamePresence } from "..";
import {
	getActivePlayerId,
	getCurrentGameState,
	getCurrentGameStateType,
	getPlayerAvatar,
	getPlayerData,
	getPlayerScore,
	getUserPlayerId,
} from "../../util";

const photosynthesis: GamePresence = {
	logo: "",
	async getData(presence: Presence) {
		const gameState = await getCurrentGameState(presence),
			activePlayer = await getActivePlayerId(presence),
			gameStateType = await getCurrentGameStateType(presence),
			userPlayer = await getUserPlayerId(presence),
			activePlayerData = await getPlayerData(presence, activePlayer),
			data: PresenceData = {
				smallImageKey: getPlayerAvatar(userPlayer),
				smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
			};
		if (activePlayer === userPlayer || gameStateType !== "activeplayer") {
			switch (gameState) {
				case "gameSetup":
					/*
					{
	"name": "gameSetup",
	"description": "",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "boardSetup":
					/*
					{
	"name": "boardSetup",
	"description": "",
	"type": "game",
	"action": "stboardSetup",
	"transitions": {
		"continue": 20,
		"end": 30
	}
}
					*/
					break;
				case "playerSetup":
					/*
					{
	"name": "playerSetup",
	"description": "${actplayer} must place a starting small tree (${nb}/${total})",
	"descriptionmyturn": "${you} must place a starting small tree (${nb}/${total})",
	"type": "activeplayer",
	"possibleactions": [
		"place"
	],
	"args": "argsPlayerSetup",
	"transitions": {
		"continue": 10
	}
}
					*/
					break;
				case "turnStart":
					/*
					{
	"name": "turnStart",
	"description": "",
	"type": "game",
	"action": "stTurnStart",
	"updateGameProgression": true,
	"transitions": {
		"next": 40
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} can spend up to ${sun} light point(s)",
	"descriptionmyturn": "${you} can spend up to ${sun} light point(s)",
	"type": "activeplayer",
	"possibleactions": [
		"plant",
		"buy",
		"grow",
		"collect",
		"pass",
		"undo"
	],
	"args": "argsPlayerTurn",
	"transitions": {
		"continue": 40,
		"end": 50
	}
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "game",
	"action": "stTurnEnd",
	"transitions": {
		"continue": 30,
		"end": 99
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of game",
	"type": "manager",
	"action": "stGameEnd",
	"args": "argGameEnd",
	"updateGameProgression": true
}
					*/
					break;
				case "gameEnd":
					data.state = "Viewing game results";
					break;
			}
		} else data.state = `Waiting for ${activePlayerData.name}`;
		return data;
	},
};
export default photosynthesis;
