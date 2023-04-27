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

const dudo: GamePresence = {
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
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"args": "argNewRound",
	"action": "stNewRound",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "firstPlayerTurn":
					/*
					{
	"name": "firstPlayerTurn",
	"description": "${actplayer} must bid",
	"descriptionmyturn": "${you} can:",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"bid",
		"zombiepass",
		"zombieend"
	],
	"transitions": {
		"bid": 20,
		"zombiePass": 20,
		"zombieend": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must bid or call dudo",
	"descriptionmyturn": "${you} can:",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"bid",
		"doubt",
		"calza",
		"zombiepass",
		"zombieend"
	],
	"transitions": {
		"bid": 20,
		"doubt": 30,
		"calza": 30,
		"zombiePass": 20,
		"zombieend": 30
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
		"nextPlayer": 11
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextRound": 2,
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
export default dudo;
