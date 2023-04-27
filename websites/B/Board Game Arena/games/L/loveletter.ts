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

const loveletter: GamePresence = {
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
		"": 10
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
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"newRound": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card and keep the other",
	"descriptionmyturn": "${you} must play a card and keep the other",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 21,
		"bishoptargeted": 29,
		"cardinalchoice": 40
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
		"endRound": 10,
		"nextPlayer": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "bishopWillChoose":
					/*
					{
	"name": "bishopWillChoose",
	"description": "",
	"type": "game",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "bishoptargeted":
					/*
					{
	"name": "bishoptargeted",
	"description": "Bishop : ${actplayer} may discard his/her card.",
	"descriptionmyturn": "Bishop : ${you} may discard your card and draw another one.",
	"type": "activeplayer",
	"possibleactions": [
		"bishopdiscard"
	],
	"transitions": {
		"bishopdiscard": 31
	}
}
					*/
					break;
				case "bishopNextPlayer":
					/*
					{
	"name": "bishopNextPlayer",
	"description": "",
	"type": "game",
	"transitions": {
		"nextPlayer": 21
	}
}
					*/
					break;
				case "cardinalchoice":
					/*
					{
	"name": "cardinalchoice",
	"description": "Cardinal : ${actplayer} may look at one of the two hands.",
	"descriptionmyturn": "Cardinal : ${you} may look at one of the two hands.",
	"type": "activeplayer",
	"possibleactions": [
		"cardinalchoice"
	],
	"args": "argsCardinalChoice",
	"transitions": {
		"cardinalchoice": 21
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
export default loveletter;
