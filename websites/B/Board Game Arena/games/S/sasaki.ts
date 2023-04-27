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

const sasaki: GamePresence = {
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
				case "handCheck":
					/*
					{
	"name": "handCheck",
	"description": "All players must check their hand",
	"descriptionmyturn": "${you} must check your hand",
	"type": "multipleactiveplayer",
	"args": "argHandCheck",
	"action": "stMakeEveryoneActive",
	"updateGameProgression": true,
	"possibleactions": [
		"endHandCheck",
		"revealRedTen",
		"redoubleRate",
		"threeDouble",
		"threeRedouble",
		"changeKickQueue"
	],
	"transitions": {
		"": 3
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
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} may play a valid combination",
	"descriptionmyturn": "${you} may play a valid combination",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard",
		"passTurn",
		"changeKickQueue",
		"kickTrick"
	],
	"transitions": {
		"nextPlayer": 5,
		"kickTrick": 10,
		"zombiePass": 5
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
		"nextPlayer": 4,
		"autoPlay": 5,
		"kickTrick": 11,
		"endTrick": 6,
		"endRound": 7
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
		"nextTrick": 4,
		"autoPlay": 5
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
				case "changePlayerBeforeKick":
					/*
					{
	"name": "changePlayerBeforeKick",
	"description": "",
	"type": "game",
	"action": "stChangePlayerBeforeKick",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "kickTrick":
					/*
					{
	"name": "kickTrick",
	"description": "",
	"type": "game",
	"action": "stKickTrick",
	"transitions": {
		"skewerPossible": 4,
		"nextPlayer": 5,
		"endTrick": 5
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
export default sasaki;
