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

const xiangqi: GamePresence = {
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
	"description": "${actplayer} must move a piece",
	"descriptionmyturn": "${you} must move a piece",
	"type": "activeplayer",
	"possibleactions": [
		"movePiece",
		"proposeDraw"
	],
	"transitions": {
		"pieceMoved": 3,
		"nextPlayerDrawProposed": 6
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
		"": 2
	}
}
					*/
					break;
				case "drawProposed":
					/*
					{
	"name": "drawProposed",
	"description": "Opponent must accept or refuse the draw",
	"descriptionmyturn": "Do you accept the proposal to draw?",
	"type": "activeplayer",
	"possibleactions": [
		"acceptDraw",
		"refuseDraw"
	],
	"transitions": {
		"drawAccepted": 3,
		"drawRefused": 7
	}
}
					*/
					break;
				case "nextPlayerDrawProposed":
					/*
					{
	"name": "nextPlayerDrawProposed",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "nextPlayerDrawRefused":
					/*
					{
	"name": "nextPlayerDrawRefused",
	"description": "",
	"type": "game",
	"action": "stDrawRefused",
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
export default xiangqi;
