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

const connectfour: GamePresence = {
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
	"description": "${actplayer} must choose a column",
	"descriptionmyturn": "${you} must choose a column",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playDisc",
		"undo"
	],
	"transitions": {
		"playDisc": 12,
		"zombiePass": 11,
		"bypassconfirm": 11
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"swapTurn": 13,
		"endGame": 99
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
		"confirmMove": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "playerTurnOrSwap":
					/*
					{
	"name": "playerTurnOrSwap",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "${you} must swap colors or choose a column",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playDisc",
		"swapPieces"
	],
	"transitions": {
		"playDisc": 12,
		"swapped": 11,
		"zombiePass": 11,
		"bypassconfirm": 11
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
export default connectfour;
