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

const krosmasterarena: GamePresence = {
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
				case "chooseteamMode":
					/*
					{
	"name": "chooseteamMode",
	"description": "",
	"type": "manager",
	"action": "stChooseTeamMode",
	"transitions": {
		"draft": 3,
		"simultaneous": 7
	}
}
					*/
					break;
				case "chooseTeam":
					/*
					{
	"name": "chooseTeam",
	"description": "${actplayer} must choose a Krosmaster for his team",
	"descriptionmyturn": "${you} must choose a Krosmaster for your team",
	"type": "activeplayer",
	"possibleactions": [
		"chooseteam"
	],
	"transitions": {
		"chooseteam": 4
	}
}
					*/
					break;
				case "chooseTeamNext":
					/*
					{
	"name": "chooseTeamNext",
	"description": "",
	"type": "manager",
	"action": "stChooseTeamNext",
	"transitions": {
		"next": 3,
		"end": 9
	}
}
					*/
					break;
				case "placeTeam":
					/*
					{
	"name": "placeTeam",
	"description": "${actplayer} must place his Krosmasters on the board",
	"descriptionmyturn": "${you} must place your Krosmasters on the board",
	"type": "activeplayer",
	"possibleactions": [
		"placeteam"
	],
	"args": "argPlaceTeam",
	"transitions": {
		"placeteam": 6
	}
}
					*/
					break;
				case "placeteamNext":
					/*
					{
	"name": "placeteamNext",
	"description": "",
	"type": "manager",
	"action": "stPlaceTeamNext",
	"transitions": {
		"next": 5,
		"end": 120
	}
}
					*/
					break;
				case "chooseTeamSimultaneous":
					/*
					{
	"name": "chooseTeamSimultaneous",
	"description": "Everyone must choose his team",
	"descriptionmyturn": "${you} must choose a Krosmaster for your team",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"chooseteam",
		"chooseteamsimultaneous"
	],
	"transitions": {
		"chooseteam": 8
	}
}
					*/
					break;
				case "chooseTeamSimultaneousEnd":
					/*
					{
	"name": "chooseTeamSimultaneousEnd",
	"description": "",
	"type": "manager",
	"action": "stChooseTeamSimultaneousEnd",
	"transitions": {
		"end": 9,
		"placeTeam": 5
	}
}
					*/
					break;
				case "chooseBoardSide":
					/*
					{
	"name": "chooseBoardSide",
	"description": "${actplayer} must choose a board side for his/her team",
	"descriptionmyturn": "${you} must choose a board side for your team",
	"type": "activeplayer",
	"possibleactions": [
		"chooseBoardOrientation"
	],
	"transitions": {
		"chooseBoardOrientation": 29
	}
}
					*/
					break;
				case "playerTurnStart":
					/*
					{
	"name": "playerTurnStart",
	"description": "",
	"type": "manager",
	"action": "stPlayerTurnStart",
	"transitions": {
		"done": 11,
		"first_turn": 20
	}
}
					*/
					break;
				case "changeDie":
					/*
					{
	"name": "changeDie",
	"description": "${actplayer} must choose some dice face",
	"descriptionmyturn": "${you} must choose some dice face",
	"type": "activeplayer",
	"action": "stChangeDie",
	"possibleactions": [
		"turndice",
		"reroll"
	],
	"transitions": {
		"skip": 111,
		"turndice": 111,
		"reroll": 13
	}
}
					*/
					break;
				case "inspirationDice":
					/*
					{
	"name": "inspirationDice",
	"description": "${actplayer} must attribute inspiration dice to Krosmasters or exchange them with Kamas",
	"descriptionmyturn": "${you} must attribute inspiration dice to Krosmasters or",
	"type": "activeplayer",
	"action": "stInspirationDice",
	"possibleactions": [
		"inspirationattr",
		"reroll"
	],
	"transitions": {
		"inspirationattr": 20,
		"reroll": 13,
		"gameEnd": 99
	}
}
					*/
					break;
				case "playerTurnStartReroll":
					/*
					{
	"name": "playerTurnStartReroll",
	"description": "",
	"type": "manager",
	"action": "stPlayerTurnStartReroll",
	"transitions": {
		"done": 11
	}
}
					*/
					break;
				case "which_mob":
					/*
					{
	"name": "which_mob",
	"description": "${actplayer} must choose a ${mob_type} to activate",
	"descriptionmyturn": "${you} must choose a ${mob_type} to activate",
	"type": "activeplayer",
	"args": "argWitchMob",
	"possibleactions": [
		"which_mob"
	],
	"transitions": {
		"which_mob": 20
	}
}
					*/
					break;
				case "nextMasterTurn":
					/*
					{
	"name": "nextMasterTurn",
	"description": "",
	"type": "manager",
	"action": "stNextMasterTurn",
	"updateGameProgression": true,
	"transitions": {
		"masterturn": 21,
		"no_more_masters": 30,
		"which_mob": 19
	}
}
					*/
					break;
				case "masterturn":
					/*
					{
	"name": "masterturn",
	"description": "${master}: ${actplayer} may use ${mp} Move Points and ${ap} Action Points",
	"descriptionmyturn": "${master}: ${you} may use ${mp} Move Points and ${ap} Action Points",
	"type": "activeplayer",
	"args": "argMasterturn",
	"possibleactions": [
		"masterturn"
	],
	"transitions": {
		"nextAction": 21,
		"endOfTurn": 20,
		"spelltarget": 22,
		"buyReward": 25,
		"buyRewardHidden": 26,
		"boostChoice": 28,
		"move_on_latest_position": 106,
		"potion_bag": 108,
		"masquerade": 116,
		"diy": 110,
		"cometomama": 125,
		"thrifty": 130,
		"gameEnd": 99
	}
}
					*/
					break;
				case "spelltarget":
					/*
					{
	"name": "spelltarget",
	"description": "${master}: ${actplayer} must choose the target for ${spell}",
	"descriptionmyturn": "${master}: ${you} must choose the target for ${spell}",
	"type": "activeplayer",
	"args": "argSpelltarget",
	"possibleactions": [
		"spelltarget",
		"cancel"
	],
	"transitions": {
		"spelltarget": 23,
		"endOfTurn": 20,
		"gameEnd": 99,
		"end": 21,
		"move_next_to_target": 101,
		"summon_around": 102,
		"summon_around_square": 1102,
		"summon_choice": 103,
		"summon_place": 128,
		"give_one_move": 104,
		"move_adjacent_to_target": 105,
		"move_adjacent_opponent_to_target": 119,
		"move_adjacent_ally_not_self_to_target": 129,
		"move_adjacent_ally_to_target_then_move_next_to_target": 113,
		"move_adjacent_ally_summon_to_target": 114,
		"move_adjacent_ally_gobbowl_to_target": 115,
		"cold_chain": 107,
		"drhellzerkercharge": 109,
		"temporalbubble": 121,
		"suckerstab": 123,
		"move_next_to_me": 124,
		"dracometeors": 126,
		"selectSecondaryTargets": 117
	}
}
					*/
					break;
				case "applySpellDamages":
					/*
					{
	"name": "applySpellDamages",
	"description": "",
	"type": "manager",
	"action": "stApplySpellDamages",
	"transitions": {
		"end": 21,
		"endOfTurn": 20,
		"spelltarget": 22,
		"gameEnd": 99
	}
}
					*/
					break;
				case "buyReward":
					/*
					{
	"name": "buyReward",
	"description": "${actplayer} want to buy ${reward_type} (cost: ${cost} kamas)",
	"descriptionmyturn": "${you} must choose a Krosmaster for ${reward_type} (cost: ${cost} kamas)",
	"type": "activeplayer",
	"args": "argBuyReward",
	"possibleactions": [
		"buyreward"
	],
	"transitions": {
		"done_buyreward": 21
	}
}
					*/
					break;
				case "buyRewardHidden":
					/*
					{
	"name": "buyRewardHidden",
	"description": "${actplayer} want to buy a faced down Daemonic reward (cost: ${cost} kamas)",
	"descriptionmyturn": "${you} must choose a Krosmaster for ${reward_type} (cost: ${cost} kamas)",
	"type": "activeplayer",
	"args": "argBuyReward",
	"possibleactions": [
		"buyreward"
	],
	"transitions": {
		"done_buyreward": 21
	}
}
					*/
					break;
				case "boostChoice":
					/*
					{
	"name": "boostChoice",
	"description": "Stiff Pahoa: ${actplayer} must choose a bonus",
	"descriptionmyturn": "Stiff Pahoa ${you} must choose:",
	"type": "activeplayer",
	"args": "argMasterturn",
	"possibleactions": [
		"boostChoice"
	],
	"transitions": {
		"boostChoice": 21
	}
}
					*/
					break;
				case "chooseBoardSideEnd":
					/*
					{
	"name": "chooseBoardSideEnd",
	"description": "",
	"type": "manager",
	"action": "stChooseBoardSideEnd",
	"transitions": {
		"end": 5
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "manager",
	"action": "stEndOfTurn",
	"transitions": {
		"next_turn": 10,
		"gameEnd": 99
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
				case "move_next_to_target":
					/*
					{
	"name": "move_next_to_target",
	"description": "${master}: ${actplayer} must move next to its target",
	"descriptionmyturn": "${master}: ${you} must move next to its target",
	"type": "activeplayer",
	"args": "argMoveNextToTarget",
	"possibleactions": [
		"move_next_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_next_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "place_next_to_target":
					/*
					{
	"name": "place_next_to_target",
	"description": "${master}: ${actplayer} must place a summon around its target",
	"descriptionmyturn": "${master}: ${you} must place a summon around its target",
	"type": "activeplayer",
	"args": "argPlaceNextToTarget",
	"possibleactions": [
		"place_next_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"place_next_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "summon_choice":
					/*
					{
	"name": "summon_choice",
	"description": "${master}: ${actplayer} must choose which mob to summon",
	"descriptionmyturn": "${master}: ${you} must choose which mob to summon",
	"type": "activeplayer",
	"args": "argChooseSummon",
	"possibleactions": [
		"summon_choice"
	],
	"transitions": {
		"summon_choice": 23
	}
}
					*/
					break;
				case "give_one_move":
					/*
					{
	"name": "give_one_move",
	"description": "${master}: ${actplayer} must move to a free cell",
	"descriptionmyturn": "${master}: ${you} must move to a free cell",
	"type": "activeplayer",
	"args": "argGiveOneMove",
	"possibleactions": [
		"give_one_move",
		"select_square_after_effect"
	],
	"transitions": {
		"give_one_move": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "move_adjacent_to_target":
					/*
					{
	"name": "move_adjacent_to_target",
	"description": "${master}: ${actplayer} must choose a character to move on target",
	"descriptionmyturn": "${master}: ${you} must choose a character to move on target",
	"type": "activeplayer",
	"args": "argMoveAdjacent",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "move_on_latest_position":
					/*
					{
	"name": "move_on_latest_position",
	"description": "${master}: ${actplayer} must choose a master to move to Mint Jelly freed cell",
	"descriptionmyturn": "${master}: ${you} must choose a character to move to Mint Jelly freed cell",
	"type": "activeplayer",
	"args": "argMoveAdjacentLatestPos",
	"possibleactions": [
		"move_on_latest_position",
		"select_square_after_effect"
	],
	"transitions": {
		"move_on_latest_position": 21,
		"spelltarget": 22
	}
}
					*/
					break;
				case "cold_chain":
					/*
					{
	"name": "cold_chain",
	"description": "${master}: ${actplayer} must choose a target for Cold Chain",
	"descriptionmyturn": "${master}: ${you} must choose a target for Cold Chain",
	"type": "activeplayer",
	"args": "argColdChain",
	"possibleactions": [
		"cold_chain",
		"select_square_after_effect"
	],
	"transitions": {
		"cold_chain": 23
	}
}
					*/
					break;
				case "potion_bag":
					/*
					{
	"name": "potion_bag",
	"description": "${master}: ${actplayer} must choose : +4 AP or +2 MP",
	"descriptionmyturn": "${master}: ${you} must choose:",
	"type": "activeplayer",
	"args": "argMasterturn",
	"possibleactions": [
		"potion_bag"
	],
	"transitions": {
		"potion_bag": 21
	}
}
					*/
					break;
				case "drhellzerker":
					/*
					{
	"name": "drhellzerker",
	"description": "${master}: ${actplayer} must choose the number of MP to spend",
	"descriptionmyturn": "${master}: ${you} must choose how many MP to spend",
	"type": "activeplayer",
	"args": "argDrHellZerker",
	"possibleactions": [
		"drhellzerker",
		"cancel"
	],
	"transitions": {
		"drhellzerker": 22,
		"spelltarget": 23,
		"end": 23
	}
}
					*/
					break;
				case "diy":
					/*
					{
	"name": "diy",
	"description": "${master}: ${actplayer} must choose 2 powers for Tactical Arrow",
	"descriptionmyturn": "${master}: ${you} must choose 2 powers for Tactical Arrow:",
	"type": "activeplayer",
	"args": "argMasterturn",
	"possibleactions": [
		"diy",
		"cancel"
	],
	"transitions": {
		"diy": 21,
		"spelltarget": 21,
		"end": 23
	}
}
					*/
					break;
				case "changeDieOnDouble":
					/*
					{
	"name": "changeDieOnDouble",
	"description": "${actplayer} may reroll to avoid the double",
	"descriptionmyturn": "${you} may re-roll to avoid the double",
	"type": "activeplayer",
	"action": "stChangeDieOnDouble",
	"possibleactions": [
		"donotreroll",
		"reroll"
	],
	"transitions": {
		"skip": 12,
		"reroll": 13,
		"donotreroll": 112
	}
}
					*/
					break;
				case "inspirationDiceNoReroll":
					/*
					{
	"name": "inspirationDiceNoReroll",
	"description": "${actplayer} must attribute inspiration dice to Krosmasters or exchange them with Kamas",
	"descriptionmyturn": "${you} must attribute inspiration dice to Krosmasters or",
	"type": "activeplayer",
	"action": "stInspirationDice",
	"possibleactions": [
		"inspirationattr",
		"reroll"
	],
	"transitions": {
		"inspirationattr": 20,
		"reroll": 13,
		"gameEnd": 99
	}
}
					*/
					break;
				case "move_adjacent_ally_to_target_then_move_next_to_target":
					/*
					{
	"name": "move_adjacent_ally_to_target_then_move_next_to_target",
	"description": "${master}: ${actplayer} must choose a character",
	"descriptionmyturn": "${master}: ${you} must choose a character",
	"type": "activeplayer",
	"args": "argMoveAdjacentNotSelf",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 101,
		"gameEnd": 99,
		"spelltarget": 22,
		"end": 21
	}
}
					*/
					break;
				case "move_adjacent_ally_summon_to_target":
					/*
					{
	"name": "move_adjacent_ally_summon_to_target",
	"description": "${master}: ${actplayer} must choose an adjacent ally summon",
	"descriptionmyturn": "${master}: ${you} must choose an adjacent ally summon",
	"type": "activeplayer",
	"args": "argMoveAdjacentAllySummon",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22,
		"end": 21
	}
}
					*/
					break;
				case "move_adjacent_ally_gobbowl_to_target":
					/*
					{
	"name": "move_adjacent_ally_gobbowl_to_target",
	"description": "${master}: ${actplayer} must choose an adjacent ally gobbowl",
	"descriptionmyturn": "${master}: ${you} must choose an adjacent ally gobbowl",
	"type": "activeplayer",
	"args": "argMoveAdjacentAllygobbowl",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 23,
		"end": 21,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "masquerade":
					/*
					{
	"name": "masquerade",
	"description": "${master}: ${actplayer} can replace Maskeman by another one",
	"descriptionmyturn": "${master}: ${you} may choose to replace Maskeman by another one :",
	"type": "activeplayer",
	"args": "argChooseMasterSwitch",
	"possibleactions": [
		"masquerade",
		"cancel"
	],
	"transitions": {
		"masquerade": 21,
		"endOfTurn": 20,
		"gameEnd": 99
	}
}
					*/
					break;
				case "selectSecondaryTargets":
					/*
					{
	"name": "selectSecondaryTargets",
	"description": "${master}: ${actplayer} must choose target (${nbr}/${total_nbr}) for ${spell}",
	"descriptionmyturn": "${master}: ${you} must choose target (${nbr}/${total_nbr}) for ${spell}",
	"type": "activeplayer",
	"args": "argChooseSecondaryTargets",
	"possibleactions": [
		"selectSecondaryTargets",
		"select_square_after_effect",
		"cancel"
	],
	"transitions": {
		"selectionComplete": 118,
		"continue": 117,
		"end": 21
	}
}
					*/
					break;
				case "endTargetsSelection":
					/*
					{
	"name": "endTargetsSelection",
	"description": "",
	"type": "manager",
	"action": "stEndTargetsSelection",
	"transitions": {
		"end": 21
	}
}
					*/
					break;
				case "move_adjacent_opponent_to_target":
					/*
					{
	"name": "move_adjacent_opponent_to_target",
	"description": "${master}: ${actplayer} must choose a character to move on target",
	"descriptionmyturn": "${master}: ${you} must choose a character to move on target",
	"type": "activeplayer",
	"args": "argMoveAdjacentOpponent",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "combatStarts":
					/*
					{
	"name": "combatStarts",
	"description": "",
	"type": "manager",
	"action": "stCombatStarts",
	"transitions": {
		"nextMasterTurn": 20
	}
}
					*/
					break;
				case "temporalbubble":
					/*
					{
	"name": "temporalbubble",
	"description": "${master}: ${actplayer} may spend 1 AP to give -3 AP to a target",
	"descriptionmyturn": "${master}: ${you} may spend 1 AP to give -3 AP to a target",
	"type": "activeplayer",
	"args": "argTemporalBubble",
	"possibleactions": [
		"temporalbubble",
		"select_square_after_effect",
		"cancel"
	],
	"transitions": {
		"temporalbubble": 121,
		"end": 122
	}
}
					*/
					break;
				case "endTemporalBubble":
					/*
					{
	"name": "endTemporalBubble",
	"description": "",
	"type": "manager",
	"action": "stEndTemporalBubble",
	"transitions": {
		"end": 22
	}
}
					*/
					break;
				case "suckerstab":
					/*
					{
	"name": "suckerstab",
	"description": "${master}: ${actplayer} must choose the number of AP to spend (1 AP = 1 retreat)",
	"descriptionmyturn": "${master}: ${you} must choose how many AP to spend (1 AP = 1 retreat)",
	"type": "activeplayer",
	"args": "argSuckerStab",
	"possibleactions": [
		"suckerstab",
		"cancel"
	],
	"transitions": {
		"suckerstab": 22,
		"spelltarget": 23
	}
}
					*/
					break;
				case "move_next_to_me":
					/*
					{
	"name": "move_next_to_me",
	"description": "${master}: ${actplayer} must move his target next to him",
	"descriptionmyturn": "${master}: ${you} must move your target next to you",
	"type": "activeplayer",
	"args": "argMoveNextToMe",
	"possibleactions": [
		"move_next_to_me",
		"select_square_after_effect"
	],
	"transitions": {
		"move_next_to_me": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "cometomama":
					/*
					{
	"name": "cometomama",
	"description": "${master}: ${actplayer} must choose the number of Kama to spend (1 kama = +1 invocation limit)",
	"descriptionmyturn": "${master}: ${you} must choose the number of Kama to spend (1 kama = +1 invocation limit)",
	"type": "activeplayer",
	"args": "argComeToMama",
	"possibleactions": [
		"cometomama",
		"cancel"
	],
	"transitions": {
		"cometomama": 21,
		"spelltarget": 21
	}
}
					*/
					break;
				case "dracometeors":
					/*
					{
	"name": "dracometeors",
	"description": "${master}: ${actplayer} may spend 1 AP for +2 damages for a target",
	"descriptionmyturn": "${master}: ${you} may spend 1 AP for +2 damages for a target",
	"type": "activeplayer",
	"args": "argTemporalBubble",
	"possibleactions": [
		"dracometeors",
		"select_square_after_effect",
		"cancel"
	],
	"transitions": {
		"dracometeors": 126,
		"end": 127
	}
}
					*/
					break;
				case "endDracoMeteors":
					/*
					{
	"name": "endDracoMeteors",
	"description": "",
	"type": "manager",
	"action": "stEndDracoMeteors",
	"transitions": {
		"end": 22
	}
}
					*/
					break;
				case "summon_place":
					/*
					{
	"name": "summon_place",
	"description": "${master}: ${actplayer} must choose an empty cell",
	"descriptionmyturn": "${master}: ${you} must choose an empty cell",
	"type": "activeplayer",
	"args": "argChooseSummonPlace",
	"possibleactions": [
		"summonPlace",
		"select_square_after_effect"
	],
	"transitions": {
		"continue": 128,
		"selectionComplete": 21
	}
}
					*/
					break;
				case "move_adjacent_ally_not_self_to_target":
					/*
					{
	"name": "move_adjacent_ally_not_self_to_target",
	"description": "${master}: ${actplayer} must choose a character to move on target",
	"descriptionmyturn": "${master}: ${you} must choose a character to move on target",
	"type": "activeplayer",
	"args": "argMoveAdjacentNotSelf",
	"possibleactions": [
		"move_adjacent_to_target",
		"select_square_after_effect"
	],
	"transitions": {
		"move_adjacent_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
	}
}
					*/
					break;
				case "thrifty":
					/*
					{
	"name": "thrifty",
	"description": "${master}: ${actplayer} can ignore the spell cost in kama",
	"descriptionmyturn": "${master}: ${you} can ignore the spell cost in kama",
	"type": "activeplayer",
	"args": "argThrifty",
	"possibleactions": [
		"thrifty",
		"cancel"
	],
	"transitions": {
		"spelltarget": 22,
		"end": 23
	}
}
					*/
					break;
				case "place_next_to_target_square":
					/*
					{
	"name": "place_next_to_target_square",
	"description": "${master}: ${actplayer} must place a summon around its target",
	"descriptionmyturn": "${master}: ${you} must place a summon around its target",
	"type": "activeplayer",
	"args": "argPlaceNextToTargetSquare",
	"possibleactions": [
		"place_next_to_target_square",
		"select_square_after_effect"
	],
	"transitions": {
		"place_next_to_target": 23,
		"gameEnd": 99,
		"spelltarget": 22
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
export default krosmasterarena;
