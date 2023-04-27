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

const thecrewdeepsea: GamePresence = {
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
		"realTime": 44,
		"missionPreparation": 41
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"descriptionmyturntonoja": "${you} must play a card (for Tonoja)",
	"descriptiontonoja": "${actplayer} must play a card (for Tonoja)",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"actPlayCard",
		"actStartComm",
		"actDistress",
		"actPreselectCard"
	],
	"transitions": {
		"next": 7,
		"startComm": 10,
		"distress": 35,
		"zombiePass": 13
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
		"checkComm": 10,
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
	"descriptionmyturn": "${you} must choose a task",
	"descriptionmyturntonoja": "${you} must choose a task (for Tonoja)",
	"descriptiontonoja": "${actplayer} must choose a task (for Tonoja)",
	"type": "activeplayer",
	"args": "argPickTask",
	"action": "stPickTask",
	"possibleactions": [
		"actChooseTask",
		"actPassTask",
		"actAllIncompatible"
	],
	"transitions": {
		"next": 30,
		"option": 6,
		"zombiePass": 13
	}
}
					*/
					break;
				case "optionTask":
					/*
					{
	"name": "optionTask",
	"description": "${actplayer} must choose his prediction for the task",
	"descriptionmyturn": "${you} must choose your prediction for the task",
	"descriptionmyturntonoja": "${you} must choose the prediction for the task (for Tonoja)",
	"descriptiontonoja": "${actplayer} must choose the prediction for the task (for Tonoja)",
	"type": "activeplayer",
	"args": "argOptionTask",
	"possibleactions": [
		"actOptionTask",
		"actPassTask"
	],
	"transitions": {
		"next": 30,
		"zombiePass": 13,
		"option": 50
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
	"description": "All players must continue or stop",
	"descriptionmyturn": "${you} must continue or stop",
	"possibleactions": [
		"actContinueMissions",
		"actStopMissions",
		"actContinueMissionsChange"
	],
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
	"description": "Every player must choose a card to pass",
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
	"description": "Captain ${player_name} asks ${actplayer} : ${question}",
	"descriptionmyturn": "Captain ${player_name} asks ${you} : ${question}",
	"descriptiontonoja": "Captain ${player_name} asks Tonoja : ${question}",
	"descriptionmyturntonoja": "Answer for Tonoja to the question : ${question}",
	"type": "activeplayer",
	"args": "argQuestion",
	"possibleactions": [
		"actReply",
		"actAllIncompatible"
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
		"pick": 19,
		"initFree": 42
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
	"descriptionautomatic": "All tasks are assigned to ${player_name}",
	"descriptionmyturnautomatic": "All tasks are assigned to ${player_name}",
	"type": "activeplayer",
	"args": "argPickCrew",
	"possibleactions": [
		"actPickCrew"
	],
	"transitions": {
		"task": 5,
		"trick": 4,
		"next": 18,
		"freeAllocation": 42,
		"pickCrew": 19,
		"option": 50,
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
		"option": 50,
		"turn": 4
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
				case "realTime":
					/*
					{
	"name": "realTime",
	"description": "Each crew member must choose if mission is played in realtime",
	"descriptionmyturn": "${you} must choose if mission is played in realtime",
	"type": "multipleactiveplayer",
	"args": "argRealtime",
	"possibleactions": [
		"actAnswerRealTime"
	],
	"transitions": {
		"missionPreparation": 41
	}
}
					*/
					break;
				case "missionPreparation":
					/*
					{
	"name": "missionPreparation",
	"description": "",
	"type": "game",
	"action": "stMissionPreparation",
	"transitions": {
		"task": 5,
		"trick": 4,
		"question": 47,
		"pickCrew": 19,
		"moveTile": 20,
		"freeAllocation": 42
	}
}
					*/
					break;
				case "initFreeAllocation":
					/*
					{
	"name": "initFreeAllocation",
	"description": "",
	"type": "game",
	"action": "stInitFreeAllocation",
	"transitions": {
		"freeAllocation": 43
	}
}
					*/
					break;
				case "freeAllocation":
					/*
					{
	"name": "freeAllocation",
	"description": "Each crew member may express opinions about the tasks",
	"descriptionmyturn": "",
	"descriptionmyturngeneric": "${you} may select a bundle of tasks and give your opinion about it",
	"descriptionmyturnrate": "How much do ${you} want to take that bundle of tasks?",
	"type": "multipleactiveplayer",
	"args": "argFreeAllocation",
	"possibleactions": [
		"actCreateBundle",
		"actChangeBundle",
		"actDeleteBundle",
		"actConfirmFreeAllocation",
		"actAllIncompatible"
	],
	"transitions": {
		"propose": 45
	}
}
					*/
					break;
				case "initRealTime":
					/*
					{
	"name": "initRealTime",
	"description": "",
	"type": "game",
	"action": "stInitRealTime",
	"transitions": {
		"realTimeChoice": 40,
		"missionPreparation": 41
	}
}
					*/
					break;
				case "freeAllocationPropose":
					/*
					{
	"name": "freeAllocationPropose",
	"description": "${player_name} must propose a task assignement",
	"descriptionmyturn": "",
	"descriptionmyturngeneric": "${you} must propose a task assignement",
	"descriptionmyturntarget": "Who should take that task?",
	"type": "activeplayer",
	"args": "argFreeAllocationPropose",
	"possibleactions": [
		"actFreeAllocAssign",
		"actConfirmFreeAllocProposal",
		"actAllIncompatible"
	],
	"transitions": {
		"loop": 45,
		"done": 48,
		"apply": 49
	}
}
					*/
					break;
				case "startQuestion":
					/*
					{
	"name": "startQuestion",
	"description": "",
	"type": "game",
	"action": "stStartQuestion",
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "freeAllocationAccept":
					/*
					{
	"name": "freeAllocationAccept",
	"description": "",
	"descriptionmyturn": "",
	"descriptiongeneric": "Each crew member must accept or refuse the tasks proposed to them",
	"descriptionmyturngeneric": "${you} must accept or refuse the tasks proposed to you",
	"descriptionchoice": "Do you accept this task?",
	"descriptionmyturnchoice": "Do you accept this task?",
	"type": "multipleactiveplayer",
	"args": "argFreeAllocationAccept",
	"possibleactions": [
		"actFreeAllocAccept",
		"actFreeAllocReject",
		"actConfirmFreeAllocDone",
		"actAllIncompatible",
		"actAcceptAllTaskFreeAlloc"
	],
	"transitions": {
		"apply": 49
	}
}
					*/
					break;
				case "applyFreeAllocation":
					/*
					{
	"name": "applyFreeAllocation",
	"description": "",
	"type": "game",
	"action": "stApplyFreeAllocation",
	"transitions": {
		"loop": 43,
		"option": 50,
		"done": 4
	}
}
					*/
					break;
				case "preOptionTask":
					/*
					{
	"name": "preOptionTask",
	"description": "",
	"type": "game",
	"action": "stPreOptionTask",
	"transitions": {
		"option": 6,
		"trick": 30
	}
}
					*/
					break;
				case "resetTasks":
					/*
					{
	"name": "resetTasks",
	"description": "",
	"type": "game",
	"action": "stResetTasks",
	"transitions": {
		"task": 5,
		"trick": 4,
		"question": 47,
		"pickCrew": 19,
		"moveTile": 20,
		"freeAllocation": 42
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
export default thecrewdeepsea;
