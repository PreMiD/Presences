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

const throughtheagesnewstory: GamePresence = {
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
		"": 9
	}
}
					*/
					break;
				case "bidTerritorySendUnitOrBonus":
					/*
					{
	"name": "bidTerritorySendUnitOrBonus",
	"description": "${card_name}: ${actplayer} must send more units or play colonization bonus cards (${strength}/${bid} strength points).",
	"descriptionmyturn": "${card_name}: ${you} must send more units or play colonization bonus cards (${strength}/${bid} strength points).",
	"type": "activeplayer",
	"args": "argSacrificeTerritory",
	"possibleactions": [
		"sacrifice",
		"useBonus",
		"undo"
	],
	"transitions": {
		"continue": 8,
		"end": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "firstPlayerTurn":
					/*
					{
	"name": "firstPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stFirstPlayerTurn",
	"transitions": {
		"nextPlayer": 10,
		"endGame": 98
	}
}
					*/
					break;
				case "startPlayerTurn":
					/*
					{
	"name": "startPlayerTurn",
	"description": "",
	"type": "game",
	"action": "stStartPlayerTurn",
	"transitions": {
		"normalTurn": 1101,
		"firstTurn": 13,
		"advancedTurn": 21,
		"resolveWar": 28
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may do ${civil} civil actions, ${military} military actions, or pass",
	"descriptionmyturn": "${you} may do ${civil} civil actions, ${military} military actions, or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"increasePopulation",
		"build",
		"destroy",
		"upgrade",
		"playCard",
		"pickCard",
		"copyTactic",
		"pass",
		"undo"
	],
	"transitions": {
		"endOfTurn": 40,
		"endAction": 12,
		"applyEvent": 15,
		"buildChoice": 14,
		"mustBuildCivil": 200,
		"mustBuildProduction": 201,
		"mustBuildWonder": 205,
		"mustPlayTechnology": 208,
		"mustUpgradeBuilding": 209,
		"mustBuildMilitary": 211,
		"1wonderForFree": 212,
		"2wonderForFree": 213,
		"3wonderForFree": 214,
		"homer": 238,
		"chooseReservesGain": 239,
		"churchill": 241
	}
}
					*/
					break;
				case "endOfAction":
					/*
					{
	"name": "endOfAction",
	"description": "",
	"type": "game",
	"action": "stEndOfAction",
	"transitions": {
		"continue": 1101,
		"continueFirstTurn": 13,
		"no_more_action": 40,
		"removeTokens": 1201
	}
}
					*/
					break;
				case "playerTurnFirstTurn":
					/*
					{
	"name": "playerTurnFirstTurn",
	"description": "${actplayer} may do ${civil} civil actions, or pass",
	"descriptionmyturn": "${you} may do ${civil} civil actions, or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"pickCard",
		"pass",
		"undo"
	],
	"transitions": {
		"endOfTurn": 50,
		"endAction": 12,
		"zombiePass": 50
	}
}
					*/
					break;
				case "buildChoice":
					/*
					{
	"name": "buildChoice",
	"description": "${card_name}: ${actplayer} must choose an action or cancel",
	"descriptionmyturn": "${card_name}: ${you} can:",
	"type": "activeplayer",
	"args": "argBuildChoice",
	"possibleactions": [
		"buildChoice",
		"build",
		"cancel",
		"destroy",
		"upgrade"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "pickEvent":
					/*
					{
	"name": "pickEvent",
	"description": "",
	"type": "game",
	"action": "stPickEvent",
	"transitions": {
		"endEvent": 22,
		"bidTerritory": 17,
		"freeWarrior": 202,
		"freeTemple": 203,
		"freeFoodResource": 204,
		"lossPopulation": 206,
		"lossBuilding": 207,
		"freeFoodResourceCustom": 216,
		"lossPopulationMultiple": 217,
		"payResourceFood": 223,
		"checkLooseTokens": 224,
		"pickCardsFromRow": 225,
		"ravagesOfTime": 230,
		"terrorism": 232,
		"lossColony": 234,
		"developmentOfCivilization": 237,
		"discardMilitary": 40
	}
}
					*/
					break;
				case "endEvent":
					/*
					{
	"name": "endEvent",
	"description": "",
	"type": "game",
	"action": "stEndEvent",
	"transitions": {
		"endEvent": 22,
		"endWar": 21
	}
}
					*/
					break;
				case "bidTerritory":
					/*
					{
	"name": "bidTerritory",
	"description": "${card_name}: ${actplayer} may bid units to sacrifice for the new Territory",
	"descriptionmyturn": "${card_name}: ${you} may bid units to sacrifice for the new Territory",
	"type": "activeplayer",
	"args": "argBidTerritory",
	"possibleactions": [
		"bidTerritory"
	],
	"transitions": {
		"bidTerritory": 18,
		"pass": 18
	}
}
					*/
					break;
				case "bidTerritoryNextPlayer":
					/*
					{
	"name": "bidTerritoryNextPlayer",
	"description": "",
	"type": "game",
	"action": "stBidTerritoryNextPlayer",
	"transitions": {
		"endOfBid": 19,
		"nextPlayer": 17,
		"everyonePass": 16
	}
}
					*/
					break;
				case "bidTerritorySendUnit":
					/*
					{
	"name": "bidTerritorySendUnit",
	"description": "${card_name}: ${actplayer} must send at least one military unit in the colonization force (${strength}/${bid} strength points).",
	"descriptionmyturn": "${card_name}: ${you} must send at least one military unit in the colonization force (${strength}/${bid} strength points).",
	"type": "activeplayer",
	"args": "argSacrificeTerritory",
	"action": "stSendColonizationForce",
	"possibleactions": [
		"sacrifice"
	],
	"transitions": {
		"continue": 8,
		"end": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "playerTurnPolitic":
					/*
					{
	"name": "playerTurnPolitic",
	"description": "${actplayer} may do 1 politic action",
	"descriptionmyturn": "${you} may do 1 politic action",
	"type": "activeplayer",
	"args": "argPlayerTurnPolitic",
	"action": "stPlayerTurnPolitic",
	"possibleactions": [
		"politicAction",
		"donothing",
		"concedeGame"
	],
	"transitions": {
		"endAction": 22,
		"donothing": 1101,
		"applyEvent": 15,
		"aggressionOpponentMaySacrifice": 25,
		"pactMayAccept": 29,
		"christopherColumbus": 215,
		"concedeGame": 51,
		"endGameConcede": 99,
		"zombiePass": 1101
	}
}
					*/
					break;
				case "lossBlueToken":
					/*
					{
	"name": "lossBlueToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbrblue} blue token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossBlueToken",
	"possibleactions": [
		"lossBlueToken"
	],
	"transitions": {
		"endEvent": 2201,
		"continue": 22,
		"zombiePass": 2201
	}
}
					*/
					break;
				case "aggressionOpponentDefense":
					/*
					{
	"name": "aggressionOpponentDefense",
	"description": "",
	"type": "game",
	"action": "stAggressionOpponentDefense",
	"transitions": {
		"aggressionMaySacrifice": 27,
		"aggressionResolve": 28
	}
}
					*/
					break;
				case "aggressionMaySacrifice":
					/*
					{
	"name": "aggressionMaySacrifice",
	"description": "${card_name}: ${actplayer} may play or discard up to ${quantity} military cards to defend against the aggression (${strength} strength points needed)",
	"descriptionmyturn": "${card_name}: ${you} may play or discard up to ${quantity} military cards to defend against the aggression (${strength} strength points needed)",
	"type": "activeplayer",
	"args": "argAggressionStrengthDefender",
	"possibleactions": [
		"donothing",
		"discardMilitaryCards",
		"discardToDefend"
	],
	"transitions": {
		"aggressionResolve": 28,
		"donothing": 28,
		"zombiePass": 28
	}
}
					*/
					break;
				case "aggressionResolve":
					/*
					{
	"name": "aggressionResolve",
	"description": "",
	"type": "game",
	"action": "stAggressionResolve",
	"transitions": {
		"end": 22,
		"endWar": 21,
		"lossPopulation": 206,
		"stealFoodResourceChoice": 219,
		"stealFoodResourceChoice5": 228,
		"stealFoodResourceChoice7": 229,
		"chooseBuildingToDestroy": 220,
		"annex": 233,
		"stealTechnology": 236,
		"infiltrate": 240
	}
}
					*/
					break;
				case "pactMayAcceptNext":
					/*
					{
	"name": "pactMayAcceptNext",
	"description": "",
	"type": "game",
	"action": "stPactMayAcceptNext",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "pactMayAccept":
					/*
					{
	"name": "pactMayAccept",
	"description": "${card_name}: ${actplayer} may accept the Pact (as ${a_or_b}) from ${proposer} (as ${b_or_a})",
	"descriptionmyturn": "${card_name}: ${you} may accept the Pact (as ${a_or_b}) from ${proposer} (as ${b_or_a})",
	"type": "activeplayer",
	"args": "argPactMayAccept",
	"possibleactions": [
		"acceptPact"
	],
	"transitions": {
		"acceptPact": 16
	}
}
					*/
					break;
				case "discardMilitaryCards":
					/*
					{
	"name": "discardMilitaryCards",
	"description": "${actplayer} must discard ${nbr} military cards",
	"descriptionmyturn": "${you} must discard ${nbr} military cards",
	"type": "activeplayer",
	"action": "stDiscardMilitaryCards",
	"args": "argDiscardMilitaryCards",
	"possibleactions": [
		"discardMilitaryCards"
	],
	"transitions": {
		"discardMilitaryCards": 50,
		"endEvent": 16,
		"zombiePass": 50,
		"endOfTurn": 50
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"nextFirstPlayer": 9
	}
}
					*/
					break;
				case "concedeGame":
					/*
					{
	"name": "concedeGame",
	"description": "",
	"type": "game",
	"action": "stConcedeGame",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 10,
		"nextFirstPlayer": 9
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
				case "mustBuildCivil":
					/*
					{
	"name": "mustBuildCivil",
	"description": "${card_name}: ${actplayer} must build or upgrade an urban building",
	"descriptionmyturn": "${card_name}: ${you} must build or upgrade an urban building",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"build",
		"upgrade",
		"upgradeChoice",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"buildChoice": 14,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "mustBuildProduction":
					/*
					{
	"name": "mustBuildProduction",
	"description": "${card_name}: ${actplayer} must build or upgrade a mine or farm",
	"descriptionmyturn": "${card_name}: ${you} must build or upgrade a mine or farm",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"build",
		"upgrade",
		"upgradeChoice",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"buildChoice": 14,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "freeWarrior":
					/*
					{
	"name": "freeWarrior",
	"description": "${card_name}: some players may build a Warrior unit for free",
	"descriptionmyturn": "${card_name}: ${you} may build a Warrior unit for free",
	"type": "multipleactiveplayer",
	"args": "argCurrentEffectCard",
	"action": "stBuildForFreeEvent",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "freeTemple":
					/*
					{
	"name": "freeTemple",
	"description": "${card_name}: some players may build a Temple (age A) for free",
	"descriptionmyturn": "${card_name}: ${you} may build a Temple (age A) for free",
	"type": "multipleactiveplayer",
	"args": "argCurrentEffectCard",
	"action": "stBuildForFreeEvent",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "freeFoodResource":
					/*
					{
	"name": "freeFoodResource",
	"description": "${card_name}: some players may gain ${quantity} foods or ${quantity} resources",
	"descriptionmyturn": "${card_name}: ${you} may gain ${quantity} foods or ${quantity} resources",
	"type": "multipleactiveplayer",
	"args": "argGainFoodOrResources",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "mustBuildWonder":
					/*
					{
	"name": "mustBuildWonder",
	"description": "${card_name}: ${actplayer} must build a Wonder step, or cancel",
	"descriptionmyturn": "${card_name}: ${you} must build a Wonder step, or cancel",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"build",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12,
		"1wonderForFree": 12,
		"2wonderForFree": 12,
		"3wonderForFree": 12
	}
}
					*/
					break;
				case "lossPopulation":
					/*
					{
	"name": "lossPopulation",
	"description": "${card_name}: ${actplayer} must choose which yellow token to lost",
	"descriptionmyturn": "${card_name}: ${you} must choose which yellow token to lost",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stLossPopulation",
	"possibleactions": [
		"lossPopulation"
	],
	"transitions": {
		"endEvent": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "lossBuilding":
					/*
					{
	"name": "lossBuilding",
	"description": "${card_name}: ${actplayer} must choose which building to lost",
	"descriptionmyturn": "${card_name}: ${you} must choose which building to lost",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stLossBuilding",
	"possibleactions": [
		"lossBuilding"
	],
	"transitions": {
		"lossBuilding": 16,
		"endEvent": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "mustPlayTechnology":
					/*
					{
	"name": "mustPlayTechnology",
	"description": "${card_name}: ${actplayer} must play a Technology card",
	"descriptionmyturn": "${card_name}: ${you} must play a Technology card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"playCard",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "mustUpgradeBuilding":
					/*
					{
	"name": "mustUpgradeBuilding",
	"description": "${card_name}: ${actplayer} must upgrade a building or cancel",
	"descriptionmyturn": "${card_name}: ${you} must upgrade a building or cancel",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"upgrade",
		"upgradeChoice",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"buildChoice": 210,
		"zombiePass": 12
	}
}
					*/
					break;
				case "buildChoice":
					/*
					{
	"name": "buildChoice",
	"description": "${card_name}: ${actplayer} must choose an action or cancel",
	"descriptionmyturn": "${card_name}: ${you} can:",
	"type": "activeplayer",
	"args": "argBuildChoice",
	"possibleactions": [
		"buildChoice",
		"cancel",
		"upgrade"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "mustBuildMilitary":
					/*
					{
	"name": "mustBuildMilitary",
	"description": "${card_name}: ${actplayer} must build a military unit or cancel",
	"descriptionmyturn": "${card_name}: ${you} must build a military unit or cancel",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"build",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "wonderForFree":
					/*
					{
	"name": "wonderForFree",
	"description": "${card_name}: ${actplayer} may 1 build another stage of Wonder in the same action",
	"descriptionmyturn": "${card_name}: ${you} may 1 build another stage of Wonder in the same action",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stWonderForFree",
	"possibleactions": [
		"wonderForFree",
		"doNotUseEffect"
	],
	"transitions": {
		"endAction": 212,
		"cancel": 12,
		"wonderForFree": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "wonderForFree":
					/*
					{
	"name": "wonderForFree",
	"description": "${card_name}: ${actplayer} may build 2 another stages of Wonder in the same action",
	"descriptionmyturn": "${card_name}: ${you} may build 2 another stages of Wonder in the same action",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stWonderForFree",
	"possibleactions": [
		"wonderForFree",
		"doNotUseEffect"
	],
	"transitions": {
		"endAction": 213,
		"cancel": 12,
		"wonderForFree": 212,
		"zombiePass": 12
	}
}
					*/
					break;
				case "wonderForFree":
					/*
					{
	"name": "wonderForFree",
	"description": "${card_name}: ${actplayer} may build 3 another stages of Wonder in the same action",
	"descriptionmyturn": "${card_name}: ${you} may build 3 another stages of Wonder in the same action",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stWonderForFree",
	"possibleactions": [
		"wonderForFree",
		"doNotUseEffect"
	],
	"transitions": {
		"endAction": 214,
		"cancel": 12,
		"wonderForFree": 213,
		"zombiePass": 12
	}
}
					*/
					break;
				case "christopherColumbus":
					/*
					{
	"name": "christopherColumbus",
	"description": "${card_name}: ${actplayer} must play a Territory card",
	"descriptionmyturn": "${card_name}: ${you} must play a Territory card",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"politicAction",
		"cancel"
	],
	"transitions": {
		"endAction": 16,
		"cancel": 21,
		"zombiePass": 21
	}
}
					*/
					break;
				case "freeFoodResourceCustom":
					/*
					{
	"name": "freeFoodResourceCustom",
	"description": "${card_name}: some players may gain 3 food and/or resources",
	"descriptionmyturn": "${card_name}: ${you} may choose to gain:",
	"type": "multipleactiveplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "lossPopulation":
					/*
					{
	"name": "lossPopulation",
	"description": "${card_name}: ${actplayer} must choose which yellow token to lost",
	"descriptionmyturn": "${card_name}: ${you} must choose which yellow token to lost",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"action": "stLossPopulation",
	"possibleactions": [
		"lossPopulation"
	],
	"transitions": {
		"endEvent": 218,
		"zombiePass": 16
	}
}
					*/
					break;
				case "lossPopulationNext":
					/*
					{
	"name": "lossPopulationNext",
	"description": "",
	"type": "game",
	"action": "stLossPopulationNext",
	"transitions": {
		"next": 217,
		"endEvent": 16
	}
}
					*/
					break;
				case "stealFoodResource":
					/*
					{
	"name": "stealFoodResource",
	"description": "${card_name}: ${actplayer} may choose resources to steal",
	"descriptionmyturn": "${card_name}: ${you} may choose resources to steal:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "destroyBuilding":
					/*
					{
	"name": "destroyBuilding",
	"description": "${card_name}: ${actplayer} must choose an urban building of ${player_name} to destroy",
	"descriptionmyturn": "${card_name}: ${you} must choose an urban building of ${player_name} to destroy",
	"type": "activeplayer",
	"args": "argDestroyBuilding",
	"action": "stDestroyBuilding",
	"possibleactions": [
		"chooseOpponentTableauCard"
	],
	"transitions": {
		"chooseOpponentTableauCard": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "payResourceFood":
					/*
					{
	"name": "payResourceFood",
	"description": "${card_name}: some players must pay 2 foods and/or resources",
	"descriptionmyturn": "${card_name}: ${you} must pay:",
	"type": "multipleactiveplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "lossBlueToken":
					/*
					{
	"name": "lossBlueToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbrblue} blue token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossBlueToken",
	"possibleactions": [
		"lossBlueToken"
	],
	"transitions": {
		"endEvent": 324,
		"continue": 224,
		"zombiePass": 324
	}
}
					*/
					break;
				case "pickCardsFromRow":
					/*
					{
	"name": "pickCardsFromRow",
	"description": "${card_name}: ${actplayer} may pick cards from row (${left} actions left)",
	"descriptionmyturn": "${card_name}: ${you} may pick cards from row (${left} actions left)",
	"type": "activeplayer",
	"args": "argPickCardsFromRow",
	"possibleactions": [
		"pickCard",
		"pickCardsSpecial",
		"donothing"
	],
	"transitions": {
		"endAction": 226,
		"donothing": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "pickCardsFromRowContinue":
					/*
					{
	"name": "pickCardsFromRowContinue",
	"description": "${card_name}: ${actplayer} may pick cards from row (${left} actions left)",
	"descriptionmyturn": "${card_name}: ${you} may pick cards from row (${left} actions left)",
	"type": "activeplayer",
	"args": "argPickCardsFromRow",
	"action": "stPickCardsFromRowContinue",
	"possibleactions": [
		"pickCard",
		"pickCardsSpecial",
		"donothing"
	],
	"transitions": {
		"endAction": 226,
		"donothing": 227,
		"zombiePass": 227
	}
}
					*/
					break;
				case "pickCardsFromRowRefill":
					/*
					{
	"name": "pickCardsFromRowRefill",
	"description": "",
	"type": "game",
	"action": "stPickCardsFromRowRefill",
	"transitions": {
		"refillDone": 16
	}
}
					*/
					break;
				case "stealFoodResource5":
					/*
					{
	"name": "stealFoodResource5",
	"description": "${card_name}: ${actplayer} may choose resources to steal",
	"descriptionmyturn": "${card_name}: ${you} may choose resources to steal:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "stealFoodResource7":
					/*
					{
	"name": "stealFoodResource7",
	"description": "${card_name}: ${actplayer} may choose resources to steal",
	"descriptionmyturn": "${card_name}: ${you} may choose resources to steal:",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice"
	],
	"transitions": {
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "ravagesOfTime":
					/*
					{
	"name": "ravagesOfTime",
	"description": "${card_name}: some players must choose which Wonder to ravage",
	"descriptionmyturn": "${card_name}: ${you} must choose which Wonder to ravage",
	"type": "multipleactiveplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"endEvent": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "destroyBuilding":
					/*
					{
	"name": "destroyBuilding",
	"description": "${card_name}: ${actplayer} must choose an urban building of ${player_name} to destroy",
	"descriptionmyturn": "${card_name}: ${you} must choose an urban building of ${player_name} to destroy",
	"type": "activeplayer",
	"args": "argDestroyBuilding",
	"possibleactions": [
		"chooseOpponentTableauCard"
	],
	"transitions": {
		"chooseOpponentTableauCard": 232,
		"zombiePass": 16
	}
}
					*/
					break;
				case "destroyBuildingNextPlayer":
					/*
					{
	"name": "destroyBuildingNextPlayer",
	"description": "",
	"type": "game",
	"action": "stDestroyBuildingNextPlayer",
	"transitions": {
		"next": 231,
		"end": 16
	}
}
					*/
					break;
				case "annex":
					/*
					{
	"name": "annex",
	"description": "${card_name}: ${actplayer} must choose a territory of ${player_name} to steal",
	"descriptionmyturn": "${card_name}: ${you} must choose a territory of ${player_name} to steal",
	"type": "activeplayer",
	"args": "argDestroyBuilding",
	"possibleactions": [
		"chooseOpponentTableauCard"
	],
	"transitions": {
		"chooseOpponentTableauCard": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "lossColony":
					/*
					{
	"name": "lossColony",
	"description": "${card_name}: ${actplayer} must choose a territory to loose",
	"descriptionmyturn": "${card_name}: ${you} must choose a territory to loose",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard"
	],
	"transitions": {
		"endEvent": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "stealTechnology":
					/*
					{
	"name": "stealTechnology",
	"description": "${card_name}: ${actplayer} may steal a Special technology from ${loser_name} or steal Science",
	"descriptionmyturn": "${card_name}: ${you} may steal a Special technology from ${loser_name} or",
	"type": "activeplayer",
	"args": "argWarOverResources",
	"possibleactions": [
		"chooseOpponentTableauCard",
		"dualChoice"
	],
	"transitions": {
		"chooseOpponentTableauCard": 236,
		"dualChoice": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "developmentOfCivilization":
					/*
					{
	"name": "developmentOfCivilization",
	"description": "${card_name}: some players may either: build a farm, mine or urban building; or develop a technology; or increase their population",
	"descriptionmyturn": "${card_name}: ${you} may either: build a farm, mine or urban building; or develop a technology; or",
	"type": "multipleactiveplayer",
	"args": "argDevelopmentOfCivilization",
	"possibleactions": [
		"increasePopulation",
		"build",
		"playCard",
		"donothing"
	],
	"transitions": {
		"endEvent": 16,
		"donothing": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "homerGiveWonderHappyFace":
					/*
					{
	"name": "homerGiveWonderHappyFace",
	"description": "${card_name}: ${actplayer} may give a Wonder 1 extra happy face",
	"descriptionmyturn": "${card_name}: ${you} may give a Wonder 1 extra happy face",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"chooseCard",
		"doNotUseEffect"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "chooseReservesGain":
					/*
					{
	"name": "chooseReservesGain",
	"description": "${card_name}: ${actplayer} may gain ${quantity} foods or ${quantity} resources",
	"descriptionmyturn": "${card_name}: ${you} may gain ${quantity} foods or ${quantity} resources",
	"type": "activeplayer",
	"args": "argGainFoodOrResources",
	"possibleactions": [
		"dualChoice",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "infiltrate":
					/*
					{
	"name": "infiltrate",
	"description": "${card_name}: ${actplayer} must remove ${player_name}’s leader or unfinished wonder from play",
	"descriptionmyturn": "${card_name}: ${you} must remove ${player_name}’s leader or unfinished wonder from play",
	"type": "activeplayer",
	"args": "argDestroyBuilding",
	"possibleactions": [
		"chooseOpponentTableauCard"
	],
	"transitions": {
		"endAggression": 16,
		"zombiePass": 16
	}
}
					*/
					break;
				case "churchill":
					/*
					{
	"name": "churchill",
	"description": "${card_name}: ${actplayer} may gain 3 culture or 3 science and 3 resources for military purpose",
	"descriptionmyturn": "${card_name}: ${you} may gain 3 culture or 3 science and 3 resources for military purpose",
	"type": "activeplayer",
	"args": "argCurrentEffectCard",
	"possibleactions": [
		"dualChoice",
		"cancel"
	],
	"transitions": {
		"endAction": 12,
		"cancel": 12,
		"zombiePass": 12
	}
}
					*/
					break;
				case "lossYellowToken":
					/*
					{
	"name": "lossYellowToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbryellow} yellow token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossYellowToken",
	"possibleactions": [
		"lossYellowToken"
	],
	"transitions": {
		"endEvent": 16,
		"continue": 324,
		"zombiePass": 16
	}
}
					*/
					break;
				case "adjustPlayerActions":
					/*
					{
	"name": "adjustPlayerActions",
	"description": "",
	"type": "game",
	"action": "stAdjustPlayerActions",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "lossBlueToken":
					/*
					{
	"name": "lossBlueToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbrblue} blue token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossBlueToken",
	"possibleactions": [
		"lossBlueToken"
	],
	"transitions": {
		"endEvent": 1202,
		"continue": 1201,
		"zombiePass": 1202
	}
}
					*/
					break;
				case "lossYellowToken":
					/*
					{
	"name": "lossYellowToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbryellow} yellow token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossYellowToken",
	"possibleactions": [
		"lossYellowToken"
	],
	"transitions": {
		"endEvent": 12,
		"continue": 1202,
		"zombiePass": 12
	}
}
					*/
					break;
				case "lossYellowToken":
					/*
					{
	"name": "lossYellowToken",
	"description": "Some players must choose from where to take token(s)",
	"descriptionmyturn": "${you} must choose from where to take ${nbryellow} yellow token(s)",
	"type": "multipleactiveplayer",
	"args": "argLossTokens",
	"action": "stLossYellowToken",
	"possibleactions": [
		"lossYellowToken"
	],
	"transitions": {
		"endEvent": 2202,
		"continue": 2201,
		"zombiePass": 2202
	}
}
					*/
					break;
				case "playerTurnPolitic":
					/*
					{
	"name": "playerTurnPolitic",
	"description": "${actplayer} may play another political action using Julius Caesar",
	"descriptionmyturn": "${you} may play another political action using Julius Caesar",
	"type": "activeplayer",
	"action": "stPlayerTurnPoliticCaesar",
	"possibleactions": [
		"politicAction",
		"donothing",
		"concedeGame"
	],
	"transitions": {
		"endAction": 22,
		"donothing": 1101,
		"applyEvent": 15,
		"aggressionOpponentMaySacrifice": 25,
		"pactMayAccept": 29,
		"christopherColumbus": 215,
		"concedeGame": 51,
		"endGameConcede": 99,
		"zombiePass": 1101
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
export default throughtheagesnewstory;
