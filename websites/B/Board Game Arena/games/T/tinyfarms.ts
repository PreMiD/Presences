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

const tinyfarms: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "pickDie":
					/*
					{
	"name": "pickDie",
	"description": "${actplayer} must pick a die",
	"descriptionmyturn": "${you} must pick a die",
	"type": "activeplayer",
	"possibleactions": [
		"pickDie"
	],
	"updateGameProgression": true,
	"transitions": {
		"moveFarmer": 3,
		"zombiePass": 11
	}
}
					*/
					break;
				case "moveFarmer":
					/*
					{
	"name": "moveFarmer",
	"description": "${actplayer} must move the blue or red farmer",
	"descriptionmyturn": "${you} must move the blue or red farmer",
	"type": "activeplayer",
	"possibleactions": [
		"moveFarmer",
		"undo"
	],
	"transitions": {
		"collectAnimal": 4,
		"zombiePass": 11
	}
}
					*/
					break;
				case "collectAnimal":
					/*
					{
	"name": "collectAnimal",
	"description": "${actplayer} must collect ${animal_icon}",
	"descriptionmyturn": "${you} must collect ${animal_icon}",
	"type": "activeplayer",
	"args": "argCollectAnimal",
	"possibleactions": [
		"collectAnimal",
		"undo"
	],
	"transitions": {
		"collectNextAnimal": 4,
		"next": 11,
		"zombiePass": 11
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
		"continue": 2
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
		"nextPlayer": 12,
		"endRound": 13
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stGameNextPlayer",
	"transitions": {
		"pickDie": 2,
		"endRound": 13
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"type": "game",
	"action": "stGameEndRound",
	"transitions": {
		"newRound": 10,
		"gameover": 98
	}
}
					*/
					break;
				case "gameover":
					/*
					{
	"name": "gameover",
	"type": "game",
	"action": "stGameOver",
	"transitions": {
		"gameover": 99
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
export default tinyfarms;
