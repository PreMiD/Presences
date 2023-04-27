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

const cloudcity: GamePresence = {
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
				case "placeTile":
					/*
					{
	"name": "placeTile",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"args": "argPlaceTile",
	"possibleactions": [
		"placeTile"
	],
	"transitions": {
		"placeTile": 3,
		"zombiePass": 6
	}
}
					*/
					break;
				case "takeBuildings":
					/*
					{
	"name": "takeBuildings",
	"description": "",
	"type": "game",
	"action": "stTakeBuildings",
	"args": "argTakeBuildings",
	"transitions": {
		"next": 4
	}
}
					*/
					break;
				case "placeWalkway":
					/*
					{
	"name": "placeWalkway",
	"description": "${actplayer} may place walkways",
	"descriptionmyturn": "${you} may place walkways or pass",
	"type": "activeplayer",
	"action": "stPlaceWalkway",
	"args": "argPlaceWalkway",
	"possibleactions": [
		"placeWalkway",
		"placeWalkwayPass",
		"restartTurn"
	],
	"transitions": {
		"placeWalkway": 4,
		"placeWalkwayPass": 5,
		"restartTurn": 2
	}
}
					*/
					break;
				case "takeTile":
					/*
					{
	"name": "takeTile",
	"description": "${actplayer} must take a tile",
	"descriptionmyturn": "${you} must take a tile",
	"type": "activeplayer",
	"action": "stTakeTile",
	"possibleactions": [
		"takeTile",
		"takeRandomTile",
		"skipTakingTiles",
		"restartTurn"
	],
	"transitions": {
		"takeTile": 6,
		"takeRandomTile": 6,
		"skipTakingTiles": 6,
		"restartTurn": 2
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
		"nextPlayer": 2,
		"gameEnd": 99
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
export default cloudcity;
