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

const icecoldicehockey: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "playerTurnCI":
					/*
					{
	"name": "playerTurnCI",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"args": "argPlayerTurnCI",
	"possibleactions": [
		"playCard",
		"pullGoalie",
		"putBackGoalie"
	],
	"transitions": {
		"playerTurnCI": 2,
		"endChecks": 40,
		"resolveAction": 42
	}
}
					*/
					break;
				case "playerTurnDZ":
					/*
					{
	"name": "playerTurnDZ",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"playFree",
		"putBackGoalie"
	],
	"transitions": {
		"playerTurnDZ": 3,
		"resolveAction": 42
	}
}
					*/
					break;
				case "playerTurnOZ":
					/*
					{
	"name": "playerTurnOZ",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"args": "argPlayerTurnOZ",
	"possibleactions": [
		"playCard",
		"playFree",
		"pullGoalie",
		"putBackGoalie"
	],
	"transitions": {
		"playerTurnOZ": 4,
		"endChecks": 40,
		"resolveAction": 42
	}
}
					*/
					break;
				case "playerDefense":
					/*
					{
	"name": "playerDefense",
	"description": "${actplayer} may play a defense card",
	"descriptionmyturn": "${you} may play a defense card",
	"type": "activeplayer",
	"args": "argPlayerDefense",
	"possibleactions": [
		"playCard",
		"pass",
		"putBackGoalie"
	],
	"transitions": {
		"playerDefense": 5,
		"resolveAction": 42
	}
}
					*/
					break;
				case "playerMomentum":
					/*
					{
	"name": "playerMomentum",
	"description": "${actplayer} can draw extra cards",
	"descriptionmyturn": "${you} can draw an extra card (${remaining} left)",
	"type": "activeplayer",
	"args": "argPlayerMomentum",
	"possibleactions": [
		"drawCard",
		"pass"
	],
	"transitions": {
		"checkMomentum": 34,
		"endChecks": 40,
		"prepareReplenish": 32
	}
}
					*/
					break;
				case "playerTouchUp":
					/*
					{
	"name": "playerTouchUp",
	"description": "${actplayer} must decide if he wants to touch up with the goalie",
	"descriptionmyturn": "${you} must decide if you want to touch up with your goalie and wave off the icing",
	"type": "activeplayer",
	"possibleactions": [
		"touchUp",
		"pass"
	],
	"transitions": {
		"endChecks": 40
	}
}
					*/
					break;
				case "playerMayDiscard":
					/*
					{
	"name": "playerMayDiscard",
	"description": "${actplayer} can discard a card",
	"descriptionmyturn": "${you} can discard a card before replenishing",
	"type": "activeplayer",
	"possibleactions": [
		"discard",
		"pass"
	],
	"args": "argPlayerMayDiscard",
	"transitions": {
		"endChecks": 40
	}
}
					*/
					break;
				case "playerMustDiscard":
					/*
					{
	"name": "playerMustDiscard",
	"description": "${actplayer} must discard cards",
	"descriptionmyturn": "${you} must discard cards (${remaining} left)",
	"type": "activeplayer",
	"possibleactions": [
		"discard"
	],
	"args": "argPlayerMustDiscard",
	"transitions": {
		"discardCheck": 37
	}
}
					*/
					break;
				case "defenseMode":
					/*
					{
	"name": "defenseMode",
	"description": "A card is flipped over",
	"type": "game",
	"action": "stDefenseMode",
	"transitions": {
		"playerDecision": 13,
		"hv_switch": 26,
		"nextPlayer": 30
	}
}
					*/
					break;
				case "playerTakeShot":
					/*
					{
	"name": "playerTakeShot",
	"description": "${actplayer} must take a shot",
	"descriptionmyturn": "${you} must take a shot",
	"type": "activeplayer",
	"possibleactions": [
		"takeShot"
	],
	"transitions": {
		"shootoutCheck": 38
	}
}
					*/
					break;
				case "playerMustDiscardGoalie":
					/*
					{
	"name": "playerMustDiscardGoalie",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card",
	"type": "activeplayer",
	"possibleactions": [
		"discard"
	],
	"transitions": {
		"forcedDiscardCheck": 41
	}
}
					*/
					break;
				case "playerDefenseMode":
					/*
					{
	"name": "playerDefenseMode",
	"description": "${actplayer} must make a decision",
	"descriptionmyturn": "${you} must decide between",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard",
		"takeCard"
	],
	"transitions": {
		"changePlayers": 30
	}
}
					*/
					break;
				case "playerConfirm":
					/*
					{
	"name": "playerConfirm",
	"description": "Wait until both players have confirmed",
	"descriptionmyturn": "Ready to begin the period?",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"playerConfirm"
	],
	"action": "stPlayerConfirm",
	"transitions": {
		"beginHand": 25
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"transitions": {
		"beginPeriod": 19
	}
}
					*/
					break;
				case "faceOff":
					/*
					{
	"name": "faceOff",
	"description": "",
	"type": "game",
	"action": "stFaceOff",
	"transitions": {
		"playerTurnCI": 2,
		"playerTurnDZ": 3,
		"playerTurnOZ": 4,
		"hv_switch": 26
	}
}
					*/
					break;
				case "fight":
					/*
					{
	"name": "fight",
	"description": "",
	"type": "game",
	"action": "stFight",
	"transitions": {
		"endChecks": 40,
		"resolvePenalty": 24
	}
}
					*/
					break;
				case "penaltyBehind":
					/*
					{
	"name": "penaltyBehind",
	"description": "",
	"type": "game",
	"action": "stPenaltyBehind",
	"transitions": {
		"playerTurnCI": 2,
		"playerTurnDZ": 3,
		"playerTurnOZ": 4,
		"hv_switch": 26,
		"resolvePenalty": 24
	}
}
					*/
					break;
				case "resolvePenalty":
					/*
					{
	"name": "resolvePenalty",
	"description": "",
	"type": "game",
	"action": "stResolvePenalty",
	"transitions": {
		"faceOff": 21,
		"powerPlay": 27,
		"endChecks": 40
	}
}
					*/
					break;
				case "beginPeriod":
					/*
					{
	"name": "beginPeriod",
	"description": "",
	"type": "game",
	"action": "stBeginPeriod",
	"transitions": {
		"initialFaceoff": 21
	}
}
					*/
					break;
				case "hv_switch":
					/*
					{
	"name": "hv_switch",
	"description": "",
	"type": "game",
	"action": "stHv_switch",
	"transitions": {
		"playerTurnCI": 2,
		"playerTurnDZ": 3,
		"playerTurnOZ": 4,
		"fight": 22,
		"endChecks": 40,
		"penaltyBehind": 23,
		"resolvePenalty": 24
	}
}
					*/
					break;
				case "powerPlayCheck":
					/*
					{
	"name": "powerPlayCheck",
	"description": "",
	"type": "game",
	"action": "stPowerPlayCheck",
	"transitions": {
		"endChecks": 40,
		"prepareForPowerPlay": 28,
		"prepareReplenish": 32,
		"forceDiscardCheck": 41
	}
}
					*/
					break;
				case "prepareForPowerPlay":
					/*
					{
	"name": "prepareForPowerPlay",
	"description": "${actplayer} must begin the power play",
	"descriptionmyturn": "Are ${you} ready for the power play?",
	"type": "activeplayer",
	"possibleactions": [
		"confirm"
	],
	"transitions": {
		"beginPowerPlay": 29
	}
}
					*/
					break;
				case "powerPlay":
					/*
					{
	"name": "powerPlay",
	"description": "A power play takes place...",
	"type": "game",
	"action": "stPowerPlay",
	"transitions": {
		"endChecks": 40,
		"resolveLoosePuck": 43
	}
}
					*/
					break;
				case "changePlayers":
					/*
					{
	"name": "changePlayers",
	"description": "",
	"type": "game",
	"action": "stChangePlayers",
	"transitions": {
		"endChecks": 40
	}
}
					*/
					break;
				case "pullDecision":
					/*
					{
	"name": "pullDecision",
	"description": "${actplayer} may pull his goalie",
	"descriptionmyturn": "${you} may pull your goalie now",
	"type": "activeplayer",
	"possibleactions": [
		"pullGoalie",
		"pass"
	],
	"transitions": {
		"faceOff": 21,
		"endChecks": 40
	}
}
					*/
					break;
				case "prepareReplenish":
					/*
					{
	"name": "prepareReplenish",
	"description": "",
	"type": "game",
	"action": "stPrepareReplenish",
	"transitions": {
		"discardCheck": 37
	}
}
					*/
					break;
				case "replenish":
					/*
					{
	"name": "replenish",
	"description": "",
	"type": "game",
	"action": "stReplenish",
	"transitions": {
		"checkMomentum": 34
	}
}
					*/
					break;
				case "checkMomentum":
					/*
					{
	"name": "checkMomentum",
	"description": "",
	"type": "game",
	"action": "stCheckMomentum",
	"transitions": {
		"playerMomentum": 6,
		"playerReplenish": 33,
		"endPeriod": 35,
		"finalGoalieCheck": 44
	}
}
					*/
					break;
				case "endPeriod":
					/*
					{
	"name": "endPeriod",
	"description": "",
	"type": "game",
	"action": "stEndPeriod",
	"transitions": {
		"nextPeriod": 20,
		"shootout": 38,
		"endGame": 39
	}
}
					*/
					break;
				case "putBackDecision":
					/*
					{
	"name": "putBackDecision",
	"description": "${actplayer} may put back his goalie",
	"descriptionmyturn": "${you} may put back your goalie now",
	"type": "activeplayer",
	"possibleactions": [
		"putBackGoalie",
		"pass"
	],
	"transitions": {
		"faceOff": 21,
		"forcedDiscard": 41,
		"endChecks": 40
	}
}
					*/
					break;
				case "discardCheck":
					/*
					{
	"name": "discardCheck",
	"description": "",
	"type": "game",
	"action": "stDiscardCheck",
	"transitions": {
		"playerMustDiscard": 9,
		"replenish": 33
	}
}
					*/
					break;
				case "shootout":
					/*
					{
	"name": "shootout",
	"description": "",
	"type": "game",
	"action": "stShootout",
	"transitions": {
		"takeShot": 11,
		"endGame": 39
	}
}
					*/
					break;
				case "preFinish":
					/*
					{
	"name": "preFinish",
	"description": "",
	"type": "game",
	"action": "stPreFinish",
	"transitions": {
		"endGame": 99
	}
}
					*/
					break;
				case "endChecks":
					/*
					{
	"name": "endChecks",
	"description": "",
	"type": "game",
	"action": "stEndChecks",
	"transitions": {
		"prepareReplenish": 32,
		"resolvePenalty": 24,
		"powerPlayCheck": 27,
		"hv_switch": 26,
		"endPeriod": 35
	}
}
					*/
					break;
				case "forcedDiscardCheck":
					/*
					{
	"name": "forcedDiscardCheck",
	"description": "",
	"type": "game",
	"action": "stForcedDiscardCheck",
	"transitions": {
		"playerMustDiscard": 12,
		"prepareReplenish": 32,
		"faceOff": 21,
		"endChecks": 40,
		"discardCheck": 41,
		"finalGoalieCheck2": 45
	}
}
					*/
					break;
				case "resolveAction":
					/*
					{
	"name": "resolveAction",
	"description": "",
	"type": "game",
	"action": "stResolveAction",
	"updateGameProgression": true,
	"transitions": {
		"playerDefense": 5,
		"playerMayTouchUp": 7,
		"playerMayDiscard": 8,
		"playerDefenseMode": 10,
		"fight": 22,
		"hv_switch": 26,
		"endChecks": 40,
		"resolveLoosePuck": 43
	}
}
					*/
					break;
				case "resolveLoosePuck":
					/*
					{
	"name": "resolveLoosePuck",
	"description": "",
	"type": "game",
	"action": "stResolveLoosePuck",
	"transitions": {
		"hv_switch": 26,
		"endChecks": 40
	}
}
					*/
					break;
				case "finalGoalieCheck1":
					/*
					{
	"name": "finalGoalieCheck1",
	"description": "",
	"type": "game",
	"action": "stFinalGoalieCheck1",
	"transitions": {
		"playerTurnCI": 2,
		"playerTurnDZ": 3,
		"playerTurnOZ": 4,
		"powerPlay": 27,
		"preparePP": 28,
		"forcedToDiscard": 41,
		"finalGoalieCheck2": 45
	}
}
					*/
					break;
				case "finalGoalieCheck2":
					/*
					{
	"name": "finalGoalieCheck2",
	"description": "",
	"type": "game",
	"action": "stFinalGoalieCheck2",
	"transitions": {
		"playerTurnCI": 2,
		"playerTurnDZ": 3,
		"playerTurnOZ": 4,
		"faceOff": 21,
		"pullDecision": 31,
		"putBackDecision": 36
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
export default icecoldicehockey;
