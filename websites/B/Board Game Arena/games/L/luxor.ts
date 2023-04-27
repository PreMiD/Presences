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

const luxor: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose a card and an adventurer to move",
	"descriptionmyturn": "${you} must choose a card and an adventurer to move",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"assessMove",
		"rollDie",
		"moveMeeple",
		"pass"
	],
	"transitions": {
		"rollDie": 12,
		"chooseTileToLoot": 14,
		"getLoot": 20,
		"pass": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "assessMoveWithDie":
					/*
					{
	"name": "assessMoveWithDie",
	"description": "${actplayer} must choose which adventurer to move",
	"descriptionmyturn": "${you} must choose the adventurer you want to move",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"assessMove",
		"moveMeeple",
		"pass"
	],
	"transitions": {
		"getLoot": 20,
		"pass": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseTileToLoot":
					/*
					{
	"name": "chooseTileToLoot",
	"description": "${actplayer} must choose which tile to loot",
	"descriptionmyturn": "${you} must choose a meeple on the tile you want to loot",
	"type": "activeplayer",
	"possibleactions": [
		"chooseTile"
	],
	"transitions": {
		"getLoot": 20,
		"zombiePass": 50
	}
}
					*/
					break;
				case "getLoot":
					/*
					{
	"name": "getLoot",
	"description": "",
	"type": "game",
	"action": "stGetLoot",
	"transitions": {
		"chooseTile": 21,
		"chooseHorusCardOrKey": 22,
		"chooseScarabOrWildcard": 23,
		"chooseHorusCardEyes": 24,
		"nextPlayer": 50
	}
}
					*/
					break;
				case "chooseLootTile":
					/*
					{
	"name": "chooseLootTile",
	"description": "${actplayer} can choose a treasure tile",
	"descriptionmyturn": "${you} can choose a treasure tile",
	"type": "activeplayer",
	"args": "argChooseHorus",
	"possibleactions": [
		"chooseTile"
	],
	"transitions": {
		"chooseHorusCardOrKey": 22,
		"chooseScarabOrWildcard": 23,
		"chooseHorusCardEyes": 24,
		"nextPlayer": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseHorusCardOrKey":
					/*
					{
	"name": "chooseHorusCardOrKey",
	"description": "${actplayer} can draw a horus card or pick a key",
	"descriptionmyturn": "${you} can draw a horus card or pick a key",
	"type": "activeplayer",
	"args": "argChooseLoot",
	"possibleactions": [
		"chooseLoot"
	],
	"transitions": {
		"nextPlayer": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseScarabOrWildcard":
					/*
					{
	"name": "chooseScarabOrWildcard",
	"description": "${actplayer} can pick a scarab or a wildcard",
	"descriptionmyturn": "${you} can pick a scarab or a wildcard",
	"type": "activeplayer",
	"args": "argChooseLoot",
	"possibleactions": [
		"chooseLoot"
	],
	"transitions": {
		"nextPlayer": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "chooseHorusCardEyes":
					/*
					{
	"name": "chooseHorusCardEyes",
	"description": "${actplayer} can draw a horus card",
	"descriptionmyturn": "${you} can draw a horus card",
	"type": "activeplayer",
	"args": "argChooseLoot",
	"possibleactions": [
		"chooseLoot"
	],
	"transitions": {
		"nextPlayer": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 90,
		"nextPlayer": 10
	}
}
					*/
					break;
				case "endScores":
					/*
					{
	"name": "endScores",
	"description": "",
	"type": "game",
	"action": "stEndScore",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99
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
export default luxor;
