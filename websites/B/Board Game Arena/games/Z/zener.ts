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

const zener: GamePresence = {
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
		"": 4
	}
}
					*/
					break;
				case "mandatoryChoose":
					/*
					{
	"name": "mandatoryChoose",
	"description": "${actplayer} must move ${mandatory_move} piece",
	"descriptionmyturn": "${you} must move ${mandatory_move} piece",
	"type": "activeplayer",
	"args": "argsMandatoryChoose",
	"action": "stMandatoryChoose",
	"possibleactions": [
		"chooseMandatoryPiece",
		"endGame",
		"noMandatoryChoose"
	],
	"transitions": {
		"chooseMandatoryPiece": 3,
		"noMandatoryChoose": 4,
		"zombiePass": 6
	}
}
					*/
					break;
				case "mandatoryMove":
					/*
					{
	"name": "mandatoryMove",
	"description": "${actplayer} must move ${mandatory_move} piece",
	"descriptionmyturn": "${you} must move ${mandatory_move} piece",
	"type": "activeplayer",
	"args": "argsMandatoryMove",
	"possibleactions": [
		"moveMandatoryPiece",
		"undoMove",
		"endGame"
	],
	"transitions": {
		"moveMandatoryPiece": 4,
		"undoMove": 2,
		"endGame": 99,
		"zombiePass": 6
	}
}
					*/
					break;
				case "freeChoose":
					/*
					{
	"name": "freeChoose",
	"description": "${actplayer} must make a free move",
	"descriptionmyturn": "${you} must make a free move",
	"type": "activeplayer",
	"args": "argsFreeChoose",
	"action": "stFreeChoose",
	"possibleactions": [
		"chooseFreePiece",
		"noFreeChoose",
		"endGame"
	],
	"transitions": {
		"chooseFreePiece": 5,
		"noFreeChoose": 6,
		"endGame": 99,
		"zombiePass": 6
	}
}
					*/
					break;
				case "freeMove":
					/*
					{
	"name": "freeMove",
	"description": "${actplayer} must make a free move",
	"descriptionmyturn": "${you} must make a free move",
	"type": "activeplayer",
	"args": "argsFreeMove",
	"possibleactions": [
		"moveFreePiece",
		"undoMove",
		"endGame"
	],
	"transitions": {
		"moveFreePiece": 6,
		"undoMove": 4,
		"endGame": 99,
		"zombiePass": 6
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
	"possibleactions": [
		"nextPlayer, endGame"
	],
	"transitions": {
		"nextPlayer": 2,
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
export default zener;
