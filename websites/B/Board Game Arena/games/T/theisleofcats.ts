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

const theisleofcats: GamePresence = {
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
		"": 124
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
				case "STATE_PHASE_0_FILL_THE_FIELDS":
					/*
					{
	"name": "STATE_PHASE_0_FILL_THE_FIELDS",
	"description": "The fields are filled with cats",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase0FillTheFields",
	"transitions": {
		"": 101
	}
}
					*/
					break;
				case "STATE_PHASE_1_FISHING":
					/*
					{
	"name": "STATE_PHASE_1_FISHING",
	"description": "All players go fishing",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase1Fishing",
	"transitions": {
		"nextSkipAnytimeRound": 102
	}
}
					*/
					break;
				case "STATE_PHASE_2_EXPLORE_DEAL_CARDS":
					/*
					{
	"name": "STATE_PHASE_2_EXPLORE_DEAL_CARDS",
	"description": "All players are dealt new cards",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase2ExploreDealCards",
	"transitions": {
		"": 103
	}
}
					*/
					break;
				case "STATE_PHASE_2_EXPLORE_DRAFT":
					/*
					{
	"name": "STATE_PHASE_2_EXPLORE_DRAFT",
	"description": "All players must choose ${nbCards} cards to keep",
	"descriptionmyturn": "${you} must choose ${nbCards} cards to keep",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"args": "argPhase2ExploreDraft",
	"possibleactions": [
		"phase2DraftKeepCards"
	],
	"transitions": {
		"next": 105
	}
}
					*/
					break;
				case "STATE_PHASE_2_BUY_CARDS":
					/*
					{
	"name": "STATE_PHASE_2_BUY_CARDS",
	"description": "All players must choose which cards to buy",
	"descriptionmyturn": "${you} must choose which cards to buy",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"phase2BuyCards"
	],
	"transitions": {
		"next": 122
	}
}
					*/
					break;
				case "STATE_PHASE_2_EXPLORE_DRAFT_PASS_CARDS":
					/*
					{
	"name": "STATE_PHASE_2_EXPLORE_DRAFT_PASS_CARDS",
	"description": "Passing remaning cards",
	"type": "game",
	"action": "stPhase2ExplorePassCards",
	"transitions": {
		"continueDraft": 103,
		"nextSkipAnytimeRound": 104
	}
}
					*/
					break;
				case "STATE_PHASE_3_READ_LESSONS":
					/*
					{
	"name": "STATE_PHASE_3_READ_LESSONS",
	"description": "Reading lessons",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase3ReadLessons",
	"transitions": {
		"nextSkipAnytimeRoundRescue": 131,
		"nextSkipAnytimeRoundReveal": 108
	}
}
					*/
					break;
				case "STATE_PHASE_4_CHOOSE_RESCUE_CARDS":
					/*
					{
	"name": "STATE_PHASE_4_CHOOSE_RESCUE_CARDS",
	"description": "All players must choose which rescue cards will be available for the Rescue phase",
	"descriptionmyturn": "${you} must choose which rescue cards will be available for the Rescue phase",
	"type": "multipleactiveplayer",
	"action": "stPhase4ActivatePlayersWithRescueCards",
	"possibleactions": [
		"phase4PlayRescueCards"
	],
	"transitions": {
		"next": 108
	}
}
					*/
					break;
				case "STATE_PHASE_4_REVEAL_RESCUE_CARDS":
					/*
					{
	"name": "STATE_PHASE_4_REVEAL_RESCUE_CARDS",
	"description": "Revealing rescue cards and adjusting turn order",
	"type": "game",
	"action": "stPhase4RevealRecueCards",
	"transitions": {
		"nextSkipAnytimeRound": 121
	}
}
					*/
					break;
				case "STATE_PHASE_4_RESCUE_CAT":
					/*
					{
	"name": "STATE_PHASE_4_RESCUE_CAT",
	"description": "${actplayer} must rescue a cat or pass",
	"descriptionmyturn": "${you} must rescue a cat or pass",
	"type": "activeplayer",
	"args": "argPhase4RescueCat",
	"possibleactions": [
		"phase4ConfirmActions",
		"phase4Pass",
		"playAnytimeCard"
	],
	"transitions": {
		"next": 110,
		"nextAnytimeBuyCards": 113,
		"nextAnytimeDrawAndBoatShape": 114,
		"nextAnytimeDrawAndFieldShape": 115
	}
}
					*/
					break;
				case "STATE_PHASE_4_NEXT_PLAYER":
					/*
					{
	"name": "STATE_PHASE_4_NEXT_PLAYER",
	"description": "Ending player turn",
	"type": "game",
	"action": "stPhase4NextPlayer",
	"transitions": {
		"nextSkipAnytimeRoundPhase4": 109,
		"nextSkipAnytimeRoundPhase5": 123
	}
}
					*/
					break;
				case "STATE_PHASE_5_RARE_FINDS":
					/*
					{
	"name": "STATE_PHASE_5_RARE_FINDS",
	"description": "${actplayer} must take a rare find or pass",
	"descriptionmyturn": "${you} must take a rare find or pass",
	"type": "activeplayer",
	"args": "argPhase5RareFinds",
	"possibleactions": [
		"phase5ConfirmActions",
		"phase5Pass",
		"playAnytimeCard"
	],
	"transitions": {
		"next": 112,
		"nextAnytimeBuyCards": 113,
		"nextAnytimeDrawAndBoatShape": 114,
		"nextAnytimeDrawAndFieldShape": 115
	}
}
					*/
					break;
				case "STATE_PHASE_5_NEXT_PLAYER":
					/*
					{
	"name": "STATE_PHASE_5_NEXT_PLAYER",
	"description": "Ending player turn",
	"type": "game",
	"action": "stPhase5NextPlayer",
	"transitions": {
		"nextSkipAnytimeRoundPhase5": 111,
		"nextSkipAnytimeRoundPhase0": 100,
		"endGame": 120
	}
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_BUY_CARDS":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_BUY_CARDS",
	"description": "${actplayer} must choose which cards to buy",
	"descriptionmyturn": "${you} must choose which cards to buy",
	"type": "activeplayer",
	"possibleactions": [
		"phaseAnytimeBuyCards"
	],
	"transitions": []
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_DRAW_AND_BOAT_SHAPE":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_DRAW_AND_BOAT_SHAPE",
	"description": "${actplayer} must place the drawn shape",
	"descriptionmyturn": "${you} must place the drawn shape",
	"type": "activeplayer",
	"args": "argPhaseAnytimeDrawAndBoatShape",
	"possibleactions": [
		"phaseAnytimeDrawAndBoatShapeConfirmActions"
	],
	"transitions": []
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_DRAW_AND_FIELD_SHAPE":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_DRAW_AND_FIELD_SHAPE",
	"description": "${actplayer} must choose a field for the drawn shape (${drawStep} of 4)",
	"descriptionmyturn": "${you} must choose a field for the drawn shape (${drawStep} of 4)",
	"type": "activeplayer",
	"args": "argPhaseAnytimeDrawAndFieldShape",
	"possibleactions": [
		"phaseAnytimePlaceFieldShape"
	],
	"transitions": {
		"nextAnytimeDrawAndFieldShape": 115
	}
}
					*/
					break;
				case "STATE_STACK_STATE_POP":
					/*
					{
	"name": "STATE_STACK_STATE_POP",
	"description": "",
	"type": "game",
	"action": "stStateStackPop",
	"transitions": []
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_ROUND":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_ROUND",
	"description": "${actplayer} can play an Anytime card (Next: ${nextPhase}${comma}${nextPlayerName})",
	"descriptionmyturn": "${you} can play an Anytime card (Next: ${nextPhase}${comma}${nextPlayerName})",
	"type": "activeplayer",
	"args": "argPhaseAnytimeRound",
	"possibleactions": [
		"phaseAnytimeRoundConfirm",
		"playAnytimeCard"
	],
	"transitions": {
		"next": 118,
		"nextAnytimeBuyCards": 113,
		"nextAnytimeDrawAndBoatShape": 114,
		"nextAnytimeDrawAndFieldShape": 115
	}
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_ROUND_NEXT_PLAYER":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_ROUND_NEXT_PLAYER",
	"description": "Ending player turn",
	"type": "game",
	"action": "stPhaseAnytimeRoundNextPlayer",
	"transitions": {
		"nextPlayer": 117,
		"nextRestartRound": 119
	}
}
					*/
					break;
				case "STATE_PHASE_ANYTIME_ROUND_ENTER":
					/*
					{
	"name": "STATE_PHASE_ANYTIME_ROUND_ENTER",
	"description": "Entering Anytime card phase",
	"type": "game",
	"action": "stPhaseAnytimeRoundEnter",
	"transitions": {
		"next": 117
	}
}
					*/
					break;
				case "STATE_END_GAME_SCORING":
					/*
					{
	"name": "STATE_END_GAME_SCORING",
	"description": "End game scoring",
	"updateGameProgression": true,
	"type": "game",
	"action": "stEndGameScoring",
	"transitions": {
		"": 99
	}
}
					*/
					break;
				case "STATE_PHASE_4_BEFORE_RESCUE_CAT":
					/*
					{
	"name": "STATE_PHASE_4_BEFORE_RESCUE_CAT",
	"description": "",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase4BeforeRescueCat",
	"transitions": {
		"nextSkipAnytimeRoundPhase4": 130,
		"nextSkipAnytimeRoundPhase5": 123
	}
}
					*/
					break;
				case "STATE_PHASE_2_AFTER_BUY_CARDS":
					/*
					{
	"name": "STATE_PHASE_2_AFTER_BUY_CARDS",
	"description": "After buying cards",
	"type": "game",
	"action": "stPhase2AfterBuyCards",
	"transitions": {
		"nextSkipAnytimeRound": 106
	}
}
					*/
					break;
				case "STATE_PHASE_5_BEFORE_RARE_FINDS":
					/*
					{
	"name": "STATE_PHASE_5_BEFORE_RARE_FINDS",
	"description": "",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase5BeforeRareFinds",
	"transitions": {
		"nextSkipAnytimeRoundPhase5": 111,
		"nextSkipAnytimeRoundPhase0": 100,
		"endGame": 120
	}
}
					*/
					break;
				case "STATE_START_CHOOSE_INITIAL_STATE":
					/*
					{
	"name": "STATE_START_CHOOSE_INITIAL_STATE",
	"description": "",
	"type": "game",
	"action": "stPhase0ChooseInitialState",
	"transitions": {
		"normal": 103,
		"family": 125
	}
}
					*/
					break;
				case "STATE_FAMILY_CHOOSE_LESSONS":
					/*
					{
	"name": "STATE_FAMILY_CHOOSE_LESSONS",
	"description": "All players must choose 2 lesson cards to keep",
	"descriptionmyturn": "${you} must choose 2 lesson cards to keep",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"familyKeepLessonCards"
	],
	"transitions": {
		"next": 126
	}
}
					*/
					break;
				case "STATE_FAMILY_READ_LESSONS":
					/*
					{
	"name": "STATE_FAMILY_READ_LESSONS",
	"description": "Reading lessons",
	"type": "game",
	"action": "stFamilyReadLessons",
	"transitions": {
		"next": 127
	}
}
					*/
					break;
				case "STATE_FAMILY_RESCUE_CAT":
					/*
					{
	"name": "STATE_FAMILY_RESCUE_CAT",
	"description": "${actplayer} must rescue a cat or pass",
	"descriptionmyturn": "${you} must rescue a cat or pass",
	"updateGameProgression": true,
	"type": "activeplayer",
	"args": "argFamilyRescueCat",
	"possibleactions": [
		"familyConfirmActions",
		"familyPass"
	],
	"transitions": {
		"next": 128
	}
}
					*/
					break;
				case "STATE_FAMILY_NEXT_PLAYER":
					/*
					{
	"name": "STATE_FAMILY_NEXT_PLAYER",
	"description": "Ending player turn",
	"updateGameProgression": true,
	"type": "game",
	"action": "stFamilyNextPlayer",
	"transitions": {
		"nextPlayer": 127,
		"endGame": 120
	}
}
					*/
					break;
				case "STATE_PHASE_4_SOLO_RESCUE_CAT":
					/*
					{
	"name": "STATE_PHASE_4_SOLO_RESCUE_CAT",
	"description": "",
	"updateGameProgression": true,
	"type": "game",
	"action": "stPhase4SoloRescueCat",
	"transitions": {
		"next": 109
	}
}
					*/
					break;
				case "STATE_PHASE_4_CHOOSE_RESCUE_CARDS_SINGLE":
					/*
					{
	"name": "STATE_PHASE_4_CHOOSE_RESCUE_CARDS_SINGLE",
	"description": "${actplayer} must choose which rescue cards will be available for the Rescue phase",
	"descriptionmyturn": "${you} must choose which rescue cards will be available for the Rescue phase",
	"type": "activeplayer",
	"possibleactions": [
		"phase4PlayRescueCards"
	],
	"transitions": {
		"next": 132
	}
}
					*/
					break;
				case "STATE_PHASE_4_CHOOSE_RESCUE_CARDS_SINGLE_NEXT_PLAYER":
					/*
					{
	"name": "STATE_PHASE_4_CHOOSE_RESCUE_CARDS_SINGLE_NEXT_PLAYER",
	"description": "Ending player turn",
	"type": "game",
	"action": "stPhase4RescueCardsSingleNextPlayer",
	"transitions": {
		"nextSkipAnytimeRoundNextPlayer": 131,
		"nextSkipAnytimeRoundRevealRescueCards": 108
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
export default theisleofcats;
