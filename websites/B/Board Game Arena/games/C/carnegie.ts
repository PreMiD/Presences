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

const carnegie: GamePresence = {
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
		"": 13
	}
}
					*/
					break;
				case "playerInitialHousing":
					/*
					{
	"name": "playerInitialHousing",
	"description": "${actplayer} must build a housing project in a medium or large city",
	"descriptionmyturn": "${you} must build a housing project in a medium or large city",
	"type": "activeplayer",
	"possibleactions": [
		"placeHousing",
		"tradeGood",
		"undo"
	],
	"transitions": {
		"reserveDepartment": 14,
		"processSetup": 20
	}
}
					*/
					break;
				case "playerInitialMovement":
					/*
					{
	"name": "playerInitialMovement",
	"description": "${actplayer} may make up to 6 movement",
	"descriptionmyturn": "${you} may make up to 6 movement",
	"type": "activeplayer",
	"possibleactions": [
		"moveWorkers",
		"tradeGood",
		"undo"
	],
	"transitions": {
		"activateWorkers": 10,
		"processSetup": 20
	}
}
					*/
					break;
				case "playerSelectAction":
					/*
					{
	"name": "playerSelectAction",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"chooseAction",
		"tradeGood",
		"undo"
	],
	"action": "stSelectAction",
	"args": "argSelectAction",
	"updateGameProgression": true,
	"transitions": {
		"processEvent": 21,
		"zombieRound": 32
	}
}
					*/
					break;
				case "playerEvent":
					/*
					{
	"name": "playerEvent",
	"description": "${actplayer} may collect income",
	"descriptionmyturn": "${you} may collect income",
	"type": "activeplayer",
	"possibleactions": [
		"income",
		"donation",
		"spendRND",
		"passEvent",
		"tradeGood",
		"undo"
	],
	"args": "argEvent",
	"updateGameProgression": true,
	"transitions": {
		"processEvent": 21
	}
}
					*/
					break;
				case "playerHumanResources":
					/*
					{
	"name": "playerHumanResources",
	"description": "${actplayer} may use Human Resources Departments",
	"descriptionmyturn": "${you} may use Human Resources Departments",
	"type": "activeplayer",
	"possibleactions": [
		"moveWorkers",
		"trainingAndPartnerships",
		"recruiting",
		"safetyAndQuality",
		"pass",
		"undo",
		"actionJoker",
		"exhaust",
		"comboHR",
		"nolaHR",
		"tradeGood",
		"wait"
	],
	"args": "argHumanResources",
	"updateGameProgression": true,
	"transitions": {
		"jokerHR": 6,
		"jokerManagement": 7,
		"jokerConstruction": 8,
		"jokerRND": 9,
		"activateWorkers": 10,
		"processAction": 22
	}
}
					*/
					break;
				case "playerManagement":
					/*
					{
	"name": "playerManagement",
	"description": "${actplayer} may use Management Departments",
	"descriptionmyturn": "${you} may use Management Departments",
	"type": "activeplayer",
	"possibleactions": [
		"commerceAndFinance",
		"strategicPlanning",
		"purchasing",
		"sales",
		"logistics",
		"pass",
		"undo",
		"actionJoker",
		"exhaust",
		"comboManagement",
		"nolaManagement",
		"tradeGood",
		"wait"
	],
	"args": "argManagement",
	"updateGameProgression": true,
	"transitions": {
		"jokerHR": 6,
		"jokerManagement": 7,
		"jokerConstruction": 8,
		"jokerRND": 9,
		"activateWorkers": 10,
		"processAction": 22
	}
}
					*/
					break;
				case "playerConstruction":
					/*
					{
	"name": "playerConstruction",
	"description": "${actplayer} may use Construction Departments",
	"descriptionmyturn": "${you} may use Construction Departments",
	"type": "activeplayer",
	"possibleactions": [
		"construction",
		"constructionOutsourcing",
		"supplyChain",
		"spendRND",
		"pass",
		"undo",
		"actionJoker",
		"exhaust",
		"comboConstruction",
		"nolaConstruction",
		"tradeGood",
		"wait"
	],
	"args": "argConstruction",
	"updateGameProgression": true,
	"transitions": {
		"jokerHR": 6,
		"jokerManagement": 7,
		"jokerConstruction": 8,
		"jokerRND": 9,
		"activateWorkers": 10,
		"processAction": 22
	}
}
					*/
					break;
				case "playerRND":
					/*
					{
	"name": "playerRND",
	"description": "${actplayer} may use Research and Development Departments",
	"descriptionmyturn": "${you} may use Research and Development Departments",
	"type": "activeplayer",
	"possibleactions": [
		"spendRND",
		"advancedResearch",
		"charitableGiving",
		"gainRND",
		"pass",
		"undo",
		"actionJoker",
		"exhaust",
		"comboRND",
		"nolaRND",
		"tradeGood",
		"wait"
	],
	"args": "argRND",
	"updateGameProgression": true,
	"transitions": {
		"jokerHR": 6,
		"jokerManagement": 7,
		"jokerConstruction": 8,
		"jokerRND": 9,
		"activateWorkers": 10,
		"processAction": 22
	}
}
					*/
					break;
				case "playerActivateWorkers":
					/*
					{
	"name": "playerActivateWorkers",
	"description": "${actplayer} may activate workers",
	"descriptionmyturn": "${you} may activate workers",
	"type": "activeplayer",
	"possibleactions": [
		"activateWorkers",
		"undo",
		"tradeGood"
	],
	"args": "argActivateWorkers",
	"transitions": {
		"processSetup": 20,
		"processAction": 22
	}
}
					*/
					break;
				case "processWelfareDonation":
					/*
					{
	"name": "processWelfareDonation",
	"description": "Some players may make Welfare donations of money and goods",
	"descriptionmyturn": "${you} may make Welfare donations of money and goods",
	"type": "multipleactiveplayer",
	"possibleactions": [],
	"action": "stWelfareDonation",
	"args": "argWelfareDonation",
	"transitions": {
		"finalScoring": 31
	}
}
					*/
					break;
				case "multiActivateWorkers":
					/*
					{
	"name": "multiActivateWorkers",
	"description": "Some players may activate workers",
	"descriptionmyturn": "${you} may activate workers",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"activateWorkers"
	],
	"action": "stActivateWorkers",
	"args": "argActivateWorkers",
	"transitions": {
		"endRound": 30
	}
}
					*/
					break;
				case "playerChooseTabs":
					/*
					{
	"name": "playerChooseTabs",
	"description": "Some players must choose which sides to use for project tabs",
	"descriptionmyturn": "${you} must choose which sides to use for project tabs (click tabs to flip)",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"chooseTabs"
	],
	"action": "stChooseTabs",
	"transitions": {
		"processSetup": 20
	}
}
					*/
					break;
				case "playerReserveDepartment":
					/*
					{
	"name": "playerReserveDepartment",
	"description": "${actplayer} must reserve a department",
	"descriptionmyturn": "${you} must reserve a department",
	"type": "activeplayer",
	"possibleactions": [
		"reserveDepartment",
		"tradeGood",
		"undo"
	],
	"transitions": {
		"confirmSetup": 17,
		"processSetup": 20
	}
}
					*/
					break;
				case "playerReplaceDonation":
					/*
					{
	"name": "playerReplaceDonation",
	"description": "${actplayer} may cover a printed column of donations with a replacement donation tile",
	"descriptionmyturn": "${you} may cover a printed column of donations with a replacement donation tile",
	"type": "activeplayer",
	"possibleactions": [
		"replaceDonation",
		"tradeGood",
		"pass",
		"undo"
	],
	"args": "argReplaceDonation",
	"transitions": {
		"processSetup": 20
	}
}
					*/
					break;
				case "multiSecretDonation":
					/*
					{
	"name": "multiSecretDonation",
	"description": "Some players must choose a secret donation",
	"descriptionmyturn": "${you} must choose a secret donation",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"secretDonation"
	],
	"action": "stSecretDonation",
	"transitions": {
		"firstAction": 4
	}
}
					*/
					break;
				case "playerConfirmSetup":
					/*
					{
	"name": "playerConfirmSetup",
	"description": "${actplayer} must confirm setup",
	"descriptionmyturn": "${you} must confirm setup",
	"type": "activeplayer",
	"possibleactions": [
		"tradeGood",
		"pass",
		"undo"
	],
	"transitions": {
		"processSetup": 20
	}
}
					*/
					break;
				case "processSetup":
					/*
					{
	"name": "processSetup",
	"description": "Processing Setup",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"prevPlayer": 2,
		"nextPlayer": 3,
		"firstAction": 4,
		"chooseTabs": 13,
		"replaceDonation": 15,
		"secretDonation": 16
	}
}
					*/
					break;
				case "processEvent":
					/*
					{
	"name": "processEvent",
	"description": "Processing Event",
	"type": "game",
	"action": "stEvent",
	"updateGameProgression": true,
	"transitions": {
		"resolveEvent": 5,
		"nextHR": 6,
		"nextManagement": 7,
		"nextConstruction": 8,
		"nextRND": 9,
		"activateWorkers": 10,
		"multiActivateWorkers": 12,
		"endRound": 30
	}
}
					*/
					break;
				case "processAction":
					/*
					{
	"name": "processAction",
	"description": "Processing Action",
	"type": "game",
	"action": "stAction",
	"updateGameProgression": true,
	"transitions": {
		"nextHR": 6,
		"nextManagement": 7,
		"nextConstruction": 8,
		"nextRND": 9,
		"activateWorkers": 10,
		"multiActivateWorkers": 12,
		"endRound": 30
	}
}
					*/
					break;
				case "cleanupRound":
					/*
					{
	"name": "cleanupRound",
	"description": "End of Round Cleanup",
	"type": "game",
	"action": "stRound",
	"transitions": {
		"nextRound": 4,
		"welfareDonation": 11,
		"soloEvent": 21
	}
}
					*/
					break;
				case "cleanupFinalScoring":
					/*
					{
	"name": "cleanupFinalScoring",
	"description": "Final Scoring",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
		"finalScoreDebug": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "cleanupZombieRound":
					/*
					{
	"name": "cleanupZombieRound",
	"description": "",
	"type": "game",
	"action": "stZombieRound",
	"transitions": {
		"nextRound": 4
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
export default carnegie;
