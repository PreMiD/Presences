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

const splits: GamePresence = {
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
				case "tilePlacement":
					/*
					{
	"name": "tilePlacement",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"possibleactions": [
		"placeTile"
	],
	"args": "argTilePlacement",
	"transitions": {
		"placeTile": 3,
		"zombiePass": 98
	}
}
					*/
					break;
				case "nextPlayerTilePlacement":
					/*
					{
	"name": "nextPlayerTilePlacement",
	"type": "game",
	"action": "stNextPlayerTilePlacement",
	"updateGameProgression": true,
	"transitions": {
		"nextTile": 2,
		"noMoreTiles": 10
	}
}
					*/
					break;
				case "stackPlacement":
					/*
					{
	"name": "stackPlacement",
	"description": "${actplayer} must choose its starting position",
	"descriptionmyturn": "${you} must choose your starting position",
	"type": "activeplayer",
	"args": "argStackPlacement",
	"possibleactions": [
		"placeStack"
	],
	"transitions": {
		"placeStack": 11,
		"zombiePass": 98
	}
}
					*/
					break;
				case "nextPlayerStackPlacement":
					/*
					{
	"name": "nextPlayerStackPlacement",
	"type": "game",
	"action": "stNextPlayerStackPlacement",
	"updateGameProgression": true,
	"transitions": {
		"nextStack": 10,
		"firstMove": 20
	}
}
					*/
					break;
				case "split":
					/*
					{
	"name": "split",
	"description": "${actplayer} must split a stack",
	"descriptionmyturn": "${you} must select a stack to split",
	"type": "activeplayer",
	"args": "argSplit",
	"possibleactions": [
		"split"
	],
	"transitions": {
		"split": 21,
		"zombiePass": 21
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
		"nextTurn": 20,
		"endGame": 98
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"": 99
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
export default splits;
