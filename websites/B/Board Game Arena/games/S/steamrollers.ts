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

const steamrollers: GamePresence = {
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
		"": 16
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "enableActionTiles":
					/*
					{
	"name": "enableActionTiles",
	"description": "",
	"type": "game",
	"action": "stEnableActionTiles",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"action": "stNewPlayerTurn",
	"possibleactions": [
		"drawPath",
		"improveEngine",
		"acquireActionTile",
		"deliverCube",
		"toggleActionTile",
		"acquireOrderTile"
	],
	"transitions": {
		"normal": 14,
		"toggleActionTile": 6,
		"askForBlock": 10,
		"acquireOrderTile": 4,
		"zombiePass": 5
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
		"nextPlayer": 3,
		"returnToPlayer": 4,
		"newRound": 2,
		"oliveTurnBegin": 24,
		"endGame": 99
	}
}
					*/
					break;
				case "useActionTile":
					/*
					{
	"name": "useActionTile",
	"description": "",
	"type": "game",
	"action": "stUseTile",
	"transitions": {
		"returnToPlayer": 4,
		"modifyDice": 7,
		"plusOrMinusDice": 8,
		"flipOrThrowDice": 9
	}
}
					*/
					break;
				case "modifyDice":
					/*
					{
	"name": "modifyDice",
	"description": "${actplayer} must choose a die to change",
	"descriptionmyturn": "${you} must choose a die to change",
	"type": "activeplayer",
	"action": "stModifyDice",
	"possibleactions": [
		"modifyDice",
		"cancelChoice"
	],
	"transitions": {
		"backToPlayer": 4,
		"askForBlock": 10,
		"zombiePass": 4
	}
}
					*/
					break;
				case "plusOrMinusDice":
					/*
					{
	"name": "plusOrMinusDice",
	"description": "${actplayer} must choose a die to change",
	"descriptionmyturn": "${you} must choose a die to change",
	"type": "activeplayer",
	"action": "stPlusOrMinusDice",
	"possibleactions": [
		"plusOrMinusDice",
		"cancelChoice"
	],
	"transitions": {
		"backToPlayer": 4,
		"askForBlock": 10,
		"zombiePass": 4
	}
}
					*/
					break;
				case "flipOrThrowDice":
					/*
					{
	"name": "flipOrThrowDice",
	"description": "${actplayer} must choose a die to change",
	"descriptionmyturn": "${you} must choose a die to change",
	"type": "activeplayer",
	"action": "stFlipOrThrowDice",
	"possibleactions": [
		"flipOrThrowDice",
		"cancelChoice"
	],
	"transitions": {
		"backToPlayer": 4,
		"askForBlock": 10,
		"zombiePass": 4
	}
}
					*/
					break;
				case "setupBlock":
					/*
					{
	"name": "setupBlock",
	"description": "",
	"type": "game",
	"action": "stSetupBlock",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "askForBlock":
					/*
					{
	"name": "askForBlock",
	"description": "${actplayer} must allow the dice to be used or steal it",
	"descriptionmyturn": "${you} must allow the dice to be used or steal it",
	"type": "activeplayer",
	"args": "argBlockInfos",
	"possibleactions": [
		"stealDice",
		"allowDice"
	],
	"transitions": {
		"stealDice": 12,
		"allowDice": 13,
		"zombiePass": 13
	}
}
					*/
					break;
				case "stealDice":
					/*
					{
	"name": "stealDice",
	"description": "",
	"type": "game",
	"action": "stStealDice",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "allowDice":
					/*
					{
	"name": "allowDice",
	"description": "",
	"type": "game",
	"action": "stAllowDice",
	"transitions": {
		"normal": 14,
		"backToPlayer": 4
	}
}
					*/
					break;
				case "checkProposeOrderTile":
					/*
					{
	"name": "checkProposeOrderTile",
	"description": "",
	"type": "game",
	"action": "stCheckProposeOrderTile",
	"transitions": {
		"propose": 15,
		"skip": 5
	}
}
					*/
					break;
				case "proposeOrderTile":
					/*
					{
	"name": "proposeOrderTile",
	"description": "${actplayer} can acquire an order tile",
	"descriptionmyturn": "${you} can acquire an order tile",
	"type": "activeplayer",
	"args": "argOrderTilePropositionInfos",
	"possibleactions": [
		"acquireOrderTile",
		"skip"
	],
	"transitions": {
		"acquireOrderTile": 5,
		"skip": 5,
		"zombiePass": 5
	}
}
					*/
					break;
				case "startingTilesOrNot":
					/*
					{
	"name": "startingTilesOrNot",
	"description": "",
	"type": "game",
	"action": "stStartingTilesOrNot",
	"transitions": {
		"noStartingTiles": 2,
		"startingTiles": 17
	}
}
					*/
					break;
				case "counterClockWiseNext":
					/*
					{
	"name": "counterClockWiseNext",
	"description": "",
	"type": "game",
	"action": "stCounterClockWiseNext",
	"transitions": {
		"finished": 2,
		"next": 18
	}
}
					*/
					break;
				case "buyStartingTile":
					/*
					{
	"name": "buyStartingTile",
	"description": "${actplayer} must choose a starting tile",
	"descriptionmyturn": "${you} must choose a starting tile",
	"type": "activeplayer",
	"possibleactions": [
		"acquireStartingTile"
	],
	"transitions": {
		"improveEngine": 19,
		"acquireTile": 20,
		"drawPath": 21,
		"extraGood": 22,
		"extraPoint": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "startingImproveEngine":
					/*
					{
	"name": "startingImproveEngine",
	"description": "${actplayer} must choose an engine to improve",
	"descriptionmyturn": "${you} must choose an engine to improve",
	"type": "activeplayer",
	"args": "argUnbuiltEngines",
	"possibleactions": [
		"improveEngineStart"
	],
	"transitions": {
		"normal": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "startingBuyActionTile":
					/*
					{
	"name": "startingBuyActionTile",
	"description": "${actplayer} must choose an action tile to acquire",
	"descriptionmyturn": "${you} must choose an action tile to acquire",
	"type": "activeplayer",
	"args": "argAvailableActionTiles",
	"possibleactions": [
		"aquireTileStart"
	],
	"transitions": {
		"normal": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "startingDrawPath":
					/*
					{
	"name": "startingDrawPath",
	"description": "${actplayer} must draw a path",
	"descriptionmyturn": "${you} must draw a path",
	"type": "activeplayer",
	"args": "argAvailableHex",
	"possibleactions": [
		"drawPathStart"
	],
	"transitions": {
		"normal": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "startingExtraGood":
					/*
					{
	"name": "startingExtraGood",
	"description": "${actplayer} draw a ${color} good and must choose on which grey city that good will start",
	"descriptionmyturn": "${you} draw a ${color} good and must choose on which grey city that good will start",
	"type": "activeplayer",
	"args": "argDrawnGood",
	"possibleactions": [
		"chooseGreyCity"
	],
	"transitions": {
		"normal": 17,
		"zombiePass": 17
	}
}
					*/
					break;
				case "oliveReroll":
					/*
					{
	"name": "oliveReroll",
	"description": "",
	"type": "game",
	"action": "stOliveReroll",
	"transitions": {
		"": 24
	}
}
					*/
					break;
				case "oliveTurnBegin":
					/*
					{
	"name": "oliveTurnBegin",
	"description": "",
	"type": "game",
	"action": "stOliveTurnBegin",
	"transitions": {
		"proposeReroll": 25,
		"oliveTurnMiddle": 26
	}
}
					*/
					break;
				case "proposeReroll":
					/*
					{
	"name": "proposeReroll",
	"description": "${actplayer} can reroll Olive dice or pass",
	"descriptionmyturn": "${you} can reroll Olive dice or pass",
	"type": "activeplayer",
	"possibleactions": [
		"reroll",
		"skip"
	],
	"transitions": {
		"reroll": 23,
		"skip": 26,
		"zombiePass": 26
	}
}
					*/
					break;
				case "oliveTurnMiddle":
					/*
					{
	"name": "oliveTurnMiddle",
	"description": "",
	"type": "game",
	"action": "stOliveTurnMiddle",
	"transitions": {
		"oliveReroll": 23,
		"proposePreventRemove": 27,
		"oliveRemoveGood": 29,
		"endTurn": 30,
		"endGame": 99
	}
}
					*/
					break;
				case "proposePreventRemove":
					/*
					{
	"name": "proposePreventRemove",
	"description": "${actplayer} can prevent Olive removing a good or pass",
	"descriptionmyturn": "${you} can prevent Olive removing a good or pass",
	"type": "activeplayer",
	"possibleactions": [
		"prevent",
		"skip"
	],
	"transitions": {
		"prevent": 28,
		"skip": 29,
		"zombiePass": 29
	}
}
					*/
					break;
				case "crossExtraHex":
					/*
					{
	"name": "crossExtraHex",
	"description": "",
	"type": "game",
	"action": "stOliveCrossExtraHex",
	"transitions": {
		"endTurn": 30,
		"endGame": 99
	}
}
					*/
					break;
				case "oliveRemoveGood":
					/*
					{
	"name": "oliveRemoveGood",
	"description": "",
	"type": "game",
	"action": "stOliveRemoveGood",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "oliveTurnEnd":
					/*
					{
	"name": "oliveTurnEnd",
	"description": "",
	"type": "game",
	"action": "stOliveTurnEnd",
	"transitions": {
		"newRound": 2,
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
export default steamrollers;
