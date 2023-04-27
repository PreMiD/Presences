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

const beyondthesun: GamePresence = {
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
				case "actionPhase":
					/*
					{
	"name": "actionPhase",
	"description": "Action Phase: ${actplayer} is choosing an action",
	"descriptionmyturn": "Action Phase: Move your Action pawn to a new Action space",
	"type": "activeplayer",
	"possibleactions": [
		"confirmAction",
		"freeAction"
	],
	"action": "stActionPhase",
	"transitions": {
		"actionDone": 3,
		"endGame": 89,
		"immediate": 3,
		"guild1": 10,
		"guild2": 11,
		"colonize": 13,
		"eventChoice": 70,
		"eventChoiceAll": 71,
		"eventChoiceAllPrevPlayer": 77,
		"noLastRound": 72,
		"controlDiscs": 3,
		"research": 80,
		"freeAction": 2,
		"zombiePass": 5
	}
}
					*/
					break;
				case "controlDiscs":
					/*
					{
	"name": "controlDiscs",
	"type": "game",
	"action": "stControlDiscs",
	"transitions": {
		"actionDone": 3,
		"endGame": 89,
		"immediate": 81,
		"controlEffect": 12,
		"chooseControl": 14,
		"chooseDisc": 9,
		"done": 8,
		"tradeDone": 4,
		"backToAction": 2
	}
}
					*/
					break;
				case "achievementPhase":
					/*
					{
	"name": "achievementPhase",
	"description": "Achievement Phase: ${actplayer} is claiming an achievement",
	"descriptionmyturn": "Achievement Phase: Choose an achievement to claim",
	"type": "activeplayer",
	"action": "stAchievementPhase",
	"args": "argAchievement",
	"possibleactions": [
		"chooseAchievement",
		"freeAction"
	],
	"transitions": {
		"freeAction": 4,
		"achievementChosen": 5,
		"noAchievement": 5
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"continue": 2,
		"end": 89
	},
	"updateGameProgression": true
}
					*/
					break;
				case "trade":
					/*
					{
	"name": "trade",
	"type": "activeplayer",
	"description": "Production Phase: ${actplayer} is considering a resource trade",
	"descriptionmyturn": "Production Phase: Choose what to trade",
	"possibleactions": [
		"resourceTrade",
		"cancelTrade"
	],
	"transitions": {
		"trade": 3,
		"undo": 8,
		"zombiePass": 5
	}
}
					*/
					break;
				case "tradeOnly":
					/*
					{
	"name": "tradeOnly",
	"type": "activeplayer",
	"description": "Production Phase: ${actplayer} is considering a resource trade",
	"descriptionmyturn": "Production Phase: You may perform a resource trade",
	"possibleactions": [
		"resourceTrade",
		"cancelTrade"
	],
	"transitions": {
		"trade": 3,
		"zombiePass": 5
	}
}
					*/
					break;
				case "productionPhase":
					/*
					{
	"name": "productionPhase",
	"description": "Production Phase: ${actplayer} is choosing what to produce",
	"descriptionmyturn": "Production Phase: Choose your production",
	"type": "activeplayer",
	"action": "stProductionPhase",
	"possibleactions": [
		"chooseProduction",
		"trade",
		"freeAction"
	],
	"transitions": {
		"produce": 4,
		"trade": 6,
		"tradeOnly": 7,
		"zombiePass": 5,
		"freeAction": 8,
		"controlDiscs": 3
	}
}
					*/
					break;
				case "chooseDisc":
					/*
					{
	"name": "chooseDisc",
	"description": "${actplayer} is choosing a disc to place on ${location}",
	"descriptionmyturn": "Choose a disc to place on ${location}",
	"type": "activeplayer",
	"args": "argChooseDisc",
	"possibleactions": [
		"chooseDisc"
	],
	"transitions": {
		"discChosen": 3
	}
}
					*/
					break;
				case "guild1":
					/*
					{
	"name": "guild1",
	"description": "${name}: ${actplayer} is opening a Tier 1 Guild",
	"descriptionmyturn": "${name}: Choose a Tier 1 Guild to open",
	"type": "activeplayer",
	"args": "argEvent",
	"action": "stGuild1",
	"possibleactions": [
		"openGuild",
		"freeAction"
	],
	"transitions": {
		"freeAction": 10,
		"guildOpen": 80
	}
}
					*/
					break;
				case "guild2":
					/*
					{
	"name": "guild2",
	"description": "${name}: ${actplayer} is opening a Tier 2 Guild",
	"descriptionmyturn": "${name}: Choose a Tier 2 Guild to open",
	"type": "activeplayer",
	"args": "argEvent",
	"action": "stGuild2",
	"possibleactions": [
		"openGuild",
		"freeAction"
	],
	"transitions": {
		"freeAction": 11,
		"guildOpen": 80
	}
}
					*/
					break;
				case "controlEffect":
					/*
					{
	"name": "controlEffect",
	"description": "${actplayer} is resolving the on-control effect of ${name}",
	"descriptionmyturn": "Choose how to resolve the effect of ${name}",
	"type": "activeplayer",
	"args": "argSystem",
	"possibleactions": [
		"confirmAction",
		"freeAction"
	],
	"transitions": {
		"actionDone": 3,
		"endGame": 89,
		"immediate": 81,
		"guild1": 10,
		"guild2": 11,
		"eventChoice": 70,
		"eventChoiceAll": 71,
		"eventChoiceAllPrevPlayer": 77,
		"noLastRound": 72,
		"research": 80,
		"freeAction": 12,
		"zombiePass": 5
	}
}
					*/
					break;
				case "colonizeEffect":
					/*
					{
	"name": "colonizeEffect",
	"description": "${actplayer} is resolving the colonization effect of ${name}",
	"descriptionmyturn": "Choose how to resolve the effect of ${name}",
	"type": "activeplayer",
	"args": "argColony",
	"action": "stColonizeEffect",
	"possibleactions": [
		"confirmAction"
	],
	"transitions": {
		"actionDone": 3,
		"endGame": 89,
		"guild1": 10,
		"guild2": 11,
		"immediate": 81,
		"eventChoice": 70,
		"eventChoiceAll": 71,
		"eventChoiceAllPrevPlayer": 77,
		"noLastRound": 72,
		"research": 80,
		"zombiePass": 5
	}
}
					*/
					break;
				case "controlOrder":
					/*
					{
	"name": "controlOrder",
	"description": "${actplayer} is choosing the order in which to resolve control effects",
	"descriptionmyturn": "Choose which System to resolve",
	"type": "activeplayer",
	"args": "argControlOrder",
	"possibleactions": [
		"controlOrder"
	],
	"transitions": {
		"controlEffect": 12
	}
}
					*/
					break;
				case "eventChoice":
					/*
					{
	"name": "eventChoice",
	"description": "${name}: ${actplayer} is choosing how to resolve the event",
	"descriptionmyturn": "${name}: ${directive}",
	"type": "activeplayer",
	"args": "argEvent",
	"possibleactions": [
		"eventChoice",
		"freeAction"
	],
	"transitions": {
		"next": 79,
		"continue": 70,
		"freeAction": 70,
		"zombiePass": 79
	}
}
					*/
					break;
				case "eventChoiceAll":
					/*
					{
	"name": "eventChoiceAll",
	"description": "${name}: ${actplayer} is choosing how to resolve the event",
	"descriptionmyturn": "${name}: ${directive}",
	"type": "activeplayer",
	"args": "argEvent",
	"possibleactions": [
		"eventChoice",
		"freeAction"
	],
	"transitions": {
		"next": 78,
		"freeAction": 71,
		"continue": 71,
		"zombiePass": 78
	}
}
					*/
					break;
				case "noLastRound":
					/*
					{
	"name": "noLastRound",
	"type": "game",
	"action": "stNoLastRound",
	"transitions": {
		"abort": 80,
		"continue": 79
	}
}
					*/
					break;
				case "eventChoiceAllPrevPlayer":
					/*
					{
	"name": "eventChoiceAllPrevPlayer",
	"type": "game",
	"action": "stPrevPlayer",
	"transitions": {
		"nextPlayer": 71,
		"skip": 78
	}
}
					*/
					break;
				case "eventChoiceAllNextPlayer":
					/*
					{
	"name": "eventChoiceAllNextPlayer",
	"type": "game",
	"action": "stEventChoiceAllNextPlayer",
	"transitions": {
		"nextPlayer": 71,
		"skip": 78,
		"continue": 79
	}
}
					*/
					break;
				case "eventNextStep":
					/*
					{
	"name": "eventNextStep",
	"type": "game",
	"action": "stEventNextStep",
	"transitions": {
		"research": 80,
		"eventChoice": 70,
		"eventChoiceAll": 71
	}
}
					*/
					break;
				case "pickTechnologyType":
					/*
					{
	"name": "pickTechnologyType",
	"description": "${actplayer} is choosing a color for the new Technology",
	"descriptionmyturn": "Choose a color for the new Technology",
	"type": "activeplayer",
	"action": "stPickTechnologyType",
	"possibleactions": [
		"pickTechnologyType"
	],
	"args": "argPickTechnologyType",
	"transitions": {
		"pickedType": 82
	}
}
					*/
					break;
				case "immediateEffect":
					/*
					{
	"name": "immediateEffect",
	"description": "${actplayer} is resolving the effect of ${name}",
	"descriptionmyturn": "Choose how to resolve the effect of ${name}",
	"type": "activeplayer",
	"action": "stImmediateEffect",
	"args": "argTech",
	"possibleactions": [
		"confirmAction",
		"freeAction"
	],
	"transitions": {
		"actionDone": 83,
		"endGame": 89,
		"guild1": 10,
		"guild2": 11,
		"colonize": 13,
		"immediate": 81,
		"freeAction": 81,
		"eventChoice": 70,
		"eventChoiceAll": 71,
		"eventChoiceAllPrevPlayer": 77,
		"noLastRound": 72,
		"research": 80,
		"zombiePass": 5
	}
}
					*/
					break;
				case "pickTechnology":
					/*
					{
	"name": "pickTechnology",
	"description": "${actplayer} is choosing a Technology",
	"descriptionmyturn": "Choose a Technology",
	"type": "activeplayer",
	"possibleactions": [
		"pickTechnology"
	],
	"args": "argPickTechnology",
	"transitions": {
		"continue": 3,
		"immediate": 81
	}
}
					*/
					break;
				case "checkImmediates":
					/*
					{
	"name": "checkImmediates",
	"type": "game",
	"action": "stCheckImmediates",
	"transitions": {
		"continue": 81,
		"immediate": 81,
		"actionDone": 3,
		"endGame": 89,
		"done": 3,
		"tradeDone": 4,
		"backToAction": 2
	}
}
					*/
					break;
				case "endGame":
					/*
					{
	"name": "endGame",
	"type": "game",
	"action": "stEndGame",
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
export default beyondthesun;
