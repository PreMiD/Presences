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

const quetzal: GamePresence = {
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
				case "prepareRound":
					/*
					{
	"name": "prepareRound",
	"type": "game",
	"action": "stPrepareRound",
	"transitions": {
		"rerollMeeples": 5,
		"endGameScoring": 98,
		"exchangeBeforeEnd": 97
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
	"transitions": {
		"placeMeeple": 10,
		"resolveStela": 25
	}
}
					*/
					break;
				case "rerollMeeples":
					/*
					{
	"name": "rerollMeeples",
	"type": "multipleactiveplayer",
	"description": "Other players may choose to reroll some meeples",
	"descriptionmyturn": "${you} may choose to reroll some meeples",
	"possibleactions": [
		"rerollAll",
		"rerollTwo",
		"skipReroll"
	],
	"transitions": {
		"loopback": 5,
		"placeMeeple": 10,
		"resolveUpgradeTiles": 90
	},
	"action": "stRerollMeeples",
	"args": "argRerollMeeples"
}
					*/
					break;
				case "placeMeeple":
					/*
					{
	"name": "placeMeeple",
	"description": "${actplayer} must group some workers for expedition and pick a location",
	"descriptionmyturn": "${you} must group some workers for expedition and pick a location",
	"type": "activeplayer",
	"possibleactions": [
		"groupMeeple",
		"ungroupMeeple",
		"pickLocation",
		"ungroupAll"
	],
	"args": "argPlaceMeeple",
	"transitions": {
		"repeat": 10,
		"locationPicked": 11,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "placeMeepleWithLocation":
					/*
					{
	"name": "placeMeepleWithLocation",
	"description": "${actplayer} can confirm to send meeples to ${location} or pick different location or cancel",
	"descriptionmyturn": "${you} can confirm to send meeples to ${location} or pick different location or cancel",
	"type": "activeplayer",
	"possibleactions": [
		"cancelLocation",
		"pickLocation",
		"placeMeeples"
	],
	"args": "argPlaceMeeple",
	"transitions": {
		"endTurn": 3,
		"repeat": 11,
		"cancel": 10,
		"chooseMeepleType": 12,
		"campAction": 20,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "chooseMeepleType":
					/*
					{
	"name": "chooseMeepleType",
	"description": "${actplayer} must choose on which side to turn meeples",
	"descriptionmyturn": "${you} must choose on which side to turn meeples",
	"type": "activeplayer",
	"possibleactions": [
		"toAdventurers",
		"toArchaeologists"
	],
	"transitions": {
		"endTurn": 3,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "campAction":
					/*
					{
	"name": "campAction",
	"description": "${actplayer} can choose meeple to roll",
	"descriptionmyturn": "${you} can choose meeple to roll",
	"type": "activeplayer",
	"possibleactions": [
		"chooseMeeple",
		"skip"
	],
	"transitions": {
		"endTurn": 3,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveStela":
					/*
					{
	"name": "resolveStela",
	"type": "game",
	"action": "stResolveStela",
	"transitions": {
		"resolveTemple": 30,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveTemple":
					/*
					{
	"name": "resolveTemple",
	"type": "game",
	"action": "stResolveTemple",
	"transitions": {
		"pickArtifactFromTemple": 31,
		"resolveSuroundings": 40,
		"loopback": 30
	}
}
					*/
					break;
				case "pickArtifactFromTemple":
					/*
					{
	"name": "pickArtifactFromTemple",
	"description": "${actplayer} must pick an artifact from temple (${count} left)",
	"descriptionmyturn": "${you} must pick an artifact from temple (${count} left)",
	"type": "activeplayer",
	"possibleactions": [
		"pickCard"
	],
	"args": "argPickArtifactFromTemple",
	"transitions": {
		"resolveTemple": 30,
		"loopback": 31,
		"resolveUpgradeTiles": 90,
		"selectOneCard": 32
	}
}
					*/
					break;
				case "selectOneCard":
					/*
					{
	"name": "selectOneCard",
	"description": "${actplayer} must select one card to keep (other goes to the bottom of the deck)",
	"descriptionmyturn": "${you} must select one card to keep (other goes to the bottom of the deck)",
	"type": "activeplayer",
	"possibleactions": [
		"selectCard"
	],
	"transitions": {
		"resolveTemple": 30,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveTempleSurroundings":
					/*
					{
	"name": "resolveTempleSurroundings",
	"type": "game",
	"action": "stResolveTempleSurroundings",
	"transitions": {
		"loopback": 40,
		"resolveBlackMarket": 50,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveBlackMarket":
					/*
					{
	"name": "resolveBlackMarket",
	"type": "game",
	"action": "stResolveBlackMarket",
	"transitions": {
		"resolveVillage": 60,
		"pickCardToSell": 51
	}
}
					*/
					break;
				case "pickCardToSell":
					/*
					{
	"name": "pickCardToSell",
	"description": "${actplayer} may pick one artifact to sell",
	"descriptionmyturn": "${you} may pick one artifact to sell",
	"type": "activeplayer",
	"possibleactions": [
		"pickCardToSell",
		"skipSell"
	],
	"transitions": {
		"resolveVillage": 60,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveVillage":
					/*
					{
	"name": "resolveVillage",
	"type": "game",
	"action": "stResolveVillage",
	"transitions": {
		"loopback": 60,
		"resolveOffice": 70,
		"pickUpgradeTile": 61
	}
}
					*/
					break;
				case "pickUpgradeTile":
					/*
					{
	"name": "pickUpgradeTile",
	"description": "${actplayer} must pick an upgrade tile from village",
	"descriptionmyturn": "${you} must pick an upgrade tile from village",
	"type": "activeplayer",
	"possibleactions": [
		"pickUpgradeTile"
	],
	"transitions": {
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveOffice":
					/*
					{
	"name": "resolveOffice",
	"type": "game",
	"action": "stResolveOffice",
	"transitions": {
		"resolveShips": 80,
		"deliverArtifactsToOffice": 71
	}
}
					*/
					break;
				case "deliverArtifactsToOffice":
					/*
					{
	"name": "deliverArtifactsToOffice",
	"type": "multipleactiveplayer",
	"description": "Other players may deliver artifacts to office.",
	"descriptionmyturn": "",
	"possibleactions": [
		"deliverArtifacts",
		"skipDeliveries"
	],
	"transitions": {
		"loopbackToOffice": 71,
		"resolveShips": 80,
		"resolveUpgradeTiles": 90
	},
	"action": "stDeliverArtifactsToOffice",
	"args": "argDeliverArtifactsToOffice"
}
					*/
					break;
				case "resolveShips":
					/*
					{
	"name": "resolveShips",
	"type": "game",
	"action": "stResolveShips",
	"transitions": {
		"loopback": 80,
		"prepareRound": 2,
		"deliverArtifactsToShips": 81
	}
}
					*/
					break;
				case "deliverArtifactsToShips":
					/*
					{
	"name": "deliverArtifactsToShips",
	"description": "${actplayer} may deliver up to ${maxArtifacts} artifacts",
	"descriptionmyturn": "${you} may deliver up to ${maxArtifacts} artifacts",
	"type": "activeplayer",
	"args": "argDeliverArtifactsToShips",
	"possibleactions": [
		"deliverArtifacts",
		"skipDeliveries"
	],
	"transitions": {
		"resolveShips": 80,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "resolveUpgradeTiles":
					/*
					{
	"name": "resolveUpgradeTiles",
	"type": "game",
	"action": "stResolveUpgradeTiles",
	"transitions": {
		"resolveTemple": 30,
		"resolveTempleSurroundings": 40,
		"resolveVillage": 60,
		"loopbackToOffice": 71,
		"resolveShips": 80,
		"resolveUpgradeTiles": 90,
		"decideUpgradeToDiscard": 91,
		"rerollMeeples": 5,
		"placeMeeples": 10,
		"placeMeeplesWithLocation": 11,
		"chooseMeepleType": 12,
		"campAction": 20,
		"pickArtifactFromTemple": 31,
		"selectOneCard": 32,
		"pickCardToSell": 51,
		"pickUpgradeTile": 61,
		"deliverArtifactsToShips": 81
	}
}
					*/
					break;
				case "decideUpgradeToDiscard":
					/*
					{
	"name": "decideUpgradeToDiscard",
	"description": "${actplayer} must decide which upgrade to discard",
	"descriptionmyturn": "${you} must decide which upgrade to discard",
	"type": "activeplayer",
	"possibleactions": [
		"decideUpgradeToDiscard"
	],
	"transitions": {
		"resolveTemple": 30,
		"resolveTempleSurroundings": 40,
		"resolveVillage": 60,
		"loopbackToOffice": 71,
		"resolveShips": 80,
		"rerollMeeples": 5,
		"placeMeeples": 10,
		"placeMeeplesWithLocation": 11,
		"chooseMeepleType": 12,
		"campAction": 20,
		"pickArtifactFromTemple": 31,
		"pickCardToSell": 51,
		"pickUpgradeTile": 61,
		"deliverArtifactsToShips": 81,
		"exchangeBeforeEnd": 97
	}
}
					*/
					break;
				case "tempEnd":
					/*
					{
	"name": "tempEnd",
	"description": "${actplayer} must check end game",
	"descriptionmyturn": "${you} must check end game",
	"type": "activeplayer",
	"possibleactions": [],
	"transitions": []
}
					*/
					break;
				case "exchangeBeforeEnd":
					/*
					{
	"name": "exchangeBeforeEnd",
	"type": "multipleactiveplayer",
	"description": "Other players may still exchange coins before the game ends",
	"descriptionmyturn": "${you} may still exchange coins before the game ends",
	"possibleactions": [
		"doneExchange"
	],
	"action": "stExchangeBeforeEnd",
	"transitions": {
		"endGameScoring": 98,
		"loopback": 97,
		"resolveUpgradeTiles": 90
	}
}
					*/
					break;
				case "endGameScoring":
					/*
					{
	"name": "endGameScoring",
	"type": "game",
	"action": "stEndGameScoring",
	"transitions": {
		"endGame": 99,
		"tempEnd": 96
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
export default quetzal;
