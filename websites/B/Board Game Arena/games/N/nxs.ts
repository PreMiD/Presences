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

const nxs: GamePresence = {
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
				case "playerTurnMove":
					/*
					{
	"name": "playerTurnMove",
	"description": "${actplayer} is taking their turn",
	"descriptionmyturn": "${you} must move a ship",
	"type": "activeplayer",
	"possibleactions": [
		"movePiece"
	],
	"transitions": {
		"movePiece": 3,
		"zombiePass": 10,
		"endOfGame": 11
	}
}
					*/
					break;
				case "playerTurnRotate":
					/*
					{
	"name": "playerTurnRotate",
	"description": "${actplayer} is taking their turn",
	"descriptionmyturn": "${you} must turn a ship",
	"type": "activeplayer",
	"args": "argPlayerTurnRotate",
	"possibleactions": [
		"rotatePiece"
	],
	"transitions": {
		"rotatePiece": 4,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerTurnConfirm":
					/*
					{
	"name": "playerTurnConfirm",
	"description": "${actplayer} is taking their turn",
	"descriptionmyturn": "${you} must confirm your move",
	"type": "activeplayer",
	"args": "argPlayerTurnConfirm",
	"possibleactions": [
		"confirmMove",
		"undoMove"
	],
	"transitions": {
		"confirmMove": 10,
		"undoTurn": 2,
		"zombiePass": 10
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
	"args": "argNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 2
	}
}
					*/
					break;
				case "endOfGame":
					/*
					{
	"name": "endOfGame",
	"type": "game",
	"action": "stEndGame",
	"args": "argEndGame",
	"updateGameProgression": true,
	"transitions": {
		"gameOver": 99
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
export default nxs;
