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

const nylonppong: GamePresence = {
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
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "handCheck":
					/*
					{
	"name": "handCheck",
	"description": "All players must check their hand",
	"descriptionmyturn": "${you} must check your hand",
	"type": "multipleactiveplayer",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"endHandCheck",
		"changePpongQueue"
	],
	"updateGameProgression": true,
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "firstPlayer":
					/*
					{
	"name": "firstPlayer",
	"description": "",
	"type": "game",
	"action": "stFirstPlayer",
	"transitions": {
		"": 7
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
		"callStop",
		"changePpongQueue"
	],
	"transitions": {
		"claimDiscard": 6,
		"drawCard": 7,
		"stopRound": 8,
		"zombiePass": 10
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
		"interceptTurn": 9,
		"endRound": 11
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
		"playerTurn": 9,
		"endRound": 11
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
		"": 11
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must discard a card",
	"descriptionmyturn": "${you} must discard a card",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"discardCard",
		"callEnd",
		"changePpongQueue"
	],
	"transitions": {
		"discardCard": 10,
		"callEnd": 11,
		"zombiePass": 10
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
		"nextPlayer": 5,
		"triggerQueue": 6,
		"endRound": 11
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
export default nylonppong;
