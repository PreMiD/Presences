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

const thecrew: GamePresence = {
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
				case "preparation":
					/*
					{
	"name": "preparation",
	"description": "",
	"type": "game",
	"action": "stPreparation",
	"transitions": {
		"task": 5,
		"trick": 4,
		"question": 17,
		"pickCrew": 19,
		"moveTile": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionjarvis": "${actplayer} must play a card (for Jarvis)",
	"descriptionmyturn": "${you} must play a card",
	"descriptionmyturnjarvis": "${you} must play a card (for Jarvis)",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"actPlayCard",
		"actStartComm",
		"actDistress",
		"actPreselectCard",
		"actRestartMission"
	],
	"transitions": {
		"next": 7,
		"startComm": 10,
		"distress": 35,
		"zombiePass": 13,
		"startRestartMission": 38
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
	"transitions": {
		"next": 10,
		"distress": 35,
		"giveTask": 37
	}
}
					*/
					break;
				case "pickTask":
					/*
					{
	"name": "pickTask",
	"description": "${actplayer} must choose a task",
	"descriptionjarvis": "${actplayer} must choose a task (for Jarvis)",
	"descriptionmyturn": "${you} must choose a task",
	"descriptionmyturnjarvis": "${you} must choose a task (for Jarvis)",
	"type": "activeplayer",
	"args": "argPickTask",
	"action": "stPickTask",
	"possibleactions": [
		"actChooseTask"
	],
	"transitions": {
		"next": 30,
		"zombiePass": 13
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
		"nextPlayer": 3,
		"nextTrick": 4,
		"endMission": 36
	},
	"updateGameProgression": true
}
					*/
					break;
				case "endMission":
					/*
					{
	"name": "endMission",
	"args": "argEndMission",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actContinueMissions",
		"actStopMissions"
	],
	"description": "All players must continue or stop",
	"descriptionmyturn": "${you} must continue or stop",
	"transitions": {
		"next": 13,
		"end": 21,
		"zombiePass": 13
	}
}
					*/
					break;
				case "comm":
					/*
					{
	"name": "comm",
	"description": "${actplayer} must choose a card to communicate",
	"descriptionmyturn": "${you} must choose a card to communicate",
	"type": "activeplayer",
	"args": "argComm",
	"possibleactions": [
		"actConfirmComm",
		"actCancelComm"
	],
	"transitions": {
		"next": 10,
		"cancel": 10,
		"after": 10,
		"zombiePass": 13
	}
}
					*/
					break;
				case "beforeComm":
					/*
					{
	"name": "beforeComm",
	"description": "",
	"type": "game",
	"action": "stBeforeComm",
	"transitions": {
		"turn": 3,
		"comm": 9
	}
}
					*/
					break;
				case "uselessNow":
					/*
					{
	"name": "uselessNow",
	"description": "",
	"type": "game",
	"action": "stUselessNow",
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "changeMission":
					/*
					{
	"name": "changeMission",
	"description": "",
	"type": "game",
	"action": "stChangeMission",
	"transitions": {
		"next": 2,
		"save": 21,
		"end": 21
	}
}
					*/
					break;
				case "distressSetup":
					/*
					{
	"name": "distressSetup",
	"description": "The distress signal might be used",
	"descriptionmyturn": "${you} may use the distress signal",
	"type": "multipleactiveplayer",
	"action": "stDistressSetup",
	"args": "argDistressSetup",
	"possibleactions": [
		"actChooseDirection"
	],
	"transitions": {
		"next": 15,
		"turn": 10,
		"zombiePass": 13
	}
}
					*/
					break;
				case "distress":
					/*
					{
	"name": "distress",
	"args": "argDistress",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"actChooseCardDistress"
	],
	"description": "Every players must choose a card to pass",
	"descriptionmyturn": "${you} must choose a card to pass",
	"transitions": {
		"next": 16,
		"zombiePass": 13
	}
}
					*/
					break;
				case "distressExchange":
					/*
					{
	"name": "distressExchange",
	"description": "",
	"type": "game",
	"action": "stDistressExchange",
	"transitions": {
		"next": 10
	}
}
					*/
					break;
				case "question":
					/*
					{
	"name": "question",
	"description": "Commander ${player_name} asks ${actplayer} : ${question}",
	"descriptionjarvis": "Commander ${player_name} asks Jarvis : ${question}",
	"descriptionmyturn": "Commander ${player_name} asks ${you} : ${question}",
	"descriptionmyturnjarvis": "Answer for Jarvis to the question : ${question}",
	"type": "activeplayer",
	"args": "argQuestion",
	"possibleactions": [
		"actReply"
	],
	"transitions": {
		"next": 18,
		"zombiePass": 13
	}
}
					*/
					break;
				case "nextQuestion":
					/*
					{
	"name": "nextQuestion",
	"description": "",
	"type": "game",
	"action": "stNextQuestion",
	"transitions": {
		"next": 17,
		"pick": 19
	}
}
					*/
					break;
				case "pickCrew":
					/*
					{
	"name": "pickCrew",
	"description": "${actplayer} must choose a crew member",
	"descriptionmyturn": "${you} must choose a crew member",
	"description50first": "${actplayer} must choose a crew member for the first four tricks",
	"description50firstmyturn": "${you} must choose a crew member for the first four tricks",
	"description50last": "${actplayer} must choose a crew member for the last trick",
	"description50lastmyturn": "${you} must choose a crew member for the last trick",
	"type": "activeplayer",
	"args": "argPickCrew",
	"possibleactions": [
		"actPickCrew"
	],
	"transitions": {
		"task": 5,
		"trick": 4,
		"next": 18,
		"pickCrew": 19,
		"zombiePass": 13
	}
}
					*/
					break;
				case "moveTile":
					/*
					{
	"name": "moveTile",
	"description": "${actplayer} may swap the position of two task tokens",
	"descriptionmyturn": "${you} may swap the position of two task tokens",
	"type": "activeplayer",
	"args": "argMoveTile",
	"possibleactions": [
		"actMoveTile",
		"actPassMoveTile"
	],
	"transitions": {
		"task": 5,
		"zombiePass": 13
	}
}
					*/
					break;
				case "save":
					/*
					{
	"name": "save",
	"description": "",
	"type": "game",
	"action": "stSave",
	"transitions": {
		"next": 99
	}
}
					*/
					break;
				case "checkPickTask":
					/*
					{
	"name": "checkPickTask",
	"description": "",
	"type": "game",
	"action": "stNextPickTask",
	"transitions": {
		"task": 5,
		"turn": 4
	}
}
					*/
					break;
				case "giveTask":
					/*
					{
	"name": "giveTask",
	"description": "One crew member may propose to give one of its task to someone else",
	"descriptionmyturn": "${you} may propose to give one of your task to someone else",
	"type": "multipleactiveplayer",
	"args": "argGiveTask",
	"possibleactions": [
		"actGiveTask",
		"actPassGiveTask"
	],
	"transitions": {
		"pass": 35,
		"askConfirmation": 32,
		"zombiePass": 13
	}
}
					*/
					break;
				case "giveTaskConfirmation":
					/*
					{
	"name": "giveTaskConfirmation",
	"description": "The crew must confirm/reject ${player_name}'s proposal",
	"descriptionmyturn": "${you} must confirm/reject ${player_name}'s proposal",
	"type": "multipleactiveplayer",
	"action": "stGiveTaskConfirmation",
	"args": "argGiveTaskConfirmation",
	"possibleactions": [
		"actConfirmGiveTask",
		"actRejectGiveTask"
	],
	"transitions": {
		"next": 33,
		"reject": 37,
		"zombiePass": 13
	}
}
					*/
					break;
				case "giveTaskExchange":
					/*
					{
	"name": "giveTaskExchange",
	"description": "",
	"type": "game",
	"action": "stGiveTaskExchange",
	"transitions": {
		"next": 35
	}
}
					*/
					break;
				case "preDistress":
					/*
					{
	"name": "preDistress",
	"description": "",
	"type": "game",
	"action": "stPreDistress",
	"transitions": {
		"setup": 14,
		"turn": 10
	}
}
					*/
					break;
				case "preEndMission":
					/*
					{
	"name": "preEndMission",
	"description": "",
	"type": "game",
	"action": "stPreEndMission",
	"transitions": {
		"next": 13,
		"pending": 8
	}
}
					*/
					break;
				case "preGiveTask":
					/*
					{
	"name": "preGiveTask",
	"description": "",
	"type": "game",
	"action": "stPreGiveTask",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "preRestartMission":
					/*
					{
	"name": "preRestartMission",
	"description": "",
	"type": "game",
	"action": "stPreRestartMission",
	"transitions": {
		"setup": 39,
		"endMission": 36
	}
}
					*/
					break;
				case "restartMissionSetup":
					/*
					{
	"name": "restartMissionSetup",
	"description": "someone wants to fail mission",
	"descriptionmyturn": "${you} may agree to fail mission",
	"type": "multipleactiveplayer",
	"args": "argRestartMissionSetup",
	"action": "stRestartMissionSetup",
	"possibleactions": [
		"actAnswerRestartMission"
	],
	"transitions": {
		"cancel": 3,
		"endMission": 36
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
export default thecrew;
