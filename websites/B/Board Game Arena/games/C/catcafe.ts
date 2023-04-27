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

const catcafe: GamePresence = {
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
				case "rollDices":
					/*
					{
	"name": "rollDices",
	"description": "",
	"type": "game",
	"action": "stRollDices",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "setupDices":
					/*
					{
	"name": "setupDices",
	"description": "",
	"type": "game",
	"args": "argSetupDices",
	"action": "stSetupDices",
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "playerTurnPicking":
					/*
					{
	"name": "playerTurnPicking",
	"description": "${actplayer} must pick a die.",
	"descriptionmyturn": "${you} must pick a die.",
	"type": "activeplayer",
	"args": "argPlayerTurnPicking",
	"possibleactions": [
		"pickDice"
	],
	"transitions": {
		"dicePicked": 40
	}
}
					*/
					break;
				case "nextPlayerPicking":
					/*
					{
	"name": "nextPlayerPicking",
	"description": "",
	"type": "game",
	"action": "stNextPlayerPicking",
	"transitions": {
		"stayOnPicking": 30,
		"goToSetupDrawing": 50
	}
}
					*/
					break;
				case "setupDrawing":
					/*
					{
	"name": "setupDrawing",
	"description": "",
	"type": "game",
	"args": "argSetupDrawing",
	"action": "stSetupDrawing",
	"transitions": {
		"": 60
	}
}
					*/
					break;
				case "multiplayerDrawingPhase":
					/*
					{
	"name": "multiplayerDrawingPhase",
	"description": "Waiting for other players to end their turn.",
	"descriptionmyturn": "${you} must do your turn",
	"type": "multipleactiveplayer",
	"initialprivate": 70,
	"action": "stMultiplayerDrawingPhase",
	"transitions": {
		"": 110
	}
}
					*/
					break;
				case "playerTurnDrawingPhase1":
					/*
					{
	"name": "playerTurnDrawingPhase1",
	"description": "${actplayer} must choose a die for location, or pass.",
	"descriptionmyturn": "${you} must choose a die for location, or pass.",
	"type": "private",
	"args": "argPlayerTurnDrawingPhase1",
	"possibleactions": [
		"pass",
		"chooseDiceForLocation"
	],
	"transitions": {
		"passed": 70,
		"diceForLocationChosen": 80,
		"nextRound": 110
	}
}
					*/
					break;
				case "playerTurnDrawingPhase2":
					/*
					{
	"name": "playerTurnDrawingPhase2",
	"description": "${actplayer} must choose where to draw.",
	"descriptionmyturn": "${you} must choose where to draw.",
	"type": "private",
	"args": "argPlayerTurnDrawingPhase2",
	"possibleactions": [
		"chooseDrawingLocation",
		"cancelLocationDiceChoice"
	],
	"transitions": {
		"drawingLocationChosen": 90,
		"locationDiceChoiceCancelled": 70
	}
}
					*/
					break;
				case "playerTurnDrawingPhase3":
					/*
					{
	"name": "playerTurnDrawingPhase3",
	"description": "${actplayer} must choose a shape.",
	"descriptionmyturn": "${you} must choose a shape.",
	"type": "private",
	"args": "argPlayerTurnDrawingPhase3",
	"possibleactions": [
		"chooseShape",
		"cancelLocationChoice"
	],
	"transitions": {
		"shapeChosen": 110,
		"chooseCat": 100,
		"locationChoiceCancelled": 70
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
				case "playerTurnCatSelection":
					/*
					{
	"name": "playerTurnCatSelection",
	"description": "${actplayer} must choose a cat.",
	"descriptionmyturn": "${you} must choose a cat.",
	"type": "private",
	"args": "argPlayerTurnCatSelection",
	"possibleactions": [
		"chooseCat",
		"cancelShapeChoice"
	],
	"transitions": {
		"catChosen": 110,
		"shapeChoiceCancelled": 70
	}
}
					*/
					break;
				case "columnScoring":
					/*
					{
	"name": "columnScoring",
	"description": "",
	"type": "game",
	"action": "stColumnScoring",
	"transitions": {
		"nextRound": 120
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"description": "",
	"type": "game",
	"action": "stNextRound",
	"updateGameProgression": true,
	"transitions": {
		"goToCleanBoardForNextRound": 130,
		"goStatsCalculation": 150
	}
}
					*/
					break;
				case "cleanBoardForNextRound":
					/*
					{
	"name": "cleanBoardForNextRound",
	"description": "",
	"type": "game",
	"args": "argCleanBoardForNextRound",
	"action": "stCleanBoardForNextRound",
	"transitions": {
		"goToSetupNewRound": 140
	}
}
					*/
					break;
				case "setupNewRound":
					/*
					{
	"name": "setupNewRound",
	"description": "",
	"type": "game",
	"args": "argSetupNewRound",
	"action": "stsetupNewRound",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "statsCalculation":
					/*
					{
	"name": "statsCalculation",
	"description": "",
	"type": "game",
	"action": "stStatsCalculation",
	"transitions": {
		"": 99
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
export default catcafe;
