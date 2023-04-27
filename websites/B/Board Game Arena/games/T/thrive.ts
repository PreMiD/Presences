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

const thrive: GamePresence = {
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
				case "turnStart":
					/*
					{
	"name": "turnStart",
	"description": "",
	"type": "game",
	"action": "stTurnStart",
	"transitions": {
		"playerTurnSelectPieceToMove": 20
	}
}
					*/
					break;
				case "playerTurnSelectPieceToMove":
					/*
					{
	"name": "playerTurnSelectPieceToMove",
	"description": "${actplayer} must move a piece",
	"descriptionmyturn": "${you} must select the piece to move",
	"type": "activeplayer",
	"args": "argPlayerPieces",
	"possibleactions": [
		"selectPieceToMove",
		"passMovePiece"
	],
	"transitions": {
		"selectPieceToMove": 30,
		"passMovePiece": 50
	}
}
					*/
					break;
				case "playerTurnSelectLocationToMove":
					/*
					{
	"name": "playerTurnSelectLocationToMove",
	"description": "${actplayer} must move a piece",
	"descriptionmyturn": "${you} must select where you move your piece",
	"type": "activeplayer",
	"args": "argMovePiece",
	"possibleactions": [
		"cancelPieceSelection",
		"selectMoveLocation",
		"endGame"
	],
	"transitions": {
		"cancelPieceSelection": 20,
		"selectMoveLocation": 40,
		"endGame": 99
	}
}
					*/
					break;
				case "playerTurnSelectPieceForPeg1Add":
					/*
					{
	"name": "playerTurnSelectPieceForPeg1Add",
	"description": "${actplayer} must add a peg",
	"descriptionmyturn": "${you} must select a piece to add your first peg",
	"type": "activeplayer",
	"args": "argPlayerPieces",
	"possibleactions": [
		"selectPieceForPeg1",
		"passPlacePeg"
	],
	"transitions": {
		"selectPieceForPeg1": 50,
		"passPlacePeg": 80
	}
}
					*/
					break;
				case "playerTurnSelectPegLocationForPeg1Add":
					/*
					{
	"name": "playerTurnSelectPegLocationForPeg1Add",
	"description": "${actplayer} must add a peg",
	"descriptionmyturn": "${you} must add a peg to the selected piece",
	"type": "activeplayer",
	"args": "argPlacePeg",
	"possibleactions": [
		"cancelPieceSelection",
		"selectPeg1Location"
	],
	"transitions": {
		"cancelPieceSelection": 40,
		"selectPeg1Location": 60
	}
}
					*/
					break;
				case "playerTurnSelectPieceForPeg2Add":
					/*
					{
	"name": "playerTurnSelectPieceForPeg2Add",
	"description": "${actplayer} must add a peg",
	"descriptionmyturn": "${you} must select a piece to add your second peg",
	"type": "activeplayer",
	"args": "argPlayerPieces",
	"possibleactions": [
		"selectPieceForPeg2",
		"passPlacePeg"
	],
	"transitions": {
		"selectPieceForPeg2": 70,
		"passPlacePeg": 75
	}
}
					*/
					break;
				case "playerTurnSelectPegLocationForPeg2Add":
					/*
					{
	"name": "playerTurnSelectPegLocationForPeg2Add",
	"description": "${actplayer} must add a peg",
	"descriptionmyturn": "${you} must add a peg to the selected piece",
	"type": "activeplayer",
	"args": "argPlacePeg",
	"possibleactions": [
		"cancelPieceSelection",
		"selectPeg2Location"
	],
	"transitions": {
		"cancelPieceSelection": 60,
		"selectPeg2Location": 75
	}
}
					*/
					break;
				case "playerConfirmTurnEnd":
					/*
					{
	"name": "playerConfirmTurnEnd",
	"description": "${actplayer} must confirm their turn.",
	"descriptionmyturn": "End turn?",
	"type": "activeplayer",
	"possibleactions": [
		"playerTurnUndo",
		"playerTurnConfirmEnd"
	],
	"transitions": {
		"playerTurnSelectPieceToMove": 20,
		"turnEnd": 80
	}
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "game",
	"action": "stTurnEnd",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 2
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
export default thrive;
