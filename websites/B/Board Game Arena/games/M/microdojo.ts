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

const microdojo: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move a worker",
	"descriptionmyturn": "${you} must move a worker",
	"type": "activeplayer",
	"possibleactions": [
		"moveWorker",
		"placeGuard",
		"undoLastOp",
		"gameover",
		"passturn",
		"swapNinja",
		"moveSumo"
	],
	"transitions": {
		"moved": 3,
		"build": 4,
		"done2": 3,
		"action": 5,
		"zombiePass": 3,
		"EndGame": 99
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "playerBuild":
					/*
					{
	"name": "playerBuild",
	"description": "${actplayer} can get or remove a Building or pass",
	"descriptionmyturn": "${you} can get or remove a Building or pass",
	"type": "activeplayer",
	"possibleactions": [
		"remBuilding",
		"getBuilding",
		"getAGold",
		"getAFood",
		"gameover",
		"passturn",
		"placeGuard"
	],
	"transitions": {
		"done4": 3,
		"zombiePass": 3,
		"EndGame": 99
	}
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} can do an Action or pass",
	"descriptionmyturn": "${you} can do an Action or pass",
	"type": "activeplayer",
	"possibleactions": [
		"triggerobj",
		"actBuilding",
		"trade",
		"donate",
		"passturn",
		"doschool",
		"gameover",
		"placeGuard"
	],
	"transitions": {
		"done5": 3,
		"zombiePass": 3,
		"EndGame": 99
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
export default microdojo;
