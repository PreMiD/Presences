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

const bigmonster: GamePresence = {
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
				case "teamSelection":
					/*
					{
	"name": "teamSelection",
	"description": "Other players must choose their team",
	"descriptionmyturn": "${you} must choose your team",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"selectTeam"
	],
	"transitions": {
		"explorerSelection": 3,
		"pregameEnd": 98
	},
	"action": "st_teamSelection"
}
					*/
					break;
				case "explorerSelection":
					/*
					{
	"name": "explorerSelection",
	"description": "Other players must select an explorer",
	"descriptionmyturn": "${you} must select an explorer",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"selectStartingExplorer"
	],
	"transitions": {
		"newRound": 4,
		"var_newTurn": 10
	},
	"action": "st_MultiPlayerInit",
	"args": "argexplorerSelection"
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "New round preparation...",
	"type": "game",
	"action": "st_newRound",
	"transitions": {
		"tileSelection": 5
	}
}
					*/
					break;
				case "tileSelection":
					/*
					{
	"name": "tileSelection",
	"description": "Other players must select a tile and then a ship to give the rest of your hand",
	"descriptionlasttile": "Other players must select a tile",
	"descriptionmyturn": "${you} must select a tile and then a ship to give the rest of your hand",
	"descriptionmyturnlasttile": "${you} must select a tile",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"selectTile",
		"selectShip"
	],
	"action": "st_MultiPlayerInit",
	"args": "argtileSelection",
	"transitions": {
		"placeTile": 6
	}
}
					*/
					break;
				case "placeTile":
					/*
					{
	"name": "placeTile",
	"description": "Other players must place the selected tile",
	"descriptionmyturn": "${you} must place the tile on your board",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"placeTile"
	],
	"action": "st_MultiPlayerInit",
	"args": "argplaceTile",
	"transitions": {
		"endTurn": 7
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "Ending turn...",
	"type": "game",
	"action": "st_endTurn",
	"updateGameProgression": true,
	"transitions": {
		"newRound": 4,
		"tileSelection": 5,
		"bmExploTileSelection": 8,
		"pregameEnd": 98
	}
}
					*/
					break;
				case "bmExploTileSelection":
					/*
					{
	"name": "bmExploTileSelection",
	"description": "Black male explorer : ${actplayer} can select a tile of the discard pile",
	"descriptionmyturn": "Black male explorer : ${you} must select a tile from the discard pile",
	"type": "activeplayer",
	"possibleactions": [
		"selectTile",
		"selectShip"
	],
	"action": "st_bmExploTileSelection",
	"args": "argbmExploTileSelection",
	"transitions": {
		"bmExploTilePlacement": 9,
		"zombiePass": 98
	}
}
					*/
					break;
				case "bmExploTilePlacement":
					/*
					{
	"name": "bmExploTilePlacement",
	"description": "Black male explorer : ${actplayer} can place a tile of the discard pile",
	"descriptionmyturn": "Black male explorer : ${you} must place a tile from the discard pile",
	"type": "activeplayer",
	"possibleactions": [
		"placeTile"
	],
	"action": "st_bmExploTilePlacement",
	"args": "argbmExploTilePlacement",
	"transitions": {
		"endTurn": 7,
		"zombiePass": 98
	}
}
					*/
					break;
				case "var_newTurn":
					/*
					{
	"name": "var_newTurn",
	"description": "Preparing new turn...",
	"type": "game",
	"action": "st_var_newTurn",
	"updateGameProgression": true,
	"transitions": {
		"var_tileSelection": 11
	}
}
					*/
					break;
				case "var_tileSelection":
					/*
					{
	"name": "var_tileSelection",
	"description": "${actplayer} must select a tile to play",
	"descriptiondiscard": "${actplayer} must select a tile to discard",
	"descriptionmyturn": "${you} must select a tile to play",
	"descriptionmyturndiscard": "${you} must select a tile to discard",
	"type": "activeplayer",
	"possibleactions": [
		"var_SelectTile"
	],
	"args": "argvar_tileSelection",
	"transitions": {
		"var_placeTile": 12
	}
}
					*/
					break;
				case "var_placeTile":
					/*
					{
	"name": "var_placeTile",
	"description": "${actplayer} must place the selected tile",
	"descriptionmyturn": "${you} must place the tile on your board",
	"type": "activeplayer",
	"possibleactions": [
		"placeTile"
	],
	"args": "argplaceTile",
	"transitions": {
		"var_endTurn": 13
	}
}
					*/
					break;
				case "var_endTurn":
					/*
					{
	"name": "var_endTurn",
	"description": "Ending turn...",
	"type": "game",
	"action": "st_endTurn",
	"transitions": {
		"var_tileSelection": 11,
		"var_newTurn": 10,
		"pregameEnd": 98
	}
}
					*/
					break;
				case "pregameEnd":
					/*
					{
	"name": "pregameEnd",
	"description": "Counting final score...",
	"type": "game",
	"action": "st_pregameEnd",
	"transitions": {
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
export default bigmonster;
