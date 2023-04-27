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

const starfluxx: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "drawCards":
					/*
					{
	"name": "drawCards",
	"description": "",
	"type": "game",
	"action": "st_drawCards",
	"transitions": {
		"cardsDrawn": 20,
		"endGame": 99
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} must play ${countLabelText}${countLabelNr} card(s)",
	"descriptionmyturn": "${you} must play ${countLabelText}${countLabelNr} card(s)",
	"type": "activeplayer",
	"action": "st_playCard",
	"args": "arg_playCard",
	"possibleactions": [
		"playCard",
		"playFreeRule",
		"finishTurn"
	],
	"transitions": {
		"handLimitRulePlayed": 21,
		"keepersLimitRulePlayed": 22,
		"keepersExchangeOccured": 22,
		"endOfTurn": 23,
		"doubleAgendaRule": 25,
		"rulesChanged": 25,
		"resolveActionCard": 30,
		"resolveFreeRule": 33,
		"resolveCreeper": 35,
		"resolveTempHand": 36,
		"continuePlay": 20,
		"endGame": 99,
		"zombiePass": 23,
		"checkForSurprises": 37,
		"resolveActionByOthers": 31,
		"surprisePlayChecked": 20,
		"surpriseCancelChecked": 20
	}
}
					*/
					break;
				case "enforceHandLimitForOthers":
					/*
					{
	"name": "enforceHandLimitForOthers",
	"description": "Some players must discard card(s) for Hand Limit ${limit}${warnInflation}",
	"descriptionmyturn": "${you} can only keep ${_private.actualLimit} card(s) (discard ${_private.discardCount}) for Hand Limit ${limit}${warnInflation}",
	"type": "multipleactiveplayer",
	"args": "arg_enforceHandLimitForOthers",
	"action": "st_enforceHandLimitForOthers",
	"possibleactions": [
		"discardHandCardsExcept"
	],
	"transitions": {
		"handLimitChecked": 22,
		"zombiePass": 22,
		"endGame": 99
	}
}
					*/
					break;
				case "enforceKeepersLimitForOthers":
					/*
					{
	"name": "enforceKeepersLimitForOthers",
	"description": "Some players must remove keeper(s) for Keeper Limit ${limit}${warnInflation}",
	"descriptionmyturn": "${you} must remove ${_private.discardCount} keeper(s) for Keeper Limit ${limit}${warnInflation}",
	"type": "multipleactiveplayer",
	"args": "arg_enforceKeepersLimitForOthers",
	"action": "st_enforceKeepersLimitForOthers",
	"possibleactions": [
		"discardKeepers"
	],
	"transitions": {
		"keeperLimitChecked": 20,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "enforceHandLimitForSelf":
					/*
					{
	"name": "enforceHandLimitForSelf",
	"description": "${actplayer} must discard card(s) for Hand Limit ${limit}${warnInflation}",
	"descriptionmyturn": "${you} can only keep ${_private.actualLimit} card(s) (discard ${_private.discardCount}) for Hand Limit ${limit}${warnInflation}",
	"type": "activeplayer",
	"args": "arg_enforceHandLimitForSelf",
	"action": "st_enforceHandLimitForSelf",
	"possibleactions": [
		"discardHandCardsExcept"
	],
	"transitions": {
		"handLimitChecked": 24,
		"zombiePass": 24,
		"endGame": 99
	}
}
					*/
					break;
				case "enforceKeepersLimitForSelf":
					/*
					{
	"name": "enforceKeepersLimitForSelf",
	"description": "${actplayer} must remove keeper(s) for Keeper Limit ${limit}${warnInflation}",
	"descriptionmyturn": "${you} must remove ${_private.discardCount} keeper(s) for Keeper Limit ${limit}${warnInflation}",
	"type": "activeplayer",
	"args": "arg_enforceKeepersLimitForSelf",
	"action": "st_enforceKeepersLimitForSelf",
	"possibleactions": [
		"discardKeepers"
	],
	"transitions": {
		"keeperLimitChecked": 90,
		"zombiePass": 90,
		"endGame": 99
	}
}
					*/
					break;
				case "goalCleaning":
					/*
					{
	"name": "goalCleaning",
	"description": "${actplayer} must discard a goal",
	"descriptionmyturn": "${you} must discard a goal",
	"type": "activeplayer",
	"action": "st_goalCleaning",
	"possibleactions": [
		"discardGoal"
	],
	"transitions": {
		"continuePlay": 20,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "actionResolve":
					/*
					{
	"name": "actionResolve",
	"description": "${actplayer} must resolve their action: <i>${action_name}</i>",
	"descriptionmyturn": "${you} must resolve your action: <i>${action_name}</i>",
	"type": "activeplayer",
	"args": "arg_resolveAction",
	"possibleactions": [
		"resolveAction",
		"resolveActionPlayerSelection",
		"resolveActionCardAndPlayerSelection",
		"resolveActionCardSelection",
		"resolveActionCardsSelection",
		"resolveActionKeepersExchange",
		"resolveActionButtons"
	],
	"transitions": {
		"resolvedAction": 20,
		"resolveCreeper": 35,
		"handsExchangeOccured": 21,
		"keepersExchangeOccured": 22,
		"rulesChanged": 25,
		"endGame": 99,
		"resolveActionCard": 30,
		"zombiePass": 20,
		"endOfTurn": 23,
		"checkForSurprises": 37
	}
}
					*/
					break;
				case "actionResolveForOther":
					/*
					{
	"name": "actionResolveForOther",
	"description": "Some players must resolve the action: <i>${action_name}</i>",
	"descriptionmyturn": "${you} must resolve the action: <i>${action_name}</i>",
	"type": "multipleactiveplayer",
	"args": "arg_actionResolveForOther",
	"action": "st_actionResolveForOther",
	"possibleactions": [
		"resolveActionForOtherByCardSelection"
	],
	"transitions": {
		"continuePlay": 20,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "freeRuleResolve":
					/*
					{
	"name": "freeRuleResolve",
	"description": "${actplayer} must resolve their free play: <i>${action_name}</i>",
	"descriptionmyturn": "${you} must resolve your free play: <i>${action_name}</i>",
	"type": "activeplayer",
	"args": "arg_resolveFreeRule",
	"possibleactions": [
		"resolveFreeRule",
		"resolveFreeRuleCardSelection",
		"resolveFreeRuleCardsSelection",
		"resolveFreeRuleButtons",
		"resolveFreeRulePlayerSelection",
		"resolveFreeRuleCardAndPlayerSelection"
	],
	"transitions": {
		"resolvedFreeRule": 20,
		"resolveCreeper": 35,
		"endGame": 99,
		"zombiePass": 20,
		"endOfTurn": 23,
		"handsExchangeOccured": 21,
		"keepersExchangeOccured": 22,
		"checkForSurprises": 37
	}
}
					*/
					break;
				case "creeperResolveTurnStart":
					/*
					{
	"name": "creeperResolveTurnStart",
	"description": "${actplayer} must resolve Creeper: <i>${action_name}</i>",
	"descriptionmyturn": "${you} must resolve Creeper: <i>${action_name}</i>",
	"type": "activeplayer",
	"args": "arg_resolveCreeper",
	"action": "st_resolveCreeperTurnStart",
	"possibleactions": [
		"resolveCreeperCardSelection",
		"resolveCreeperPlayerSelection",
		"resolveCreeperButtons"
	],
	"transitions": {
		"resolvedCreeper": 89,
		"zombiePass": 89,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "creeperResolveInPlay":
					/*
					{
	"name": "creeperResolveInPlay",
	"description": "${actplayer} must resolve Creeper: <i>${action_name}</i>",
	"descriptionmyturn": "${you} must resolve Creeper: <i>${action_name}</i>",
	"type": "multipleactiveplayer",
	"args": "arg_resolveCreeper",
	"action": "st_resolveCreeperInPlay",
	"possibleactions": [
		"resolveCreeperCardSelection",
		"resolveCreeperPlayerSelection",
		"resolveCreeperButtons"
	],
	"transitions": {
		"resolveCreeper": 35,
		"resolvedCreeper": 20,
		"resolvedFreeRule": 20,
		"resolvedAction": 20,
		"continuePlay": 20,
		"endGame": 99,
		"zombiePass": 20,
		"endOfTurn": 23
	}
}
					*/
					break;
				case "tempHandPlay":
					/*
					{
	"name": "tempHandPlay",
	"description": "${actplayer} must play ${tmpToPlay} card(s) from ${tmpHandName}",
	"descriptionmyturn": "${you} must play ${tmpToPlay} card(s) from ${tmpHandName}",
	"type": "activeplayer",
	"action": "st_tempHandPlay",
	"args": "arg_tempHandPlay",
	"possibleactions": [
		"selectTempHandCard"
	],
	"transitions": {
		"selectedCard": 20,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "surpriseCounterPlay":
					/*
					{
	"name": "surpriseCounterPlay",
	"description": "Some players may choose to Surprise counter <i>${playedCardName}</i>",
	"descriptionmyturn": "${you} can choose to Surprise counter <i>${playedCardName}</i>",
	"type": "multipleactiveplayer",
	"args": "arg_allowSurpriseCounterPlay",
	"action": "st_allowSurpriseCounterPlay",
	"possibleactions": [
		"decideSurpriseCounterPlay"
	],
	"transitions": {
		"checkForSurpriseCancels": 38,
		"surprisePlayChecked": 20,
		"resolveActionByOthers": 31,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "surpriseCancelSurprise":
					/*
					{
	"name": "surpriseCancelSurprise",
	"description": "Some players may choose to cancel the Surprise on <i>${playedCardName}</i>",
	"descriptionmyturn": "${you} can choose to cancel the Surprise on <i>${playedCardName}</i>",
	"type": "multipleactiveplayer",
	"args": "arg_allowSurpriseCancelSurprise",
	"action": "st_allowSurpriseCancelSurprise",
	"possibleactions": [
		"decideSurpriseCancelSurprise"
	],
	"transitions": {
		"checkForSurpriseCancels": 38,
		"surpriseCancelChecked": 20,
		"resolveActionByOthers": 31,
		"zombiePass": 20,
		"endOfTurn": 23,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayerTurnStartCreepers":
					/*
					{
	"name": "nextPlayerTurnStartCreepers",
	"description": "",
	"type": "game",
	"action": "st_nextPlayerTurnStartCreepers",
	"updateGameProgression": false,
	"transitions": {
		"resolveCreeper": 34,
		"finishedTurnStartCreepers": 10,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "st_nextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"": 89
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
export default starfluxx;
