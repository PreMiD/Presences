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

const quoridor: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move his/her pawn or place a fence",
	"descriptionmyturn": "${you} must move your pawn or place a fence",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"playWall",
		"endGame"
	],
	"transitions": {
		"playToken": 11,
		"playWall": 11,
		"endGame": 99,
		"zombiePass": 11
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "${actplayer} must move his/her pawn or place a fence",
	"descriptionmyturn": "${you} must move your pawn or place a fence",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"cantPlay": 11
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
export default quoridor;
