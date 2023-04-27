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

const quantum: GamePresence = {
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
		"firstReconfigure": 2
	},
	"descriptionmyturn": "&nbsp;"
}
					*/
					break;
				case "_choicefirstReconfigure":
					/*
					{
	"name": "_choicefirstReconfigure",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstConstruct": 3,
		"_choice": 55
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstConstruct":
					/*
					{
	"name": "_choicefirstConstruct",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstConstruct": 3,
		"firstDeploy": 4,
		"_choice": 56
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstDeploy":
					/*
					{
	"name": "_choicefirstDeploy",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstDeploy": 4,
		"firstDeployShip": 5,
		"firstDeployDest": 6,
		"firstRepositionShip": 7,
		"firstRepositionDest": 8,
		"startTurn": 9,
		"_choice": 57
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstDeployShip":
					/*
					{
	"name": "_choicefirstDeployShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstDeployDest": 6,
		"_choice": 58
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstDeployDest":
					/*
					{
	"name": "_choicefirstDeployDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstDeploy": 4,
		"_choice": 59
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstRepositionShip":
					/*
					{
	"name": "_choicefirstRepositionShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstRepositionDest": 8,
		"firstDeploy": 4,
		"_choice": 60
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicefirstRepositionDest":
					/*
					{
	"name": "_choicefirstRepositionDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"firstDeploy": 4,
		"_choice": 61
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "startTurn":
					/*
					{
	"name": "startTurn",
	"transitions": {
		"chooseAction": 11
	},
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"transitions": {
		"startTurn": 9,
		"chooseAction": 11
	},
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseAction":
					/*
					{
	"name": "_choicechooseAction",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"reconfigure": 13,
		"deployShip": 14,
		"deployDest": 15,
		"moveShip": 16,
		"moveDest": 17,
		"construct": 25,
		"ability": 26,
		"transportOut": 29,
		"infamy": 33,
		"chooseCard": 34,
		"chooseReconfigure": 42,
		"useFlexibleShip": 45,
		"useResourcefulShip": 47,
		"useNomadicShip": 48,
		"gameStats": 50,
		"_choice": 62
	},
	"updateGameProgression": true,
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseShipAction":
					/*
					{
	"name": "_choicechooseShipAction",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"deployDest": 15,
		"moveDest": 17,
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"strikeDest": 27,
		"transportInShip": 28,
		"warpDest": 30,
		"warpOrTransport": 31,
		"modifyInto": 32,
		"chooseReconfigure": 42,
		"useFlexibleInto": 46,
		"useNomadicDest": 49,
		"chooseAction": 11,
		"_choice": 63
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicereconfigure":
					/*
					{
	"name": "_choicereconfigure",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"_choice": 64
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicedeployShip":
					/*
					{
	"name": "_choicedeployShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"deployDest": 15,
		"chooseAction": 11,
		"_choice": 65
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicedeployDest":
					/*
					{
	"name": "_choicedeployDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"deployShip": 14,
		"_choice": 66
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicemoveShip":
					/*
					{
	"name": "_choicemoveShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"moveDest": 17,
		"chooseAction": 11,
		"_choice": 67
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicemoveDest":
					/*
					{
	"name": "_choicemoveDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"moveDest": 17,
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"transportInShip": 28,
		"transportOut": 29,
		"chooseAction": 11,
		"moveShip": 16,
		"_choice": 68
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicemultipleTargetShip":
					/*
					{
	"name": "_choicemultipleTargetShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"chooseAction": 11,
		"chooseShipAction": 12,
		"moveShip": 16,
		"moveDest": 17,
		"_choice": 69
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceallowDangerous":
					/*
					{
	"name": "_choiceallowDangerous",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"rollAttackDice": 20,
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"_choice": 70
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "rollAttackDice":
					/*
					{
	"name": "rollAttackDice",
	"transitions": {
		"allowCruel": 21,
		"endAttack": 23
	},
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceallowCruel":
					/*
					{
	"name": "_choiceallowCruel",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"allowCruel": 21,
		"rerollAttack": 22,
		"endAttack": 23,
		"_choice": 71
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicererollAttack":
					/*
					{
	"name": "_choicererollAttack",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"rerollAttack": 22,
		"endAttack": 23,
		"allowCruel": 21,
		"_choice": 72
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "endAttack":
					/*
					{
	"name": "endAttack",
	"transitions": {
		"chooseReconfigure": 42,
		"chooseAction": 11
	},
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceattackEndPosition":
					/*
					{
	"name": "_choiceattackEndPosition",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17,
		"_choice": 73
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceconstruct":
					/*
					{
	"name": "_choiceconstruct",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"gameStats": 50,
		"chooseAction": 11,
		"_choice": 74
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceability":
					/*
					{
	"name": "_choiceability",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"strikeDest": 27,
		"transportInShip": 28,
		"warpDest": 30,
		"modifyInto": 32,
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"chooseShipAction": 12,
		"moveDest": 17,
		"_choice": 75
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicestrikeDest":
					/*
					{
	"name": "_choicestrikeDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"ability": 26,
		"_choice": 76
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicetransportInShip":
					/*
					{
	"name": "_choicetransportInShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseShipAction": 12,
		"moveShip": 16,
		"moveDest": 17,
		"ability": 26,
		"_choice": 77
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicetransportOut":
					/*
					{
	"name": "_choicetransportOut",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17,
		"_choice": 78
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicewarpDest":
					/*
					{
	"name": "_choicewarpDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"_choice": 79
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicewarpOrTransport":
					/*
					{
	"name": "_choicewarpOrTransport",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17,
		"_choice": 80
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicemodifyInto":
					/*
					{
	"name": "_choicemodifyInto",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"ability": 26,
		"_choice": 81
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceinfamy":
					/*
					{
	"name": "_choiceinfamy",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseCard": 34,
		"gameStats": 50,
		"chooseAction": 11,
		"_choice": 82
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseCard":
					/*
					{
	"name": "_choicechooseCard",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"endTurn": 10,
		"chooseCard": 34,
		"replaceCommand": 35,
		"deployExpansion": 36,
		"reorganizeShip": 37,
		"repositionCube": 39,
		"sabotage": 41,
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"infamy": 33,
		"_choice": 83
	},
	"updateGameProgression": true,
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicereplaceCommand":
					/*
					{
	"name": "_choicereplaceCommand",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseCard": 34,
		"_choice": 84
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicedeployExpansion":
					/*
					{
	"name": "_choicedeployExpansion",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseCard": 34,
		"_choice": 85
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicereorganizeShip":
					/*
					{
	"name": "_choicereorganizeShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"reorganizeShip": 37,
		"reorganizeDeploy": 38,
		"chooseReconfigure": 42,
		"chooseCard": 34,
		"_choice": 86
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicereorganizeDeploy":
					/*
					{
	"name": "_choicereorganizeDeploy",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"reorganizeDeploy": 38,
		"chooseCard": 34,
		"_choice": 87
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicerepositionCube":
					/*
					{
	"name": "_choicerepositionCube",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"repositionDest": 40,
		"chooseCard": 34,
		"_choice": 88
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicerepositionDest":
					/*
					{
	"name": "_choicerepositionDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseCard": 34,
		"_choice": 89
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicesabotage":
					/*
					{
	"name": "_choicesabotage",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"sabotage": 41,
		"chooseCard": 34,
		"_choice": 90
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseReconfigure":
					/*
					{
	"name": "_choicechooseReconfigure",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"rerollReconfigure": 43,
		"handleToBeReconfigured": 44,
		"_choice": 91
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicererollReconfigure":
					/*
					{
	"name": "_choicererollReconfigure",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"handleToBeReconfigured": 44,
		"_choice": 92
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "handleToBeReconfigured":
					/*
					{
	"name": "handleToBeReconfigured",
	"transitions": {
		"chooseAction": 11,
		"attackEndPosition": 24,
		"deployExpansion": 36,
		"reorganizeDeploy": 38,
		"chooseReconfigure": 42
	},
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceuseFlexibleShip":
					/*
					{
	"name": "_choiceuseFlexibleShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"useFlexibleInto": 46,
		"_choice": 93
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceuseFlexibleInto":
					/*
					{
	"name": "_choiceuseFlexibleInto",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"_choice": 94
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceuseResourcefulShip":
					/*
					{
	"name": "_choiceuseResourcefulShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseReconfigure": 42,
		"_choice": 95
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceuseNomadicShip":
					/*
					{
	"name": "_choiceuseNomadicShip",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"useNomadicDest": 49,
		"_choice": 96
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceuseNomadicDest":
					/*
					{
	"name": "_choiceuseNomadicDest",
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"transitions": {
		"chooseAction": 11,
		"_choice": 97
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "gameStats":
					/*
					{
	"name": "gameStats",
	"transitions": {
		"gameEnd": 99
	},
	"updateGameProgression": true,
	"description": "&nbsp;",
	"descriptionmyturn": "&nbsp;",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "firstReconfigure":
					/*
					{
	"name": "firstReconfigure",
	"description": "Some player are still deciding...",
	"descriptionmyturn": "${you} can",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstConstruct": 3
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstConstruct":
					/*
					{
	"name": "firstConstruct",
	"description": "${actplayer} must place the first cube",
	"descriptionmyturn": "${you} must place your first cube",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstConstruct": 3,
		"firstDeploy": 4
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstDeploy":
					/*
					{
	"name": "firstDeploy",
	"description": "${actplayer} must deploy the first ships",
	"descriptionmyturn": "${you} must deploy all ships",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstDeploy": 4,
		"firstDeployShip": 5,
		"firstDeployDest": 6,
		"firstRepositionShip": 7,
		"firstRepositionDest": 8,
		"startTurn": 9
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstDeployShip":
					/*
					{
	"name": "firstDeployShip",
	"description": "${actplayer} must choose which ship to deploy",
	"descriptionmyturn": "${you} must choose which ship to deploy",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstDeployDest": 6
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstDeployDest":
					/*
					{
	"name": "firstDeployDest",
	"description": "${actplayer} must place selected ship",
	"descriptionmyturn": "${you} must place selected ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstDeploy": 4
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstRepositionShip":
					/*
					{
	"name": "firstRepositionShip",
	"description": "${actplayer} must choose which ship to reposition",
	"descriptionmyturn": "${you} must choose which ship to reposition",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstRepositionDest": 8,
		"firstDeploy": 4
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "firstRepositionDest":
					/*
					{
	"name": "firstRepositionDest",
	"description": "${actplayer} must choose where to reposition selected ship",
	"descriptionmyturn": "${you} must choose where to reposition selected ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"firstDeploy": 4
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseAction":
					/*
					{
	"name": "chooseAction",
	"description": "${actplayer} can take an action or use a ship ability",
	"descriptionmyturn": "${you} must",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"reconfigure": 13,
		"deployShip": 14,
		"deployDest": 15,
		"moveShip": 16,
		"moveDest": 17,
		"construct": 25,
		"ability": 26,
		"transportOut": 29,
		"infamy": 33,
		"chooseCard": 34,
		"chooseReconfigure": 42,
		"useFlexibleShip": 45,
		"useResourcefulShip": 47,
		"useNomadicShip": 48,
		"gameStats": 50
	},
	"updateGameProgression": true,
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseShipAction":
					/*
					{
	"name": "chooseShipAction",
	"description": "${actplayer} must choose which action to perform on selected ship",
	"descriptionmyturn": "${you} must",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"deployDest": 15,
		"moveDest": 17,
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"strikeDest": 27,
		"transportInShip": 28,
		"warpDest": 30,
		"warpOrTransport": 31,
		"modifyInto": 32,
		"chooseReconfigure": 42,
		"useFlexibleInto": 46,
		"useNomadicDest": 49,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "reconfigure":
					/*
					{
	"name": "reconfigure",
	"description": "${actplayer} must choose which ship to reconfigure",
	"descriptionmyturn": "${you} must choose which ship to reconfigure",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseReconfigure": 42,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "deployShip":
					/*
					{
	"name": "deployShip",
	"description": "${actplayer} must choose which ship to deploy",
	"descriptionmyturn": "${you} must choose which ship to deploy",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"deployDest": 15,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "deployDest":
					/*
					{
	"name": "deployDest",
	"description": "${actplayer} must choose where to deploy selected ship",
	"descriptionmyturn": "${you} must choose where to deploy selected ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"deployShip": 14
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "moveShip":
					/*
					{
	"name": "moveShip",
	"description": "${actplayer} must choose which ship to move",
	"descriptionmyturn": "${you} must choose which ship to move",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"moveDest": 17,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "moveDest":
					/*
					{
	"name": "moveDest",
	"description": "${actplayer} must choose where to move selected ship",
	"descriptionmyturn": "${you} must choose where to move selected ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"moveDest": 17,
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"transportInShip": 28,
		"transportOut": 29,
		"chooseAction": 11,
		"moveShip": 16
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "multipleTargetShip":
					/*
					{
	"name": "multipleTargetShip",
	"description": "${actplayer} must choose which ship exactly to attack",
	"descriptionmyturn": "${you} must choose which ship exactly to attack",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"multipleTargetShip": 18,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"chooseAction": 11,
		"chooseShipAction": 12,
		"moveShip": 16,
		"moveDest": 17
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "allowDangerous":
					/*
					{
	"name": "allowDangerous",
	"description": "${actplayer} can choose to be Dangerous",
	"descriptionmyturn": "${you} can",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"rollAttackDice": 20,
		"chooseReconfigure": 42,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "allowCruel":
					/*
					{
	"name": "allowCruel",
	"description": "${actplayer} can choose to reroll a combat die",
	"descriptionmyturn": "${you} can",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"allowCruel": 21,
		"rerollAttack": 22,
		"endAttack": 23
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "rerollAttack":
					/*
					{
	"name": "rerollAttack",
	"description": "DEPLETED",
	"descriptionmyturn": "DEPLETED",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"rerollAttack": 22,
		"endAttack": 23,
		"allowCruel": 21
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "attackEndPosition":
					/*
					{
	"name": "attackEndPosition",
	"description": "${actplayer} must choose where to end the attacking ship move",
	"descriptionmyturn": "${you} must choose where to end your attacking ship move",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "construct":
					/*
					{
	"name": "construct",
	"description": "${actplayer} must choose a planet to construct on",
	"descriptionmyturn": "${you} must choose a planet to construct on",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"gameStats": 50,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "ability":
					/*
					{
	"name": "ability",
	"description": "${actplayer} must choose the ship of which to use the ability",
	"descriptionmyturn": "${you} must choose the ship of which to use the ability",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"strikeDest": 27,
		"transportInShip": 28,
		"warpDest": 30,
		"modifyInto": 32,
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"chooseShipAction": 12,
		"moveDest": 17
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "strikeDest":
					/*
					{
	"name": "strikeDest",
	"description": "${actplayer} must choose where to strike",
	"descriptionmyturn": "${you} must choose where to strike",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"allowDangerous": 19,
		"attackEndPosition": 24,
		"ability": 26
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "transportInShip":
					/*
					{
	"name": "transportInShip",
	"description": "${actplayer} must choose which ship to transport",
	"descriptionmyturn": "${you} must choose which ship to transport",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseShipAction": 12,
		"moveShip": 16,
		"moveDest": 17,
		"ability": 26
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "transportOut":
					/*
					{
	"name": "transportOut",
	"description": "${actplayer} must choose where to unload the transported ship",
	"descriptionmyturn": "${you} must choose where to unload the transported ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "warpDest":
					/*
					{
	"name": "warpDest",
	"description": "${actplayer} must choose which ship to warp to",
	"descriptionmyturn": "${you} must choose which ship to warp to",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "warpOrTransport":
					/*
					{
	"name": "warpOrTransport",
	"description": "${actplayer} must choose whether to transport or warp",
	"descriptionmyturn": "${you} must",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"moveDest": 17
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "modifyInto":
					/*
					{
	"name": "modifyInto",
	"description": "${actplayer} must choose in what type of ship to modify",
	"descriptionmyturn": "${you} must choose in what type of ship to modify: ",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11,
		"chooseShipAction": 12,
		"ability": 26
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "infamy":
					/*
					{
	"name": "infamy",
	"description": "${actplayer} achieved infamy and must place a quantum cube",
	"descriptionmyturn": "${you} achieved infamy and must choose where to place a quantum cube",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseCard": 34,
		"gameStats": 50,
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseCard":
					/*
					{
	"name": "chooseCard",
	"description": "${actplayer} can choose a card",
	"descriptionmyturn": "${you} can choose a card",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"endTurn": 10,
		"chooseCard": 34,
		"replaceCommand": 35,
		"deployExpansion": 36,
		"reorganizeShip": 37,
		"repositionCube": 39,
		"sabotage": 41,
		"chooseReconfigure": 42,
		"chooseAction": 11,
		"infamy": 33
	},
	"updateGameProgression": true,
	"args": "choiceArgs"
}
					*/
					break;
				case "replaceCommand":
					/*
					{
	"name": "replaceCommand",
	"description": "${actplayer} must choose which command to replace",
	"descriptionmyturn": "${you} must choose which command to replace",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "deployExpansion":
					/*
					{
	"name": "deployExpansion",
	"description": "${actplayer} can choose where to deploy his/her new ship",
	"descriptionmyturn": "${you} can choose where to deploy your new ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "reorganizeShip":
					/*
					{
	"name": "reorganizeShip",
	"description": "${actplayer} can select/unselect ships to reorganize",
	"descriptionmyturn": "${you} can select/unselect ships to reorganize",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"reorganizeShip": 37,
		"reorganizeDeploy": 38,
		"chooseReconfigure": 42,
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "reorganizeDeploy":
					/*
					{
	"name": "reorganizeDeploy",
	"description": "${actplayer} can deploy selected ship",
	"descriptionmyturn": "${you} can deploy selected ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"reorganizeDeploy": 38,
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "repositionCube":
					/*
					{
	"name": "repositionCube",
	"description": "${actplayer} must choose the cube of an opponent to reposition",
	"descriptionmyturn": "${you} must choose the cube of an opponent to reposition",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"repositionDest": 40,
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "repositionDest":
					/*
					{
	"name": "repositionDest",
	"description": "${actplayer} must choose where to reposition selected cube",
	"descriptionmyturn": "${you} must choose where to reposition selected cube",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "sabotage":
					/*
					{
	"name": "sabotage",
	"description": "${actplayer} must choose which command card to discard",
	"descriptionmyturn": "${you} must choose which command card to discard",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"sabotage": 41,
		"chooseCard": 34
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseReconfigure":
					/*
					{
	"name": "chooseReconfigure",
	"description": "${actplayer} must choose the new ship type",
	"descriptionmyturn": "${you} must choose the new ship type:",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"rerollReconfigure": 43,
		"handleToBeReconfigured": 44
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "rerollReconfigure":
					/*
					{
	"name": "rerollReconfigure",
	"description": "${actplayer} can choose to reconfigure again",
	"descriptionmyturn": "${you} can",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"handleToBeReconfigured": 44
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "useFlexibleShip":
					/*
					{
	"name": "useFlexibleShip",
	"description": "${actplayer} must select the ship on which to add or remove 1",
	"descriptionmyturn": "${you} must select the ship on which to add or remove 1",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"useFlexibleInto": 46
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "useFlexibleInto":
					/*
					{
	"name": "useFlexibleInto",
	"description": "${actplayer} must choose whether to add or remove 1",
	"descriptionmyturn": "${you} must",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "useResourcefulShip":
					/*
					{
	"name": "useResourcefulShip",
	"description": "${actplayer} must select the ship to sacrifice",
	"descriptionmyturn": "${you} must select the ship to sacrifice",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseReconfigure": 42
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "useNomadicShip":
					/*
					{
	"name": "useNomadicShip",
	"description": "${actplayer} must select the ship to move",
	"descriptionmyturn": "${you} must select the ship to move",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"useNomadicDest": 49
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "useNomadicDest":
					/*
					{
	"name": "useNomadicDest",
	"description": "${actplayer} must choose where to move the ship",
	"descriptionmyturn": "${you} must choose where to move the ship",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseAction": 11
	},
	"args": "choiceArgs"
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
	"args": "callArgsWithVars",
	"descriptionmyturn": "&nbsp;"
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
export default quantum;
