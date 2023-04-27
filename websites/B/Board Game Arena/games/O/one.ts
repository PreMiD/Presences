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

const one: GamePresence = {
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
				case "isCapture":
					/*
					{
	"name": "isCapture",
	"description": "",
	"type": "game",
	"action": "stIsCapture",
	"transitions": {
		"captureNo": 3,
		"captureYes": 4
	}
}
					*/
					break;
				case "playerTurnPlace":
					/*
					{
	"name": "playerTurnPlace",
	"description": "${actplayer} must place a stone",
	"descriptionmyturn": "${you} must place a stone",
	"type": "activeplayer",
	"args": "argPlayerTurnPlace",
	"possibleactions": [
		"placeStone"
	],
	"transitions": {
		"stonePlacedForConfirming": 8,
		"forbiddenMove": 3,
		"zombieStonePlaced": 10
	}
}
					*/
					break;
				case "playerTurnPlaceOrCapture":
					/*
					{
	"name": "playerTurnPlaceOrCapture",
	"description": "${actplayer} must place a stone or capture an opponent`s stone",
	"descriptionmyturn": "${you} must place a stone or capture an opponent`s stone",
	"type": "activeplayer",
	"args": "argPlayerTurnPlaceOrCapture",
	"possibleactions": [
		"placeStone",
		"selectAttackStone"
	],
	"transitions": {
		"stonePlacedForConfirming": 9,
		"zombieStonePlaced": 10,
		"attackStoneSelected": 5
	}
}
					*/
					break;
				case "selectFirstCapture":
					/*
					{
	"name": "selectFirstCapture",
	"description": "${actplayer} must capture an opponent`s stone",
	"descriptionmyturn": "${you} must capture an opponent`s stone",
	"type": "activeplayer",
	"args": "argSelectFirstCapture",
	"possibleactions": [
		"captureStone",
		"restartTurn"
	],
	"transitions": {
		"stoneCaptured": 6,
		"turnRestarted": 4,
		"zombieStonePlaced": 10
	}
}
					*/
					break;
				case "isCaptureVariant":
					/*
					{
	"name": "isCaptureVariant",
	"description": "",
	"type": "game",
	"action": "stIsCaptureVariant",
	"transitions": {
		"oneVariant": 9,
		"manyVariants": 7
	}
}
					*/
					break;
				case "selectCaptureVariant":
					/*
					{
	"name": "selectCaptureVariant",
	"description": "${actplayer} can capture another opponent`s stone or complete the capture",
	"descriptionmyturn": "${you} can capture another opponent`s stone or complete the capture",
	"type": "activeplayer",
	"args": "argSelectCaptureVariant",
	"possibleactions": [
		"captureStone",
		"completeCapture",
		"restartTurn"
	],
	"transitions": {
		"stoneCaptured": 6,
		"captureCompleted": 9,
		"turnRestarted": 4,
		"zombieStonePlaced": 10
	}
}
					*/
					break;
				case "confirmTurnPlace":
					/*
					{
	"name": "confirmTurnPlace",
	"description": "${actplayer} must confirm or cancel their move",
	"descriptionmyturn": "${you} must click on the blinking stone or button to confirm your move (or elsewhere to cancel)",
	"type": "activeplayer",
	"args": "argConfirmTurnPlace",
	"possibleactions": [
		"confirmTurn",
		"restartTurn"
	],
	"transitions": {
		"turnConfirmed": 10,
		"turnRestarted": 3,
		"zombieStonePlaced": 10
	}
}
					*/
					break;
				case "confirmTurnPlaceOrCapture":
					/*
					{
	"name": "confirmTurnPlaceOrCapture",
	"description": "${actplayer} must confirm or cancel their move",
	"descriptionmyturn": "${you} must click on the blinking stone or button to confirm your move (or elsewhere to cancel)",
	"type": "activeplayer",
	"args": "argConfirmTurnPlaceOrCapture",
	"possibleactions": [
		"confirmTurn",
		"restartTurn"
	],
	"transitions": {
		"turnConfirmed": 10,
		"turnRestarted": 4,
		"zombieStonePlaced": 10
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
		"": 11
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
		"notEndedYet": 2
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
export default one;
