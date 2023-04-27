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

const marrakech: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "startOfTurn":
					/*
					{
	"name": "startOfTurn",
	"description": "",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"rotateAssam": 10,
		"moveAssam": 11,
		"zombiePass": 21
	}
}
					*/
					break;
				case "rotateAssam":
					/*
					{
	"name": "rotateAssam",
	"description": "${actplayer} may rotate Assam left or right",
	"descriptionmyturn": "${you} may rotate Assam left or right",
	"type": "activeplayer",
	"possibleactions": [
		"adjust"
	],
	"transitions": {
		"moveAssam": 11,
		"nextPlayer": 20,
		"zombiePass": 21,
		"eliminate": 21
	}
}
					*/
					break;
				case "moveAssam":
					/*
					{
	"name": "moveAssam",
	"description": "${actplayer} must roll the dice to move Assam",
	"descriptionmyturn": "${you} must roll the dice to move Assam",
	"type": "activeplayer",
	"possibleactions": [
		"rollDice"
	],
	"transitions": {
		"placeCarpet": 12,
		"nextPlayer": 20,
		"zombiePass": 21,
		"eliminate": 21
	}
}
					*/
					break;
				case "placeCarpet":
					/*
					{
	"name": "placeCarpet",
	"description": "${actplayer} must place a rug adjacent to Assam",
	"descriptionmyturn": "${you} must place a rug adjacent to Assam",
	"type": "activeplayer",
	"args": "argPlaceCarpets",
	"possibleactions": [
		"placeCarpet"
	],
	"transitions": {
		"nextPlayer": 20,
		"rotateAssam": 10,
		"zombiePass": 21,
		"eliminate": 21
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
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"startTurn": 5
	}
}
					*/
					break;
				case "eliminatePlayer":
					/*
					{
	"name": "eliminatePlayer",
	"description": "",
	"type": "game",
	"action": "stEliminatePlayer",
	"transitions": {
		"startTurn": 5,
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
export default marrakech;
