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

const onitama: GamePresence = {
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
		"": 5
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
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
	"description": "${actplayer} has to choose a card and move a pawn",
	"descriptionmyturn": "${you} have to choose a card and move a pawn",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"movePawn"
	],
	"transitions": {
		"pawnMoved": 12
	}
}
					*/
					break;
				case "playerPass":
					/*
					{
	"name": "playerPass",
	"description": "${actplayer} can't move and has to discard a card",
	"descriptionmyturn": "${you} can't move and have to discard a card",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"discardCard"
	],
	"transitions": {
		"cardDiscarded": 12
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"type": "game",
	"action": "stEndOfTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"nextTurnCantMove": 11,
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
export default onitama;
