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

const president: GamePresence = {
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
		"newHand": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 31,
		"presidentSwapTurn": 50
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
		"playerTurn": 31
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play or pass",
	"descriptionmyturn": "${you} must play or pass",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"passTurn"
	],
	"transitions": {
		"newRound": 30,
		"nextPlayer": 32,
		"passTurn": 33
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
		"playerTurn": 31,
		"newRound": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "passTurn":
					/*
					{
	"name": "passTurn",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 31,
		"newRound": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"newHand": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "presidentSwapTurn":
					/*
					{
	"name": "presidentSwapTurn",
	"description": "Other players must swap cards",
	"descriptionmyturn": "${you} must swap 2 cards",
	"possibleactions": [
		"swapCards"
	],
	"type": "activeplayer",
	"args": "argSwapCards",
	"transitions": {
		"endPresidentSwap": 51
	}
}
					*/
					break;
				case "endPresidentSwap":
					/*
					{
	"name": "endPresidentSwap",
	"description": "",
	"type": "game",
	"action": "stSwapCards",
	"transitions": {
		"primeMinisterSwapTurn": 52
	}
}
					*/
					break;
				case "primeMinisterSwapTurn":
					/*
					{
	"name": "primeMinisterSwapTurn",
	"description": "Other players must swap cards",
	"descriptionmyturn": "${you} must swap 1 card",
	"possibleactions": [
		"swapCards"
	],
	"type": "activeplayer",
	"args": "argSwapCards",
	"transitions": {
		"endPrimeMinisterSwapTurn": 53
	}
}
					*/
					break;
				case " ":
					/*
					{
	"name": " ",
	"description": "",
	"type": "game",
	"action": "stSwapCards",
	"transitions": {
		"playerTurn": 31
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
export default president;
