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

const isaac: GamePresence = {
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
	"description": "${actplayer} must play a piece",
	"descriptionmyturn": "${you} must play a piece",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playPiece"
	],
	"transitions": {
		"nextPlayer": 11,
		"zombiePass": 11,
		"playerTurn": 10,
		"nextTurnRemove": 15
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
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"cantPlay": 11
	}
}
					*/
					break;
				case "playerTurnRemove":
					/*
					{
	"name": "playerTurnRemove",
	"description": "${actplayer} must remove a piece",
	"descriptionmyturn": "${you} must remove a piece",
	"type": "activeplayer",
	"args": "argPlayerTurnRemove",
	"possibleactions": [
		"removePiece"
	],
	"transitions": {
		"scoreMarker": 13,
		"pass": 14,
		"zombiePass": 13,
		"endGame": 99,
		"removePiece": 12
	}
}
					*/
					break;
				case "playerScoreMarker":
					/*
					{
	"name": "playerScoreMarker",
	"description": "${actplayer} must place score marker",
	"descriptionmyturn": "${you} must place score marker",
	"type": "activeplayer",
	"args": "argPlayerScoreMarker",
	"possibleactions": [
		"scoreMarker"
	],
	"transitions": {
		"pass": 14,
		"zombiePass": 14,
		"endGame": 99,
		"removePiece": 12
	}
}
					*/
					break;
				case "nextPlayerRemove":
					/*
					{
	"name": "nextPlayerRemove",
	"type": "game",
	"action": "stNextPlayerRemove",
	"updateGameProgression": true,
	"transitions": {
		"nextTurnRemove": 12,
		"cantPlay": 14
	}
}
					*/
					break;
				case "setupScore":
					/*
					{
	"name": "setupScore",
	"type": "game",
	"action": "actionSetupScore",
	"updateGameProgression": true,
	"transitions": {
		"nextTurnRemove": 14
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
export default isaac;
