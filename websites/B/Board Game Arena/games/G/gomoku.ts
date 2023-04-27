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

const gomoku: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a stone",
	"descriptionmyturn": "${you} must play a stone",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"undo"
	],
	"transitions": {
		"stonePlayed": 5,
		"zombiePass": 3,
		"bypassconfirm": 3
	}
}
					*/
					break;
				case "checkEndOfGame":
					/*
					{
	"name": "checkEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfGame",
	"updateGameProgression": true,
	"transitions": {
		"gameEnded": 99,
		"notEndedYet": 4
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
	"transitions": {
		"nextTurn": 2,
		"swapTurn": 6,
		"swap2SecondTurn": 7
	}
}
					*/
					break;
				case "confirmMove":
					/*
					{
	"name": "confirmMove",
	"description": "${actplayer} must confirm the move",
	"descriptionmyturn": "Please confirm your move",
	"type": "activeplayer",
	"possibleactions": [
		"confirmMove",
		"undo"
	],
	"updateGameProgression": true,
	"transitions": {
		"checkEndOfGame": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "playerTurnOrSwap":
					/*
					{
	"name": "playerTurnOrSwap",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "${you} must swap colors or play a stone",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"swapPieces"
	],
	"transitions": {
		"stonePlayed": 5,
		"swapped": 4,
		"zombiePass": 3,
		"bypassconfirm": 3
	}
}
					*/
					break;
				case "swap2SecondTurn":
					/*
					{
	"name": "swap2SecondTurn",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "${you} must swap colors, play a stone, or play two stones and pass the color choice back",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"swapPieces"
	],
	"transitions": {
		"onestonePlayed": 8,
		"swapped": 4,
		"zombiePass": 3
	}
}
					*/
					break;
				case "swap2SecondTurnOneStone":
					/*
					{
	"name": "swap2SecondTurnOneStone",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "${you} may end your move now, or play one more stone and pass the color choice back",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playStone",
		"endPlacement",
		"undo"
	],
	"transitions": {
		"stonePlayed": 5,
		"zombiePass": 3,
		"bypassconfirm": 3
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
export default gomoku;
