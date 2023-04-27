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

const takenoko: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "weatherDice":
					/*
					{
	"name": "weatherDice",
	"description": "",
	"type": "game",
	"action": "stWeatherDice",
	"updateGameProgression": true,
	"transitions": {
		"skip": 20,
		"rain": 11,
		"storm": 12,
		"clouds": 13,
		"questionmark": 14,
		"sun": 20,
		"wind": 20
	}
}
					*/
					break;
				case "rain":
					/*
					{
	"name": "rain",
	"description": "${actplayer} may choose a plot to grow a section of bamboo",
	"descriptionmyturn": "${you} may choose a plot to grow a section of bamboo",
	"type": "activeplayer",
	"possibleactions": [
		"choosePlotRain",
		"pass"
	],
	"transitions": {
		"choosePlotRain": 20,
		"pass": 20
	}
}
					*/
					break;
				case "storm":
					/*
					{
	"name": "storm",
	"description": "${actplayer} may move the panda to a plot (and remove a section bambo)",
	"descriptionmyturn": "${you} may move the panda to a plot (and remove a section bambo)",
	"type": "activeplayer",
	"possibleactions": [
		"movePandaAnywhere",
		"pass"
	],
	"transitions": {
		"movePanda": 20,
		"pass": 20
	}
}
					*/
					break;
				case "clouds":
					/*
					{
	"name": "clouds",
	"description": "${actplayer} must choose an improvement from the reserve",
	"descriptionmyturn": "${you} must choose an improvement from the reserve",
	"type": "activeplayer",
	"action": "stClouds",
	"possibleactions": [
		"chooseImprovement",
		"pass"
	],
	"transitions": {
		"chooseImprovement": 20,
		"pass": 20,
		"nomoreimprovement": 14,
		"chooseImprovementToPlace": 23,
		"moveimprovement": 24
	}
}
					*/
					break;
				case "questionmark":
					/*
					{
	"name": "questionmark",
	"description": "${actplayer} must choose a weather condition for this turn",
	"descriptionmyturn": "${you} must choose a weather condition for this turn",
	"type": "activeplayer",
	"possibleactions": [
		"chooseWeather"
	],
	"transitions": {
		"rain": 11,
		"storm": 12,
		"clouds": 13,
		"sun": 20,
		"wind": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must choose an action or play an objective",
	"descriptionmyturn": "${you} must choose an action or play an objective",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"args": "argPlayerTurn",
	"possibleactions": [
		"chooseAction",
		"placeIrrigation",
		"placeImprovement",
		"playObjective",
		"endTurn",
		"undo"
	],
	"transitions": {
		"placeIrrigation": 20,
		"placeImprovement": 20,
		"playObjective": 20,
		"placeIrrigationImmediately": 22,
		"plots": 30,
		"irrigation": 39,
		"panda": 32,
		"gardener": 33,
		"objective": 34,
		"zombiepass": 40,
		"endTurn": 40
	}
}
					*/
					break;
				case "playerTurnNoMoreAction":
					/*
					{
	"name": "playerTurnNoMoreAction",
	"description": "${actplayer} may play an objective or end his turn",
	"descriptionmyturn": "${you} may play an objective or end your turn",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"placeIrrigation",
		"placeImprovement",
		"playObjective",
		"endTurn",
		"undo"
	],
	"transitions": {
		"placeIrrigation": 21,
		"placeImprovement": 21,
		"playObjective": 21,
		"endTurn": 40
	}
}
					*/
					break;
				case "placeIrrigationImmediately":
					/*
					{
	"name": "placeIrrigationImmediately",
	"description": "${actplayer} must choose where to build the irrigation",
	"descriptionmyturn": "${you} must choose where to build your irrigation",
	"type": "activeplayer",
	"possibleactions": [
		"placeIrrigationImmediately",
		"placeIrrigation"
	],
	"transitions": {
		"placeIrrigation": 39,
		"cancel": 20
	}
}
					*/
					break;
				case "placeImprovementImmediately":
					/*
					{
	"name": "placeImprovementImmediately",
	"description": "${actplayer} must choose where to place the improvement",
	"descriptionmyturn": "${you} must choose where to place the improvement",
	"type": "activeplayer",
	"possibleactions": [
		"placeImprovementImmediately",
		"placeImprovement"
	],
	"transitions": {
		"placeImprovement": 39,
		"cancel": 20
	}
}
					*/
					break;
				case "moveImprovementStep1":
					/*
					{
	"name": "moveImprovementStep1",
	"description": "${actplayer} must choose an improvement to move",
	"descriptionmyturn": "${you} must choose an improvement to move",
	"type": "activeplayer",
	"possibleactions": [
		"moveImprovementStep1"
	],
	"transitions": {
		"moveImprovementStep1": 25,
		"cancel": 20
	}
}
					*/
					break;
				case "moveImprovementStep2":
					/*
					{
	"name": "moveImprovementStep2",
	"description": "${actplayer} must choose where to place the improvement",
	"descriptionmyturn": "${you} must choose where to place the improvement",
	"type": "activeplayer",
	"possibleactions": [
		"moveImprovementStep2",
		"placeImprovement"
	],
	"transitions": {
		"placeImprovement": 20,
		"cancel": 20
	}
}
					*/
					break;
				case "choosePlots":
					/*
					{
	"name": "choosePlots",
	"description": "${actplayer} must place a new plot on the garden",
	"descriptionmyturn": "${you} must place a new plot on the garden",
	"type": "activeplayer",
	"args": "argChoosePlots",
	"action": "stResetUndo",
	"possibleactions": [
		"choosePlotToPlace"
	],
	"transitions": {
		"choosePlotToPlace": 39,
		"zombiepass": 39
	}
}
					*/
					break;
				case "movePanda":
					/*
					{
	"name": "movePanda",
	"description": "${actplayer} must move the panda",
	"descriptionmyturn": "${you} must move the panda",
	"type": "activeplayer",
	"possibleactions": [
		"movePanda",
		"placeIrrigation",
		"placeImprovement"
	],
	"transitions": {
		"movePanda": 39,
		"zombiepass": 39,
		"placeIrrigation": 32,
		"placeImprovement": 32
	}
}
					*/
					break;
				case "moveGardener":
					/*
					{
	"name": "moveGardener",
	"description": "${actplayer} must move the gardener",
	"descriptionmyturn": "${you} must move the gardener",
	"type": "activeplayer",
	"possibleactions": [
		"moveGardener",
		"placeIrrigation",
		"placeImprovement"
	],
	"transitions": {
		"moveGardener": 39,
		"zombiepass": 39,
		"placeIrrigation": 33,
		"placeImprovement": 33
	}
}
					*/
					break;
				case "chooseObjective":
					/*
					{
	"name": "chooseObjective",
	"description": "${actplayer} must choose an objective category",
	"descriptionmyturn": "${you} must choose an objective category",
	"type": "activeplayer",
	"possibleactions": [
		"chooseObjective"
	],
	"transitions": {
		"chooseObjective": 39,
		"cancelObjectiveAction": 20,
		"chooseAnotherOne": 34,
		"zombiepass": 39
	}
}
					*/
					break;
				case "nextAction":
					/*
					{
	"name": "nextAction",
	"description": "",
	"type": "game",
	"action": "stNextAction",
	"transitions": {
		"remainingActions": 20,
		"noRemainingActions": 21
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
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 10,
		"endOfGame": 99
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
export default takenoko;
