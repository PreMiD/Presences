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

const rive: GamePresence = {
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
				case "placeChecker":
					/*
					{
	"name": "placeChecker",
	"description": "${actplayer} must place a checker.",
	"descriptionmyturn": "${you} must place a checker.",
	"type": "activeplayer",
	"args": "argPlaceChecker",
	"possibleactions": [
		"placeChecker"
	],
	"transitions": {
		"placeNonGroupingChecker": 4,
		"placeGroupingChecker": 3,
		"firstMoveChoice": 12,
		"zombiePass": 4
	}
}
					*/
					break;
				case "removeChecker":
					/*
					{
	"name": "removeChecker",
	"description": "${actplayer} must remove a checker.",
	"descriptionmyturn": "${you} must remove a checker.",
	"type": "activeplayer",
	"args": "argRemoveChecker",
	"possibleactions": [
		"removeChecker"
	],
	"transitions": {
		"removeNotLastChecker": 3,
		"removeLastChecker": 2,
		"zombiePass": 4
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
		"nextTurn": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayerFirstMove":
					/*
					{
	"name": "nextPlayerFirstMove",
	"type": "game",
	"action": "stNextPlayerFirstMove",
	"updateGameProgression": true,
	"transitions": {
		"placeNonGroupingChecker": 4,
		"firstMoveChoice": 13
	}
}
					*/
					break;
				case "firstMoveChoice":
					/*
					{
	"name": "firstMoveChoice",
	"description": "${actplayer} may choose to switch colors and keep your first move as their own.",
	"descriptionmyturn": "${you} can switch colors and keep your opponents first move as your own.  Or just play on with your current color.",
	"type": "activeplayer",
	"args": "argPlaceChecker",
	"possibleactions": [
		"chooseFirstMove",
		"placeChecker"
	],
	"transitions": {
		"nextTurn": 4,
		"placeNonGroupingChecker": 4
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
export default rive;
