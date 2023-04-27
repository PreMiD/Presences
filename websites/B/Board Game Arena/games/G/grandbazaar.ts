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

const grandbazaar: GamePresence = {
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
		"": 20
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
		"tradeJewels": 22,
		"lastRound": 24
	}
}
					*/
					break;
				case "tradeJewels":
					/*
					{
	"name": "tradeJewels",
	"description": "${actplayer} must trade some jewels",
	"descriptionmyturn": "${you} must trade some jewels",
	"type": "activeplayer",
	"possibleactions": [
		"sellJewel",
		"buyJewel",
		"tradeJewels"
	],
	"transitions": {
		"nextPlayer": 23,
		"zombiePass": 98
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
	"updateGameProgression": true,
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 22,
		"newRound": 20
	}
}
					*/
					break;
				case "autoPlayLastRound":
					/*
					{
	"name": "autoPlayLastRound",
	"description": "Last round: all players sell their remaining jewels",
	"type": "game",
	"action": "stLastRound",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "zombieTrade":
					/*
					{
	"name": "zombieTrade",
	"description": "",
	"type": "game",
	"action": "stZombieTrade",
	"transitions": {
		"": 23
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
export default grandbazaar;
