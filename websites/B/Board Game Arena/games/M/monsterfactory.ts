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

const monsterfactory: GamePresence = {
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
				case "startingTileState":
					/*
					{
	"name": "startingTileState",
	"description": "Other players must choose starting tiles",
	"descriptionmyturn": "${you} must choose a starting tile",
	"type": "multipleactiveplayer",
	"args": "phpArgStartingTile",
	"possibleactions": [
		"chooseTile"
	],
	"transitions": {
		"startGame": 12
	}
}
					*/
					break;
				case "drawTileState":
					/*
					{
	"name": "drawTileState",
	"type": "game",
	"action": "stDrawTile",
	"possibleactions": [
		"playTileAction"
	],
	"transitions": {
		"playerTurnTransition": 11,
		"endGameTransition": 99
	}
}
					*/
					break;
				case "playerTurnState":
					/*
					{
	"name": "playerTurnState",
	"description": "${actplayer} must play a tile<div class=\"miniTileClass\" style=\"${style}\"></div>",
	"descriptionmyturn": "${you} must play a tile<div class=\"miniTileClass\" style=\"${style}\"></div>",
	"type": "activeplayer",
	"args": "phpArgPlayerTurn",
	"possibleactions": [
		"playTileAction"
	],
	"transitions": {
		"playTileTransition": 12,
		"zombieTransition": 12,
		"endGameTransition": 99
	}
}
					*/
					break;
				case "nextPlayerState":
					/*
					{
	"name": "nextPlayerState",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurnTransition": 10
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
export default monsterfactory;
