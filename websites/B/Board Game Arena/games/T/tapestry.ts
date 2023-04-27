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

const tapestry: GamePresence = {
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
				case "setupChoice":
					/*
					{
	"name": "setupChoice",
	"description": "Everyone must choose a civilization",
	"descriptionmyturn": "${you} must choose a civilization",
	"type": "multipleactiveplayer",
	"action": "stSetupChoice",
	"possibleactions": [
		"chooseCivilization"
	],
	"transitions": {
		"next": 3
	}
}
					*/
					break;
				case "finishSetup":
					/*
					{
	"name": "finishSetup",
	"description": "",
	"type": "game",
	"action": "stFinishSetup",
	"transitions": {
		"next": 12
	}
}
					*/
					break;
				case "transition":
					/*
					{
	"name": "transition",
	"description": "",
	"type": "game",
	"action": "stTransition",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"next": 13,
		"nextPlayer": 13
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must advance or take income",
	"descriptionmyturn": "${you} must pick Advance or Income",
	"action": "stPlayerTurn",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"advance",
		"takeIncome"
	],
	"transitions": {
		"advance": 18,
		"income": 32,
		"benefit": 18,
		"next": 18
	}
}
					*/
					break;
				case "civAbility":
					/*
					{
	"name": "civAbility",
	"description": "${actplayer} may use their civilization ability",
	"descriptionmyturn": "${you} may use your civilization ability",
	"type": "activeplayer",
	"args": "argCivAbility",
	"possibleactions": [
		"civTokenAdvance",
		"alchemistRoll",
		"alchemistClaim",
		"civDecline",
		"tapestryChoice",
		"sendHistorian",
		"sendTrader",
		"mystic",
		"sendInventor"
	],
	"transitions": {
		"benefit": 18,
		"next": 18
	}
}
					*/
					break;
				case "playTapestryCard":
					/*
					{
	"name": "playTapestryCard",
	"description": "${actplayer} must play a tapestry card",
	"descriptionmyturn": "${you} must play a tapestry card",
	"action": "stTapestryCard",
	"args": "argTapestryCard",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"decline_tapestry",
		"tapestryChoice"
	],
	"transitions": {
		"next": 16,
		"benefit": 18
	}
}
					*/
					break;
				case "upgradeTechnology":
					/*
					{
	"name": "upgradeTechnology",
	"description": "${actplayer} may upgrade a technology",
	"descriptionmyturn": "${you} may upgrade a technology",
	"action": "stUpgradeTechnology",
	"type": "activeplayer",
	"args": "argUpgradeTechnology",
	"possibleactions": [
		"upgrade",
		"decline"
	],
	"transitions": {
		"next": 18,
		"benefit": 18
	}
}
					*/
					break;
				case "vpincome":
					/*
					{
	"name": "vpincome",
	"description": "",
	"type": "game",
	"action": "stVPIncome",
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "benefitManager":
					/*
					{
	"name": "benefitManager",
	"description": "",
	"type": "game",
	"action": "stBenefitManager",
	"transitions": {
		"benefitOption": 19,
		"finish": 36,
		"explore": 20,
		"invent": 21,
		"conquer": 22,
		"research": 25,
		"structure": 26,
		"VPreturn": 17,
		"explore_space": 27,
		"benefitChoice": 29,
		"upgradeTech": 16,
		"techBenefit": 30,
		"tapestryChoice": 15,
		"Tapreturn": 16,
		"any_resource": 31,
		"civReturn": 14,
		"trackChoice": 33,
		"buildingChoice": 34,
		"bonus": 35,
		"civIncome": 32,
		"trap": 23,
		"conquer_die": 24,
		"next": 18
	}
}
					*/
					break;
				case "benefitOption":
					/*
					{
	"name": "benefitOption",
	"description": "${actplayer} may choose a benefit",
	"descriptionmyturn": "${you} may choose one of these benefits",
	"type": "activeplayer",
	"possibleactions": [
		"choose_benefit"
	],
	"args": "argBenefitOption",
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "explore":
					/*
					{
	"name": "explore",
	"description": "${actplayer} is exploring",
	"descriptionmyturn": "EXPLORE: ${you} must select an unexplored hex adjacent to a territory you control",
	"type": "activeplayer",
	"args": "argExplore",
	"action": "stExplore",
	"possibleactions": [
		"explore",
		"ageOfSail",
		"colonialism",
		"decline"
	],
	"transitions": {
		"next": 18,
		"loopback": 20
	}
}
					*/
					break;
				case "invent":
					/*
					{
	"name": "invent",
	"description": "${actplayer} is inventing",
	"descriptionmyturn": "${you} must invent",
	"type": "activeplayer",
	"action": "stInvent",
	"args": "argInvent",
	"possibleactions": [
		"invent",
		"tech_refresh",
		"decline"
	],
	"transitions": {
		"next": 18,
		"loopback": 21
	}
}
					*/
					break;
				case "conquer":
					/*
					{
	"name": "conquer",
	"description": "${actplayer} is conquering",
	"descriptionmyturn": "CONQUER: ${you} must select a hex adjacent to a territory you control",
	"type": "activeplayer",
	"args": "argConquer",
	"possibleactions": [
		"conquer",
		"standup",
		"decline"
	],
	"transitions": {
		"next": 18,
		"standup": 18,
		"decline": 18
	}
}
					*/
					break;
				case "conquer_trap":
					/*
					{
	"name": "conquer_trap",
	"description": "${actplayer} may play a trap card",
	"descriptionmyturn": "${you} may play a trap card",
	"type": "activeplayer",
	"possibleactions": [
		"trap",
		"decline_trap"
	],
	"transitions": {
		"": 28,
		"next": 18
	}
}
					*/
					break;
				case "conquer_roll":
					/*
					{
	"name": "conquer_roll",
	"description": "${actplayer} must choose a benefit from one die",
	"descriptionmyturn": "${you} must choose a benefit from one die",
	"type": "activeplayer",
	"args": "argConquerRoll",
	"possibleactions": [
		"choose_die"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "research":
					/*
					{
	"name": "research",
	"description": "${actplayer} may choose track to advance",
	"descriptionmyturn": "${you} may choose track to advance",
	"type": "activeplayer",
	"args": "argResearch",
	"possibleactions": [
		"research_decision",
		"trackChoice"
	],
	"transitions": {
		"next": 18,
		"trackChoice": 33
	}
}
					*/
					break;
				case "placeStructure":
					/*
					{
	"name": "placeStructure",
	"description": "${actplayer} must place a structure",
	"descriptionmyturn": "${you} must place a structure [${structure_name}]",
	"type": "activeplayer",
	"args": "argStructure",
	"possibleactions": [
		"place_structure",
		"placeCraftsmen",
		"conquer_structure"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "spaceExploration":
					/*
					{
	"name": "spaceExploration",
	"description": "${actplayer} must explore a space tile",
	"descriptionmyturn": "${you} must explore a space tile",
	"type": "activeplayer",
	"action": "stSpaceExploration",
	"possibleactions": [
		"explore_space"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "conquerManager":
					/*
					{
	"name": "conquerManager",
	"description": "",
	"type": "game",
	"action": "stConquerManager",
	"transitions": {
		"trap": 23,
		"conquer_die": 24,
		"finish": 18,
		"next": 18
	}
}
					*/
					break;
				case "benefitChoice":
					/*
					{
	"name": "benefitChoice",
	"description": "${actplayer} must choose which benefit to take first",
	"descriptionmyturn": "${you} must choose which benefit to take first",
	"type": "activeplayer",
	"possibleactions": [
		"first_benefit"
	],
	"args": "argBenefitChoice",
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "techBenefit":
					/*
					{
	"name": "techBenefit",
	"description": "${actplayer} may choose which ${circlesquare} benefit to take",
	"descriptionmyturn": "${you} may choose which ${circlesquare} benefit to take",
	"action": "stTechBenefit",
	"type": "activeplayer",
	"possibleactions": [
		"techBenefit"
	],
	"args": "argTechBenefit",
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "resourceChoice":
					/*
					{
	"name": "resourceChoice",
	"description": "${actplayer} may choose their resources",
	"descriptionmyturn": "${you} may choose your resources",
	"type": "activeplayer",
	"possibleactions": [
		"choose_resources",
		"decline"
	],
	"args": "argResourceChoice",
	"transitions": {
		"next": 18,
		"benefit": 18
	}
}
					*/
					break;
				case "civAbilitySetup":
					/*
					{
	"name": "civAbilitySetup",
	"description": "Preparing for income...",
	"type": "game",
	"action": "stCivAbility",
	"transitions": {
		"benefit": 18,
		"next": 18
	}
}
					*/
					break;
				case "trackSelect":
					/*
					{
	"name": "trackSelect",
	"description": "${actplayer} must select a cube on an advancement track ${reason}",
	"descriptionmyturn": "${you} must select a cube on an advancement track",
	"type": "activeplayer",
	"args": "argTrackSelect",
	"possibleactions": [
		"repeatBenefit",
		"select_cube",
		"formAlliance",
		"choose_benefit"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "buildingSelect":
					/*
					{
	"name": "buildingSelect",
	"description": "${actplayer} may choose a building",
	"descriptionmyturn": "${you} may choose a building",
	"type": "activeplayer",
	"args": "argBuildingSelect",
	"possibleactions": [
		"selectBuilding",
		"selectIncomeBuilding",
		"selectLandmark"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "bonus":
					/*
					{
	"name": "bonus",
	"description": "${actplayer} may apply the bonus",
	"descriptionmyturn": "${you} may select payment for the bonus [${bonus_name}]",
	"type": "activeplayer",
	"args": "argBonus",
	"action": "stBonus",
	"possibleactions": [
		"acceptBonus",
		"declineBonus"
	],
	"transitions": {
		"next": 18
	}
}
					*/
					break;
				case "playerTurnEnd":
					/*
					{
	"name": "playerTurnEnd",
	"description": "${actplayer} must confirm the turn or undo",
	"descriptionmyturn": "${you} must confirm the turn or undo",
	"action": "stPlayerTurnEnd",
	"type": "activeplayer",
	"args": "argPlayerTurnEnd",
	"possibleactions": [
		"actionConfirm",
		"actionUndo"
	],
	"transitions": {
		"next": 12
	}
}
					*/
					break;
				case "startGameDebug":
					/*
					{
	"name": "startGameDebug",
	"description": "${actplayer} must start the game (debug state)",
	"descriptionmyturn": "${you} must start the game (debug state)",
	"type": "activeplayer",
	"possibleactions": [
		"actionConfirm"
	],
	"transitions": {
		"next": 2
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
export default tapestry;
