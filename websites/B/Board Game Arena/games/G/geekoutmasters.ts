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

const geekoutmasters: GamePresence = {
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
				case "initAutomaticTurnControl":
					/*
					{
	"name": "initAutomaticTurnControl",
	"type": "game",
	"action": "stInitTurnControl",
	"possibleactions": [],
	"transitions": {
		"": 100
	}
}
					*/
					break;
				case "automaticTurnControl":
					/*
					{
	"name": "automaticTurnControl",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver",
		"script"
	],
	"transitions": {
		"play": 10,
		"gameOver": 97
	}
}
					*/
					break;
				case "gameOverAreYouSure":
					/*
					{
	"name": "gameOverAreYouSure",
	"description": "${actplayer} thinks this is the end of the game",
	"descriptionmyturn": "${you} must confirm the result of this game",
	"type": "activeplayer",
	"args": "argGameOver",
	"possibleactions": [
		"gameOverConfirm",
		"gameOverCancel"
	],
	"transitions": {
		"gameOverCancel": 10,
		"gameOverConfirm": 98
	}
}
					*/
					break;
				case "gameOverConfirmation":
					/*
					{
	"name": "gameOverConfirmation",
	"description": "Everyone must confirm the result of this game",
	"descriptionmyturn": "${you} must confirm the result of this game",
	"type": "multipleactiveplayer",
	"args": "argGameOver",
	"possibleactions": [
		"gameOverConfirm",
		"gameOverCancel"
	],
	"transitions": {
		"gameOverCancel": 10,
		"gameOverConfirm": 99
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
				case "state_100":
					/*
					{
	"onState": "postSetup",
	"transitions": {
		"done": 190
	},
	"name": "state_100",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
}
					*/
					break;
				case "state_190":
					/*
					{
	"onState": "turnStart",
	"transitions": {
		"done": 200
	},
	"name": "state_190",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
}
					*/
					break;
				case "state_200":
					/*
					{
	"description": "${actplayer} must roll the dice",
	"descriptionmyturn": "${you} must roll the dice",
	"possibleactions": [
		"rollDice",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400
	},
	"name": "state_200",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_201":
					/*
					{
	"onState": "rollDice",
	"possibleactions": [
		"rollDice",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400
	},
	"name": "state_201",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_210":
					/*
					{
	"description": "${actplayer} must pick a die to use",
	"descriptionmyturn": "${you} must pick a die to use",
	"possibleactions": [
		"useDie",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400,
		"HERO": 310,
		"MEEPLE": 320,
		"ROCKET": 330
	},
	"name": "state_210",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_310":
					/*
					{
	"description": "${actplayer} must pick a die to flip",
	"descriptionmyturn": "${you} must pick a die to flip",
	"possibleactions": [
		"pickDieForHERO",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400
	},
	"onState": "checkPickable",
	"name": "state_310",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_320":
					/*
					{
	"description": "${actplayer} must pick a die to reroll",
	"descriptionmyturn": "${you} must pick a die to reroll",
	"possibleactions": [
		"pickDieForMEEPLE",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400
	},
	"onState": "checkPickable",
	"name": "state_320",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_330":
					/*
					{
	"description": "${actplayer} must pick a die to destroy",
	"descriptionmyturn": "${you} must pick a die to destroy",
	"possibleactions": [
		"pickDieForROCKET",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 400
	},
	"onState": "checkPickable",
	"name": "state_330",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_400":
					/*
					{
	"onState": "checkRemaining",
	"transitions": {
		"choose": 500,
		"another": 210,
		"score": 600,
		"lose": 610
	},
	"name": "state_400",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
}
					*/
					break;
				case "state_500":
					/*
					{
	"onState": "showPickPush",
	"description": "${actplayer} must choose between continue rolling or score and end turn",
	"descriptionmyturn": "${you} must choose between continue rolling or score and end turn",
	"possibleactions": [
		"chooseContinue",
		"chooseStop",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"stop": 600,
		"continue": 201
	},
	"name": "state_500",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_600":
					/*
					{
	"onState": "score",
	"transitions": {
		"done": 800
	},
	"name": "state_600",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
}
					*/
					break;
				case "state_610":
					/*
					{
	"description": "${actplayer} can't continue, turn ends and gets no points",
	"descriptionmyturn": "${you} can't continue, your turn ends and you get no points",
	"onState": "lose",
	"transitions": {
		"done": 800
	},
	"name": "state_610",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
}
					*/
					break;
				case "state_800":
					/*
					{
	"onState": "endOfTurn",
	"transitions": {
		"done": 190
	},
	"name": "state_800",
	"description": "",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"play",
		"undo",
		"redo",
		"gameOver"
	]
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
export default geekoutmasters;
