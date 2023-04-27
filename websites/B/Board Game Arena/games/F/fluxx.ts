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

const fluxx: GamePresence = {
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
		"zombiePass": 23
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
		"continuePlay": 21,
		"zombiePass": 21,
		"endOfTurn": 23,
		"endGame": 99,
		"resolveCreeper": 35
	}
}
					*/
					break;
				case "actionResolve":
					/*
					{
	"name": "actionResolve",
	"description": "${actplayer} must resolve their action: ${action_name}",
	"descriptionmyturn": "${you} must resolve your action: ${action_name}",
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
		"playRockPaperScissors": 31,
		"resolveActionCard": 30,
		"zombiePass": 20,
		"endOfTurn": 23
	}
}
					*/
					break;
				case "playRockPaperScissors":
					/*
					{
	"name": "playRockPaperScissors",
	"description": "${challenger_name} and ${defender_name} are playing Rock-Paper-Scissors (${challenger_wins} - ${defender_wins})",
	"descriptionmyturn": "${you} are playing Rock-Paper-Scissors against ${_private.opponent_name} (${_private.my_wins} - ${_private.opponent_wins})",
	"type": "multipleactiveplayer",
	"args": "arg_playRockPaperScissors",
	"action": "st_playRockPaperScissors",
	"possibleactions": [
		"selectRockPaperScissors"
	],
	"transitions": {
		"": 32
	}
}
					*/
					break;
				case "nextRoundRockPaperScissors":
					/*
					{
	"name": "nextRoundRockPaperScissors",
	"description": "",
	"type": "game",
	"action": "st_nextRoundRockPaperScissors",
	"updateGameProgression": false,
	"transitions": {
		"continue": 31,
		"handsExchangeOccured": 21,
		"zombiePass": 20
	}
}
					*/
					break;
				case "freeRuleResolve":
					/*
					{
	"name": "freeRuleResolve",
	"description": "${actplayer} must resolve their free rule: ${action_name}",
	"descriptionmyturn": "${you} must resolve your free rule: ${action_name}",
	"type": "activeplayer",
	"args": "arg_resolveFreeRule",
	"possibleactions": [
		"resolveFreeRule",
		"resolveFreeRuleCardSelection",
		"resolveFreeRuleCardsSelection",
		"resolveFreeRuleButtons"
	],
	"transitions": {
		"resolvedFreeRule": 20,
		"resolveCreeper": 35,
		"endGame": 99,
		"zombiePass": 20,
		"endOfTurn": 23
	}
}
					*/
					break;
				case "creeperResolveTurnStart":
					/*
					{
	"name": "creeperResolveTurnStart",
	"description": "${actplayer} must resolve Creeper: ${action_name}",
	"descriptionmyturn": "${you} must resolve Creeper: ${action_name}",
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
		"endGame": 99,
		"resolveCreeper": 35
	}
}
					*/
					break;
				case "creeperResolveInPlay":
					/*
					{
	"name": "creeperResolveInPlay",
	"description": "${actplayer} must resolve Creeper: ${action_name}",
	"descriptionmyturn": "${you} must resolve Creeper: ${action_name}",
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
export default fluxx;
