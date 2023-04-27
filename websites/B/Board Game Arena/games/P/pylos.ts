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

const pylos: GamePresence = {
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
	"description": "${actplayer} must place or move up a ball",
	"descriptionmyturn": "${you} must place or move up a ball",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playBall"
	],
	"transitions": {
		"turnCompleted": 6,
		"zombiePlayed": 6,
		"squareOrLineIsPresent": 3
	}
}
					*/
					break;
				case "returnFirstBall":
					/*
					{
	"name": "returnFirstBall",
	"description": "${actplayer} must return a ball to the reserve",
	"descriptionmyturn": "${you} must return a ball to the reserve",
	"type": "activeplayer",
	"args": "argPlayerReturnBall",
	"possibleactions": [
		"returnFirstBall"
	],
	"transitions": {
		"ballReturned": 4
	}
}
					*/
					break;
				case "checkAvailableBalls":
					/*
					{
	"name": "checkAvailableBalls",
	"description": "",
	"type": "game",
	"action": "stCheckAvailableBalls",
	"transitions": {
		"ballsExists": 5,
		"notExists": 6
	}
}
					*/
					break;
				case "returnSecondBall":
					/*
					{
	"name": "returnSecondBall",
	"description": "${actplayer} can return a ball to the reserve",
	"descriptionmyturn": "${you} can return a ball to the reserve",
	"type": "activeplayer",
	"args": "argPlayerReturnBall",
	"possibleactions": [
		"returnSecondBall"
	],
	"transitions": {
		"cancelReturn": 6,
		"ballReturned": 6
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
		"notEndedYet": 7
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
		"": 2
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
export default pylos;
