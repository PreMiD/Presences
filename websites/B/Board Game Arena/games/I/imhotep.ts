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

const imhotep: GamePresence = {
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
		"": 90
	}
}
					*/
					break;
				case "prepareNextRound":
					/*
					{
	"name": "prepareNextRound",
	"description": "",
	"type": "game",
	"action": "stPrepareNextRound",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3
	}
}
					*/
					break;
				case "nextAction":
					/*
					{
	"name": "nextAction",
	"description": "",
	"type": "game",
	"action": "stNextAction",
	"updateGameProgression": true,
	"transitions": {
		"pickAction": 4,
		"loadShip": 10,
		"sailShip": 11,
		"sailLoadedShip": 12,
		"prepareUnloadShip": 13,
		"unloadShip": 14,
		"pickMarketCard": 15,
		"selectPyramidB": 17,
		"selectPyramidBViaEntranceCard": 23,
		"pickTempleBBonus": 18,
		"gainTwoPoints": 20,
		"gainMarketCard": 21,
		"choseBetweenMarketCards": 22,
		"cleanupMarketBRedCard": 24,
		"endOfRound": 5
	}
}
					*/
					break;
				case "pickAction":
					/*
					{
	"name": "pickAction",
	"description": "${actplayer} must play an action",
	"descriptionmyturn": "${you} must play an action:",
	"type": "activeplayer",
	"args": "argPickAction",
	"possibleactions": [
		"getNewStones",
		"loadShip",
		"sailShip",
		"playBlueCard",
		"pickCard",
		"skipTurn"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "End of round",
	"type": "game",
	"action": "stEndOfRound",
	"updateGameProgression": true,
	"transitions": {
		"prepareNextRound": 2,
		"prepareEndOfGame": 6
	}
}
					*/
					break;
				case "prepareGameEnd":
					/*
					{
	"name": "prepareGameEnd",
	"description": "Final point assessment",
	"type": "game",
	"action": "stPrepareGameEnd",
	"updateGameProgression": true,
	"transitions": {
		"gameEnd": 99
	}
}
					*/
					break;
				case "loadShip":
					/*
					{
	"name": "loadShip",
	"description": "${actplayer} must place a stone on a ship",
	"descriptionmyturn": "${you} must place a stone on a ship",
	"type": "activeplayer",
	"args": "argLoadShip",
	"possibleactions": [
		"loadShip",
		"undo"
	],
	"transitions": {
		"nextAction": 3
	}
}
					*/
					break;
				case "sailShip":
					/*
					{
	"name": "sailShip",
	"description": "${actplayer} must sail a ship to a site",
	"descriptionmyturn": "${you} must sail a ship to a site",
	"type": "activeplayer",
	"args": "argSailShip",
	"possibleactions": [
		"sailShip"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "sailLoadedShip":
					/*
					{
	"name": "sailLoadedShip",
	"description": "${actplayer} must sail the loaded ship to a site",
	"descriptionmyturn": "${you} must sail the loaded ship to a site",
	"type": "activeplayer",
	"args": "argSailLoadedShip",
	"possibleactions": [
		"sailShip"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "prepareUnloadShip":
					/*
					{
	"name": "prepareUnloadShip",
	"description": "",
	"type": "game",
	"action": "stPrepareUnloadShip",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3
	}
}
					*/
					break;
				case "unloadShip":
					/*
					{
	"name": "unloadShip",
	"description": "${actplayer} must pick a stone to unload",
	"descriptionmyturn": "${you} must pick a stone to unload",
	"type": "activeplayer",
	"args": "argUnloadShip",
	"possibleactions": [
		"unloadStone"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "pickMarketCard":
					/*
					{
	"name": "pickMarketCard",
	"description": "${actplayer} must pick a card from the market",
	"descriptionmyturn": "${you} must pick a card from the market",
	"type": "activeplayer",
	"args": "argPickCard",
	"action": "stUnloadStoneAtMarket",
	"possibleactions": [
		"pickCard",
		"pickHiddenCard"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "discardCard":
					/*
					{
	"name": "discardCard",
	"description": "",
	"type": "game",
	"action": "stDiscardCard",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "pickPyramidB":
					/*
					{
	"name": "pickPyramidB",
	"description": "${actplayer} must chose a pyramid to unload the stone",
	"descriptionmyturn": "${you} must chose a pyramid to unload the stone",
	"type": "activeplayer",
	"args": "argSelectPyramidB",
	"action": "stSelectPyramidB",
	"possibleactions": [
		"pickPyramidB"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "pickTempleBBonus":
					/*
					{
	"name": "pickTempleBBonus",
	"description": "${actplayer} must pick a bonus",
	"descriptionmyturn": "${you} may pick a bonus:",
	"type": "activeplayer",
	"args": "argPickTempleBBonus",
	"possibleactions": [
		"pickTempleBBonus"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 5
	}
}
					*/
					break;
				case "assessTemple":
					/*
					{
	"name": "assessTemple",
	"description": "End of round, assessing the Temple",
	"type": "game",
	"action": "stAssessTemple",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3,
		"prepareNextRound": 2,
		"prepareEndOfGame": 6
	}
}
					*/
					break;
				case "gainTwoPoints":
					/*
					{
	"name": "gainTwoPoints",
	"description": "",
	"type": "game",
	"action": "stGainTwoPoints",
	"args": "argGainTwoPoints",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "gainMarketCard":
					/*
					{
	"name": "gainMarketCard",
	"description": "",
	"type": "game",
	"action": "stGainMarketCard",
	"args": "argGainMarketCard",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "choseBetweenMarketCards":
					/*
					{
	"name": "choseBetweenMarketCards",
	"description": "${actplayer} chooses between one of the two revealed cards",
	"descriptionmyturn": "${you} must pick one of the two cards",
	"type": "activeplayer",
	"args": "argChoseBetweenMarketCards",
	"possibleactions": [
		"pickCard"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "pickPyramidBViaEntranceCard":
					/*
					{
	"name": "pickPyramidBViaEntranceCard",
	"description": "${actplayer} must chose a pyramid to place the stone",
	"descriptionmyturn": "${you} must chose a pyramid to place the stone",
	"type": "activeplayer",
	"args": "argSelectPyramidB",
	"action": "stSelectPyramidBViaEntranceCard",
	"possibleactions": [
		"pickPyramidB"
	],
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "cleanupMarketBRedCard":
					/*
					{
	"name": "cleanupMarketBRedCard",
	"description": "",
	"type": "game",
	"action": "stCleanupMarketBRedCard",
	"updateGameProgression": true,
	"transitions": {
		"nextAction": 3,
		"endOfRound": 19
	}
}
					*/
					break;
				case "setupNewGame":
					/*
					{
	"name": "setupNewGame",
	"description": "",
	"type": "game",
	"action": "stSetupNewGame",
	"updateGameProgression": false,
	"transitions": {
		"prepareNextRound": 2
	}
}
					*/
					break;
				case "buffer":
					/*
					{
	"name": "buffer",
	"description": "NOTHING",
	"descriptionmyturn": "NOTHING",
	"type": "activeplayer",
	"possibleactions": [],
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
export default imhotep;
