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

const diams: GamePresence = {
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
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "playerDraw":
					/*
					{
	"name": "playerDraw",
	"description": "${actplayer} must draw one card for himself or two for the market",
	"descriptionmyturn": "${you} must draw one card for yourself or two for the market",
	"type": "activeplayer",
	"action": "stPlayerDraw",
	"possibleactions": [
		"accept",
		"cancel"
	],
	"transitions": {
		"accept": 11,
		"cancel": 11,
		"skip": 11,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerHandSelection":
					/*
					{
	"name": "playerHandSelection",
	"description": "${actplayer} must select diamonds to market or secure",
	"descriptionmyturn": "${you} must select diamonds to market or secure",
	"type": "activeplayer",
	"action": "stPlayerHandSelection",
	"possibleactions": [
		"market",
		"secure",
		"special",
		"pass"
	],
	"transitions": {
		"market": 12,
		"secure": 13,
		"special": 14,
		"pass": 96,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerMarketSelection":
					/*
					{
	"name": "playerMarketSelection",
	"description": "${actplayer} must select diamonds to get from the market",
	"descriptionmyturn": "${you} must select diamonds to get from the market",
	"type": "activeplayer",
	"possibleactions": [
		"market"
	],
	"transitions": {
		"market": 13,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerDiscardToMarket":
					/*
					{
	"name": "playerDiscardToMarket",
	"description": "${actplayer} must discard to the market his cards in excess of five",
	"descriptionmyturn": "${you} must discard to the market your cards in excess of five",
	"type": "activeplayer",
	"action": "stPlayerDiscardToMarket",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"discard": 96,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerChooseCardPower":
					/*
					{
	"name": "playerChooseCardPower",
	"description": "${actplayer} must choose which card power to use",
	"descriptionmyturn": "${you} must choose which card power to use",
	"type": "activeplayer",
	"args": "argSpecialCard",
	"possibleactions": [
		"compulsorySale",
		"securExpress",
		"safeDrilling",
		"sleightOfHand"
	],
	"transitions": {
		"compulsorySale": 15,
		"securExpress": 16,
		"safeDrilling": 17,
		"sleightOfHand": 18,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerCompulsorySale":
					/*
					{
	"name": "playerCompulsorySale",
	"description": "${actplayer} must choose a diamond in his hand and a player",
	"descriptionmyturn": "${you} must choose a diamond in your hand and a player",
	"type": "activeplayer",
	"possibleactions": [
		"compulsorySale"
	],
	"transitions": {
		"compulsorySale": 13,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerSecurExpress":
					/*
					{
	"name": "playerSecurExpress",
	"description": "${actplayer} must choose diamonds to secure",
	"descriptionmyturn": "${you} must choose diamonds to secure",
	"type": "activeplayer",
	"possibleactions": [
		"securExpress"
	],
	"transitions": {
		"securExpress": 13,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerSafeDrilling":
					/*
					{
	"name": "playerSafeDrilling",
	"description": "${actplayer} must choose a diamond quality and a player",
	"descriptionmyturn": "${you} must choose a diamond quality and a player",
	"type": "activeplayer",
	"possibleactions": [
		"safeDrilling"
	],
	"transitions": {
		"safeDrillingSuccess": 19,
		"safeDrillingFail": 13,
		"zombiePass": 96
	}
}
					*/
					break;
				case "playerSleightOfHand":
					/*
					{
	"name": "playerSleightOfHand",
	"description": "${actplayer} must choose a diamond from the market",
	"descriptionmyturn": "${you} must choose a diamond from the market",
	"type": "activeplayer",
	"possibleactions": [
		"sleightOfHand"
	],
	"transitions": {
		"sleightOfHand": 13,
		"zombiePass": 96
	}
}
					*/
					break;
				case "changeActivePlayerToTarget":
					/*
					{
	"name": "changeActivePlayerToTarget",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stChangeActivePlayerToTarget",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "playerSelectCardForDriller":
					/*
					{
	"name": "playerSelectCardForDriller",
	"description": "${actplayer} must select one diamond to give from his safe",
	"descriptionmyturn": "${you} must select one diamond to give from your safe",
	"type": "activeplayer",
	"possibleactions": [
		"selectDiamond"
	],
	"transitions": {
		"diamondSelected": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "restoreActivePlayer":
					/*
					{
	"name": "restoreActivePlayer",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stRestoreActivePlayer",
	"transitions": {
		"diamondsToDiscard": 13,
		"noDiamondsToDiscard": 96
	}
}
					*/
					break;
				case "checkEndOfRound":
					/*
					{
	"name": "checkEndOfRound",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stCheckEndOfRound",
	"transitions": {
		"endOfTurn": 2,
		"endOfRound": 97
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "",
	"type": "game",
	"action": "stEndOfRound",
	"transitions": {
		"newRound": 10,
		"endOfGame": 98
	}
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
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
export default diams;
