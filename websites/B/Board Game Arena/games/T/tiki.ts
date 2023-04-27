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

const tiki: GamePresence = {
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
	"description": "${actplayer} must create a new totem",
	"descriptionmyturn": "${you} must create a new totem",
	"possibleactions": [
		"createTotem",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"createTotem": 200
	},
	"name": "state_100",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_151":
					/*
					{
	"description": "${actplayer} must move the Shaman",
	"descriptionmyturn": "${you} must move the Shaman",
	"possibleactions": [
		"moveShaman",
		"moveShamanduringgame",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Do not move the Shaman",
			"callback": "onNoShaman"
		}
	],
	"transitions": {
		"moveShaman": 200
	},
	"name": "state_151",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_200":
					/*
					{
	"description": "${actplayer} must create a new totem or move an existing one",
	"descriptionmyturn": "${you} must create a new totem or move an existing one",
	"possibleactions": [
		"createTotem",
		"selectTotem",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"createTotem": 200,
		"selectTotem": 201
	},
	"name": "state_200",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_201":
					/*
					{
	"description": "${actplayer} must choose where to move this totem",
	"descriptionmyturn": "${you} must choose where to move this totem",
	"possibleactions": [
		"moveTotem",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"checkTotems": 300,
		"cancel": 200
	},
	"name": "state_201",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_202":
					/*
					{
	"description": "${actplayer} must choose the totem to resolve first",
	"descriptionmyturn": "${you} must choose the totem to resolve first",
	"possibleactions": [
		"resolveTotem",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"resolveTotem": 300
	},
	"name": "state_202",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_251":
					/*
					{
	"description": "${actplayer} must move the Shaman",
	"descriptionmyturn": "${you} must move the Shaman",
	"possibleactions": [
		"moveShaman",
		"moveShamanduringgame",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Do not move the Shaman",
			"callback": "onNoShaman"
		}
	],
	"transitions": {
		"moveShaman": 300
	},
	"name": "state_251",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_300":
					/*
					{
	"onState": "checkThreeTotem",
	"transitions": {
		"chooseOrder": 202,
		"moveShaman": 251,
		"nomoretotem": 200,
		"next": 300
	},
	"name": "state_300",
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
export default tiki;
