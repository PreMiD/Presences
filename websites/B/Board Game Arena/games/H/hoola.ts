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

const hoola: GamePresence = {
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
				case "combinationCheck":
					/*
					{
	"name": "combinationCheck",
	"description": "",
	"type": "game",
	"action": "stCombinationCheck",
	"transitions": {
		"notEndedYet": 3,
		"endRound": 12
	}
}
					*/
					break;
				case "claimDrawStop":
					/*
					{
	"name": "claimDrawStop",
	"description": "${actplayer} must choose the action",
	"descriptionmyturn": "${you} must choose the action",
	"type": "activeplayer",
	"args": "argClaimDrawStop",
	"possibleactions": [
		"claimDiscard",
		"drawCard",
		"callStop"
	],
	"transitions": {
		"claimDiscard": 4,
		"drawCard": 5,
		"stopRound": 6,
		"zombiePass": 11
	}
}
					*/
					break;
				case "changeTurn":
					/*
					{
	"name": "changeTurn",
	"description": "",
	"type": "game",
	"action": "stChangeTurn",
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "",
	"type": "game",
	"action": "stDrawCard",
	"transitions": {
		"playerTurn": 8,
		"fourSevens": 12
	}
}
					*/
					break;
				case "stopRound":
					/*
					{
	"name": "stopRound",
	"description": "",
	"type": "game",
	"action": "stStopRound",
	"transitions": {
		"": 12
	}
}
					*/
					break;
				case "interceptTurn":
					/*
					{
	"name": "interceptTurn",
	"description": "${actplayer} must play a meld using the claimed discard",
	"descriptionmyturn": "${you} must play a meld using the claimed discard",
	"type": "activeplayer",
	"args": "argInterceptTurn",
	"possibleactions": [
		"meldCard"
	],
	"transitions": {
		"jokerReplaceSelect": 9,
		"continueTurn": 8,
		"endTurn": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may play melds or add cards",
	"descriptionmyturn": "${you} may play melds or add cards",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"meldCard",
		"addCard",
		"discardCard"
	],
	"transitions": {
		"jokerReplaceSelect": 9,
		"addSelect": 10,
		"endTurn": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "jokerReplaceSelect":
					/*
					{
	"name": "jokerReplaceSelect",
	"description": "${actplayer} must choose the card to substitute",
	"descriptionmyturn": "${you} must choose the card to substitute",
	"type": "activeplayer",
	"args": "argJokerReplaceSelect",
	"possibleactions": [
		"jokerReplaceSelect"
	],
	"transitions": {
		"continueTurn": 8,
		"endTurn": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "addSelect":
					/*
					{
	"name": "addSelect",
	"description": "${actplayer} must choose the location to add card",
	"descriptionmyturn": "${you} must choose the location to add card",
	"type": "activeplayer",
	"args": "argAddSelect",
	"possibleactions": [
		"addSelect"
	],
	"transitions": {
		"continueTurn": 8,
		"endTurn": 11,
		"zombiePass": 11
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
		"nextPlayer": 2,
		"endRound": 12
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
		"nextRound": 2,
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
export default hoola;
