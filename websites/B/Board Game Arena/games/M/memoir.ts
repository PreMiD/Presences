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

const memoir: GamePresence = {
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
				case "startTable":
					/*
					{
	"name": "startTable",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stStartTable",
	"possibleactions": [],
	"transitions": {
		"upload": 4
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNewRound",
	"possibleactions": [],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "uploadScenario":
					/*
					{
	"name": "uploadScenario",
	"description": "You must upload a m44 scenario",
	"descriptionmyturn": "${you} must upload a m44 scenario",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actUploadScenario"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "prepareTurn":
					/*
					{
	"name": "prepareTurn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stPrepareTurn",
	"transitions": {
		"playCard": 11,
		"commissar": 9
	}
}
					*/
					break;
				case "commissarCard":
					/*
					{
	"name": "commissarCard",
	"description": "${actplayer} must put a card under commissar token",
	"descriptionmyturn": "${you} must put a card under commissar token",
	"type": "activeplayer",
	"args": "argsCommissarCard",
	"possibleactions": [
		"actCommissarCard",
		"actPlayCard"
	],
	"transitions": {
		"play": 10,
		"selectUnits": 12,
		"counterAttack": 38
	}
}
					*/
					break;
				case "playCommissarCard":
					/*
					{
	"name": "playCommissarCard",
	"description": "${actplayer} must choose how/where to play the card",
	"descriptionmyturn": "${you} must choose how/where to play the card",
	"type": "activeplayer",
	"action": "stPlayCommissarCard",
	"args": "argsPlayCommissarCard",
	"possibleactions": [
		"actRestart",
		"actPlayCommissarCard"
	],
	"transitions": {
		"selectUnits": 12,
		"finestHour": 33,
		"airpower": 35,
		"barrage": 36,
		"medics": 37,
		"counterAttack": 38
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"args": "argsPlayCard",
	"action": "stPlayCard",
	"possibleactions": [
		"actPlayCard"
	],
	"transitions": {
		"selectUnits": 12,
		"finestHour": 33,
		"airpower": 35,
		"barrage": 36,
		"medics": 37,
		"counterAttack": 38,
		"commissar": 9
	}
}
					*/
					break;
				case "orderUnits":
					/*
					{
	"name": "orderUnits",
	"description": "${actplayer} may order ${nTitle} unit(s) ${desc}",
	"descriptionmyturn": "${you} may order ${nTitle} unit(s) ${desc}",
	"type": "activeplayer",
	"args": "argsOrderUnits",
	"action": "stOrderUnits",
	"possibleactions": [
		"actOrderUnits",
		"actRestart"
	],
	"transitions": {
		"moveUnits": 13,
		"digIn": 30
	}
}
					*/
					break;
				case "moveUnits":
					/*
					{
	"name": "moveUnits",
	"description": "${actplayer} may move activated units",
	"descriptionmyturn": "${you} may move activated units",
	"type": "activeplayer",
	"args": "argsMoveUnits",
	"action": "stMoveUnits",
	"possibleactions": [
		"actRestart",
		"actMoveUnit",
		"actMoveUnitsDone",
		"actHealUnit",
		"actHealUnitHospital",
		"actExitUnit"
	],
	"transitions": {
		"moveUnits": 13,
		"attackUnits": 26
	}
}
					*/
					break;
				case "attackUnits":
					/*
					{
	"name": "attackUnits",
	"description": "${actplayer} may battle",
	"descriptionmyturn": "${you} may select the unit to battle with",
	"type": "activeplayer",
	"action": "stAttackUnits",
	"args": "argsAttackUnit",
	"possibleactions": [
		"actRestart",
		"actAttackUnit",
		"actAttackUnitsDone",
		"actRemoveWire",
		"actRemoveRoadBlock",
		"actSealCave"
	],
	"transitions": {
		"ambush": 15,
		"attack": 14,
		"draw": 59,
		"moveAgain": 31
	}
}
					*/
					break;
				case "opponentAmbush":
					/*
					{
	"name": "opponentAmbush",
	"description": "${actplayer} can react to the attack",
	"descriptionmyturn": "${you} can react to the attack",
	"type": "activeplayer",
	"args": "argsOpponentAmbush",
	"action": "stAmbush",
	"possibleactions": [
		"actAmbush",
		"actPassAmbush"
	],
	"transitions": {
		"pass": 17,
		"retreat": 16
	}
}
					*/
					break;
				case "ambushResolve":
					/*
					{
	"name": "ambushResolve",
	"description": "${actplayer} must retreat the unit ${min} hex(es) ${desc} (Ambush effect)",
	"descriptionmyturn": "${you} must retreat the unit ${min} hex(es) ${desc} (Ambush effect)",
	"descriptionskippable": "${actplayer} may retreat the unit up to ${max} hex(es) (Ambush effect)",
	"descriptionmyturnskippable": "${you} may retreat the unit up to ${max} hex(es) (Ambush effect)",
	"descriptionbattleBack": "${actplayer} must retreat the unit ${min} hex(es) ${desc} (Battle back effect)",
	"descriptionmyturnbattleBack": "${you} must retreat the unit ${min} hex(es) ${desc} (Battle back effect)",
	"descriptionbattleBackskippable": "${actplayer} may retreat the unit up to ${max} hex(es) (Battle back effect)",
	"descriptionmyturnbattleBackskippable": "${you} may retreat the unit up to ${max} hex(es) (Battle back effect)",
	"type": "activeplayer",
	"args": "argsRetreatUnit",
	"action": "stRetreatUnit",
	"possibleactions": [
		"actRetreatUnit",
		"actRetreatUnitDone"
	],
	"transitions": {
		"takeGround": 17,
		"retreat": 16
	}
}
					*/
					break;
				case "attackThrow":
					/*
					{
	"name": "attackThrow",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stAttackThrow",
	"transitions": {
		"retreat": 18,
		"nextAttack": 17,
		"takeGround": 19,
		"battleBack": 25
	}
}
					*/
					break;
				case "attackRetreat":
					/*
					{
	"name": "attackRetreat",
	"description": "${actplayer} must retreat the unit ${min} hex(es) ${desc}",
	"descriptionmyturn": "${you} must retreat the unit ${min} hex(es) ${desc}",
	"descriptionskippable": "${actplayer} may retreat the unit up to ${max} hex(es) (optional)",
	"descriptionmyturnskippable": "${you} may retreat the unit up to ${max} hex(es) (optional)",
	"type": "activeplayer",
	"args": "argsRetreatUnit",
	"action": "stRetreatUnit",
	"possibleactions": [
		"actRetreatUnit",
		"actRetreatUnitDone",
		"actIgnore1Flag"
	],
	"transitions": {
		"retreat": 18,
		"nextAttack": 17,
		"takeGround": 19,
		"battleBack": 25
	}
}
					*/
					break;
				case "takeGround":
					/*
					{
	"name": "takeGround",
	"description": "${actplayer} may take the ground",
	"descriptionmyturn": "${you} may take the ground",
	"type": "activeplayer",
	"args": "argsTakeGround",
	"action": "stTakeGround",
	"possibleactions": [
		"actTakeGround",
		"actPassTakeGround"
	],
	"transitions": {
		"next": 14,
		"nextAttack": 17,
		"desertMove": 24,
		"overrun": 20
	}
}
					*/
					break;
				case "armorOverrun":
					/*
					{
	"name": "armorOverrun",
	"description": "${actplayer} may attack an unit (Armor overrun)",
	"descriptionmyturn": "${you} may attack an unit (Armor overrun)",
	"type": "activeplayer",
	"args": "argsArmorOverrun",
	"action": "stArmorOverrun",
	"possibleactions": [
		"actAttackUnit",
		"actNextAttack",
		"actAttackUnitsDone"
	],
	"transitions": {
		"ambush": 15,
		"next": 14,
		"nextAttack": 14
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "",
	"type": "game",
	"action": "stDrawCard",
	"transitions": {
		"endRound": 23,
		"choice": 22
	}
}
					*/
					break;
				case "drawChoice":
					/*
					{
	"name": "drawChoice",
	"description": "${actplayer} must choose which card to discard",
	"descriptionmyturn": "${you} must choose which card to discard",
	"type": "activeplayer",
	"args": "argsDrawChoice",
	"possibleactions": [
		"actChooseCard"
	],
	"transitions": {
		"endRound": 23
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndTurn",
	"transitions": {
		"next": 8
	}
}
					*/
					break;
				case "desertMove":
					/*
					{
	"name": "desertMove",
	"description": "${actplayer} may move an additional hex (Desert rules)",
	"descriptionmyturn": "${you}  may move an additional hex (Desert rules)",
	"type": "activeplayer",
	"args": "argsDesertMove",
	"action": "stDesertMove",
	"possibleactions": [
		"actMoveUnit",
		"actMoveUnitsDone"
	],
	"transitions": {
		"overrun": 20
	}
}
					*/
					break;
				case "battleBack":
					/*
					{
	"name": "battleBack",
	"description": "${actplayer} may battle back with 1 die",
	"descriptionmyturn": "${you} may battle back with 1 die",
	"type": "activeplayer",
	"args": "argsBattleBack",
	"possibleactions": [
		"actBattleBack",
		"actBattleBackPass"
	],
	"transitions": {
		"retreat": 16,
		"nextAttack": 14
	}
}
					*/
					break;
				case "preAttackUnits":
					/*
					{
	"name": "preAttackUnits",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stPreAttackUnits",
	"transitions": {
		"": 14
	}
}
					*/
					break;
				case "digIn":
					/*
					{
	"name": "digIn",
	"description": "",
	"type": "game",
	"action": "stDigIn",
	"descriptionmyturn": "",
	"transitions": {
		"next": 21
	}
}
					*/
					break;
				case "preMoveAgain":
					/*
					{
	"name": "preMoveAgain",
	"description": "",
	"type": "game",
	"action": "stMoveAgain",
	"descriptionmyturn": "",
	"transitions": {
		"next": 32
	}
}
					*/
					break;
				case "moveUnits":
					/*
					{
	"name": "moveUnits",
	"description": "${actplayer} may move activated units again (behind enemy lines effect)",
	"descriptionmyturn": "${you} may move activated units again (behind enemy lines effect)",
	"type": "activeplayer",
	"args": "argsMoveUnits",
	"action": "stMoveUnits",
	"possibleactions": [
		"actRestart",
		"actMoveUnit",
		"actMoveUnitsDone",
		"actExitUnit"
	],
	"transitions": {
		"moveUnits": 32,
		"attackUnits": 21
	}
}
					*/
					break;
				case "finestHourRoll":
					/*
					{
	"name": "finestHourRoll",
	"description": "",
	"type": "game",
	"action": "stFinestHourRoll",
	"descriptionmyturn": "",
	"transitions": {
		"selectUnits": 34
	}
}
					*/
					break;
				case "orderUnitsFinestHour":
					/*
					{
	"name": "orderUnitsFinestHour",
	"description": "${actplayer} may order ${unitDesc}",
	"descriptionmyturn": "${you} may order ${unitDesc}",
	"type": "activeplayer",
	"args": "argsOrderUnitsFinestHour",
	"action": "stOrderUnitsFinestHour",
	"possibleactions": [
		"actOrderUnitsFinestHour"
	],
	"transitions": {
		"moveUnits": 13
	}
}
					*/
					break;
				case "targetAirPower":
					/*
					{
	"name": "targetAirPower",
	"description": "${actplayer} may target 4 or fewer enemy units",
	"descriptionmyturn": "${you} may target 4 or fewer enemy units",
	"type": "activeplayer",
	"args": "argsTargetAirPower",
	"possibleactions": [
		"actRestart",
		"actTargetAirPower"
	],
	"transitions": {
		"attack": 17
	}
}
					*/
					break;
				case "targetBarrage":
					/*
					{
	"name": "targetBarrage",
	"description": "${actplayer} may target 1 enemy unit",
	"descriptionmyturn": "${you} may target 1 enemy unit",
	"type": "activeplayer",
	"args": "argsTargetBarrage",
	"possibleactions": [
		"actRestart",
		"actTargetBarrage"
	],
	"transitions": {
		"attack": 17
	}
}
					*/
					break;
				case "targetMedics":
					/*
					{
	"name": "targetMedics",
	"description": "${actplayer} may heal ${nTitle} unit(s)",
	"descriptionmyturn": "${you} may heal  ${nTitle} unit(s)",
	"type": "activeplayer",
	"args": "argsTargetMedics",
	"action": "stTargetMedics",
	"possibleactions": [
		"actRestart",
		"actTargetMedics"
	],
	"transitions": {
		"move": 13,
		"draw": 21
	}
}
					*/
					break;
				case "counterAttack":
					/*
					{
	"name": "counterAttack",
	"description": "",
	"descriptionmyturn": "",
	"type": "activeplayer",
	"action": "stCounterAttack",
	"transitions": {
		"selectUnits": 12,
		"finestHour": 33,
		"airpower": 35,
		"barrage": 36,
		"medics": 37,
		"draw": 59,
		"counterAttack": 38
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "Players must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "multipleactiveplayer",
	"args": "argsOverlordPlayCard",
	"possibleactions": [
		"actPlayCard"
	],
	"transitions": {
		"moveUnits": 12
	}
}
					*/
					break;
				case "selectUnits":
					/*
					{
	"name": "selectUnits",
	"description": "${actplayer} must select units in sections ${section}",
	"descriptionmyturn": "${you} must select units in sections ${section}",
	"type": "multipleactiveplayer",
	"args": "argsOverlordSelectUnits",
	"possibleactions": [
		"actSelectUnits"
	],
	"transitions": {
		"moveUnits": 13
	}
}
					*/
					break;
				case "moveUnits":
					/*
					{
	"name": "moveUnits",
	"description": "${actplayer} must move selected units",
	"descriptionmyturn": "${you} must move selected units",
	"type": "multipleactiveplayer",
	"args": "argsOverlordMoveUnits",
	"possibleactions": [
		"actMoveUnits"
	],
	"transitions": {
		"moveUnits": 13
	}
}
					*/
					break;
				case "attackUnit":
					/*
					{
	"name": "attackUnit",
	"description": "${actplayer} must select an unit and its target",
	"descriptionmyturn": "${you} must select an unit and its target",
	"type": "multipleactiveplayer",
	"args": "argsOverlordAttackUnit",
	"possibleactions": [
		"actAttackUnit"
	],
	"transitions": {
		"ambush": 15,
		"attack": 17
	}
}
					*/
					break;
				case "airDrop":
					/*
					{
	"name": "airDrop",
	"description": "${actplayer} must choose where to air drop ${nb} units",
	"descriptionmyturn": "${you} must choose where to air drop ${nb} units",
	"type": "activeplayer",
	"args": "argsAirDrop",
	"possibleactions": [
		"actAirDrop"
	],
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "confirmTurn":
					/*
					{
	"name": "confirmTurn",
	"description": "${actplayer} must confirm or restart their turn",
	"descriptionmyturn": "${you} must confirm or restart your turn",
	"type": "activeplayer",
	"args": "argsConfirmTurn",
	"action": "stConfirmTurn",
	"possibleactions": [
		"actConfirmTurn",
		"actRestart"
	],
	"transitions": {
		"confirm": 21
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndOfRound",
	"possibleactions": [],
	"transitions": {
		"change": 61,
		"end": 98
	}
}
					*/
					break;
				case "changeOfRound":
					/*
					{
	"name": "changeOfRound",
	"description": "Waiting for the other team to proceed to next round",
	"descriptionmyturn": "Round 1 is over: ${team} wins!",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actProceed"
	],
	"args": "argsChangeOfRound",
	"transitions": {
		"done": 3
	}
}
					*/
					break;
				case "changeActivePlayer":
					/*
					{
	"name": "changeActivePlayer",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stChangeActivePlayer"
}
					*/
					break;
				case "endOfGame":
					/*
					{
	"name": "endOfGame",
	"descriptionmyturn": "",
	"description": "",
	"type": "game",
	"action": "stEndOfGame",
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
export default memoir;
