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

const dicethemepark: GamePresence = {
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
				case "InitialSetup":
					/*
					{
	"name": "InitialSetup",
	"description": "Other players must select one Administrator and one Skill card.",
	"descriptionmyturn": "${you} must select one Administrator and one Skill card.",
	"type": "multipleactiveplayer",
	"action": "stInitialSetup",
	"possibleactions": [
		"SelectCards"
	],
	"transitions": {
		"SetupDone": 3
	}
}
					*/
					break;
				case "DealSkillCards":
					/*
					{
	"name": "DealSkillCards",
	"description": "Creating the display of skill cards...",
	"type": "game",
	"action": "stDealSkillCards",
	"updateGameProgression": true,
	"transitions": {
		"InitialAttraction": 4
	}
}
					*/
					break;
				case "InitialAttraction":
					/*
					{
	"name": "InitialAttraction",
	"description": "Other players must select one attraction tile and place into their park.",
	"descriptionmyturn": "${you} must select one attraction tile and place into your park.",
	"type": "multipleactiveplayer",
	"action": "stInitialAttraction",
	"updateGameProgression": true,
	"possibleactions": [
		"SelectAttraction"
	],
	"transitions": {
		"AttractionDone": 5
	}
}
					*/
					break;
				case "DealAttractionTiles":
					/*
					{
	"name": "DealAttractionTiles",
	"description": "Creating the display of attraction tiles...",
	"type": "game",
	"action": "stDealAttractionTiles",
	"updateGameProgression": true,
	"transitions": {
		"Plan": 6
	}
}
					*/
					break;
				case "Plan":
					/*
					{
	"name": "Plan",
	"description": "Other players must select two Staff card to play.",
	"descriptionmyturn": "${you} must select two Staff card to play.",
	"type": "multipleactiveplayer",
	"action": "stPlan",
	"updateGameProgression": true,
	"possibleactions": [
		"SelectStaffCard"
	],
	"transitions": {
		"NextPlayerAdmin": 66
	}
}
					*/
					break;
				case "TurnOrderIncome":
					/*
					{
	"name": "TurnOrderIncome",
	"description": "Determining turn order and assigning income...",
	"type": "game",
	"action": "stTurnOrderIncome",
	"updateGameProgression": true,
	"transitions": {
		"Welcome": 8
	}
}
					*/
					break;
				case "Welcome":
					/*
					{
	"name": "Welcome",
	"description": "${actplayer} must select a Monorail card.",
	"descriptionmyturn": "${you} must select a Monorail card.",
	"type": "activeplayer",
	"possibleactions": [
		"SelectMonorail"
	],
	"transitions": {
		"NextPlayer": 10,
		"SamePlayer": 9
	}
}
					*/
					break;
				case "WelcomeConcierge":
					/*
					{
	"name": "WelcomeConcierge",
	"description": "${actplayer} may use the Concierge ability selecting one die (+2) or two dice (+1) in the Park Entrance.",
	"descriptionmyturn": "${you}  may use the Concierge ability selecting one die (+2) or two dice (+1) in the Park Entrance.",
	"type": "activeplayer",
	"args": "argWelcomeConcierge",
	"possibleactions": [
		"UseConcierge",
		"PassConcierge"
	],
	"transitions": {
		"NextPlayer": 10,
		"WelcomeConcierge": 9
	}
}
					*/
					break;
				case "NextPlayer":
					/*
					{
	"name": "NextPlayer",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"Welcome": 8,
		"Expand": 11,
		"WelcomeAdmin": 88
	}
}
					*/
					break;
				case "Expand":
					/*
					{
	"name": "Expand",
	"description": "${actplayer} may expand the park selecting one attraction tile and placing into the park.",
	"descriptionmyturn": "${you} may expand your park selecting one attraction tile and placing into your park.",
	"type": "activeplayer",
	"args": "argExpand",
	"possibleactions": [
		"Expand",
		"PassExpand"
	],
	"transitions": {
		"SetDiceValue": 12,
		"DrawGuestDice": 13,
		"BuildFreeAttraction": 14,
		"RecruitMascot": 15,
		"NextPlayer": 16
	}
}
					*/
					break;
				case "SetDiceValue":
					/*
					{
	"name": "SetDiceValue",
	"description": "(Amenities bonus) ${actplayer} must select and set any single guest die anywhere in the park to any value.",
	"descriptionmyturn": "(Amenities bonus) ${you} must select and set any single guest die anywhere in the park to any value.",
	"type": "activeplayer",
	"possibleactions": [
		"SetDiceValue"
	],
	"transitions": {
		"RecruitMascot": 15,
		"NextPlayer": 16
	}
}
					*/
					break;
				case "DrawGuestDice":
					/*
					{
	"name": "DrawGuestDice",
	"description": "(Amenities bonus) ${actplayer} draws a guest die at random from the bag and place it in the Park Entrance, set at value 4.",
	"type": "game",
	"action": "stDrawGuestDice",
	"transitions": {
		"RecruitMascot": 15,
		"NextPlayer": 16
	}
}
					*/
					break;
				case "BuildFreeAttraction":
					/*
					{
	"name": "BuildFreeAttraction",
	"description": "(Amenities bonus) ${actplayer} must choose any one attraction in the discard pile and build it in the park for free.",
	"descriptionmyturn": "(Amenities bonus) ${you} must choose any one attraction in the discard pile and build it in the park for free.",
	"type": "activeplayer",
	"args": "argBuildFreeAttraction",
	"possibleactions": [
		"BuildFreeAttraction"
	],
	"transitions": {
		"RecruitMascot": 15,
		"NextPlayer": 16
	}
}
					*/
					break;
				case "RecruitMascot":
					/*
					{
	"name": "RecruitMascot",
	"description": "${actplayer} may recruit exactly 1 mascot.",
	"descriptionmyturn": "${you} may recruit exactly 1 mascot for $5.",
	"type": "activeplayer",
	"action": "stRecruitMascot",
	"args": "argRecruitMascot",
	"possibleactions": [
		"RecruitMascot",
		"PassRecruitMascot"
	],
	"transitions": {
		"NextPlayer": 16
	}
}
					*/
					break;
				case "NextPlayer2":
					/*
					{
	"name": "NextPlayer2",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayer2",
	"updateGameProgression": true,
	"transitions": {
		"Expand": 11,
		"Improve": 17
	}
}
					*/
					break;
				case "Improve":
					/*
					{
	"name": "Improve",
	"description": "Other players may improve the park selecting one space where to install an upgrade or buy a map token.",
	"descriptionmyturn": "${you} may improve your park selecting one space where to install an upgrade or buy a map token.",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"BuyMapToken",
		"BuyUpgrade",
		"RemoveUpgrade",
		"PassImprove"
	],
	"action": "stImprove",
	"args": "argImprove",
	"transitions": {
		"Operate": 18
	}
}
					*/
					break;
				case "NextPlayer3":
					/*
					{
	"name": "NextPlayer3",
	"description": "Move to Operate phase...",
	"type": "game",
	"action": "stNextPlayer3",
	"updateGameProgression": true,
	"transitions": {
		"Operate": 19
	}
}
					*/
					break;
				case "Operate":
					/*
					{
	"name": "Operate",
	"description": "Other players may operate their park.",
	"descriptionmyturn": "${you} may assemble a party of dice that fulfill the operation requirement of one attraction.",
	"type": "multipleactiveplayer",
	"args": "argOperate",
	"possibleactions": [
		"Operate",
		"UseMapToken",
		"MoveCoord",
		"UseMascot",
		"PassOperate",
		"Undo",
		"ResetTurn"
	],
	"transitions": {
		"UpKeep": 20,
		"UpkeepAdmin": 70
	}
}
					*/
					break;
				case "UpKeep":
					/*
					{
	"name": "UpKeep",
	"description": "Upkeep phase...",
	"type": "game",
	"action": "stUpKeep",
	"updateGameProgression": true,
	"transitions": {
		"TicketAgent": 21,
		"AdministratorTicketAgent": 221,
		"NextRound": 22
	}
}
					*/
					break;
				case "TicketAgent":
					/*
					{
	"name": "TicketAgent",
	"description": "Other players may choose any one guest die of value 1 in the park and put it back on the Park Entrance.",
	"descriptionmyturn": "${you} may choose any one guest die of value 1 in the park and put it back on the Park Entrance.",
	"type": "multipleactiveplayer",
	"action": "stTicketAgent",
	"possibleactions": [
		"MoveandAdjust",
		"PassTicketAgent"
	],
	"updateGameProgression": true,
	"transitions": {
		"NextRound": 22,
		"AdministratorTicketAgent": 221
	}
}
					*/
					break;
				case "NextRound":
					/*
					{
	"name": "NextRound",
	"description": "Move to Next Round...",
	"type": "game",
	"action": "stNextRound",
	"updateGameProgression": true,
	"transitions": {
		"Plan": 6,
		"FinalRoundScore": 23
	}
}
					*/
					break;
				case "FinalRoundScore":
					/*
					{
	"name": "FinalRoundScore",
	"description": "Final Round scoring...",
	"type": "game",
	"action": "stFinalRoundScore",
	"updateGameProgression": true,
	"transitions": {
		"GameEnd": 99
	}
}
					*/
					break;
				case "NextPlayerAdmin":
					/*
					{
	"name": "NextPlayerAdmin",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayerAdmin",
	"updateGameProgression": true,
	"transitions": {
		"Next": 7,
		"PlanAdmin": 67
	}
}
					*/
					break;
				case "PlanAdmin":
					/*
					{
	"name": "PlanAdmin",
	"description": "${actplayer} must select if to reduce the total die value of Staff Cards by two.",
	"descriptionmyturn": "${you} must select if to reduce the total die value of Staff Cards by two.",
	"type": "activeplayer",
	"possibleactions": [
		"Reduce",
		"NotReduce"
	],
	"transitions": {
		"Next": 7
	}
}
					*/
					break;
				case "NextPlayerAdmin2":
					/*
					{
	"name": "NextPlayerAdmin2",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayerAdmin2",
	"updateGameProgression": true,
	"transitions": {
		"UpkeepAdmin": 71
	}
}
					*/
					break;
				case "UpkeepAdmin":
					/*
					{
	"name": "UpkeepAdmin",
	"description": "${actplayer} may swap a card played with one in the hand.",
	"descriptionmyturn": "${you} may swap a card played with one in the hand.",
	"type": "activeplayer",
	"args": "argUpkeepAdmin",
	"possibleactions": [
		"SwapCards",
		"NotSwapCards"
	],
	"transitions": {
		"UpKeep": 20
	}
}
					*/
					break;
				case "WelcomeAdmin":
					/*
					{
	"name": "WelcomeAdmin",
	"description": "${actplayer} may select a die from the last Monorail card.",
	"descriptionmyturn": "${you} may select a die from the last Monorail card.",
	"type": "activeplayer",
	"possibleactions": [
		"SelectMonorailDie",
		"PassMonorailDie"
	],
	"transitions": {
		"Expand": 89
	}
}
					*/
					break;
				case "NextPlayerW":
					/*
					{
	"name": "NextPlayerW",
	"description": "Changing active player...",
	"type": "game",
	"action": "stNextPlayerW",
	"updateGameProgression": true,
	"transitions": {
		"Expand": 11
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
				case "AdministratorTicketAgent":
					/*
					{
	"name": "AdministratorTicketAgent",
	"description": "Other players may choose any one guest die of value 1 in the park and put it back on the Park Entrance.",
	"descriptionmyturn": "${you} may choose any one guest die of value 1 in the park and put it back on the Park Entrance.",
	"type": "multipleactiveplayer",
	"action": "stAdministratorTicketAgent",
	"possibleactions": [
		"MoveandAdjust",
		"PassTicketAgent"
	],
	"updateGameProgression": true,
	"transitions": {
		"NextRound": 22
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
export default dicethemepark;
