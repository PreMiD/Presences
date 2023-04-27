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

const sushigoparty: GamePresence = {
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
		"": 3
	}
}
					*/
					break;
				case "startTurn":
					/*
					{
	"name": "startTurn",
	"description": "",
	"type": "game",
	"action": "stStartTurn",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "MenuSelection":
					/*
					{
	"name": "MenuSelection",
	"description": "${actplayer} must select the menu of cards.",
	"descriptionmyturn": "${you} must select the menu of cards.",
	"type": "activeplayer",
	"action": "stMenuSelection",
	"args": "argMenuSelection",
	"updateGameProgression": true,
	"possibleactions": [
		"SelectMenu",
		"Vote"
	],
	"transitions": {
		"Start": 30
	}
}
					*/
					break;
				case "multiplayerTurn":
					/*
					{
	"name": "multiplayerTurn",
	"description": "You may change your selection while waiting for other players to pick a card",
	"descriptionmyturn": "${you} must pick a card",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerTurn",
	"possibleactions": [
		"pickCard"
	],
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "multiplayerTurnMenu":
					/*
					{
	"name": "multiplayerTurnMenu",
	"description": "Other players are chosing their cards from the menu - If you played a menu card, you may change your selection while waiting",
	"descriptionmyturn": "${you} must select one card from a menu of four",
	"type": "multipleactiveplayer",
	"action": "stmultiplayerTurnMenu",
	"args": "argMultiplayerTurnMenu",
	"possibleactions": [
		"pickCard"
	],
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "multiplayerTurnTakeout":
					/*
					{
	"name": "multiplayerTurnTakeout",
	"description": "You must wait for other players to select their cards to flip",
	"descriptionmyturn": "${you} must select cards you want to flip",
	"type": "multipleactiveplayer",
	"action": "stmultiplayerTurnTakeout",
	"args": "argMultiplayerTurnTakeout",
	"possibleactions": [
		"selectTakeoutCards",
		"skipselectTakeoutCards"
	],
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "stEndTurn",
	"updateGameProgression": true,
	"transitions": {
		"lastCard": 20,
		"endRound": 30,
		"nextTurn": 2,
		"GotoMenu": 11,
		"GotoTakeout": 12
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextRound": 40,
		"firstRound": 50,
		"endGame": 99
	}
}
					*/
					break;
				case "multiplayerReadyForNextRound":
					/*
					{
	"name": "multiplayerReadyForNextRound",
	"description": "Is everyone ready for the next round?",
	"descriptionmyturn": "Are you ready for the next round?",
	"type": "multipleactiveplayer",
	"args": "argMultiplayerReadyForNextRound",
	"action": "stMultiplayerReadyForNextRound",
	"possibleactions": [
		"ready"
	],
	"transitions": {
		"": 50
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
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "gameBeforeEnd":
					/*
					{
	"name": "gameBeforeEnd",
	"description": "Game end",
	"descriptionmyturn": "Game end",
	"type": "multipleactiveplayer",
	"possibleactions": [
		""
	],
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
export default sushigoparty;
