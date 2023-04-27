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

const herd: GamePresence = {
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
				case "placeStoneFirstTurn":
					/*
					{
	"name": "placeStoneFirstTurn",
	"description": "${actplayer} must place a stone.",
	"descriptionmyturn": "${you} must place a stone.",
	"type": "activeplayer",
	"args": "argPlaceStone",
	"possibleactions": [
		"placeStone"
	],
	"transitions": {
		"placeStone": 5,
		"placeLastStone": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "removeStone":
					/*
					{
	"name": "removeStone",
	"description": "${actplayer} must remove an enemy stone.",
	"descriptionmyturn": "${you} must remove an enemy stone.",
	"type": "activeplayer",
	"args": "argRemoveStone",
	"possibleactions": [
		"removeStone"
	],
	"updateGameProgression": true,
	"transitions": {
		"removeStone": 4,
		"removeLastStone": 5,
		"removeLastStone_noPlacementsAvailable": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "placeStone":
					/*
					{
	"name": "placeStone",
	"description": "${actplayer} must place a stone.",
	"descriptionmyturn": "${you} must place a stone.",
	"type": "activeplayer",
	"args": "argplaceStone",
	"possibleactions": [
		"placeStone"
	],
	"updateGameProgression": true,
	"transitions": {
		"placeStone": 5,
		"placeLastStone": 6,
		"zombiePass": 6,
		"endGame": 99
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
		"nextTurn": 4,
		"nextTurn_noEnemyStonesToRemove": 5,
		"cantPlay": 6
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
export default herd;
