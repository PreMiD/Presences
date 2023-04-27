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

const carrara: GamePresence = {
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
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"gameRealSetup": 2
	},
	"descriptionmyturn": "."
}
					*/
					break;
				case "gameRealSetup":
					/*
					{
	"name": "gameRealSetup",
	"transitions": {
		"nextTurn": 3
	},
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"transitions": {
		"chooseAction": 4,
		"gameRealEnd": 11
	},
	"updateGameProgression": true,
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseAction":
					/*
					{
	"name": "_choicechooseAction",
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"transitions": {
		"buyBlocks": 5,
		"chooseLocation": 6,
		"buyObject": 10,
		"_choice": 65
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "buyBlocks":
					/*
					{
	"name": "buyBlocks",
	"description": "${actplayer} must choose which blocks to buy",
	"descriptionmyturn": "${you} must choose which blocks to buy",
	"type": "activeplayer",
	"args": "callArgsWithVars",
	"possibleactions": [
		"buyBlocks",
		"cancelBuying"
	],
	"transitions": {
		"buyObject": 10,
		"chooseAction": 4
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseLocation":
					/*
					{
	"name": "_choicechooseLocation",
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"transitions": {
		"payBlocks": 7,
		"chooseUpgrade": 8,
		"refillBuilding": 9,
		"chooseAction": 4,
		"_choice": 66
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "payBlocks":
					/*
					{
	"name": "payBlocks",
	"description": "${actplayer} must choose which blocks to pay with",
	"descriptionmyturn": "${you} must choose which blocks to pay with",
	"type": "activeplayer",
	"args": "callArgsWithVars",
	"possibleactions": [
		"payBlocks"
	],
	"transitions": {
		"chooseUpgrade": 8,
		"refillBuilding": 9,
		"chooseAction": 4
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseUpgrade":
					/*
					{
	"name": "_choicechooseUpgrade",
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"transitions": {
		"refillBuilding": 9,
		"_choice": 67
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "refillBuilding":
					/*
					{
	"name": "refillBuilding",
	"transitions": {
		"buyObject": 10
	},
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicebuyObject":
					/*
					{
	"name": "_choicebuyObject",
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"transitions": {
		"nextTurn": 3,
		"_choice": 68
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "gameRealEnd":
					/*
					{
	"name": "gameRealEnd",
	"transitions": {
		"gameEnd": 99
	},
	"updateGameProgression": true,
	"description": ".",
	"descriptionmyturn": ".",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} must buy blocks, build or score",
	"descriptionmyturn": "${you} must buy blocks, build or score",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"buyBlocks": 5,
		"chooseLocation": 6,
		"buyObject": 10
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseLocation":
					/*
					{
	"name": "chooseLocation",
	"description": "${actplayer} must choose where to build",
	"descriptionmyturn": "${you} must choose where to build",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"payBlocks": 7,
		"chooseUpgrade": 8,
		"refillBuilding": 9,
		"chooseAction": 4
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseUpgrade":
					/*
					{
	"name": "chooseUpgrade",
	"description": "${actplayer} must choose an upgrade",
	"descriptionmyturn": "${you} must choose an upgrade",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"refillBuilding": 9
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "buyObject":
					/*
					{
	"name": "buyObject",
	"description": "${actplayer} can buy an object",
	"descriptionmyturn": "${you} can buy an object",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"nextTurn": 3
	},
	"args": "choiceArgs"
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
	"args": "callArgsWithVars",
	"descriptionmyturn": "."
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
export default carrara;
