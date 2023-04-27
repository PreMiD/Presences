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

const marcopolo: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "newRound":
					/*
					{
	"name": "newRound",
	"type": "game",
	"action": "stGameNewRound",
	"transitions": {
		"rollDice": 5,
		"collectBonus": 7
	}
}
					*/
					break;
				case "rollAllDice":
					/*
					{
	"name": "rollAllDice",
	"type": "game",
	"action": "stGameRollAllDice",
	"transitions": {
		"collectCompensation": 8,
		"next": 6
	}
}
					*/
					break;
				case "next":
					/*
					{
	"name": "next",
	"type": "game",
	"action": "stGameNext",
	"transitions": {
		"nextPlayer": 10,
		"nextRound": 4,
		"gameover": 98
	}
}
					*/
					break;
				case "playerBonus":
					/*
					{
	"name": "playerBonus",
	"description": "All players must collect their bonuses",
	"descriptionmyturn": "${you} must collect your bonuses",
	"type": "multipleactiveplayer",
	"args": "argPlayerBonus",
	"action": "stPlayerBonus",
	"possibleactions": [
		"triggerBonus",
		"chooseResource",
		"triggerOtherCityBonus",
		"usePlayerPiece"
	],
	"transitions": {
		"done": 5,
		"continue": 7
	}
}
					*/
					break;
				case "playerDieCompensation":
					/*
					{
	"name": "playerDieCompensation",
	"description": "All players may receive dice compensation",
	"descriptionmyturn": "${you} must pick dice compensation",
	"type": "multipleactiveplayer",
	"args": "argPlayerDieCompensation",
	"possibleactions": [
		"pickCompensation"
	],
	"transitions": {
		"done": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must perform an action or bonus action",
	"descriptionmyturn": "${you} must perform an action or bonus action",
	"descriptionmyturn_bonus": "${you} must perform a bonus action or pass",
	"description_bonus": "${actplayer} must perform a bonus action or pass",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"placeDie",
		"rerollDie",
		"bumpDie",
		"buyBlackDie",
		"changeDice",
		"fulfillContract",
		"fulfillGift",
		"pass",
		"undo"
	],
	"transitions": {
		"travel": 11,
		"chooseResource": 12,
		"chooseCityCardAward": 13,
		"pickContract": 14,
		"triggerOtherCityBonus": 16,
		"pass": 6,
		"continue": 10
	}
}
					*/
					break;
				case "playerTravel":
					/*
					{
	"name": "playerTravel",
	"description": "${actplayer} may travel (${num_remaining} steps remaining)",
	"descriptionmyturn": "${you} may travel (${num_remaining} steps remaining)",
	"type": "activeplayer",
	"args": "argPlayerTravel",
	"possibleactions": [
		"travel",
		"skipTravel",
		"fulfillGift",
		"undo"
	],
	"transitions": {
		"continue": 10,
		"travel": 11,
		"chooseResource": 12,
		"moveTradingPost": 15,
		"triggerOtherCityBonus": 16
	}
}
					*/
					break;
				case "playerChooseResource":
					/*
					{
	"name": "playerChooseResource",
	"description": "${actplayer} must choose resources",
	"descriptionmyturn": "${you} must choose resources",
	"type": "activeplayer",
	"args": "argPlayerChooseResource",
	"possibleactions": [
		"chooseResource",
		"undo"
	],
	"transitions": {
		"continue": 10,
		"gunj_bonus": 30,
		"travel": 11,
		"chooseResource": 12,
		"chooseCityCardAward": 13,
		"pickContract": 14,
		"moveTradingPost": 15,
		"triggerOtherCityBonus": 16
	}
}
					*/
					break;
				case "playerChooseCityCardAward":
					/*
					{
	"name": "playerChooseCityCardAward",
	"description": "${actplayer} may activate city card upto ${num_remaining} times",
	"descriptionmyturn": "${you} may activate city card upto ${num_remaining} times",
	"type": "activeplayer",
	"args": "argPlayerChooseCityCardAward",
	"possibleactions": [
		"activateExchangeCityCard",
		"activateMultipleCityCard",
		"skipChooseCityAward",
		"undo"
	],
	"transitions": {
		"continue": 10,
		"travel": 11,
		"chooseResource": 12,
		"chooseCityCardAward": 13,
		"triggerOtherCityBonus": 16
	}
}
					*/
					break;
				case "playerPickContract":
					/*
					{
	"name": "playerPickContract",
	"description": "${actplayer} may pick a contract (${num_remaining} remaining)",
	"descriptionmyturn": "${you} may pick a contract (${num_remaining} remaining)",
	"type": "activeplayer",
	"args": "argPlayerPickContract",
	"possibleactions": [
		"pickContract",
		"skipContract",
		"undo"
	],
	"transitions": {
		"chooseResource": 12,
		"pickContract": 14,
		"continue": 10
	}
}
					*/
					break;
				case "playerMoveTradingPost":
					/*
					{
	"name": "playerMoveTradingPost",
	"description": "Out of trading posts, ${actplayer} may move a trading post",
	"descriptionmyturn": "Out of trading posts, ${you} may move a trading post",
	"type": "activeplayer",
	"args": "argPlayerMoveTradingPost",
	"possibleactions": [
		"moveTradingPost",
		"skipMoveTradingPost",
		"undo"
	],
	"transitions": {
		"continue": 10,
		"chooseResource": 12,
		"travel": 11,
		"moveTradingPost": 15,
		"triggerOtherCityBonus": 16
	}
}
					*/
					break;
				case "playerTriggerOtherCityBonus":
					/*
					{
	"name": "playerTriggerOtherCityBonus",
	"description": "${actplayer} must select another city bonus to activate",
	"descriptionmyturn": "${you} must select another city bonus to activate",
	"type": "activeplayer",
	"args": "argPlayerTriggerOtherCityBonus",
	"possibleactions": [
		"triggerOtherCityBonus",
		"skipTriggerOtherCityBonus",
		"undo"
	],
	"transitions": {
		"continue": 10,
		"travel": 11,
		"chooseResource": 12,
		"moveTradingPost": 15,
		"triggerOtherCityBonus": 16
	}
}
					*/
					break;
				case "gamePickCharacter":
					/*
					{
	"name": "gamePickCharacter",
	"type": "game",
	"action": "stGamePickCharacter",
	"transitions": {
		"pickCharacter": 21,
		"setupGoals": 22
	}
}
					*/
					break;
				case "pickCharacter":
					/*
					{
	"name": "pickCharacter",
	"description": "${actplayer} must pick a character",
	"descriptionmyturn": "${you} must pick a character",
	"type": "activeplayer",
	"args": "argPickCharacter",
	"possibleactions": [
		"pickCharacter"
	],
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "gamePickGoals":
					/*
					{
	"name": "gamePickGoals",
	"type": "game",
	"action": "stGamePickGoals",
	"transitions": {
		"pickGoals": 23,
		"start": 4
	}
}
					*/
					break;
				case "pickGoals":
					/*
					{
	"name": "pickGoals",
	"description": "All players must pick their goal cards",
	"descriptionmyturn": "${you} must pick your goal cards",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pickGoalCards"
	],
	"transitions": {
		"done": 4
	}
}
					*/
					break;
				case "gamePlayerGunjBonusStart":
					/*
					{
	"name": "gamePlayerGunjBonusStart",
	"type": "game",
	"action": "stGamePlayerGunjBonusStart",
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "playerGunjBonus":
					/*
					{
	"name": "playerGunjBonus",
	"description": "All players must choose a good",
	"descriptionmyturn": "${you} must pick a good",
	"type": "multipleactiveplayer",
	"args": "argPlayerGunjBonus",
	"action": "stPlayerGunjBonus",
	"possibleactions": [
		"chooseResource"
	],
	"transitions": {
		"continue": 21,
		"done": 22
	}
}
					*/
					break;
				case "gamePlayerGunjBonusFinish":
					/*
					{
	"name": "gamePlayerGunjBonusFinish",
	"type": "game",
	"action": "stGamePlayerGunjBonusFinish",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "gameover":
					/*
					{
	"name": "gameover",
	"type": "game",
	"action": "stGameover",
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
export default marcopolo;
