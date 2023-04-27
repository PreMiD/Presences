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

const battleoflits: GamePresence = {
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
				case "firstTurn":
					/*
					{
	"name": "firstTurn",
	"description": "${actplayer} must play a piece",
	"descriptionmyturn": "${you} must play a piece",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"placePiece",
		"selectSquare"
	],
	"transitions": {
		"selectSquare": 5,
		"playPiece": 6,
		"zombiePass": 6
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
		"nextTurn": 7,
		"cantPlay": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "pieRule":
					/*
					{
	"name": "pieRule",
	"description": "${actplayer} must choose whether to go first or second",
	"descriptionmyturn": "${you} must choose whether to go first or second",
	"type": "activeplayer",
	"updateGameProgression": true,
	"transitions": {
		"goFirst": 11,
		"goSecond": 10
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
		"placePiece",
		"selectSquare"
	],
	"transitions": {
		"selectSquare": 10,
		"playPiece": 11,
		"zombiePass": 11
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
		"cantPlay": 11,
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
export default battleoflits;
