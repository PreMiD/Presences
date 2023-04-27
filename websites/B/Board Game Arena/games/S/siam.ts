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

const siam: GamePresence = {
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
		"done": 200
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
				case "state_200":
					/*
					{
	"description": "${actplayer} must select a piece",
	"descriptionmyturn": "${you} must select a piece",
	"possibleactions": [
		"selectPiece",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"pieceSelected": 201
	},
	"name": "state_200",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_201":
					/*
					{
	"description": "${actplayer} must make a move",
	"descriptionmyturn": "${you} must make a move",
	"possibleactions": [
		"selectPiece",
		"push",
		"move",
		"stay",
		"remove",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Push",
			"callback": "onPush"
		},
		{
			"label": "Stay",
			"callback": "onStay"
		},
		{
			"label": "Remove",
			"callback": "onRemove"
		}
	],
	"transitions": {
		"pieceSelected": 201,
		"pushed": 203,
		"moved": 202,
		"stayed": 202,
		"removed": 203
	},
	"name": "state_201",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_202":
					/*
					{
	"description": "${actplayer} may turn the selected piece",
	"descriptionmyturn": "${you} may turn the selected piece",
	"possibleactions": [
		"turn",
		"skip",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Leftwards",
			"callback": "onFaceLeft"
		},
		{
			"label": "Rightwards",
			"callback": "onFaceRight"
		},
		{
			"label": "Upwards",
			"callback": "onFaceUp"
		},
		{
			"label": "Downwards",
			"callback": "onFaceDown"
		},
		{
			"label": "End turn",
			"callback": "onSkip",
			"color": "red"
		}
	],
	"transitions": {
		"done": 203
	},
	"name": "state_202",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_203":
					/*
					{
	"onState": "checkEndOfGame",
	"transitions": {
		"done": 200
	},
	"name": "state_203",
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
export default siam;
