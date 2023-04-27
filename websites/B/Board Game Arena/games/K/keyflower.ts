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

const keyflower: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "seasonSetup":
					/*
					{
	"name": "seasonSetup",
	"description": "Setting up season",
	"type": "game",
	"action": "stSeasonSetup",
	"transitions": {
		"startSeason": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must either bid for a tile, activate a tile, or pass.",
	"descriptionmyturn": "${you} must either bid for a tile, activate a tile, or ",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"selectLocation",
		"placeWorkersWithLocation",
		"pass"
	],
	"updateGameProgression": true,
	"transitions": {
		"selectLocation": 35,
		"pass": 50
	}
}
					*/
					break;
				case "locationSelected":
					/*
					{
	"name": "locationSelected",
	"description": "${actplayer} to play",
	"descriptionmyturn": "${you} must select the worker(s) you wish to place",
	"type": "activeplayer",
	"args": "argLocationSelected",
	"possibleactions": [
		"cancelPlacement",
		"placeWorkers",
		"confirmPlacement"
	],
	"transitions": {
		"cancelPlacement": 30,
		"placeWorkers": 35,
		"confirmPlacement": 40
	}
}
					*/
					break;
				case "workersPlaced":
					/*
					{
	"name": "workersPlaced",
	"description": "Checking the worker placement",
	"type": "game",
	"action": "stWorkersPlaced",
	"transitions": {
		"costPaid": 42,
		"costChoice": 41,
		"finaliseTurn": 50
	}
}
					*/
					break;
				case "productionCost":
					/*
					{
	"name": "productionCost",
	"description": "${actplayer} must select a method of payment",
	"descriptionmyturn": "${you} must select your method of payment: ",
	"type": "activeplayer",
	"args": "argProductionCost",
	"possibleactions": [
		"discardGoods"
	],
	"transitions": {
		"discardGoods": 42,
		"zombiePass": 50
	}
}
					*/
					break;
				case "villageProduction":
					/*
					{
	"name": "villageProduction",
	"description": "Dispatching goods",
	"type": "game",
	"action": "stVillageProduction",
	"transitions": {
		"transport": 44,
		"produce": 50,
		"produceChoice": 43
	}
}
					*/
					break;
				case "productionChoice":
					/*
					{
	"name": "productionChoice",
	"description": "${actplayer} must select which good(s) to produce",
	"descriptionmyturn": "${you} must select which good(s) to produce: ",
	"type": "activeplayer",
	"args": "argProductionChoice",
	"possibleactions": [
		"selectGoods"
	],
	"transitions": {
		"selectGoods": 50,
		"zombiePass": 50
	}
}
					*/
					break;
				case "villageBuilding":
					/*
					{
	"name": "villageBuilding",
	"description": "Village upgrades",
	"type": "game",
	"action": "stVillageBuilding",
	"transitions": {
		"transportAvailable": 45,
		"upgradeAvailable": 47,
		"buildingComplete": 50
	}
}
					*/
					break;
				case "villageTransportA":
					/*
					{
	"name": "villageTransportA",
	"description": "${actplayer} must select which resource to transport (${capacity} remaining moves)",
	"descriptionmyturn": "${you} must select which resource to transport (${capacity} remaining moves) or ",
	"type": "activeplayer",
	"args": "argVillageTransportA",
	"possibleactions": [
		"selectResource",
		"endTransport"
	],
	"transitions": {
		"selectResource": 46,
		"endTransport": 44,
		"zombiePass": 50
	}
}
					*/
					break;
				case "villageTransportB":
					/*
					{
	"name": "villageTransportB",
	"description": "${actplayer} must select a destination for the ${resource} (${capacity} remaining moves)",
	"descriptionmyturn": "${you} must select a destination for the ${resource} (${capacity} remaining moves) or ",
	"type": "activeplayer",
	"args": "argVillageTransportB",
	"possibleactions": [
		"transportResource",
		"changeResource",
		"selectResource"
	],
	"transitions": {
		"transportResource": 44,
		"changeResource": 45,
		"zombiePass": 50,
		"selectResource": 46
	}
}
					*/
					break;
				case "villageUpgrade":
					/*
					{
	"name": "villageUpgrade",
	"description": "${actplayer} must select which tile to upgrade",
	"descriptionmyturn": "${you} must select which tile to upgrade or ",
	"type": "activeplayer",
	"args": "argVillageUpgrade",
	"possibleactions": [
		"selectUpgradeTile",
		"skipUpgrade"
	],
	"transitions": {
		"selectUpgradeTile": 48,
		"skipUpgrade": 44,
		"zombiePass": 50
	}
}
					*/
					break;
				case "villageUpgradePayment":
					/*
					{
	"name": "villageUpgradePayment",
	"description": "Village upgrades",
	"type": "game",
	"action": "stVillageUpgradePayment",
	"transitions": {
		"payForUpgrade": 44,
		"paymentChoice": 49
	}
}
					*/
					break;
				case "villageUpgradeChoice":
					/*
					{
	"name": "villageUpgradeChoice",
	"description": "${actplayer} must choose a payment method",
	"descriptionmyturn": "${you} must choose your payment method",
	"type": "activeplayer",
	"args": "argVillageUpgradeChoice",
	"possibleactions": [
		"selectPaymentMethod"
	],
	"transitions": {
		"selectPaymentMethod": 44,
		"zombiePass": 50
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "Ending the turn",
	"type": "game",
	"action": "stEndTurn",
	"transitions": {
		"nextPlayer": 30,
		"endSeason": 70
	}
}
					*/
					break;
				case "seasonEndA":
					/*
					{
	"name": "seasonEndA",
	"description": "Tidying up the season",
	"type": "game",
	"action": "stSeasonEndA",
	"transitions": {
		"finishSeasonA": 71
	}
}
					*/
					break;
				case "turnOrder":
					/*
					{
	"name": "turnOrder",
	"description": "Arranging turn order",
	"type": "game",
	"action": "stTurnOrder",
	"transitions": {
		"playerChosen": 72,
		"boatsSelected": 74
	}
}
					*/
					break;
				case "boatSelection":
					/*
					{
	"name": "boatSelection",
	"description": "${actplayer} must select a boat",
	"descriptionmyturn": "${you} must select a boat",
	"type": "activeplayer",
	"args": "argBoatSelection",
	"possibleactions": [
		"selectBoat"
	],
	"transitions": {
		"selectBoat": 71,
		"flipper": 172
	}
}
					*/
					break;
				case "seasonEndB":
					/*
					{
	"name": "seasonEndB",
	"description": "",
	"type": "game",
	"action": "stSeasonEndB",
	"transitions": {
		"startConstruction": 75,
		"finishSeasonB": 80
	}
}
					*/
					break;
				case "villageConstructionA":
					/*
					{
	"name": "villageConstructionA",
	"description": "Everyone must place new tiles in villages",
	"descriptionmyturn": "${you} must place your new tiles in your village",
	"type": "multipleactiveplayer",
	"args": "argVillageConstructionA",
	"action": "stVillageConstructionA",
	"possibleactions": [
		"selectTile",
		"placeTile",
		"cancelTile",
		"rotateTile",
		"cancelLocation"
	],
	"transitions": {
		"endConstruction": 74
	}
}
					*/
					break;
				case "seasonEndC":
					/*
					{
	"name": "seasonEndC",
	"description": "Ending the season",
	"type": "game",
	"action": "stSeasonEndC",
	"transitions": {
		"nextSeason": 10,
		"winterSetup": 85,
		"endYear": 90
	}
}
					*/
					break;
				case "winterSelection":
					/*
					{
	"name": "winterSelection",
	"description": "All players must select their winter tiles",
	"descriptionmyturn": "You must select your winter tiles",
	"type": "multipleactiveplayer",
	"action": "stWinterSelection",
	"args": "argWinterSelection",
	"possibleactions": [
		"selectWinterTiles"
	],
	"transitions": {
		"selectWinterTiles": 10
	}
}
					*/
					break;
				case "yearEnd":
					/*
					{
	"name": "yearEnd",
	"description": "Scoring the year",
	"type": "game",
	"action": "stYearEnd",
	"updateGameProgression": true,
	"transitions": {
		"startScoringArrangement": 91,
		"endGame": 99
	}
}
					*/
					break;
				case "scoringSelect":
					/*
					{
	"name": "scoringSelect",
	"description": "Everyone must move resources and/or assign workers and skills to tiles for the scoring",
	"descriptionmyturn": "${you} must move resources and/or assign workers and skills to tiles for the scoring.",
	"type": "multipleactiveplayer",
	"action": "stScoringSelect",
	"possibleactions": [
		"scoringAssign",
		"finishArranging",
		"convertPurple"
	],
	"transitions": {
		"finishArranging": 90
	}
}
					*/
					break;
				case "scoringDestination":
					/*
					{
	"name": "scoringDestination",
	"description": "${actplayer} must pick a destination for this item",
	"descriptionmyturn": "${you} must pick a destination for this item",
	"type": "activeplayer",
	"args": "argScoringDestination",
	"possibleactions": [
		"chooseDestination",
		"changeItem"
	],
	"transitions": {
		"chooseDestination": 91,
		"changeItem": 91
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
				case "villageUpgradePayment":
					/*
					{
	"name": "villageUpgradePayment",
	"description": "Village upgrades",
	"type": "game",
	"action": "stVillageUpgradeFreePayment",
	"transitions": {
		"payForUpgrade": 71
	}
}
					*/
					break;
				case "villageUpgrade":
					/*
					{
	"name": "villageUpgrade",
	"description": "${actplayer} must select which tile to upgrade",
	"descriptionmyturn": "${you} must select which tile to upgrade or ",
	"type": "activeplayer",
	"args": "argVillageUpgradeFree",
	"possibleactions": [
		"selectUpgradeTile",
		"skipUpgrade",
		"free_upgrade"
	],
	"transitions": {
		"selectUpgradeTile": 148,
		"skipUpgrade": 71,
		"zombiePass": 71
	}
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
export default keyflower;
