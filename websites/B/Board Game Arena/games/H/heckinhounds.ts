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

const heckinhounds: GamePresence = {
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
				case "modeCheck":
					/*
					{
	"name": "modeCheck",
	"description": "",
	"type": "game",
	"action": "stModeCheck",
	"transitions": {
		"normal": 3,
		"single": 4
	}
}
					*/
					break;
				case "chooseBadDog":
					/*
					{
	"name": "chooseBadDog",
	"description": "${actplayer} must choose the type of extra bad dog",
	"descriptionmyturn": "${you} must choose the type of extra bad dog from the chart",
	"type": "activeplayer",
	"possibleactions": [
		"chooseBadDog"
	],
	"transitions": {
		"chooseBadDog": 4,
		"zombiePass": 19
	}
}
					*/
					break;
				case "giveClue":
					/*
					{
	"name": "giveClue",
	"description": "${actplayer} must give a clue ${shift_leader_text}",
	"descriptionmyturn": "${you} must give a clue ${shift_leader_text}",
	"type": "activeplayer",
	"args": "argGiveClue",
	"possibleactions": [
		"giveClue"
	],
	"transitions": {
		"giveClue": 5,
		"zombiePass_Normal": 19,
		"zombiePass_Single": 5
	}
}
					*/
					break;
				case "clueEndCheck":
					/*
					{
	"name": "clueEndCheck",
	"description": "",
	"type": "game",
	"action": "stClueEndCheck",
	"transitions": {
		"clueLeft": 4,
		"clueDoneNormal": 6,
		"clueDoneSingle": 10
	}
}
					*/
					break;
				case "assignCerberus":
					/*
					{
	"name": "assignCerberus",
	"description": "${actplayer} must assign Cerberus",
	"descriptionmyturn": "${you} must choose a player and assign Cerberus",
	"type": "activeplayer",
	"possibleactions": [
		"assignCerberus"
	],
	"transitions": {
		"assignCerberus": 7,
		"zombiePass": 10
	}
}
					*/
					break;
				case "playerChangeCerberus":
					/*
					{
	"name": "playerChangeCerberus",
	"description": "",
	"type": "game",
	"action": "stPlayerChangeCerberus",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "replaceIntoCerberus":
					/*
					{
	"name": "replaceIntoCerberus",
	"description": "${actplayer} must choose a card to replace with Cerberus",
	"descriptionmyturn": "${you} must choose a card to replace with Cerberus",
	"type": "activeplayer",
	"possibleactions": [
		"replaceIntoCerberus"
	],
	"transitions": {
		"replaceIntoCerberus": 9,
		"zombiePass": 9
	}
}
					*/
					break;
				case "playerChangeBack":
					/*
					{
	"name": "playerChangeBack",
	"description": "",
	"type": "game",
	"action": "stPlayerChangeBack",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "deadHandTrade":
					/*
					{
	"name": "deadHandTrade",
	"description": "${actplayer} may trade a card with the dead hand",
	"descriptionmyturn": "${you} may trade a card with the dead hand",
	"type": "activeplayer",
	"possibleactions": [
		"deadHandTrade",
		"deadHandSkip"
	],
	"transitions": {
		"deadHandTrade": 11,
		"deadHandSkip": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "tradeEndCheck":
					/*
					{
	"name": "tradeEndCheck",
	"description": "",
	"type": "game",
	"action": "stTradeEndCheck",
	"transitions": {
		"tradeLeft": 10,
		"tradeDone": 12
	}
}
					*/
					break;
				case "revealTradedCards":
					/*
					{
	"name": "revealTradedCards",
	"description": "",
	"type": "game",
	"action": "stRevealTradedCards",
	"transitions": {
		"": 13
	}
}
					*/
					break;
				case "promiseShifts":
					/*
					{
	"name": "promiseShifts",
	"description": "${actplayer} must promise the number of shifts to work",
	"descriptionmyturn": "${you} must promise the number of shifts to work",
	"type": "activeplayer",
	"possibleactions": [
		"promiseShifts"
	],
	"transitions": {
		"promiseShifts": 14,
		"zombiePass": 14
	}
}
					*/
					break;
				case "promiseEndCheck":
					/*
					{
	"name": "promiseEndCheck",
	"description": "",
	"type": "game",
	"action": "stPromiseEndCheck",
	"transitions": {
		"promiseLeft": 13,
		"promiseDone": 15
	}
}
					*/
					break;
				case "lastTrickCheck":
					/*
					{
	"name": "lastTrickCheck",
	"description": "",
	"type": "game",
	"action": "stLastTrickCheck",
	"transitions": {
		"playerTurn": 16,
		"skipTurn": 17,
		"tram": 19
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
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 17,
		"zombiePass": 17
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
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 15,
		"endTrick": 18
	}
}
					*/
					break;
				case "endTrick":
					/*
					{
	"name": "endTrick",
	"description": "",
	"type": "game",
	"action": "stEndTrick",
	"transitions": {
		"nextPlayer": 15,
		"endRound": 19
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
		"nextRound": 3,
		"endGame": 99
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
export default heckinhounds;
