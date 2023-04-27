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

const niagara: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
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
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"": 21
	}
}
					*/
					break;
				case "choosePaddle":
					/*
					{
	"name": "choosePaddle",
	"description": "Everyone must choose a paddle card to play",
	"descriptionmyturn": "${you} must choose a paddle card to play",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"choosePaddle",
		"recoverCanoe"
	],
	"transitions": {
		"choosePaddle": 30
	}
}
					*/
					break;
				case "moveCanoeNextPlayer":
					/*
					{
	"name": "moveCanoeNextPlayer",
	"description": "",
	"type": "game",
	"action": "stMoveCanoeNextPlayer",
	"transitions": {
		"nextPlayer": 31,
		"nextPlayerWeather": 35
	}
}
					*/
					break;
				case "moveCanoe":
					/*
					{
	"name": "moveCanoe",
	"description": "${actplayer} must choose a canoe to move",
	"descriptionmyturn": "${you} must choose a canoe to move",
	"type": "activeplayer",
	"action": "stMoveCanoe",
	"args": "argMoveCanoe",
	"possibleactions": [
		"chooseCanoe",
		"endTurn"
	],
	"transitions": {
		"chooseCanoe": 32,
		"endTurn": 39,
		"canEndTurn": 34,
		"zombiePass": 39
	}
}
					*/
					break;
				case "chooseCanoeAction":
					/*
					{
	"name": "chooseCanoeAction",
	"description": "${actplayer} must move its canoe or load/unload a gem (${movePoints} move points)",
	"descriptionmyturn": "${you} must move your canoe or load/unload a gem (${movePoints} move points)",
	"type": "activeplayer",
	"args": "argChooseCanoeAction",
	"possibleactions": [
		"loadUnload",
		"moveCanoe",
		"dontMove"
	],
	"transitions": {
		"continueCanoeMove": 32,
		"endCanoeMove": 31,
		"endCanoeMoveSteal": 33,
		"endTurn": 39,
		"zombiePass": 39
	}
}
					*/
					break;
				case "canoeMaySteal":
					/*
					{
	"name": "canoeMaySteal",
	"description": "${actplayer} may steal a gem from another canoe",
	"descriptionmyturn": "${you} may steal a gem from another canoe",
	"type": "activeplayer",
	"possibleactions": [
		"steal",
		"dontSteal"
	],
	"transitions": {
		"endCanoeMove": 31,
		"endTurn": 39,
		"zombiePass": 39
	}
}
					*/
					break;
				case "moveCanoe":
					/*
					{
	"name": "moveCanoe",
	"description": "${actplayer} may choose another canoe to move or end his turn",
	"descriptionmyturn": "${you} may choose another canoe to move or end your turn",
	"type": "activeplayer",
	"args": "argMoveCanoe",
	"possibleactions": [
		"chooseCanoe",
		"endTurn"
	],
	"transitions": {
		"chooseCanoe": 32,
		"endTurn": 39,
		"zombiePass": 39
	}
}
					*/
					break;
				case "chooseWeather":
					/*
					{
	"name": "chooseWeather",
	"description": "${actplayer} must change the weather",
	"descriptionmyturn": "${you} must change the weather",
	"type": "activeplayer",
	"args": "argChooseWeather",
	"possibleactions": [
		"changeWeather"
	],
	"transitions": {
		"changeWeather": 39,
		"zombiePass": 39
	}
}
					*/
					break;
				case "moveCanoeActiveNextPlayer":
					/*
					{
	"name": "moveCanoeActiveNextPlayer",
	"description": "",
	"type": "game",
	"action": "stMoveCanoeActiveNextPlayer",
	"transitions": {
		"nextPlayer": 30,
		"everyonePlayed": 40
	}
}
					*/
					break;
				case "moveRiver":
					/*
					{
	"name": "moveRiver",
	"description": "",
	"type": "game",
	"action": "stMoveRiver",
	"updateGameProgression": true,
	"transitions": {
		"endGame": 99,
		"nextRound": 20,
		"nextHand": 10
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
export default niagara;
