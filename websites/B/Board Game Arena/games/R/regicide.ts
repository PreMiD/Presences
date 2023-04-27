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

const regicide: GamePresence = {
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
				case "survivalCheck":
					/*
					{
	"name": "survivalCheck",
	"description": "",
	"type": "game",
	"action": "stSurvivalCheck",
	"updateGameProgression": true,
	"transitions": {
		"soloJester": 2,
		"nextBattle": 3,
		"autoPlay": 4,
		"noChoice": 7,
		"endGame": 99
	}
}
					*/
					break;
				case "playPhase":
					/*
					{
	"name": "playPhase",
	"description": "${actplayer} may play a card",
	"descriptionmyturn": "${you} may play a card",
	"type": "activeplayer",
	"args": "argPlayPhase",
	"possibleactions": [
		"playCard",
		"yieldTurn",
		"soloJester"
	],
	"transitions": {
		"soloJester": 2,
		"playCard": 4,
		"yieldTurn": 7,
		"zombiePass": 9
	}
}
					*/
					break;
				case "cardPowerDamage":
					/*
					{
	"name": "cardPowerDamage",
	"description": "",
	"type": "game",
	"action": "stCardPowerDamage",
	"transitions": {
		"defeatedEnemy": 2,
		"multiJester": 5,
		"nextPhase": 7
	}
}
					*/
					break;
				case "multiJester":
					/*
					{
	"name": "multiJester",
	"description": "Players may change the answer while waiting",
	"descriptionmyturn": "${you} may volunteer to go next",
	"type": "multipleactiveplayer",
	"args": "argMultiJester",
	"action": "stMultiPlayerInit",
	"possibleactions": [
		"multiJester",
		"multiJesterAnswer",
		"multiJesterChangeAnswer"
	],
	"transitions": {
		"turnOrderChange": 6,
		"zombiePass": 9
	}
}
					*/
					break;
				case "turnOrderChange":
					/*
					{
	"name": "turnOrderChange",
	"description": "",
	"type": "game",
	"action": "stTurnOrderChange",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "discardCheck":
					/*
					{
	"name": "discardCheck",
	"description": "",
	"type": "game",
	"action": "stDiscardCheck",
	"transitions": {
		"soloJester": 7,
		"discardPhase": 8,
		"noChoice": 9,
		"endGame": 99
	}
}
					*/
					break;
				case "discardPhase":
					/*
					{
	"name": "discardPhase",
	"description": "${actplayer} must discard cards to suffer ${castle_attack} damage",
	"descriptionmyturn": "${you} must discard cards to suffer ${castle_attack} damage",
	"type": "activeplayer",
	"args": "argDiscardPhase",
	"possibleactions": [
		"discardCard",
		"soloJester"
	],
	"transitions": {
		"endPhase": 9,
		"soloJester": 7,
		"zombiePass": 9
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
		"nextPlayer": 2
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
export default regicide;
