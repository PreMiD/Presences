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

const timemasters: GamePresence = {
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
		"": 2
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
	"transitions": {
		"next": 10,
		"end": 98
	}
}
					*/
					break;
				case "delay":
					/*
					{
	"name": "delay",
	"description": "${actplayer} can postpone Timers",
	"descriptionmyturn": "${you} can postpone each Timer with a card from your hand (else it will be activated)",
	"type": "activeplayer",
	"action": "stDelay",
	"possibleactions": [
		"delay",
		"pass",
		"undo",
		"next"
	],
	"transitions": {
		"repeat": 10,
		"undoDelay": 10,
		"next": 15
	}
}
					*/
					break;
				case "endDelay":
					/*
					{
	"name": "endDelay",
	"description": "",
	"type": "game",
	"action": "stEndDelay",
	"transitions": {
		"": 20
	}
}
					*/
					break;
				case "playCard":
					/*
					{
	"name": "playCard",
	"description": "${actplayer} can play Cards",
	"descriptionmyturn": "${you} can play Cards from your hand, from your Timer area",
	"type": "activeplayer",
	"action": "stPlayCard",
	"updateGameProgression": true,
	"possibleactions": [
		"choose",
		"pass",
		"recover",
		"undo",
		"next"
	],
	"transitions": {
		"repeat": 20,
		"undoPlayCard": 20,
		"next": 75,
		"undoDelay": 10,
		"skipTurn": 90,
		"choice": 25,
		"undoChoice": 25,
		"multiChoice": 30,
		"undoMultiChoice": 30,
		"zombie": 90
	}
}
					*/
					break;
				case "choice":
					/*
					{
	"name": "choice",
	"description": "${actplayer} must make a choice",
	"descriptionmyturn": "${you} must make a choice",
	"type": "activeplayer",
	"action": "stChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"makeChoice",
		"pass",
		"undo",
		"next",
		"choiceContinue"
	],
	"transitions": {
		"next": 20,
		"repeat": 25,
		"undoPlayCard": 20,
		"undoChoice": 25,
		"choice": 25,
		"zombie": 90
	}
}
					*/
					break;
				case "multiChoice":
					/*
					{
	"name": "multiChoice",
	"description": "Some players still must make a choice",
	"descriptionmyturn": "${you} must make a choice",
	"type": "multipleactiveplayer",
	"action": "stMultiChoice",
	"updateGameProgression": true,
	"possibleactions": [
		"makeChoice",
		"multiChoice",
		"pass",
		"undo",
		"next",
		"choiceContinue"
	],
	"transitions": {
		"next": 20,
		"repeat": 30,
		"undoPlayCard": 20,
		"undoChoice": 25,
		"choice": 25,
		"untoMultiChoice": 30,
		"zombie": 90
	}
}
					*/
					break;
				case "endPlayCard":
					/*
					{
	"name": "endPlayCard",
	"description": "",
	"type": "game",
	"action": "stEndPlayCard",
	"transitions": {
		"back": 20,
		"next": 80
	}
}
					*/
					break;
				case "pickCard":
					/*
					{
	"name": "pickCard",
	"description": "${actplayer} can pick Cards from the Spheres of consciousness",
	"descriptionmyturn": "${you} can pick Cards from the Spheres of consciousness",
	"type": "activeplayer",
	"action": "stPickCard",
	"updateGameProgression": true,
	"possibleactions": [
		"choose",
		"pass",
		"undo",
		"next"
	],
	"transitions": {
		"repeat": 80,
		"next": 90,
		"undoPlayCard": 20,
		"undoPickCard": 80,
		"zombie": 90
	}
}
					*/
					break;
				case "endOfTurn":
					/*
					{
	"name": "endOfTurn",
	"description": "",
	"type": "game",
	"action": "stEndOfTurn",
	"updateGameProgression": true,
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "scores":
					/*
					{
	"name": "scores",
	"description": "",
	"type": "game",
	"action": "stScores",
	"updateGameProgression": true,
	"transitions": {
		"": 99
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
export default timemasters;
