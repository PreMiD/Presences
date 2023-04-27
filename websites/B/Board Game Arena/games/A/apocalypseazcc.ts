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

const apocalypseazcc: GamePresence = {
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
	"description": "${actplayer} must move a character",
	"descriptionmyturn": "${you} must move a character",
	"possibleactions": [
		"selectCard",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"done": 201
	},
	"name": "state_200",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_201":
					/*
					{
	"onState": "checkEndOfGame",
	"transitions": {
		"done": 200
	},
	"name": "state_201",
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
export default apocalypseazcc;
