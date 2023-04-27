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

const dobble: GamePresence = {
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
				case "getReady":
					/*
					{
	"name": "getReady",
	"description": "Wait until everyone is ready",
	"descriptionmyturn": "Are you ready?",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"ready"
	],
	"transitions": {
		"playerTurn": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "Other players try to find their common symbol",
	"descriptionmyturn": "Be the fist to find the common symbol",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"args": "argPlayerTurn",
	"action": "st_multiPlayerInit",
	"transitions": {
		"nextTurn": 4,
		"playerTurn": 3,
		"nextRound": 5
	}
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"description": "",
	"type": "game",
	"action": "stNextTurn",
	"updateGameProgression": true,
	"transitions": {
		"playerTurn": 3,
		"nextRound": 3,
		"beforeEnd": 6
	}
}
					*/
					break;
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"description": "",
	"type": "game",
	"action": "stNextRound",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 4,
		"beforeEnd": 6
	}
}
					*/
					break;
				case "beforeEnd":
					/*
					{
	"name": "beforeEnd",
	"description": "",
	"type": "game",
	"action": "stBeforeEnd",
	"updateGameProgression": true,
	"args": "argRevealScores",
	"transitions": {
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
export default dobble;
