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

const marcopolotwo: GamePresence = {
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
		"collectBonus": 3,
		"rollDice": 4
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
		"triggerDoubleBonus"
	],
	"transitions": {
		"done": 4,
		"continue": 3
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
		"next": 6,
		"collectCompensation": 7
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
		"nextRound": 2,
		"gameover": 98
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
		"pickIsabellaCompensation",
		"pickCompensation"
	],
	"transitions": {
		"continue": 7,
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
		"pass",
		"skip",
		"undo",
		"chooseResource",
		"improveGuild",
		"pickContract",
		"travel",
		"activateMultipleCityCard",
		"activateExchangeCityCard",
		"activateGuildCityCard",
		"placeExtraTradingPost",
		"moveTradingPost",
		"activateOutpost",
		"pickMongkeKhan",
		"discardContract",
		"triggerOtherCityBonus",
		"pickBlackDie",
		"startRoute",
		"placeCaravan",
		"pickGoodCaravan",
		"travelCaravan",
		"completeRoute",
		"pickRouteAward",
		"trigger1xBonus"
	],
	"transitions": {
		"pass": 6,
		"continue": 10
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
		"pickGoals": 23
	}
}
					*/
					break;
				case "pickGoals":
					/*
					{
	"name": "pickGoals",
	"description": "All players must pick their goal card",
	"descriptionmyturn": "${you} must pick your goal card",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"pickGoalCards"
	],
	"transitions": {
		"done": 24
	}
}
					*/
					break;
				case "gameCharacterPlayerSetup":
					/*
					{
	"name": "gameCharacterPlayerSetup",
	"type": "game",
	"action": "stGameCharacterPlayerSetup",
	"transitions": {
		"donataBadoer": 25,
		"done": 2
	}
}
					*/
					break;
				case "pickDonataBadoerFigures":
					/*
					{
	"name": "pickDonataBadoerFigures",
	"description": "${actplayer} must pick a figure",
	"descriptionmyturn": "${you} must pick a figure",
	"type": "activeplayer",
	"args": "argDonataBadoer",
	"possibleactions": [
		"pickDonataFigure"
	],
	"transitions": {
		"pickAgain": 25,
		"done": 2
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
export default marcopolotwo;
