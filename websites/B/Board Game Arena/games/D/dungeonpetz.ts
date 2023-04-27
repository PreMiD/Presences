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

const dungeonpetz: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must go shopping (or not)",
	"descriptionmyturn": "${you} must go shopping or keep your group at home ${imps}",
	"type": "activeplayer",
	"args": "arg_playerTurn",
	"possibleactions": [
		"actionShop",
		"actionKeep"
	],
	"transitions": {
		"next": 6
	}
}
					*/
					break;
				case "gameTurnUpkeep":
					/*
					{
	"name": "gameTurnUpkeep",
	"description": "Income, Reveal and Replenish",
	"type": "game",
	"action": "st_gameTurnUpkeep",
	"updateGameProgression": true,
	"transitions": {
		"next": 4
	}
}
					*/
					break;
				case "playerTurnGroup":
					/*
					{
	"name": "playerTurnGroup",
	"type": "multipleactiveplayer",
	"action": "st_gameMultiactive",
	"description": "Other pet shop owners are preparing for shopping",
	"descriptionmyturn": "${you} must group imps and gold into groups to go shopping",
	"possibleactions": [
		"actionGroup",
		"actionCancel"
	],
	"transitions": {
		"next": 6,
		"loopback": 4
	}
}
					*/
					break;
				case "gameTurnNextPlayer":
					/*
					{
	"name": "gameTurnNextPlayer",
	"description": "Phase 2 - Shopping",
	"type": "game",
	"action": "st_gameTurnNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"next": 2,
		"last": 8,
		"loopback": 6
	}
}
					*/
					break;
				case "playerTurnNeeds":
					/*
					{
	"name": "playerTurnNeeds",
	"description": "Other pet shop owners must deal with their pets needs",
	"descriptionmyturn": "${you} must deal with your pets needs",
	"type": "multipleactiveplayer",
	"action": "st_playerTurnNeeds",
	"args": "arg_playerTurnNeeds",
	"possibleactions": [
		"actionArrange",
		"actionNeeds",
		"actionCancel"
	],
	"transitions": {
		"next": 9,
		"loopback": 8
	}
}
					*/
					break;
				case "gameTurnEvaluate":
					/*
					{
	"name": "gameTurnEvaluate",
	"description": "Evaluating needs and showing off",
	"type": "game",
	"action": "st_gameTurnEvaluate",
	"updateGameProgression": true,
	"transitions": {
		"next": 10,
		"loopback": 9,
		"last": 11
	}
}
					*/
					break;
				case "playerTurnEvaluate":
					/*
					{
	"name": "playerTurnEvaluate",
	"description": "${actplayer} must care for pets and show off",
	"descriptionmyturn": "${you} must care for pets and show off",
	"type": "activeplayer",
	"args": "arg_playerTurnEvaluate",
	"possibleactions": [
		"actionEvaluate",
		"actionUndo"
	],
	"transitions": {
		"next": 9,
		"game": 9,
		"loopback": 10
	}
}
					*/
					break;
				case "gameTurnBusiness":
					/*
					{
	"name": "gameTurnBusiness",
	"description": "Getting down to business",
	"type": "game",
	"action": "st_gameTurnBusiness",
	"updateGameProgression": true,
	"transitions": {
		"next": 12,
		"loopback": 11,
		"last": 14
	}
}
					*/
					break;
				case "playerTurnBusiness":
					/*
					{
	"name": "playerTurnBusiness",
	"description": "${actplayer} may sell some pets",
	"descriptionmyturn": "${you} may sell some pets",
	"type": "activeplayer",
	"args": "arg_playerTurnBusiness",
	"possibleactions": [
		"actionSell",
		"actionUndo"
	],
	"transitions": {
		"next": 11,
		"game": 11,
		"loopback": 12
	}
}
					*/
					break;
				case "playerTurnJobs":
					/*
					{
	"name": "playerTurnJobs",
	"description": "${actplayer} must give jobs to remaining imps",
	"descriptionmyturn": "${you} may pick up some poop, unassigned imps will work for Gold",
	"type": "multipleactiveplayer",
	"action": "st_gameMultiactiveWithImps",
	"args": "arg_playerTurnJobs",
	"possibleactions": [
		"actionJobs"
	],
	"transitions": {
		"next": 15
	}
}
					*/
					break;
				case "gameTurnRoundEnd":
					/*
					{
	"name": "gameTurnRoundEnd",
	"description": "End of round actions",
	"type": "game",
	"action": "st_gameTurnRoundEnd",
	"updateGameProgression": true,
	"transitions": {
		"next": 3,
		"end": 99
	}
}
					*/
					break;
				case "playerTurnConfirm":
					/*
					{
	"name": "playerTurnConfirm",
	"description": "${actplayer} must end game (test state)",
	"descriptionmyturn": "${you} must end game (test state)",
	"type": "activeplayer",
	"possibleactions": [
		"actionAck"
	],
	"transitions": {
		"next": 99
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
export default dungeonpetz;
