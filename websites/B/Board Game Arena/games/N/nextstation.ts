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

const nextstation: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "roundStart":
					/*
					{
	"name": "roundStart",
	"description": "",
	"type": "game",
	"action": "stRoundStart",
	"transitions": {
		"next": 30
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
	"transitions": {
		"next": 50
	}
}
					*/
					break;
				case "playersDraw":
					/*
					{
	"name": "playersDraw",
	"description": "Waiting for other players to end their turn",
	"descriptionmyturn": "${you} must play",
	"type": "multipleactiveplayer",
	"initialprivate": 51,
	"action": "stStartMultiactive",
	"args": "argsPlayersDraw",
	"possibleactions": [
		"undo"
	],
	"transitions": {
		"next": 70
	}
}
					*/
					break;
				case "playersDraw":
					/*
					{
	"name": "playersDraw",
	"descriptionmyturn": "${you} must draw a line or use pencil's power",
	"type": "private",
	"args": "argsPlayersDraw",
	"possibleactions": [
		"draw",
		"usepower",
		"pass",
		"undo"
	],
	"transitions": {
		"next": 50,
		"continue": 51
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
	"updateGameProgression": true,
	"transitions": {
		"roundEnd": 90,
		"next": 30
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"transitions": {
		"next": 10,
		"gameEnd": 99
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
	"args": "argGameEnd"
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
export default nextstation;
