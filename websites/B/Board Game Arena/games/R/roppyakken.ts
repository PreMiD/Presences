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

const roppyakken: GamePresence = {
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
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "lastCardCheck":
					/*
					{
	"name": "lastCardCheck",
	"description": "",
	"type": "game",
	"action": "stLastCardCheck",
	"transitions": {
		"playerTurn": 4,
		"skipTurn": 5,
		"zombiePass": 7
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard",
		"discardWild"
	],
	"transitions": {
		"playCard": 5,
		"zombiePass": 7
	}
}
					*/
					break;
				case "flipCheck":
					/*
					{
	"name": "flipCheck",
	"description": "",
	"type": "game",
	"action": "stFlipCheck",
	"transitions": {
		"captureSelect": 6,
		"skipTurn": 7
	}
}
					*/
					break;
				case "captureSelect":
					/*
					{
	"name": "captureSelect",
	"description": "${actplayer} must choose a card to capture",
	"descriptionmyturn": "${you} must choose a card to capture",
	"type": "activeplayer",
	"args": "argCaptureSelect",
	"possibleactions": [
		"captureSelect",
		"leaveWild"
	],
	"transitions": {
		"nextPlayer": 7,
		"zombiePass": 7
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
		"nextPlayer": 3,
		"endRound": 8
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextRound": 2,
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
export default roppyakken;
