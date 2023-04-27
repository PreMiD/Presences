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

const noneshallpass: GamePresence = {
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
		"": 2
	}
}
					*/
					break;
				case "pickGuards":
					/*
					{
	"name": "pickGuards",
	"description": "Other players must choose their guard class",
	"descriptionmyturn": "${you} must choose your guard class",
	"type": "multipleactiveplayer",
	"action": "stMultiPlayerInit",
	"args": "argPickGuards",
	"possibleactions": [
		"pickGuards"
	],
	"transitions": {
		"pickedGuards": 3
	}
}
					*/
					break;
				case "startGame":
					/*
					{
	"name": "startGame",
	"type": "game",
	"action": "stStartGame",
	"updateGameProgression": true,
	"transitions": {
		"startingGame": 9
	}
}
					*/
					break;
				case "playerTurnStart":
					/*
					{
	"name": "playerTurnStart",
	"type": "game",
	"action": "stPlayerTurnStart",
	"updateGameProgression": true,
	"transitions": {
		"standardTurn": 10,
		"deadTurn": 14,
		"triplesTurn": 15
	}
}
					*/
					break;
				case "standardTurn":
					/*
					{
	"name": "standardTurn",
	"description": "${actplayer} must choose an action",
	"descriptionmyturn": "${you} must choose an action",
	"type": "activeplayer",
	"args": "argDrawDice",
	"possibleactions": [
		"selectDie",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"checkSixAction": 12,
		"didBonusAction": 13,
		"notifyDie": 11,
		"triplesTurn": 15,
		"zombiePass": 99
	}
}
					*/
					break;
				case "notifyPlayer":
					/*
					{
	"name": "notifyPlayer",
	"description": "${actplayer} must complete their action",
	"descriptionmyturn": "${you} must complete your action",
	"type": "activeplayer",
	"args": "argNotifyPlayer",
	"possibleactions": [
		"notifyPlayer",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"checkSixAction": 12,
		"didBonusAction": 13,
		"zombiePass": 99
	}
}
					*/
					break;
				case "doSixAction":
					/*
					{
	"name": "doSixAction",
	"description": "${actplayer} may perform their bonus action",
	"descriptionmyturn": "${you} may perform your bonus action or ",
	"type": "activeplayer",
	"possibleactions": [
		"selectSixDie",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"notifyDie": 11,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerSecondTurn":
					/*
					{
	"name": "playerSecondTurn",
	"description": "${actplayer} may perform another action",
	"descriptionmyturn": "${you} may perform another action or ",
	"type": "activeplayer",
	"possibleactions": [
		"selectDie",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"notifyDie": 11,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerDead":
					/*
					{
	"name": "playerDead",
	"description": "${actplayer} is incapacitated",
	"descriptionmyturn": "${you} are incapacitated and must treat wounds this turn ",
	"type": "activeplayer",
	"args": "argDrawDice",
	"possibleactions": [
		"healMe",
		"upgradeCard"
	],
	"transitions": {
		"selectedDie": 21,
		"notifyDie": 16,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerTriples":
					/*
					{
	"name": "playerTriples",
	"description": "${actplayer} rolled triples",
	"descriptionmyturn": "${you} rolled triples and must choose two actions to perform",
	"type": "activeplayer",
	"args": "argDrawDice",
	"possibleactions": [
		"selectDie",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 23,
		"notifyDie": 22,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerDeadNotify":
					/*
					{
	"name": "playerDeadNotify",
	"description": "${actplayer} is incapacitated",
	"descriptionmyturn": "Select your number of wounds to treat",
	"type": "activeplayer",
	"args": "argNotifyPlayer",
	"possibleactions": [
		"notifyPlayer",
		"upgradeCard"
	],
	"transitions": {
		"selectedDie": 21,
		"zombiePass": 99
	}
}
					*/
					break;
				case "commanderActions":
					/*
					{
	"name": "commanderActions",
	"description": "${actplayer} must perform their action",
	"descriptionmyturn": "${you} must perform your action",
	"type": "activeplayer",
	"args": "argNotifyCommander",
	"possibleactions": [
		"notifyPlayer",
		"commanderStandAlone"
	],
	"transitions": {
		"anotherAction": 17,
		"notifyPlayer": 18,
		"monsterTurn": 40,
		"zombiePass": 99
	}
}
					*/
					break;
				case "commanderOrderPlayer":
					/*
					{
	"name": "commanderOrderPlayer",
	"type": "game",
	"action": "stOrderPlayer",
	"updateGameProgression": true,
	"transitions": {
		"notifyPlayer": 19
	}
}
					*/
					break;
				case "commanderOrderPlayerNotification":
					/*
					{
	"name": "commanderOrderPlayerNotification",
	"description": "The Commander ordered ${actplayer}",
	"descriptionmyturn": "The Commander ordered ${you} to perform your 6 action",
	"type": "activeplayer",
	"args": "argNotifyPlayerCommander",
	"possibleactions": [
		"notifyPlayer"
	],
	"transitions": {
		"anotherAction": 20,
		"monsterTurn": 40,
		"zombiePass": 99
	}
}
					*/
					break;
				case "anotherCommanderFromNotify":
					/*
					{
	"name": "anotherCommanderFromNotify",
	"type": "game",
	"action": "stAnother6Notify",
	"updateGameProgression": true,
	"transitions": {
		"anotherAction": 17
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
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 9,
		"commanderAction": 17,
		"monsterTurn": 40
	}
}
					*/
					break;
				case "notifyPlayerTriples":
					/*
					{
	"name": "notifyPlayerTriples",
	"description": "${actplayer} rolled triples",
	"descriptionmyturn": "${you} must complete your action",
	"type": "activeplayer",
	"args": "argNotifyPlayer",
	"possibleactions": [
		"notifyPlayer",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 23,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerTriplesTwo":
					/*
					{
	"name": "playerTriplesTwo",
	"description": "${actplayer} rolled triples",
	"descriptionmyturn": "${you} rolled triples and must choose your second action to perform",
	"type": "activeplayer",
	"possibleactions": [
		"selectDie",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"notifyDie": 24,
		"choosePeril": 25,
		"zombiePass": 99
	}
}
					*/
					break;
				case "notifyPlayerTriplesTwo":
					/*
					{
	"name": "notifyPlayerTriplesTwo",
	"description": "${actplayer} rolled triples",
	"descriptionmyturn": "${you} must complete your action",
	"type": "activeplayer",
	"args": "argNotifyPlayer",
	"possibleactions": [
		"notifyPlayer",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedDie": 21,
		"choosePeril": 25,
		"zombiePass": 99
	}
}
					*/
					break;
				case "choosePeril":
					/*
					{
	"name": "choosePeril",
	"description": "${actplayer} must choose their peril",
	"descriptionmyturn": "${you} must choose your peril",
	"type": "activeplayer",
	"args": "argChoosePeril",
	"possibleactions": [
		"notifyPlayer",
		"upgradeCard",
		"playerTurn"
	],
	"transitions": {
		"selectedPeril": 21,
		"zombiePass": 99
	}
}
					*/
					break;
				case "monsterTurnSetupReady":
					/*
					{
	"name": "monsterTurnSetupReady",
	"type": "game",
	"action": "stSetFirstPlayer",
	"updateGameProgression": true,
	"transitions": {
		"firstPlayerSet": 41,
		"playersReady": 42
	}
}
					*/
					break;
				case "monsterTurnReady":
					/*
					{
	"name": "monsterTurnReady",
	"description": "The monster's turn is about to start ",
	"descriptionmyturn": "The monster's turn is about to start ",
	"type": "activeplayer",
	"possibleactions": [
		"leaderReady",
		"upgradeCard"
	],
	"transitions": {
		"playersReady": 42
	}
}
					*/
					break;
				case "monsterTurn":
					/*
					{
	"name": "monsterTurn",
	"type": "game",
	"action": "stMonsterTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextRound": 9,
		"nextMonster": 43,
		"playersReady": 9,
		"endGame": 99
	}
}
					*/
					break;
				case "monsterArriveReady":
					/*
					{
	"name": "monsterArriveReady",
	"description": "The Level ${level} monster is about to arrive ",
	"descriptionmyturn": "The Level ${level} monster is about to arrive ",
	"args": "argMonsterArrive",
	"type": "activeplayer",
	"possibleactions": [
		"leaderReady",
		"upgradeCard"
	],
	"transitions": {
		"playersReady": 9
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
export default noneshallpass;
