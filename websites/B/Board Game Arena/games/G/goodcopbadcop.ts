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

const goodcopbadcop: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} is choosing their turn action.",
	"descriptionmyturn": "${you} must select which action you will take.",
	"type": "activeplayer",
	"args": "argGetPlayerTurnButtonList",
	"possibleactions": [
		"clickInvestigateButton",
		"clickArmButton",
		"clickShootButton",
		"clickEquipButton",
		"clickEquipmentCard",
		"clickSkipButton",
		"clickUseEquipmentButton"
	],
	"transitions": {
		"investigateChooseCard": 3,
		"armChooseCard": 6,
		"askShootReaction": 8,
		"equipChooseCard": 10,
		"useEquipment": 15,
		"executeEquip": 11,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"executeArm": 7,
		"executeEquipment": 31,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "chooseCardToInvestigate":
					/*
					{
	"name": "chooseCardToInvestigate",
	"description": "${actplayer} is investigating.",
	"descriptionmyturn": "${you} must select which Integrity Card you will investigate.",
	"type": "activeplayer",
	"possibleactions": [
		"clickOpponentIntegrityCard",
		"clickCancelButton"
	],
	"transitions": {
		"askInvestigateReaction": 4,
		"executeActionInvestigate": 5,
		"cancelAction": 2,
		"playerAction": 2
	}
}
					*/
					break;
				case "askInvestigateReaction":
					/*
					{
	"name": "askInvestigateReaction",
	"description": "Other players are deciding if they will use an Equipment.",
	"descriptionmyturn": "${you} may use Equipment in reaction to the Investigate action.",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"clickUseEquipmentButton",
		"clickPassOnUseEquipmentButton",
		"clickEquipmentCard"
	],
	"transitions": {
		"useEquipment": 17,
		"allPassedOnReactions": 5
	}
}
					*/
					break;
				case "executeActionInvestigate":
					/*
					{
	"name": "executeActionInvestigate",
	"description": "",
	"type": "game",
	"action": "executeActionInvestigate",
	"updateGameProgression": false,
	"transitions": {
		"askAim": 27,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50,
		"discardEquipment": 12,
		"askDiscardOutOfTurn": 35
	}
}
					*/
					break;
				case "chooseCardToRevealForArm":
					/*
					{
	"name": "chooseCardToRevealForArm",
	"description": "${actplayer} is choosing a card to reveal.",
	"descriptionmyturn": "${you} must select which Integrity Card you will reveal.",
	"type": "activeplayer",
	"possibleactions": [
		"clickMyIntegrityCard",
		"clickCancelButton"
	],
	"transitions": {
		"executeArm": 7,
		"playerAction": 2
	}
}
					*/
					break;
				case "executeActionArm":
					/*
					{
	"name": "executeActionArm",
	"description": "",
	"type": "game",
	"action": "executeActionArm",
	"updateGameProgression": false,
	"transitions": {
		"askAim": 27
	}
}
					*/
					break;
				case "askShootReaction":
					/*
					{
	"name": "askShootReaction",
	"description": "Other players are deciding if they will use Equipment as a reaction to the Shoot or Bite action.",
	"descriptionmyturn": "${you} may use Equipment as a reaction to the Shoot or Bite action.",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"clickUseEquipmentButton",
		"clickPassOnUseEquipmentButton",
		"clickEquipmentCard"
	],
	"transitions": {
		"useEquipment": 18,
		"allPassedOnReactions": 9,
		"askShootReaction": 8
	}
}
					*/
					break;
				case "executeActionShoot":
					/*
					{
	"name": "executeActionShoot",
	"description": "",
	"type": "game",
	"action": "executeActionShoot",
	"updateGameProgression": false,
	"transitions": {
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"endGame": 99,
		"rollInfectionDie": 50,
		"askAim": 27,
		"askAimMustReaim": 26,
		"discardEquipment": 12,
		"askBiteReaction": 51,
		"askDiscardOutOfTurn": 35
	}
}
					*/
					break;
				case "chooseCardToRevealForEquip":
					/*
					{
	"name": "chooseCardToRevealForEquip",
	"description": "${actplayer} is choosing a card to reveal.",
	"descriptionmyturn": "${you} must select which Integrity Card you will reveal.",
	"type": "activeplayer",
	"possibleactions": [
		"clickMyIntegrityCard",
		"clickCancelButton"
	],
	"transitions": {
		"executeEquip": 11,
		"cancelAction": 2,
		"playerAction": 2
	}
}
					*/
					break;
				case "executeActionEquip":
					/*
					{
	"name": "executeActionEquip",
	"description": "",
	"type": "game",
	"action": "executeActionEquip",
	"updateGameProgression": false,
	"transitions": {
		"askAim": 27,
		"discardEquipment": 12,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "discardEquipment":
					/*
					{
	"name": "discardEquipment",
	"description": "${actplayer} is discarding Equipment.",
	"descriptionmyturn": "${you} must discard. Which Equipment will you discard?",
	"type": "activeplayer",
	"args": "argGetPlayerTurnDiscardToDiscardButtonList",
	"possibleactions": [
		"clickEquipmentCard"
	],
	"transitions": {
		"askAim": 27,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "chooseEquipmentToPlayOnYourTurn":
					/*
					{
	"name": "chooseEquipmentToPlayOnYourTurn",
	"description": "${actplayer} is using Equipment.",
	"descriptionmyturn": "${you} must select which Equipment in your hand you will play.",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"cancelEquipmentUse": 2,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"chooseActiveOrHandEquipmentCard": 42,
		"executeEquipment": 31,
		"playerAction": 2
	}
}
					*/
					break;
				case "chooseEquipmentToPlayReactEndOfTurn":
					/*
					{
	"name": "chooseEquipmentToPlayReactEndOfTurn",
	"description": "${actplayer} is using Equipment.",
	"descriptionmyturn": "${you} must select which Equipment in your hand you will play.",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"cancelEquipmentUse": 29,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"chooseActiveOrHandEquipmentCard": 42,
		"executeEquipment": 31
	}
}
					*/
					break;
				case "chooseEquipmentToPlayReactInvestigate":
					/*
					{
	"name": "chooseEquipmentToPlayReactInvestigate",
	"description": "${actplayer} is using Equipment.",
	"descriptionmyturn": "${you} must select which Equipment in your hand you will play.",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"cancelEquipmentUse": 4,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"chooseActiveOrHandEquipmentCard": 42,
		"executeEquipment": 31
	}
}
					*/
					break;
				case "chooseEquipmentToPlayReactShoot":
					/*
					{
	"name": "chooseEquipmentToPlayReactShoot",
	"description": "${actplayer} is using Equipment.",
	"descriptionmyturn": "${you} must select which Equipment in your hand you will play.",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"cancelEquipmentUse": 8,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"chooseEquipmentTargetOutOfTurn": 32,
		"chooseActiveOrHandEquipmentCard": 42,
		"executeEquipment": 31
	}
}
					*/
					break;
				case "chooseEquipmentToPlayReactBite":
					/*
					{
	"name": "chooseEquipmentToPlayReactBite",
	"description": "${actplayer} is using Equipment.",
	"descriptionmyturn": "${you} must select which Equipment in your hand you will play.",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"cancelEquipmentUse": 51,
		"chooseIntegrityCards": 40,
		"choosePlayer": 41,
		"chooseEquipmentTargetOutOfTurn": 32,
		"chooseActiveOrHandEquipmentCard": 42,
		"executeEquipment": 31
	}
}
					*/
					break;
				case "askAimMustReaim":
					/*
					{
	"name": "askAimMustReaim",
	"description": "${actplayer} is choosing a new target.",
	"descriptionmyturn": "${you} must change your aim.",
	"type": "activeplayer",
	"args": "argGetGunTargetsMustReaim",
	"possibleactions": [
		"clickPlayer"
	],
	"transitions": {
		"aimAtPlayer": 28,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50,
		"askAimMustReaim": 26,
		"askAim": 27
	}
}
					*/
					break;
				case "askAim":
					/*
					{
	"name": "askAim",
	"description": "${actplayer} is deciding if they will change their aim.",
	"descriptionmyturn": "${you} may change your aim.",
	"type": "activeplayer",
	"args": "argGetGunTargets",
	"possibleactions": [
		"clickPlayer",
		"clickEndTurnButton"
	],
	"transitions": {
		"aimAtPlayer": 28,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50,
		"askAimMustReaim": 26,
		"askAim": 27,
		"endGame": 99
	}
}
					*/
					break;
				case "aimAtPlayer":
					/*
					{
	"name": "aimAtPlayer",
	"description": "${actplayer} is aiming.",
	"descriptionmyturn": "${you} must aim at a player.",
	"type": "activeplayer",
	"possibleactions": [
		"clickPlayer",
		"clickCancelButton"
	],
	"transitions": {
		"endTurn": 29,
		"cancelAim": 27,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "askEndTurnReaction":
					/*
					{
	"name": "askEndTurnReaction",
	"description": "Other players are deciding if they will use an Equipment at the end of this player turn.",
	"descriptionmyturn": "${you} may use Equipment at the end of this player turn.",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"clickPassOnUseEquipmentButton",
		"clickUseEquipmentButton",
		"clickEquipmentCard"
	],
	"transitions": {
		"allPassedOnReactions": 30,
		"endTurnReaction": 29,
		"useEquipment": 16,
		"askShootReaction": 8
	}
}
					*/
					break;
				case "endPlayerTurn":
					/*
					{
	"name": "endPlayerTurn",
	"description": "",
	"type": "game",
	"action": "endTurnCleanup",
	"updateGameProgression": true,
	"transitions": {
		"startNewPlayerTurn": 2
	}
}
					*/
					break;
				case "executeEquipmentPlay":
					/*
					{
	"name": "executeEquipmentPlay",
	"description": "",
	"type": "game",
	"action": "executeEquipmentPlay",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 2,
		"askInvestigateReaction": 4,
		"executeActionInvestigate": 5,
		"askShootReaction": 8,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"askAimOutOfTurn": 33,
		"askDiscardOutOfTurn": 35,
		"endGame": 99,
		"rollInfectionDie": 50,
		"executeActionBite": 52,
		"askBiteReaction": 51
	}
}
					*/
					break;
				case "chooseEquipmentTargetOutOfTurn":
					/*
					{
	"name": "chooseEquipmentTargetOutOfTurn",
	"description": "${actplayer} is choosing an Equipment target.",
	"type": "game",
	"action": "chooseEquipmentTargetOutOfTurn",
	"updateGameProgression": false,
	"transitions": {
		"choosePlayer": 41,
		"choosePlayerNoCancel": 44
	}
}
					*/
					break;
				case "askAimOutOfTurn":
					/*
					{
	"name": "askAimOutOfTurn",
	"description": "${actplayer} is aiming their gun.",
	"descriptionmyturn": "${you} must aim your new gun.",
	"type": "activeplayer",
	"args": "argGetGunTargets",
	"possibleactions": [
		"clickPlayer"
	],
	"transitions": {
		"afterAimedOutOfTurn": 34
	}
}
					*/
					break;
				case "afterAimedOutOfTurn":
					/*
					{
	"name": "afterAimedOutOfTurn",
	"description": "${actplayer} is choosing an Equipment target.",
	"type": "game",
	"action": "afterAimedOutOfTurn",
	"updateGameProgression": false,
	"transitions": {
		"playerTurn": 2,
		"askInvestigateReaction": 4,
		"executeActionInvestigate": 5,
		"askShootReaction": 8,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"askAimOutOfTurn": 33,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "discardOutOfTurn":
					/*
					{
	"name": "discardOutOfTurn",
	"description": "${actplayer} is discarding an Equipment.",
	"descriptionmyturn": "${you} must discard. Which Equipment will you discard?",
	"type": "activeplayer",
	"possibleactions": [
		"clickEquipmentCard"
	],
	"transitions": {
		"afterDiscardedOutOfTurn": 36
	}
}
					*/
					break;
				case "afterDiscardedOutOfTurn":
					/*
					{
	"name": "afterDiscardedOutOfTurn",
	"description": "${actplayer} is choosing an Equipment target.",
	"type": "game",
	"action": "afterDiscardedOutOfTurn",
	"updateGameProgression": false,
	"transitions": {
		"playerTurn": 2,
		"askInvestigateReaction": 4,
		"executeActionInvestigate": 5,
		"askShootReaction": 8,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50
	}
}
					*/
					break;
				case "chooseIntegrityCards":
					/*
					{
	"name": "chooseIntegrityCards",
	"description": "${actplayer} is choosing an Equipment target.",
	"descriptionmyturn": "${you} must select an Integrity Card to target with the Equipment.",
	"type": "activeplayer",
	"possibleactions": [
		"clickConfirmButton",
		"clickCancelButton",
		"clickOpponentIntegrityCard",
		"clickMyIntegrityCard",
		"clickDoneSelectingButton"
	],
	"transitions": {
		"executeEquipment": 31,
		"chooseIntegrityCards": 40,
		"playerTurn": 2,
		"chooseEquipmentToPlayReactEndOfTurn": 16,
		"chooseEquipmentToPlayReactInvestigate": 17,
		"chooseEquipmentToPlayReactShoot": 18,
		"chooseEquipmentToPlayOnYourTurn": 15,
		"chooseEquipmentToPlayReactBite": 19
	}
}
					*/
					break;
				case "choosePlayer":
					/*
					{
	"name": "choosePlayer",
	"description": "${actplayer} is choosing an Equipment target.",
	"descriptionmyturn": "${you} must choose a player to target with the Equipment.",
	"type": "activeplayer",
	"args": "argGetPlayerButtonTargets",
	"possibleactions": [
		"clickPlayer",
		"clickCancelButton"
	],
	"transitions": {
		"executeEquipment": 31,
		"choosePlayer": 41,
		"chooseActiveOrHandEquipmentCard": 42,
		"playerTurn": 2,
		"chooseEquipmentToPlayReactEndOfTurn": 16,
		"chooseEquipmentToPlayReactInvestigate": 17,
		"chooseEquipmentToPlayReactShoot": 18,
		"chooseEquipmentToPlayOnYourTurn": 15,
		"chooseEquipmentToPlayReactBite": 19
	}
}
					*/
					break;
				case "chooseActiveOrHandEquipmentCard":
					/*
					{
	"name": "chooseActiveOrHandEquipmentCard",
	"description": "${actplayer} is choosing an Equipment target.",
	"descriptionmyturn": "${you} must select an Equipment to give to another player.",
	"type": "activeplayer",
	"args": "argGetPlayerBoardEquipment",
	"possibleactions": [
		"clickEquipmentCardToTarget",
		"clickEquipmentCard",
		"clickCancelButton"
	],
	"transitions": {
		"executeEquipment": 31,
		"chooseAnotherPlayer": 43,
		"playerAction": 2,
		"chooseEquipmentToPlayReactEndOfTurn": 16,
		"chooseEquipmentToPlayReactInvestigate": 17,
		"chooseEquipmentToPlayReactShoot": 18,
		"chooseEquipmentToPlayOnYourTurn": 15
	}
}
					*/
					break;
				case "chooseAnotherPlayer":
					/*
					{
	"name": "chooseAnotherPlayer",
	"description": "${actplayer} is choosing an Equipment target.",
	"descriptionmyturn": "${you} must select another player to target with the Equipment.",
	"type": "activeplayer",
	"args": "argGetPlayerButtonTargets",
	"possibleactions": [
		"clickPlayer",
		"clickCancelButton"
	],
	"transitions": {
		"executeEquipment": 31,
		"chooseActiveOrHandEquipmentCard": 42,
		"chooseEquipmentToPlayReactEndOfTurn": 16
	}
}
					*/
					break;
				case "choosePlayerNoCancel":
					/*
					{
	"name": "choosePlayerNoCancel",
	"description": "${actplayer} is choosing an Equipment target.",
	"descriptionmyturn": "${you} must select a player to target with the Equipment.",
	"type": "activeplayer",
	"args": "argGetPlayerButtonTargets",
	"possibleactions": [
		"clickPlayer"
	],
	"transitions": {
		"executeEquipment": 31,
		"choosePlayer": 41,
		"chooseActiveOrHandEquipmentCard": 42,
		"playerTurn": 2,
		"chooseEquipmentToPlayReactEndOfTurn": 16,
		"chooseEquipmentToPlayReactInvestigate": 17,
		"chooseEquipmentToPlayReactShoot": 18,
		"chooseEquipmentToPlayOnYourTurn": 15,
		"chooseEquipmentToPlayReactBite": 19
	}
}
					*/
					break;
				case "rollInfectionDie":
					/*
					{
	"name": "rollInfectionDie",
	"description": "${actplayer} is rolling the Infection Die.",
	"type": "game",
	"action": "rollInfectionDie",
	"updateGameProgression": true,
	"transitions": {
		"endTurnReaction": 29,
		"allPassedOnReactions": 30
	}
}
					*/
					break;
				case "askBiteReaction":
					/*
					{
	"name": "askBiteReaction",
	"description": "Other players are deciding if they will use an Equipment in reaction to the Bite.",
	"descriptionmyturn": "${you} may use Equipment in reaction to the Bite.",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"clickUseEquipmentButton",
		"clickPassOnUseEquipmentButton",
		"clickEquipmentCard"
	],
	"transitions": {
		"useEquipment": 19,
		"allPassedOnReactions": 52,
		"askShootReaction": 8,
		"askBiteReaction": 51
	}
}
					*/
					break;
				case "executeActionBite":
					/*
					{
	"name": "executeActionBite",
	"description": "",
	"type": "game",
	"action": "executeActionBite",
	"updateGameProgression": true,
	"transitions": {
		"askAim": 27,
		"discardEquipment": 12,
		"endTurnReaction": 29,
		"allPassedOnReactions": 30,
		"rollInfectionDie": 50,
		"askAimMustReaim": 26,
		"endGame": 99
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
export default goodcopbadcop;
