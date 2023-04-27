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

const twinpalms: GamePresence = {
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
				case "bidTurn":
					/*
					{
	"name": "bidTurn",
	"description": "All players must bid the number of tricks to take ${andmaybet}",
	"descriptionmyturn": "${you} must bid the number of tricks to take ${andmaybet}",
	"type": "multipleactiveplayer",
	"args": "argBidTurn",
	"action": "stMakeEveryoneActive",
	"possibleactions": [
		"bidTrick",
		"bidCancel"
	],
	"updateGameProgression": true,
	"transitions": {
		"bidTrick": 3,
		"zombiePass": 3
	}
}
					*/
					break;
				case "startRound":
					/*
					{
	"name": "startRound",
	"description": "",
	"type": "game",
	"action": "stStartRound",
	"transitions": {
		"nextPlayer": 4
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
		"playerTurn": 5,
		"skipTurn": 7,
		"wild": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play two cards",
	"descriptionmyturn": "${you} must play two cards",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 7,
		"wild": 6,
		"zombiePass": 7
	}
}
					*/
					break;
				case "wildSelect":
					/*
					{
	"name": "wildSelect",
	"description": "${actplayer} must choose the value of a Wild ${suit}",
	"descriptionmyturn": "${you} must choose the value of a Wild ${suit}",
	"type": "activeplayer",
	"args": "argWildSelect",
	"possibleactions": [
		"wildSelect"
	],
	"transitions": {
		"wildSelect": 7,
		"wildLeft": 6,
		"zombiePass": 7
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
		"nextPlayer": 4,
		"endTrick": 8
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
		"nextPlayer": 4,
		"endRound": 9
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
export default twinpalms;
