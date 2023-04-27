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

const hacktrick: GamePresence = {
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
	"description": "${actplayer} must choose a first card",
	"descriptionmyturn": "${you} must choose a first card",
	"onState": "onGameStart",
	"possibleactions": [
		"playCard",
		"playFirstCard",
		"script",
		"undo",
		"redo"
	],
	"transitions": {
		"playCard": 101
	},
	"name": "state_100",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_101":
					/*
					{
	"onState": "onAnnounceCards",
	"transitions": {
		"next": 110
	},
	"name": "state_101",
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
				case "state_110":
					/*
					{
	"description": "${actplayer} must play or draw a card",
	"descriptionmyturn": "${you} must play or draw a card",
	"possibleactions": [
		"playCard",
		"drawCard",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Ask",
			"callback": "onAsk",
			"tooltip": "Ask for your opponent cards sum"
		}
	],
	"transitions": {
		"playCard": 111,
		"drawCard": 110,
		"endRound": 100,
		"endGame": 99
	},
	"name": "state_110",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_111":
					/*
					{
	"description": "${actplayer} must choose how to end his/her turn",
	"descriptionmyturn": "${you} must choose how to end your turn",
	"possibleactions": [
		"endTurn",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Pass",
			"callback": "onPass"
		},
		{
			"label": "Play!",
			"callback": "onPlay",
			"color": "gray"
		},
		{
			"label": "Guard!",
			"callback": "onGuard",
			"color": "gray"
		}
	],
	"transitions": {
		"endTurn": 110,
		"endTurnPlay": 112,
		"endTurnGuard": 113
	},
	"name": "state_111",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_112":
					/*
					{
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"onState": "onMandatoryPlay",
	"possibleactions": [
		"playCard",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Ask",
			"callback": "onAsk",
			"tooltip": "Ask for your opponent cards sum"
		}
	],
	"transitions": {
		"playCard": 111,
		"endRound": 100,
		"noCardToPlay": 110,
		"endGame": 99
	},
	"name": "state_112",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_113":
					/*
					{
	"description": "${actplayer} must play or draw a card",
	"descriptionmyturn": "${you} must play or draw a card",
	"possibleactions": [
		"playCard",
		"drawCard",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Ask",
			"callback": "onAsk",
			"tooltip": "Ask for your opponent cards sum"
		}
	],
	"transitions": {
		"playCard": 114,
		"drawCard": 110,
		"endRound": 100,
		"endGame": 99
	},
	"name": "state_113",
	"type": "multipleactiveplayer"
}
					*/
					break;
				case "state_114":
					/*
					{
	"description": "${actplayer} must choose how to end his/her turn",
	"descriptionmyturn": "${you} must choose how to end your turn",
	"possibleactions": [
		"endTurn",
		"script",
		"undo",
		"redo"
	],
	"buttons": [
		{
			"label": "Pass",
			"callback": "onPass"
		},
		{
			"label": "Guard!",
			"callback": "onGuard",
			"color": "gray"
		}
	],
	"transitions": {
		"endTurn": 110,
		"endTurnGuard": 113
	},
	"name": "state_114",
	"type": "multipleactiveplayer"
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
export default hacktrick;
