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

const thejellymonsterlab: GamePresence = {
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
		"": 4
	}
}
					*/
					break;
				case "checkPlayerMove":
					/*
					{
	"name": "checkPlayerMove",
	"description": "",
	"type": "game",
	"action": "stCheckPlayerMove",
	"transitions": {
		"playerMove": 4,
		"playerDontMove": 3,
		"playerPass": 12
	}
}
					*/
					break;
				case "playerLeaveACard":
					/*
					{
	"name": "playerLeaveACard",
	"description": "${actplayer} must leave a card at its current lab",
	"descriptionmyturn": "${you} must leave a card at your current lab",
	"type": "activeplayer",
	"possibleactions": [
		"leaveCard"
	],
	"transitions": {
		"leaveCard": 11,
		"loopback": 3
	}
}
					*/
					break;
				case "playerMove":
					/*
					{
	"name": "playerMove",
	"description": "${actplayer} must move to a lab or center",
	"descriptionmyturn": "${you} must move to a lab or center",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"moveToALab",
		"moveToTheCenter",
		"endOfGame"
	],
	"transitions": {
		"moveToALab": 5,
		"moveToTheCenter": 11,
		"zombiePass": 12,
		"endOfGame": 99
	}
}
					*/
					break;
				case "checkMonsters":
					/*
					{
	"name": "checkMonsters",
	"description": "",
	"type": "game",
	"action": "stCheckMonsters",
	"updateGameProgression": true,
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "exchangeTrails":
					/*
					{
	"name": "exchangeTrails",
	"description": "",
	"type": "game",
	"action": "stExchangeTrails",
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "checkPossibleEndOfGame":
					/*
					{
	"name": "checkPossibleEndOfGame",
	"description": "",
	"type": "game",
	"action": "stCheckPossibleEndOfGame",
	"transitions": {
		"isNotPossibleEndOfGame": 7,
		"isPossibleEndOfGame": 9
	}
}
					*/
					break;
				case "changeCenterForEndOfGame":
					/*
					{
	"name": "changeCenterForEndOfGame",
	"description": "",
	"type": "game",
	"action": "stChangeCenterForEndOfGame",
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "playerChooseCards":
					/*
					{
	"name": "playerChooseCards",
	"description": "${actplayer} must choose which cards leave at the lab it is",
	"descriptionmyturn": "${you} must choose which cards leave at the lab you are",
	"type": "activeplayer",
	"possibleactions": [
		"leaveCards"
	],
	"transitions": {
		"leaveCards": 11,
		"zombiePass": 11,
		"endOfGame": 99,
		"loopback": 10
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
		"": 2
	}
}
					*/
					break;
				case "playerPass":
					/*
					{
	"name": "playerPass",
	"description": "${actplayer} must pass",
	"descriptionmyturn": "${you} must pass",
	"type": "activeplayer",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 11
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
export default thejellymonsterlab;
