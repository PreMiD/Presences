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

const lox: GamePresence = {
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
		"initialPlacement": 2
	},
	"descriptionmyturn": "..."
}
					*/
					break;
				case "_choiceinitialPlacement":
					/*
					{
	"name": "_choiceinitialPlacement",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"initialPlacement": 2,
		"yearStart": 3,
		"gameStats": 16,
		"_choice": 55
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "yearStart":
					/*
					{
	"name": "yearStart",
	"transitions": {
		"programming": 4
	},
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "programming":
					/*
					{
	"name": "programming",
	"description": "Some player are still programming...",
	"descriptionmyturn": "${you} must program secret orders and",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"runProgram",
		"rewriteProgram"
	],
	"transitions": {
		"resolution": 5
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "resolution":
					/*
					{
	"name": "resolution",
	"description": "Executing programmed orders...",
	"transitions": {
		"resolution": 5,
		"chooseTitan": 6,
		"chooseReward": 8,
		"yearEnd": 11
	},
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseTitan":
					/*
					{
	"name": "_choicechooseTitan",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"resolution": 5,
		"chooseTitanSquad": 7,
		"_choice": 56
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseTitanSquad":
					/*
					{
	"name": "_choicechooseTitanSquad",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"chooseReward": 8,
		"_choice": 57
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicechooseReward":
					/*
					{
	"name": "_choicechooseReward",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"assignReputation": 9,
		"dummyPlayer": 10,
		"titanCorpseCleaning": 15,
		"_choice": 58
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceassignReputation":
					/*
					{
	"name": "_choiceassignReputation",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"dummyPlayer": 10,
		"census": 12,
		"titanCorpseCleaning": 15,
		"_choice": 59
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicedummyPlayer":
					/*
					{
	"name": "_choicedummyPlayer",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"resolution": 5,
		"_choice": 60
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "yearEnd":
					/*
					{
	"name": "yearEnd",
	"transitions": {
		"census": 12,
		"nextYear": 14
	},
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choicecensus":
					/*
					{
	"name": "_choicecensus",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"census": 12,
		"assignStories": 13,
		"nextYear": 14,
		"assignReputation": 9,
		"_choice": 61
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "_choiceassignStories":
					/*
					{
	"name": "_choiceassignStories",
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"transitions": {
		"census": 12,
		"_choice": 62
	},
	"action": "callActionWithVars"
}
					*/
					break;
				case "nextYear":
					/*
					{
	"name": "nextYear",
	"transitions": {
		"yearStart": 3,
		"gameStats": 16
	},
	"updateGameProgression": true,
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "titanCorpseCleaning":
					/*
					{
	"name": "titanCorpseCleaning",
	"transitions": {
		"resolution": 5
	},
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "gameStats":
					/*
					{
	"name": "gameStats",
	"transitions": {
		"programming": 4,
		"gameEnd": 99
	},
	"description": "...",
	"descriptionmyturn": "...",
	"type": "game",
	"action": "callActionWithVars"
}
					*/
					break;
				case "initialPlacement":
					/*
					{
	"name": "initialPlacement",
	"description": "${actplayer} must choose a city to start from",
	"descriptionmyturn": "${you} must choose a city to place your Idrakys in",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"initialPlacement": 2,
		"yearStart": 3,
		"gameStats": 16
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseTitan":
					/*
					{
	"name": "chooseTitan",
	"description": "${actplayer} can choose a Raging Titan to eliminate",
	"descriptionmyturn": "${you} can choose to eliminate a Raging Titan worth",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"resolution": 5,
		"chooseTitanSquad": 7
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseTitanSquad":
					/*
					{
	"name": "chooseTitanSquad",
	"description": "${actplayer} must choose the squad to eliminate the Raging Titan with",
	"descriptionmyturn": "${you} fight the Raging Titan with",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"chooseReward": 8
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "chooseReward":
					/*
					{
	"name": "chooseReward",
	"description": "${actplayer} must choose a reward",
	"descriptionmyturn": "${you} get rewarded with",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"assignReputation": 9,
		"dummyPlayer": 10,
		"titanCorpseCleaning": 15
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "assignReputation":
					/*
					{
	"name": "assignReputation",
	"description": "${actplayer} must choose where to place Bard tokens",
	"descriptionmyturn": "${you} must place your ${tokens} Bard token(s) on adjacent Regions",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"dummyPlayer": 10,
		"census": 12,
		"titanCorpseCleaning": 15
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "dummyPlayer":
					/*
					{
	"name": "dummyPlayer",
	"description": "${actplayer} must move a Dummy Player token",
	"descriptionmyturn": "${you} must make the Dummy Player increase in either",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"resolution": 5
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "census":
					/*
					{
	"name": "census",
	"description": "Some players are still deciding how many units to show",
	"descriptionmyturn": "${you} grab for the Census:",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"census": 12,
		"assignStories": 13,
		"nextYear": 14,
		"assignReputation": 9
	},
	"args": "choiceArgs"
}
					*/
					break;
				case "assignStories":
					/*
					{
	"name": "assignStories",
	"description": "${actplayer} must choose where to place Sorcerers' Guild stories",
	"descriptionmyturn": "${you} must place a Sorcerers' Guild story on an existing Guild",
	"type": "activeplayer",
	"possibleactions": [
		"choice"
	],
	"transitions": {
		"census": 12
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
	"descriptionmyturn": "..."
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
export default lox;
