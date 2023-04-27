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

const jaipur: GamePresence = {
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
				case "playerTakeOrSell":
					/*
					{
	"name": "playerTakeOrSell",
	"description": "${actplayer} must take cards or sell cards",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"take",
		"sell",
		"trade"
	],
	"transitions": {
		"take": 3,
		"sell": 3,
		"trade": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "checkEndOfRound":
					/*
					{
	"name": "checkEndOfRound",
	"description": "",
	"type": "game",
	"action": "stCheckEndOfRound",
	"updateGameProgression": true,
	"transitions": {
		"endRound": 5,
		"endTurn": 4
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
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "",
	"type": "game",
	"action": "stEndOfRound",
	"transitions": {
		"newRound": 2,
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
export default jaipur;
