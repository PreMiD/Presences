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

const concept: GamePresence = {
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
		"": 3
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
	"possibleactions": [
		"start",
		"stop"
	],
	"transitions": {
		"startRound": 4,
		"endGame": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "pickWord":
					/*
					{
	"name": "pickWord",
	"description": "Other players must choose a word",
	"descriptionmyturn": "${you} must choose a word",
	"type": "multipleactiveplayer",
	"args": "argPickWord",
	"possibleactions": [
		"pickWord"
	],
	"transitions": {
		"": 5
	}
}
					*/
					break;
				case "addHint":
					/*
					{
	"name": "addHint",
	"description": "",
	"descriptionmyturn": "",
	"descriptionguessers": "You can make a guess",
	"descriptionteam": "You can add hints on the board by clicking on symbols",
	"descriptionteamfree": "You can add hints on the board by dragndrop tokens",
	"type": "multipleactiveplayer",
	"action": "stAddHint",
	"args": "argPlay",
	"possibleactions": [
		"addHint",
		"pass"
	],
	"transitions": {
		"confirm": 5,
		"found": 3,
		"giveup": 3,
		"exact": 8
	}
}
					*/
					break;
				case "guessWord":
					/*
					{
	"name": "guessWord",
	"description": "",
	"descriptionmyturn": "",
	"descriptionguessers": "You can make a guess",
	"descriptionteam": "You can add hints on the board by clicking on symbols",
	"descriptionteamfree": "You can add hints on the board by dragndrop tokens",
	"type": "multipleactiveplayer",
	"action": "stGuessWord",
	"args": "argPlay",
	"possibleactions": [
		"pass"
	],
	"transitions": {
		"pass": 5,
		"found": 3,
		"giveup": 3,
		"exact": 8
	}
}
					*/
					break;
				case "waitingScore":
					/*
					{
	"name": "waitingScore",
	"description": "The correct word was found, waiting for clue givers to attribute score",
	"descriptionmyturn": "${you} must attribute score to the oldest correct guess",
	"type": "multipleactiveplayer",
	"args": "argPlay",
	"action": "stWaitingScore",
	"possibleactions": [],
	"transitions": {
		"found": 3
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
export default concept;
