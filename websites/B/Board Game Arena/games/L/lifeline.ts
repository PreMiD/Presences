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

const lifeline: GamePresence = {
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
				case "placeStone":
					/*
					{
	"name": "placeStone",
	"description": "${actplayer} must place a stone",
	"descriptionmyturn": "${you} must place a stone",
	"type": "activeplayer",
	"args": "argsPlaceStone",
	"possibleactions": [
		"placeStone"
	],
	"transitions": {
		"nextTurn": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"placeStone": 2,
		"pieChoice": 4,
		"gameEnd": 99
	}
}
					*/
					break;
				case "pieChoice":
					/*
					{
	"name": "pieChoice",
	"description": "${actplayer} must choose whether to switch sides",
	"descriptionmyturn": "${you} must choose whether to switch sides",
	"type": "activeplayer",
	"possibleactions": [
		"keepSides",
		"swapSides"
	],
	"transitions": {
		"placeStone": 2,
		"pieSwap": 5,
		"zombiePass": 3
	}
}
					*/
					break;
				case "pieSwap":
					/*
					{
	"name": "pieSwap",
	"type": "game",
	"action": "stPieSwap",
	"transitions": {
		"placeStone": 2
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
export default lifeline;
