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

const unconditionalsurrender: GamePresence = {
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
		"": 50
	}
}
					*/
					break;
				case "setupGame":
					/*
					{
	"name": "setupGame",
	"type": "game",
	"action": "stSetup",
	"transitions": {
		"setup": 55,
		"nextFaction": 50,
		"nextPhase": 101,
		"trigger": 999
	}
}
					*/
					break;
				case "setup":
					/*
					{
	"name": "setup",
	"type": "activeplayer",
	"args": "argCountrySetup",
	"description": "${faction} finalize game setup",
	"descriptionmyturn": "${you} finalize game setup with ${faction}",
	"possibleactions": [
		"setup",
		"historicalSetup",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 55,
		"done": 50,
		"zombiePass": 50,
		"trigger": 999
	}
}
					*/
					break;
				case "countrySetup":
					/*
					{
	"name": "countrySetup",
	"type": "activeplayer",
	"args": "argCountrySetup",
	"description": "${faction} setup ${country}",
	"descriptionmyturn": "${you} setup ${country} with ${faction}",
	"possibleactions": [
		"setup",
		"historicalSetup",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 56,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "endOfGame":
					/*
					{
	"name": "endOfGame",
	"description": "End of game",
	"type": "game",
	"action": "stEndofGame",
	"transitions": {
		"gameEnd": 99,
		"restart": 50,
		"trigger": 999
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
				case "StartOfTurn":
					/*
					{
	"name": "StartOfTurn",
	"type": "game",
	"action": "stStartOfTurn",
	"transitions": {
		"nextPhase": 200,
		"trigger": 999
	}
}
					*/
					break;
				case "WeatherPhase":
					/*
					{
	"name": "WeatherPhase",
	"type": "game",
	"description": "Weather Phase : Axis faction determines the turn’s weather",
	"action": "stWeatherPhase",
	"transitions": {
		"nextPhase": 250,
		"trigger": 999
	}
}
					*/
					break;
				case "DeclareWarPhase":
					/*
					{
	"name": "DeclareWarPhase",
	"type": "game",
	"description": "Declare War Phase : If allowed, factions may declare war on neutral countries",
	"action": "stDeclareWarPhase",
	"transitions": {
		"declareWar": 260,
		"nextFaction": 250,
		"nextPhase": 300,
		"trigger": 999
	}
}
					*/
					break;
				case "declareWar":
					/*
					{
	"name": "declareWar",
	"type": "activeplayer",
	"args": "argDeclareWar",
	"description": "${faction} may declare war",
	"descriptionmyturn": "${you} may declare war with ${faction}",
	"possibleactions": [
		"declareWarOnFaction",
		"declareWarOnCountry",
		"done",
		"undo"
	],
	"transitions": {
		"continue": 260,
		"done": 250,
		"zombiePass": 250,
		"trigger": 999
	}
}
					*/
					break;
				case "EconomyPhase":
					/*
					{
	"name": "EconomyPhase",
	"type": "game",
	"description": "Economy Phase : Determine production points for each country",
	"action": "stEconomyPhase",
	"transitions": {
		"transferPP": 310,
		"nextFaction": 300,
		"nextPhase": 350,
		"trigger": 999
	}
}
					*/
					break;
				case "transferPP":
					/*
					{
	"name": "transferPP",
	"type": "activeplayer",
	"args": "argTransferPP",
	"description": "${faction} can transfer production points",
	"descriptionmyturn": "${you} can transfer production points with ${faction}",
	"possibleactions": [
		"transferPP",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 310,
		"done": 300,
		"zombiePass": 300,
		"trigger": 999
	}
}
					*/
					break;
				case "StrategicWarfarePhase":
					/*
					{
	"name": "StrategicWarfarePhase",
	"type": "game",
	"description": "Strategic Warfare Phase : Axis faction determines the effect of strategic warfare",
	"action": "stStrategicWarfarePhase",
	"transitions": {
		"nuclearStrike": 355,
		"strategicCombat": 360,
		"nextPhase": 400,
		"trigger": 999
	}
}
					*/
					break;
				case "nuclearStrike":
					/*
					{
	"name": "nuclearStrike",
	"type": "activeplayer",
	"args": "argNuclearStrike",
	"description": "${faction} can do nuclear strike",
	"descriptionmyturn": "${you} can do nuclear strike with ${faction} (${strikes} strikes available)",
	"possibleactions": [
		"nuclearStrike",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 355,
		"done": 400,
		"zombiePass": 400,
		"trigger": 999
	}
}
					*/
					break;
				case "strategicCombat":
					/*
					{
	"name": "strategicCombat",
	"type": "multipleactiveplayer",
	"args": "argStrategicCombat",
	"description": "The fighting factions can choose to commit events",
	"descriptionmyturn": "${you} can choose to commit events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 370,
		"zombiePass": 370,
		"trigger": 999
	}
}
					*/
					break;
				case "strategicCombatResult":
					/*
					{
	"name": "strategicCombatResult",
	"type": "game",
	"action": "stStrategicCombatResult",
	"transitions": {
		"nextFaction": 350,
		"trigger": 999
	}
}
					*/
					break;
				case "StrategicMovementPhase":
					/*
					{
	"name": "StrategicMovementPhase",
	"type": "game",
	"description": "Strategic Movement Phase : An air or ground unit moves using Strategic Movement",
	"action": "stStrategicMovementPhase",
	"transitions": {
		"strategicMovement": 410,
		"nextFaction": 400,
		"nextPhase": 450,
		"trigger": 999
	}
}
					*/
					break;
				case "strategicMovement":
					/*
					{
	"name": "strategicMovement",
	"type": "activeplayer",
	"args": "argStrategicMovement",
	"description": "${faction} can do a strategic movement",
	"descriptionmyturn": "${you} can do a strategic movement with ${faction}",
	"possibleactions": [
		"activationStart",
		"move",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 410,
		"done": 400,
		"zombiePass": 400,
		"trigger": 999
	}
}
					*/
					break;
				case "scenarioSpecific":
					/*
					{
	"name": "scenarioSpecific",
	"type": "activeplayer",
	"args": "argScenarioSpecific",
	"description": "${faction} must do scenario specific action(s)",
	"descriptionmyturn": "${you} must do scenario specific action(s)",
	"possibleactions": [
		"setup",
		"remove",
		"undo"
	],
	"transitions": {
		"done": 998,
		"continue": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "OperationsPhase":
					/*
					{
	"name": "OperationsPhase",
	"type": "game",
	"description": "Operations Phase : Each faction completes both Sub-Phases of the Operations Phase before the next faction starts its Operations Phase",
	"action": "stOperationsPhase",
	"transitions": {
		"actionsSubPhase": 455,
		"nextFaction": 450,
		"nextPhase": 500,
		"trigger": 999
	}
}
					*/
					break;
				case "ActionsSubPhase":
					/*
					{
	"name": "ActionsSubPhase",
	"type": "activeplayer",
	"action": "stActionSubPhase",
	"args": "argActionsSubPhase",
	"description": "Actions Sub-Phase : ${faction} units perform Actions to move and fight",
	"descriptionmyturn": "Actions Sub-Phase : your units perform Actions to move and fight",
	"possibleactions": [
		"undo",
		"specialActionMarker",
		"activationStart",
		"assaultAttack",
		"bombingRun",
		"pass"
	],
	"transitions": {
		"airActions": 1000,
		"groundActions": 2000,
		"navalActions": 3000,
		"assaultAttack": 2300,
		"placeEvent": 5000,
		"nextSubPhase": 460,
		"bombingRun": 1300,
		"zombiePass": 460,
		"amphibiousInvasion": 2500,
		"trigger": 999
	}
}
					*/
					break;
				case "SupplyCheckSubPhase":
					/*
					{
	"name": "SupplyCheckSubPhase",
	"type": "game",
	"description": "Supply Check Sub-Phase : Units trace a supply line",
	"action": "stSupplyCheckSubPhase",
	"transitions": {
		"supplyPhase": 6000,
		"nextPhase": 450,
		"trigger": 999
	}
}
					*/
					break;
				case "NoSupplyPhase":
					/*
					{
	"name": "NoSupplyPhase",
	"type": "game",
	"description": "No Supply Phase : Unsupplied units are reduced in strength or eliminated",
	"action": "stNoSupplyPhase",
	"transitions": {
		"voluntaryElimination": 510,
		"nextFaction": 500,
		"nextPhase": 550,
		"trigger": 999
	}
}
					*/
					break;
				case "voluntaryElimination":
					/*
					{
	"name": "voluntaryElimination",
	"type": "activeplayer",
	"args": "argVoluntaryElimination",
	"description": "${faction} may voluntary eliminate units",
	"descriptionmyturn": "${you} may voluntary eliminate units with ${faction}",
	"possibleactions": [
		"voluntaryElimination",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 510,
		"done": 500,
		"zombiePass": 500,
		"trigger": 999
	}
}
					*/
					break;
				case "ReplacementsPhase":
					/*
					{
	"name": "ReplacementsPhase",
	"type": "game",
	"description": "Replacements Phase : Factions may pay to increase reduced strength ground units to full strength and remove up to two Sorties each from air and naval units",
	"action": "stReplacementsPhase",
	"transitions": {
		"replacements": 560,
		"nextFaction": 550,
		"nextPhase": 600,
		"trigger": 999
	}
}
					*/
					break;
				case "replacements":
					/*
					{
	"name": "replacements",
	"type": "activeplayer",
	"args": "argReplacements",
	"description": "${faction} may improve units",
	"descriptionmyturn": "${you} may improve units with ${faction}",
	"possibleactions": [
		"improve",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 560,
		"done": 550,
		"zombiePass": 550,
		"trigger": 999
	}
}
					*/
					break;
				case "UpgradePhase":
					/*
					{
	"name": "UpgradePhase",
	"type": "game",
	"description": "Upgrade Phase : Units on the map may be replaced by Upgrade units that are in their Faction Card’s Upgrade box",
	"action": "stUpgradePhase",
	"transitions": {
		"upgrades": 610,
		"nextFaction": 600,
		"nextPhase": 650,
		"trigger": 999
	}
}
					*/
					break;
				case "upgrades":
					/*
					{
	"name": "upgrades",
	"type": "activeplayer",
	"args": "argUpgrades",
	"description": "${faction} may upgrade units",
	"descriptionmyturn": "${you} may upgrade units with ${faction}",
	"possibleactions": [
		"upgrade",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 610,
		"USSRMotorizedGuards": 615,
		"done": 600,
		"zombiePass": 600,
		"trigger": 999
	}
}
					*/
					break;
				case "USSRMotorizedGuards":
					/*
					{
	"name": "USSRMotorizedGuards",
	"type": "activeplayer",
	"args": "argUSSRMotorizedGuards",
	"description": "${faction} may upgrade units",
	"descriptionmyturn": "${you} must eliminate a USSR infantry unit for upgrading to USSR Motorized Guards",
	"possibleactions": [
		"eliminate",
		"undo"
	],
	"transitions": {
		"continue": 610,
		"zombiePass": 610,
		"trigger": 999
	}
}
					*/
					break;
				case "MobilizationPhase":
					/*
					{
	"name": "MobilizationPhase",
	"type": "game",
	"description": "Mobilization Phase : Factions may pay to take units in their Faction Card’s Mobilization box and place them onto the map",
	"action": "stMobilizationPhase",
	"transitions": {
		"mobilization": 660,
		"nextFaction": 650,
		"nextPhase": 700,
		"trigger": 999
	}
}
					*/
					break;
				case "mobilization":
					/*
					{
	"name": "mobilization",
	"type": "activeplayer",
	"args": "argMobilization",
	"description": "${faction} may mobilize units",
	"descriptionmyturn": "${you} may mobilize units with ${faction}",
	"possibleactions": [
		"setup",
		"surpriseAttack",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 660,
		"done": 650,
		"zombiePass": 650,
		"trigger": 999
	}
}
					*/
					break;
				case "DiplomacyPhase":
					/*
					{
	"name": "DiplomacyPhase",
	"type": "game",
	"description": "Diplomacy Phase : Factions work with diplomacy related event markers",
	"action": "stDiplomacyPhase",
	"transitions": {
		"diplomacy": 710,
		"nextFaction": 700,
		"nextPhase": 750,
		"trigger": 999
	}
}
					*/
					break;
				case "diplomacy":
					/*
					{
	"name": "diplomacy",
	"type": "activeplayer",
	"args": "argDiplomacy",
	"description": "${faction} may pull or put marker in diplomacy cup",
	"descriptionmyturn": "${you} may pull or put marker in diplomacy cup with ${faction}",
	"possibleactions": [
		"pull",
		"put",
		"done",
		"undo"
	],
	"transitions": {
		"done": 700,
		"zombiePass": 700,
		"trigger": 999
	}
}
					*/
					break;
				case "areaSeized":
					/*
					{
	"name": "areaSeized",
	"type": "activeplayer",
	"args": "argAreaSeized",
	"action": "stAreaSeized",
	"description": "A disputed area is claimed by USSR",
	"descriptionmyturn": "USSR claims a disputed area",
	"possibleactions": [
		"seize",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "politicalSuccess":
					/*
					{
	"name": "politicalSuccess",
	"type": "activeplayer",
	"args": "argPoliticalSuccess",
	"action": "stPoliticalSuccess",
	"description": "Political Success of ${conditionalFaction}",
	"descriptionmyturn": "${you} have a Political Success with ${conditionalFaction}",
	"possibleactions": [
		"pro",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "politicalRestricted":
					/*
					{
	"name": "politicalRestricted",
	"type": "activeplayer",
	"args": "argPoliticalRestricted",
	"action": "stPoliticalRestricted",
	"description": "Restricted Political Success of ${conditionalFaction}",
	"descriptionmyturn": "${you} have a Restricted Political Success with ${conditionalFaction}",
	"possibleactions": [
		"pro",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "politicalFailure":
					/*
					{
	"name": "politicalFailure",
	"type": "activeplayer",
	"args": "argPoliticalFailure",
	"action": "stPoliticalFailure",
	"description": "Political Failure from ${faction}",
	"descriptionmyturn": "Political Failure from ${faction} with ${conditionalFaction}",
	"possibleactions": [
		"pro",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "politicalUnrestricted":
					/*
					{
	"name": "politicalUnrestricted",
	"type": "activeplayer",
	"args": "argPoliticalUnrestricted",
	"action": "stPoliticalUnrestricted",
	"description": "Unrestricted Political Success of ${conditionalFaction}",
	"descriptionmyturn": "${you} have an Unrestricted Political Success with ${conditionalFaction}",
	"possibleactions": [
		"pro",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "VictoryCheckPhase":
					/*
					{
	"name": "VictoryCheckPhase",
	"type": "game",
	"description": "Victory Check Phase : Check if Victory Conditions have been achieved",
	"action": "stVictoryCheckPhase",
	"transitions": {
		"nextPhase": 800,
		"gameEnd": 98,
		"trigger": 999
	}
}
					*/
					break;
				case "EndofTurnPhase":
					/*
					{
	"name": "EndofTurnPhase",
	"type": "game",
	"description": "End of Turn Phase : Advance the Turn marker one turn. Place counters from the new Turn box in their respective locations. Move all units in a Faction Card’s Eliminated Box to its Mobilization Box",
	"action": "stEndofTurnPhase",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 101,
		"gameEnd": 98,
		"trigger": 999
	}
}
					*/
					break;
				case "specialMobilization":
					/*
					{
	"name": "specialMobilization",
	"type": "activeplayer",
	"args": "argspecialMobilization",
	"description": "${faction} may mobilize units",
	"descriptionmyturn": "${you} may mobilize units with ${faction}",
	"possibleactions": [
		"setup",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 900,
		"done": 101,
		"zombiePass": 101,
		"trigger": 999
	}
}
					*/
					break;
				case "pop":
					/*
					{
	"name": "pop",
	"type": "game",
	"action": "stPopEvent",
	"transitions": {
		"countrySetup": 56,
		"StartOfTurn": 101,
		"declareWar": 260,
		"strategicMovement": 410,
		"OperationsPhase": 450,
		"ActionsSubPhase": 455,
		"DiplomacyPhase": 700,
		"politicalSuccess": 730,
		"politicalRestricted": 735,
		"politicalFailure": 740,
		"politicalUnrestricted": 745,
		"groundActions": 2000,
		"navalActions": 3000,
		"airActions": 1000,
		"supplyPhase": 6000,
		"seaSupply": 6200,
		"mobileAttackRetreatOut": 2232,
		"mobileAttackAdvance": 2240,
		"amphibiousInvasion": 2500,
		"amphibiousInvasionEnd": 2510,
		"airStrike": 1205,
		"interception": 3100,
		"bombingRun": 1300,
		"westInvaded": 4000,
		"eastInvaded": 4100,
		"mediterraneanCrisis": 4200,
		"northernBorder": 4300,
		"southernBorder": 4400,
		"conditional": 4500,
		"repatriation": 4600,
		"push": 999,
		"pop": 998,
		"setupGame": 50,
		"setup": 55,
		"WeatherPhase": 200,
		"DeclareWarPhase": 250,
		"EconomyPhase": 300,
		"transferPP": 310,
		"StrategicWarfarePhase": 350,
		"nuclearStrike": 355,
		"strategicCombat": 360,
		"strategicCombatResult": 370,
		"StrategicMovementPhase": 400,
		"scenarioSpecific": 420,
		"SupplyCheckSubPhase": 460,
		"NoSupplyPhase": 500,
		"voluntaryElimination": 510,
		"ReplacementsPhase": 550,
		"replacements": 560,
		"UpgradePhase": 600,
		"upgrades": 610,
		"USSRMotorizedGuards": 615,
		"MobilizationPhase": 650,
		"mobilization": 660,
		"diplomacy": 710,
		"areaSeized": 720,
		"VictoryCheckPhase": 750,
		"EndofTurnPhase": 800,
		"specialMobilization": 900,
		"airCombat": 1100,
		"airCombatResult": 1120,
		"escortStrike": 1200,
		"interceptionCombat": 1202,
		"escortCombatResult": 1203,
		"airStrikeCombat": 1210,
		"airStrikeResult": 1220,
		"enterFort": 2050,
		"displacement": 2100,
		"mobileAttack": 2200,
		"groundCombat": 2210,
		"groundCombatResult": 2220,
		"mobileAttackRetreatIn": 2230,
		"mobileAttackRetreat": 2231,
		"assaultAttack": 2300,
		"mulberry": 2540,
		"navalRebaseAfterInvasion": 2550,
		"convoyChoice": 2750,
		"checkEscort": 3125,
		"escort": 3150,
		"interceptionCombat2": 3200,
		"interceptionCombatResult": 3220,
		"abortInvasion": 3250,
		"emergencyShipping": 4550,
		"homeDefenseNotSatisfied": 4700,
		"homeDefenseNotSatisfiedCheck": 4710,
		"placeEvent": 5000,
		"placeEvent2": 5010,
		"groundSupply": 6100,
		"trigger": 999,
		"endOfGame": 98
	}
}
					*/
					break;
				case "push":
					/*
					{
	"name": "push",
	"type": "game",
	"action": "stPushEvent",
	"transitions": {
		"StartOfTurn": 101,
		"countrySetup": 56,
		"scenarioSpecific": 420,
		"areaSeized": 720,
		"politicalSuccess": 730,
		"politicalRestricted": 735,
		"politicalFailure": 740,
		"politicalUnrestricted": 745,
		"escortStrike": 1200,
		"enterFort": 2050,
		"displacement": 2100,
		"interception": 3100,
		"escort": 3150,
		"abortInvasion": 3250,
		"repatriation": 4600,
		"westInvaded": 4000,
		"eastInvaded": 4100,
		"mediterraneanCrisis": 4200,
		"northernBorder": 4300,
		"southernBorder": 4400,
		"gameEnd": 98,
		"setupGame": 50,
		"setup": 55,
		"WeatherPhase": 200,
		"DeclareWarPhase": 250,
		"declareWar": 260,
		"EconomyPhase": 300,
		"transferPP": 310,
		"StrategicWarfarePhase": 350,
		"nuclearStrike": 355,
		"strategicCombat": 360,
		"strategicCombatResult": 370,
		"StrategicMovementPhase": 400,
		"strategicMovement": 410,
		"OperationsPhase": 450,
		"ActionsSubPhase": 455,
		"SupplyCheckSubPhase": 460,
		"NoSupplyPhase": 500,
		"voluntaryElimination": 510,
		"ReplacementsPhase": 550,
		"replacements": 560,
		"UpgradePhase": 600,
		"upgrades": 610,
		"USSRMotorizedGuards": 615,
		"MobilizationPhase": 650,
		"mobilization": 660,
		"DiplomacyPhase": 700,
		"diplomacy": 710,
		"VictoryCheckPhase": 750,
		"EndofTurnPhase": 800,
		"specialMobilization": 900,
		"airActions": 1000,
		"groundActions": 2000,
		"navalActions": 3000,
		"airCombat": 1100,
		"airCombatResult": 1120,
		"interceptionCombat": 1202,
		"escortCombatResult": 1203,
		"airStrike": 1205,
		"airStrikeCombat": 1210,
		"airStrikeResult": 1220,
		"bombingRun": 1300,
		"mobileAttack": 2200,
		"groundCombat": 2210,
		"groundCombatResult": 2220,
		"mobileAttackRetreatIn": 2230,
		"mobileAttackRetreat": 2231,
		"mobileAttackRetreatOut": 2232,
		"mobileAttackAdvance": 2240,
		"assaultAttack": 2300,
		"amphibiousInvasion": 2500,
		"amphibiousInvasionEnd": 2510,
		"mulberry": 2540,
		"navalRebaseAfterInvasion": 2550,
		"convoyChoice": 2750,
		"checkEscort": 3125,
		"interceptionCombat2": 3200,
		"interceptionCombatResult": 3220,
		"conditional": 4500,
		"emergencyShipping": 4550,
		"homeDefenseNotSatisfied": 4700,
		"homeDefenseNotSatisfiedCheck": 4710,
		"placeEvent": 5000,
		"placeEvent2": 5010,
		"supplyPhase": 6000,
		"groundSupply": 6100,
		"seaSupply": 6200,
		"pop": 998,
		"trigger": 999,
		"push": 999,
		"endOfGame": 98
	}
}
					*/
					break;
				case "airActions":
					/*
					{
	"name": "airActions",
	"type": "activeplayer",
	"args": "argAirActions",
	"action": "stAirActions",
	"description": "${actplayer} is doing air movement (${MP} MP remaining)",
	"descriptionmyturn": "${you} can move with this air unit (${MP} MP remaining)",
	"possibleactions": [
		"undo",
		"move",
		"navalTransport",
		"airStrike",
		"bombingRun",
		"activationEnd"
	],
	"transitions": {
		"convoyChoice": 2750,
		"nextAction": 1000,
		"airStrike": 1205,
		"bombingRun": 1300,
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "airCombat":
					/*
					{
	"name": "airCombat",
	"type": "multipleactiveplayer",
	"args": "argNavalAirCombat",
	"description": "The fighting factions can choose to commit events",
	"descriptionmyturn": "${you} can choose to commit events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 1120,
		"zombiePass": 1120,
		"trigger": 999
	}
}
					*/
					break;
				case "airCombatResult":
					/*
					{
	"name": "airCombatResult",
	"type": "game",
	"action": "stNavalAirCombatResult",
	"transitions": {
		"continue": 2220,
		"trigger": 999
	}
}
					*/
					break;
				case "escortStrike":
					/*
					{
	"name": "escortStrike",
	"type": "activeplayer",
	"args": "argEscort",
	"description": "${nonPhasing} is choosing an escort",
	"descriptionmyturn": "${you} are selecting an escort with ${nonPhasing}",
	"possibleactions": [
		"escort",
		"continue",
		"undo"
	],
	"transitions": {
		"escort": 1202,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "interceptionCombat":
					/*
					{
	"name": "interceptionCombat",
	"type": "multipleactiveplayer",
	"args": "argNavalAirCombat",
	"description": "The fighting factions can choose to commit events",
	"descriptionmyturn": "${you} can choose to commit events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 1203,
		"zombiePass": 1203,
		"trigger": 999
	}
}
					*/
					break;
				case "escortCombatResult":
					/*
					{
	"name": "escortCombatResult",
	"type": "game",
	"action": "stNavalAirCombatResult",
	"transitions": {
		"continue": 1200,
		"activationEnd": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "airStrike":
					/*
					{
	"name": "airStrike",
	"type": "activeplayer",
	"args": "argNavalAirCombat",
	"description": "${actplayer} is considering an air strike",
	"descriptionmyturn": "${you} consider an air strike",
	"possibleactions": [
		"undo",
		"confirm"
	],
	"transitions": {
		"continue": 1210,
		"zombiePass": 1210,
		"trigger": 999
	}
}
					*/
					break;
				case "airStrikeCombat":
					/*
					{
	"name": "airStrikeCombat",
	"type": "multipleactiveplayer",
	"args": "argNavalAirCombat",
	"description": "The fighting factions can choose to commit events",
	"descriptionmyturn": "${you} can choose to commit events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 1220,
		"zombiePass": 1220,
		"trigger": 999
	}
}
					*/
					break;
				case "airStrikeResult":
					/*
					{
	"name": "airStrikeResult",
	"type": "game",
	"action": "stNavalAirCombatResult",
	"transitions": {
		"activationEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "bombingRun":
					/*
					{
	"name": "bombingRun",
	"type": "activeplayer",
	"args": "argBombingRun",
	"description": "${actplayer} is considering a bombing run",
	"descriptionmyturn": "${you} consider a bombing run (${MP} MP remaining)",
	"possibleactions": [
		"undo",
		"bomb"
	],
	"transitions": {
		"continue": 1300,
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "groundActions":
					/*
					{
	"name": "groundActions",
	"type": "activeplayer",
	"args": "argGroundActions",
	"action": "stGroundActions",
	"description": "${actplayer} is doing ground movement (${MP} MP remaining)",
	"descriptionmyturn": "${you} can move or attack with this ground unit (${MP} MP remaining)",
	"possibleactions": [
		"undo",
		"move",
		"fort",
		"mobileAttack",
		"declareAssault",
		"navalTransport",
		"activationEnd"
	],
	"transitions": {
		"convoyChoice": 2750,
		"nextAction": 2000,
		"amphibiousInvasion": 2500,
		"mobileAttack": 2200,
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "enterFort":
					/*
					{
	"name": "enterFort",
	"type": "activeplayer",
	"args": "argFort",
	"description": "${actplayer} can enter a fortification",
	"descriptionmyturn": "${you} can enter a fortification",
	"possibleactions": [
		"enter",
		"done",
		"undo"
	],
	"transitions": {
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "displacement":
					/*
					{
	"name": "displacement",
	"type": "activeplayer",
	"args": "argDisplacement",
	"description": "${actplayer} must evacuate air/naval unit from hex ${location}",
	"descriptionmyturn": "${you} must evacuate air/naval unit from hex ${location}",
	"possibleactions": [
		"move",
		"eliminate",
		"undo"
	],
	"transitions": {
		"nextUnit": 2100,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "mobileAttack":
					/*
					{
	"name": "mobileAttack",
	"type": "activeplayer",
	"args": "argMobileAttack",
	"description": "${actplayer} is considering an attack",
	"descriptionmyturn": "${you} consider an attack",
	"possibleactions": [
		"undo",
		"confirm"
	],
	"transitions": {
		"continue": 2210,
		"zombiePass": 2210,
		"trigger": 999
	}
}
					*/
					break;
				case "groundCombat":
					/*
					{
	"name": "groundCombat",
	"type": "multipleactiveplayer",
	"args": "argMobileAttack",
	"description": "The fighting factions can choose to commit an air unit or events",
	"descriptionmyturn": "${you} can choose to commit an air unit or events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 2220,
		"zombiePass": 2220,
		"trigger": 999
	}
}
					*/
					break;
				case "groundCombatResult":
					/*
					{
	"name": "groundCombatResult",
	"type": "game",
	"action": "stGroundCombatResult",
	"transitions": {
		"continue": 2000,
		"airCombat": 1100,
		"retreat": 2230,
		"advance": 2240,
		"amphibiousInvasion": 2500,
		"activationEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "mobileAttackRetreatIn":
					/*
					{
	"name": "mobileAttackRetreatIn",
	"type": "game",
	"action": "stMobileAttackRetreatIn",
	"transitions": {
		"retreat": 2231,
		"advance": 2240,
		"continue": 2000,
		"amphibiousInvasion": 2500,
		"activationEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "mobileAttackRetreat":
					/*
					{
	"name": "mobileAttackRetreat",
	"type": "activeplayer",
	"description": "${actplayer} is retreating",
	"descriptionmyturn": "${you} must retreat",
	"args": "argRetreat",
	"possibleactions": [
		"retreat",
		"navalEvac",
		"undo"
	],
	"transitions": {
		"navalEvac": 2231,
		"continue": 2232,
		"zombiePass": 2232,
		"trigger": 999
	}
}
					*/
					break;
				case "mobileAttackRetreatOut":
					/*
					{
	"name": "mobileAttackRetreatOut",
	"type": "game",
	"action": "stMobileAttackRetreatOut",
	"transitions": {
		"advance": 2240,
		"nextAction": 2000,
		"activationEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "mobileAttackAdvance":
					/*
					{
	"name": "mobileAttackAdvance",
	"type": "activeplayer",
	"args": "argAdvance",
	"description": "${actplayer} is doing advance after combat",
	"descriptionmyturn": "${you} can advance after combat",
	"possibleactions": [
		"move",
		"advance",
		"undo"
	],
	"transitions": {
		"nextAction": 2000,
		"amphibiousInvasion": 2500,
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "assaultAttack":
					/*
					{
	"name": "assaultAttack",
	"type": "game",
	"action": "stAssaultAttack",
	"transitions": {
		"continue": 2200,
		"advance": 2240,
		"trigger": 999
	}
}
					*/
					break;
				case "amphibiousInvasion":
					/*
					{
	"name": "amphibiousInvasion",
	"type": "game",
	"action": "stAmphibiousInvasion",
	"transitions": {
		"amphibiousInvasion": 2500,
		"nextAction": 2000,
		"assault": 2200,
		"advance": 2000,
		"activationEnd": 2510,
		"trigger": 999
	}
}
					*/
					break;
				case "amphibiousInvasionEnd":
					/*
					{
	"name": "amphibiousInvasionEnd",
	"type": "game",
	"action": "stAmphibiousInvasionEnd",
	"transitions": {
		"mulberry": 2540,
		"navalRebaseAfterInvasion": 2550,
		"invasionEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "mulberry":
					/*
					{
	"name": "mulberry",
	"type": "activeplayer",
	"args": "argPlaceEvent",
	"description": "${actplayer} is placing a ${marker} marker",
	"descriptionmyturn": "${you} can place a ${marker} marker",
	"possibleactions": [
		"place",
		"done",
		"undo"
	],
	"transitions": {
		"nextAction": 2550,
		"done": 2550,
		"zombiePass": 2550,
		"trigger": 999
	}
}
					*/
					break;
				case "navalRebaseAfterInvasion":
					/*
					{
	"name": "navalRebaseAfterInvasion",
	"type": "activeplayer",
	"args": "argNavalRebaseAfterInvasion",
	"description": "${actplayer} is rebasing invasion fleet",
	"descriptionmyturn": "${you} can rebase invasion fleet",
	"possibleactions": [
		"move",
		"undo"
	],
	"transitions": {
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "convoyChoice":
					/*
					{
	"name": "convoyChoice",
	"type": "activeplayer",
	"args": "argConvoyChoice",
	"description": "${actplayer} is choosing a convoy",
	"descriptionmyturn": "${you} can select a convoy",
	"possibleactions": [
		"select",
		"undo"
	],
	"transitions": {
		"activationEnd": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "navalActions":
					/*
					{
	"name": "navalActions",
	"type": "activeplayer",
	"args": "argNavalActions",
	"action": "stNavalActions",
	"description": "${actplayer} is doing naval movement (${MP} MP remaining)",
	"descriptionmyturn": "${you} can move with this naval unit (${MP} MP remaining)",
	"possibleactions": [
		"undo",
		"move",
		"navalPath",
		"airStrike",
		"invade",
		"escort",
		"amphibiousInvasion",
		"activationEnd"
	],
	"transitions": {
		"amphibiousInvasion": 2500,
		"nextAction": 3000,
		"airStrike": 1205,
		"activationEnd": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "interception":
					/*
					{
	"name": "interception",
	"type": "activeplayer",
	"args": "argInterception",
	"action": "stInterception",
	"description": "${nonPhasing} is considering intercepting ${faction} action",
	"descriptionmyturn": "${you} consider intercepting ${faction} with ${nonPhasing}",
	"possibleactions": [
		"intercept",
		"place",
		"done",
		"undo"
	],
	"transitions": {
		"intercept": 3125,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "checkEscort":
					/*
					{
	"name": "checkEscort",
	"type": "game",
	"action": "stCheckEscort",
	"possibleactions": [
		"intercept",
		"undo"
	],
	"transitions": {
		"escort": 999,
		"intercept": 3200,
		"trigger": 999
	}
}
					*/
					break;
				case "escort":
					/*
					{
	"name": "escort",
	"type": "activeplayer",
	"args": "argInterception",
	"action": "stInterception",
	"description": "${faction} is choosing escort",
	"descriptionmyturn": "${you} are selecting escort with ${faction}",
	"possibleactions": [
		"intercept",
		"undo"
	],
	"transitions": {
		"intercept": 3200,
		"zombiePass": 3200,
		"trigger": 999
	}
}
					*/
					break;
				case "interceptionCombat2":
					/*
					{
	"name": "interceptionCombat2",
	"type": "multipleactiveplayer",
	"args": "argNavalAirCombat",
	"description": "The fighting factions can choose to commit events",
	"descriptionmyturn": "${you} can choose to commit events",
	"possibleactions": [
		"commit"
	],
	"transitions": {
		"continue": 3220,
		"zombiePass": 3220,
		"trigger": 999
	}
}
					*/
					break;
				case "interceptionCombatResult":
					/*
					{
	"name": "interceptionCombatResult",
	"type": "game",
	"action": "stNavalAirCombatResult",
	"transitions": {
		"continue": 3100,
		"returnToPort": 998,
		"activationEnd": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "abortInvasion":
					/*
					{
	"name": "abortInvasion",
	"type": "activeplayer",
	"args": "argAbortInvasion",
	"description": "${faction} can choose to abort amphibious invasion",
	"descriptionmyturn": "${you} can choose to abort amphibious invasion",
	"possibleactions": [
		"abort",
		"undo"
	],
	"transitions": {
		"continue": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "westInvaded":
					/*
					{
	"name": "westInvaded",
	"type": "game",
	"action": "stWestInvaded",
	"transitions": {
		"continue": 4000,
		"setup": 4500,
		"trigger": 999
	}
}
					*/
					break;
				case "eastInvaded":
					/*
					{
	"name": "eastInvaded",
	"type": "game",
	"action": "stEastInvaded",
	"transitions": {
		"continue": 4100,
		"setup": 4500,
		"trigger": 999
	}
}
					*/
					break;
				case "mediterraneanCrisis":
					/*
					{
	"name": "mediterraneanCrisis",
	"type": "game",
	"action": "stMediterraneanCrisis",
	"transitions": {
		"continue": 4200,
		"setup": 4500,
		"trigger": 999
	}
}
					*/
					break;
				case "northernBorder":
					/*
					{
	"name": "northernBorder",
	"type": "game",
	"action": "stNorthernBorder",
	"transitions": {
		"continue": 4300,
		"setup": 4500,
		"trigger": 999
	}
}
					*/
					break;
				case "southernBorder":
					/*
					{
	"name": "southernBorder",
	"type": "game",
	"action": "stSouthernBorder",
	"transitions": {
		"continue": 4400,
		"setup": 4500,
		"trigger": 999
	}
}
					*/
					break;
				case "conditional":
					/*
					{
	"name": "conditional",
	"type": "activeplayer",
	"args": "argConditional",
	"description": "${faction} may mobilize units",
	"descriptionmyturn": "${you} may mobilize units with ${faction}",
	"possibleactions": [
		"setup",
		"undo",
		"done"
	],
	"transitions": {
		"emergencyShipping": 4550,
		"continue": 4500,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "emergencyShipping":
					/*
					{
	"name": "emergencyShipping",
	"type": "activeplayer",
	"args": "argEmergencyShipping",
	"description": "${faction} is doing emergency shipping",
	"descriptionmyturn": "Emergency shipping: ${you} may take one UK convoy unit and/or one French convoy unit from any port and put it in a friendly port in a UK or France: Overseas Area",
	"possibleactions": [
		"setup",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 4550,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "repatriation":
					/*
					{
	"name": "repatriation",
	"type": "activeplayer",
	"args": "argRepatriation",
	"description": "${faction} must repatriate unit(s)",
	"descriptionmyturn": "${you} must repatriate unit(s) with ${faction}",
	"possibleactions": [
		"repatriate",
		"eliminate",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 4600,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "homeDefenseNotSatisfied":
					/*
					{
	"name": "homeDefenseNotSatisfied",
	"type": "activeplayer",
	"args": "argHomeDefenseNotSatisfied",
	"description": "${faction} must repatriate unit(s) to satisfy home defense",
	"descriptionmyturn": "${you} must repatriate unit(s) with ${faction} to satisfy home defense of ${countries}",
	"possibleactions": [
		"repatriate",
		"undo",
		"done"
	],
	"transitions": {
		"continue": 4700,
		"check": 4710,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "homeDefenseNotSatisfiedCheck":
					/*
					{
	"name": "homeDefenseNotSatisfiedCheck",
	"type": "multipleactiveplayer",
	"args": "argHomeDefenseNotSatisfiedCheck",
	"action": "stHomeDefenseNotSatisfiedCheck",
	"description": "Players must agree with home defense not satisfied by ${faction}",
	"descriptionmyturn": "${you} must agree with home defense not satisfied by ${faction}",
	"possibleactions": [
		"check"
	],
	"transitions": {
		"continue": 4700,
		"done": 998,
		"zombiePass": 998,
		"trigger": 999
	}
}
					*/
					break;
				case "placeEvent":
					/*
					{
	"name": "placeEvent",
	"type": "activeplayer",
	"args": "argPlaceEvent",
	"description": "${actplayer} is placing a ${marker} marker",
	"descriptionmyturn": "${you} can place a ${marker} marker",
	"possibleactions": [
		"place",
		"undo",
		"continue"
	],
	"transitions": {
		"inSeaZone": 5010,
		"continue": 5000,
		"nextAction": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "placeEvent2":
					/*
					{
	"name": "placeEvent2",
	"type": "activeplayer",
	"args": "argInSeaZone",
	"description": "${actplayer} is placing a ${marker} marker",
	"descriptionmyturn": "${you} can place a ${marker} marker",
	"possibleactions": [
		"place",
		"undo",
		"continue"
	],
	"transitions": {
		"continue": 5000,
		"nextAction": 455,
		"zombiePass": 455,
		"trigger": 999
	}
}
					*/
					break;
				case "supplyPhase":
					/*
					{
	"name": "supplyPhase",
	"type": "activeplayer",
	"args": "argSupplyPhase",
	"action": "stSupplyPhase",
	"description": "${faction} traces supply lines",
	"descriptionmyturn": "${you} can trace supply lines with ${faction}",
	"possibleactions": [
		"activationStart",
		"uss",
		"lss",
		"nosupply",
		"undo",
		"done"
	],
	"transitions": {
		"groundActions": 6100,
		"airActions": 6100,
		"navalActions": 6200,
		"continue": 6000,
		"done": 450,
		"nextPhase": 450,
		"zombiePass": 450,
		"trigger": 999
	}
}
					*/
					break;
				case "groundSupply":
					/*
					{
	"name": "groundSupply",
	"type": "activeplayer",
	"args": "argGroundSupply",
	"description": "${faction} traces ground supply lines",
	"descriptionmyturn": "${you} can trace a ground supply line with ${faction}",
	"possibleactions": [
		"activationStart",
		"convoy",
		"supply",
		"uss",
		"lss",
		"nosupply",
		"undo"
	],
	"transitions": {
		"nextAction": 6100,
		"navalActions": 6200,
		"activationEnd": 6000,
		"zombiePass": 6000,
		"trigger": 999
	}
}
					*/
					break;
				case "seaSupply":
					/*
					{
	"name": "seaSupply",
	"type": "activeplayer",
	"args": "argSeaSupply",
	"action": "stSeaSupply",
	"description": "${faction} traces sea supply lines",
	"descriptionmyturn": "${you} can trace a sea supply line with ${faction}",
	"possibleactions": [
		"undo",
		"escort",
		"move",
		"navalPath",
		"activationEnd",
		"uss",
		"nosupply",
		"undo"
	],
	"transitions": {
		"nextAction": 6200,
		"groundSupply": 6100,
		"activationEnd": 6000,
		"zombiePass": 6000,
		"trigger": 999
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
export default unconditionalsurrender;
