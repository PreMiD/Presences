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

const akeruption: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "assessDamage":
					/*
					{
	"name": "assessDamage",
	"type": "game",
	"action": "stAssessDamage",
	"updateGameProgression": true,
	"transitions": {
		"placeNewSource": 15,
		"drawTile": 20,
		"zombiePass": 70
	}
}
					*/
					break;
				case "playSourceTile":
					/*
					{
	"name": "playSourceTile",
	"description": "${actplayer} must play a lava source tile",
	"descriptionmyturn": "${you} must play a lava source tile",
	"args": "argPlaySourceTile",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"placeTile": 16,
		"zombiePass": 70
	}
}
					*/
					break;
				case "confirmSourceTile":
					/*
					{
	"name": "confirmSourceTile",
	"description": "${actplayer} is placing a tile",
	"descriptionmyturn": "Use the arrows to position your tile and confirm, or pick a different location",
	"args": "argConfirmSourceTile",
	"type": "activeplayer",
	"possibleactions": [
		"playTile",
		"confirmTile"
	],
	"transitions": {
		"placeTile": 16,
		"sourceTileDone": 20,
		"zombiePass": 70
	}
}
					*/
					break;
				case "drawTile":
					/*
					{
	"name": "drawTile",
	"type": "game",
	"action": "stDrawTile",
	"updateGameProgression": true,
	"transitions": {
		"tilePicked": 21,
		"tileStackEmpty": 30
	}
}
					*/
					break;
				case "playTile":
					/*
					{
	"name": "playTile",
	"description": "${actplayer} must play a lava tile",
	"descriptionmyturn": "${you} must play a lava tile",
	"args": "argPlayTile",
	"type": "activeplayer",
	"possibleactions": [
		"playTile"
	],
	"transitions": {
		"placeTile": 22,
		"tileBlocked": 20,
		"zombiePass": 70
	}
}
					*/
					break;
				case "confirmTile":
					/*
					{
	"name": "confirmTile",
	"description": "${actplayer} is placing a tile",
	"descriptionmyturn": "Use the arrows to position your tile and confirm, or pick a different location",
	"args": "argConfirmTile",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playTile",
		"confirmTile"
	],
	"transitions": {
		"placeTile": 22,
		"tileBlocked": 20,
		"tilesDone": 30,
		"extraTileCheck": 25,
		"wallsDefended": 21,
		"zombiePass": 70
	}
}
					*/
					break;
				case "extraTileCheck":
					/*
					{
	"name": "extraTileCheck",
	"description": "${actplayer} may play an extra lava tile or pass",
	"descriptionmyturn": "${you} may play an extra lava tile or pass",
	"type": "activeplayer",
	"possibleactions": [
		"playExtraTile",
		"pass"
	],
	"transitions": {
		"playExtraTile": 20,
		"pass": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "playActionCards":
					/*
					{
	"name": "playActionCards",
	"description": "${actplayer} can play action cards",
	"descriptionmyturn": "${you} can play action cards",
	"type": "activeplayer",
	"args": "argActionCards",
	"updateGameProgression": true,
	"possibleactions": [
		"playCard",
		"gainWall",
		"gainTile",
		"pass"
	],
	"transitions": {
		"pass": 35,
		"gainWall": 30,
		"cardEffect": 32,
		"gainTile": 20,
		"zombiePass": 70
	}
}
					*/
					break;
				case "actionCardEffect":
					/*
					{
	"name": "actionCardEffect",
	"type": "game",
	"action": "stCardEffect",
	"updateGameProgression": true,
	"transitions": {
		"cardFinished": 30,
		"playTile": 20,
		"playWall": 35,
		"aftershock": 56,
		"volcanicBomb": 53,
		"sinkhole": 55,
		"quake": 60,
		"relocate": 65
	}
}
					*/
					break;
				case "playWalls":
					/*
					{
	"name": "playWalls",
	"description": "${actplayer} may build a wall",
	"descriptionmyturn": "${you} may build a wall",
	"args": "argPlayWall",
	"type": "activeplayer",
	"possibleactions": [
		"buildWall",
		"pass"
	],
	"transitions": {
		"wallLocationChosen": 36,
		"pass": 70,
		"zombiePass": 70
	}
}
					*/
					break;
				case "chooseWallMaterial":
					/*
					{
	"name": "chooseWallMaterial",
	"description": "${actplayer} must choose the material to build with",
	"descriptionmyturn": "${you} must choose the material to build with",
	"args": "argWallMaterial",
	"type": "activeplayer",
	"possibleactions": [
		"wallBuilt",
		"pass"
	],
	"transitions": {
		"wallCardEffectDone": 30,
		"wallsDone": 70,
		"pass": 35,
		"extraWallCheck": 35,
		"zombiePass": 70
	}
}
					*/
					break;
				case "volcanicBomb":
					/*
					{
	"name": "volcanicBomb",
	"description": "Volcanic Bomb - ${actplayer} can destroy a wall",
	"descriptionmyturn": "Volcanic Bomb - ${you} can destroy a wall",
	"args": "argDestroyWall",
	"type": "activeplayer",
	"possibleactions": [
		"destroyWall",
		"pass"
	],
	"transitions": {
		"wallDestroyed": 30,
		"pass": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "sinkhole":
					/*
					{
	"name": "sinkhole",
	"description": "Sinkhole - ${actplayer} can destroy a tile",
	"descriptionmyturn": "Sinkhole - ${you} can destroy a tile",
	"args": "argDestroyTile",
	"type": "activeplayer",
	"possibleactions": [
		"destroyTile"
	],
	"transitions": {
		"tileDestroyed": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "aftershock":
					/*
					{
	"name": "aftershock",
	"description": "Aftershock - ${actplayer} can rotate a tile",
	"descriptionmyturn": "Aftershock - ${you} can rotate a tile",
	"args": "argRotateTile",
	"type": "activeplayer",
	"possibleactions": [
		"selectTile",
		"pass"
	],
	"transitions": {
		"tileSelected": 57,
		"pass": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "confirmRotateTile":
					/*
					{
	"name": "confirmRotateTile",
	"description": "${actplayer} is rotating a tile",
	"descriptionmyturn": "Use the arrows to position your tile and confirm, or pick a different location",
	"args": "argConfirmRotateTile",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"selectTile",
		"confirmTile"
	],
	"transitions": {
		"tileSelected": 57,
		"tilesDone": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "quakeDrawTile":
					/*
					{
	"name": "quakeDrawTile",
	"type": "game",
	"action": "stQuakeDrawTile",
	"updateGameProgression": true,
	"transitions": {
		"tilePicked": 61,
		"tileStackEmpty": 30
	}
}
					*/
					break;
				case "quake":
					/*
					{
	"name": "quake",
	"description": "Quake - ${actplayer} can replace a tile",
	"descriptionmyturn": "Quake - ${you} can replace a tile",
	"args": "argQuake",
	"type": "activeplayer",
	"possibleactions": [
		"selectTile",
		"pass"
	],
	"transitions": {
		"tileSelected": 62,
		"zombiePass": 70
	}
}
					*/
					break;
				case "confirmReplaceTile":
					/*
					{
	"name": "confirmReplaceTile",
	"description": "${actplayer} is replacing a tile",
	"descriptionmyturn": "Use the arrows to position your tile and confirm, or pick a different location",
	"args": "argConfirmReplaceTile",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"selectTile",
		"confirmTile"
	],
	"transitions": {
		"tileSelected": 62,
		"tilesDone": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "relocatePickWall":
					/*
					{
	"name": "relocatePickWall",
	"description": "${actplayer} can earrange the walls in their village",
	"descriptionmyturn": "${you} can pick a wall to move",
	"args": "argRelocatePickWall",
	"type": "activeplayer",
	"possibleactions": [
		"removeWall",
		"pass"
	],
	"transitions": {
		"wallSelected": 66,
		"pass": 30,
		"zombiePass": 70
	}
}
					*/
					break;
				case "relocatePlaceWall":
					/*
					{
	"name": "relocatePlaceWall",
	"description": "${actplayer} is rearranging the walls in their village",
	"descriptionmyturn": "${you} must choose the destination for this wall",
	"args": "argRelocatePlaceWall",
	"type": "activeplayer",
	"possibleactions": [
		"placeWall",
		"pass"
	],
	"transitions": {
		"wallPlaced": 65,
		"pass": 65,
		"zombiePass": 70
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"finalScoring": 80
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
	"updateGameProgression": true,
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
export default akeruption;
