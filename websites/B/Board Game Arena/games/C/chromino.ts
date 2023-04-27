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

const chromino: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a tile or draw a new one",
	"descriptionmyturn": "${you} must place a tile or draw a new one",
	"args": "argPlayerTurn",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"drawTile",
		"playTile"
	],
	"transitions": {
		"chanceToPlayNewTile": 4,
		"nextPlayer": 5,
		"zombiePass": 5,
		"endGame": 98
	}
}
					*/
					break;
				case "playerTurnEmptyTileBag":
					/*
					{
	"name": "playerTurnEmptyTileBag",
	"description": "${actplayer} must place a tile or pass",
	"descriptionmyturn": "${you} must place a tile or pass",
	"args": "argPlayerTurn",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"pass",
		"playTile"
	],
	"transitions": {
		"nextPlayer": 5,
		"zombiePass": 5,
		"endGame": 98
	}
}
					*/
					break;
				case "playerTurnAfterDraw":
					/*
					{
	"name": "playerTurnAfterDraw",
	"description": "${actplayer} must place their new tile or pass",
	"descriptionmyturn": "${you} must place your new tile or pass",
	"args": "argPlayerTurn",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"pass",
		"playDrawnTile"
	],
	"transitions": {
		"nextPlayer": 5,
		"zombiePass": 5,
		"endGame": 98
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
		"nextPlayersTurn": 2,
		"nextPlayersTurnEmptyTileBag": 3,
		"endGame": 98
	}
}
					*/
					break;
				case "gameEndPrep":
					/*
					{
	"name": "gameEndPrep",
	"description": "",
	"type": "game",
	"action": "stGameEndPrep",
	"transitions": {
		"": 99
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
export default chromino;
