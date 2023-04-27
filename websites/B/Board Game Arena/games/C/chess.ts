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

const chess: GamePresence = {
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
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "playerSelectPiece":
					/*
					{
	"name": "playerSelectPiece",
	"description": "${actplayer} must make a move",
	"descriptionmyturn": "${you} must select a piece",
	"type": "activeplayer",
	"action": "stPlayerSelectPiece",
	"updateGameProgression": true,
	"args": "argSelectPiece",
	"possibleactions": [
		"selectPiece",
		"selectDestination",
		"proposeDraw"
	],
	"transitions": {
		"moveDone": 2,
		"mustPromote": 4,
		"proposeDraw": 51,
		"zombiePass": 2,
		"endOfGame": 99
	}
}
					*/
					break;
				case "playerPromotePawn":
					/*
					{
	"name": "playerPromotePawn",
	"description": "${actplayer} must promote a pawn",
	"descriptionmyturn": "${you} must promote a pawn",
	"type": "activeplayer",
	"possibleactions": [
		"selectPromotion"
	],
	"transitions": {
		"promotionDone": 2,
		"zombiePass": 2,
		"endOfGame": 99
	}
}
					*/
					break;
				case "playerAgreeToDraw":
					/*
					{
	"name": "playerAgreeToDraw",
	"description": "${actplayer} can agree to a draw",
	"descriptionmyturn": "${you} can agree to a draw",
	"type": "activeplayer",
	"possibleactions": [
		"agree",
		"decline"
	],
	"transitions": {
		"agreed": 99,
		"declined": 52,
		"zombiePass": 52
	}
}
					*/
					break;
				case "gamePrepareAgreeToDraw":
					/*
					{
	"name": "gamePrepareAgreeToDraw",
	"description": "",
	"type": "game",
	"action": "stPrepareAgreeToDraw",
	"transitions": {
		"done": 5
	}
}
					*/
					break;
				case "gameDeclineAgreeToDraw":
					/*
					{
	"name": "gameDeclineAgreeToDraw",
	"description": "",
	"type": "game",
	"action": "stDeclineAgreeToDraw",
	"transitions": {
		"done": 3
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
export default chess;
