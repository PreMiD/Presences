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

const tzolkin: GamePresence = {
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
				case "chooseWealthTiles":
					/*
					{
	"name": "chooseWealthTiles",
	"description": "Everyone must choose 2 wealth tiles to start",
	"descriptionmyturn": "${you} must choose 2 wealth tiles to start",
	"type": "multipleactiveplayer",
	"action": "stChooseWealthTiles",
	"possibleactions": [
		"chooseWealthTiles"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "applyWealthTiles":
					/*
					{
	"name": "applyWealthTiles",
	"description": "",
	"type": "game",
	"action": "stApplyWealthTiles",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place or pick up a worker",
	"descriptionmyturn": "${you} must place or pick up a worker",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"begForCorn",
		"placeWorker",
		"pickUpWorker"
	],
	"transitions": {
		"begForCorn": 4,
		"placeWorker": 6,
		"nextAction": 9,
		"zombiePass": 90
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "placeWorker":
					/*
					{
	"name": "placeWorker",
	"description": "${actplayer} may place another worker",
	"descriptionmyturn": "${you} may place another worker (+${corn} ${cornicon})",
	"type": "activeplayer",
	"args": "argPlaceWorker",
	"possibleactions": [
		"placeWorker",
		"endTurn",
		"undo"
	],
	"transitions": {
		"placeWorker": 6,
		"endTurn": 90
	}
}
					*/
					break;
				case "pickUpWorker":
					/*
					{
	"name": "pickUpWorker",
	"description": "${actplayer} may pick up another worker",
	"descriptionmyturn": "${you} may pick up another worker",
	"type": "activeplayer",
	"args": "argPickUpWorker",
	"possibleactions": [
		"pickUpWorker",
		"endTurn",
		"undo"
	],
	"transitions": {
		"nextAction": 9,
		"endTurn": 90
	}
}
					*/
					break;
				case "playerPreTurn":
					/*
					{
	"name": "playerPreTurn",
	"description": "",
	"type": "game",
	"action": "stPlayerTurn",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "solveStackedAction":
					/*
					{
	"name": "solveStackedAction",
	"description": "",
	"type": "game",
	"action": "stSolveStackedAction",
	"transitions": {
		"stackEmpty": 7,
		"harvest": 10,
		"payTechnology": 31,
		"construct": 32,
		"tikal4": 34,
		"tikal5": 35,
		"freeTechnology": 62,
		"trade": 42,
		"trade_limit": 43,
		"uxmal4": 44,
		"anyAction": 45,
		"resourceReward": 60,
		"templeReward": 61,
		"constructWithoutArchitecture": 70,
		"theology2": 71
	}
}
					*/
					break;
				case "harvest":
					/*
					{
	"name": "harvest",
	"description": "${actplayer} must choose to harvest corn or wood",
	"descriptionmyturn": "${you} must choose to harvest corn or wood",
	"type": "activeplayer",
	"args": "argHarvest",
	"possibleactions": [
		"harvestCorn",
		"harvestWood",
		"burnTheForest"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "technologyUpgrade":
					/*
					{
	"name": "technologyUpgrade",
	"description": "${actplayer} may choose a technology to upgrade",
	"descriptionmyturn": "${you} may choose a technology to upgrade",
	"type": "activeplayer",
	"args": "argTechnologyUpgrade",
	"possibleactions": [
		"chooseTechnology",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "construct":
					/*
					{
	"name": "construct",
	"description": "${actplayer} may construct a building",
	"descriptionmyturn": "${you} may construct a building",
	"type": "activeplayer",
	"args": "argConstruct",
	"possibleactions": [
		"construct",
		"pass"
	],
	"transitions": {
		"nextAction": 9,
		"sparedResource": 33
	}
}
					*/
					break;
				case "constructChooseSparedResources":
					/*
					{
	"name": "constructChooseSparedResources",
	"description": "Architecture: ${actplayer} must choose a non required resource",
	"descriptionmyturn": "Architecture: ${you} must choose a non required resource",
	"type": "activeplayer",
	"args": "argSparedResource",
	"possibleactions": [
		"sparedResource"
	],
	"transitions": {
		"nextAction": 9,
		"cancel": 32
	}
}
					*/
					break;
				case "tikal4":
					/*
					{
	"name": "tikal4",
	"description": "${actplayer} may construct two buildings or a monument",
	"descriptionmyturn": "${you} may construct two buildings or a monument",
	"type": "activeplayer",
	"args": "argTikal4",
	"possibleactions": [
		"construct",
		"pass"
	],
	"transitions": {
		"nextAction": 9,
		"sparedResource": 37
	}
}
					*/
					break;
				case "tikal5":
					/*
					{
	"name": "tikal5",
	"description": "${actplayer} may pay a resource to climb up 1 step on two different temples",
	"descriptionmyturn": "${you} may pay a resource to climb up 1 step on two different temples",
	"type": "activeplayer",
	"args": "argTikal5",
	"possibleactions": [
		"payForTwoTemples",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "technologyUpgradeFree":
					/*
					{
	"name": "technologyUpgradeFree",
	"description": "${actplayer} may choose a technology to upgrade (for free)",
	"descriptionmyturn": "${you} may choose a technology to upgrade (for free)",
	"type": "activeplayer",
	"args": "argTechnologyUpgrade",
	"possibleactions": [
		"chooseTechnology",
		"pass",
		"technologyForFree"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "constructChooseSparedResources":
					/*
					{
	"name": "constructChooseSparedResources",
	"description": "Architecture: ${actplayer} must choose a non required resource",
	"descriptionmyturn": "Architecture: ${you} must choose a non required resource",
	"type": "activeplayer",
	"args": "argSparedResource",
	"possibleactions": [
		"sparedResource"
	],
	"transitions": {
		"nextAction": 9,
		"cancel": 34
	}
}
					*/
					break;
				case "trade":
					/*
					{
	"name": "trade",
	"description": "${actplayer} may exchange corn and resources",
	"descriptionmyturn": "${you} may exchange corn and resources",
	"type": "activeplayer",
	"args": "argTrade",
	"possibleactions": [
		"trade",
		"pass"
	],
	"transitions": {
		"nextAction": 9,
		"nextTrade": 42
	}
}
					*/
					break;
				case "trade":
					/*
					{
	"name": "trade",
	"description": "${actplayer} may exchange corn and resources for a maximum value of ${maxvalue} corns",
	"descriptionmyturn": "${you} may exchange corn and resources for a maximum value of ${maxvalue} corns",
	"type": "activeplayer",
	"args": "argTrade",
	"possibleactions": [
		"trade",
		"pass"
	],
	"transitions": {
		"nextAction": 9,
		"nextTrade": 43
	}
}
					*/
					break;
				case "uxmal4":
					/*
					{
	"name": "uxmal4",
	"description": "${actplayer} may construct a building and pay with corn",
	"descriptionmyturn": "${you} may construct a building and pay with corn",
	"type": "activeplayer",
	"possibleactions": [
		"construct",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "anyAction":
					/*
					{
	"name": "anyAction",
	"description": "${actplayer} may pay 1 corn to perform any action on Palenque, Yaxchilan, Tikal or Uxmal gear",
	"descriptionmyturn": "${you} may pay 1 corn to perform any action on Palenque, Yaxchilan, Tikal or Uxmal gear",
	"type": "activeplayer",
	"args": "argAnyAction",
	"action": "stAnyAction",
	"possibleactions": [
		"selectAction",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "resourceReward":
					/*
					{
	"name": "resourceReward",
	"description": "${actplayer} receive a resource of his choice",
	"descriptionmyturn": "${you} receive a resource of your choice",
	"type": "activeplayer",
	"possibleactions": [
		"chooseResource"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "templeReward":
					/*
					{
	"name": "templeReward",
	"description": "${actplayer} climb up 1 step on one temple",
	"descriptionmyturn": "${you} climb up 1 step on one temple",
	"type": "activeplayer",
	"args": "argTempleUpgrade",
	"action": "stTempleReward",
	"possibleactions": [
		"chooseTemple"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "freeTechnology":
					/*
					{
	"name": "freeTechnology",
	"description": "${actplayer} advances one level in any technology for free",
	"descriptionmyturn": "${you} advance one level in any technology for free",
	"type": "activeplayer",
	"args": "argFreeTechnology",
	"possibleactions": [
		"chooseTechnology"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "constructWithoutArchitecture":
					/*
					{
	"name": "constructWithoutArchitecture",
	"description": "${actplayer} may construct a building (without architecture bonuses)",
	"descriptionmyturn": "${you} may construct a building (without architecture bonuses)",
	"type": "activeplayer",
	"args": "argBuildingFullCost",
	"possibleactions": [
		"construct",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "theology2":
					/*
					{
	"name": "theology2",
	"description": "${actplayer} may spend 1 resource to climb up 1 step on one temple",
	"descriptionmyturn": "${you} may spend 1 resource to climb up 1 step on one temple",
	"type": "activeplayer",
	"args": "argTheology2",
	"possibleactions": [
		"payResource",
		"pass"
	],
	"transitions": {
		"nextAction": 9
	}
}
					*/
					break;
				case "turnEnd":
					/*
					{
	"name": "turnEnd",
	"description": "",
	"type": "game",
	"action": "stTurnEnd",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 8,
		"endOfRound": 91
	}
}
					*/
					break;
				case "roundEnd":
					/*
					{
	"name": "roundEnd",
	"description": "",
	"type": "game",
	"action": "stRoundEnd",
	"transitions": {
		"firstPlayerTurn": 5,
		"foodDay": 92,
		"turnWheel": 95
	}
}
					*/
					break;
				case "foodDay":
					/*
					{
	"name": "foodDay",
	"description": "",
	"type": "game",
	"action": "stFoodDay",
	"transitions": {
		"middleOfAge": 93,
		"endOfAge": 94
	}
}
					*/
					break;
				case "middleOfAgeRewards":
					/*
					{
	"name": "middleOfAgeRewards",
	"description": "",
	"type": "game",
	"action": "stMiddleOfAgeRewards",
	"transitions": {
		"firstPlayerTurn": 5,
		"turnWheel": 95
	}
}
					*/
					break;
				case "endOfAgeRewards":
					/*
					{
	"name": "endOfAgeRewards",
	"description": "",
	"type": "game",
	"action": "stEndOfAgeRewards",
	"transitions": {
		"firstPlayerTurn": 5,
		"turnWheel": 95,
		"endOfGame": 99
	}
}
					*/
					break;
				case "turnWheel":
					/*
					{
	"name": "turnWheel",
	"description": "${actplayer} may choose to advance the calendar 2 days",
	"descriptionmyturn": "${you} may choose to advance the calendar 2 days",
	"type": "activeplayer",
	"possibleactions": [
		"turnWheel"
	],
	"transitions": {
		"firstPlayerTurn": 5,
		"endOfGame": 99
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
export default tzolkin;
