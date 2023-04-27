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

const haiclue: GamePresence = {
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
				case "nextRound":
					/*
					{
	"name": "nextRound",
	"description": "",
	"type": "game",
	"action": "stNextRound",
	"updateGameProgression": false,
	"transitions": {
		"end": 99,
		"makeClues": 3
	}
}
					*/
					break;
				case "makeClues":
					/*
					{
	"name": "makeClues",
	"description": "Other players must make a clue",
	"descriptionmyturn": "${you} must make a clue",
	"type": "multipleactiveplayer",
	"action": "stMakeClues",
	"possibleactions": [
		"makeClue"
	],
	"transitions": {
		"guess": 4,
		"guessTurbo": 6
	}
}
					*/
					break;
				case "guess":
					/*
					{
	"name": "guess",
	"description": "Other players must guess: Which of the four words does ${player_name} have?",
	"descriptionmyturn": "${you} must guess: Which of the four words does ${player_name} have?",
	"type": "multipleactiveplayer",
	"action": "stGuess",
	"args": "argGuess",
	"possibleactions": [
		"guess"
	],
	"transitions": {
		"score": 5
	}
}
					*/
					break;
				case "score":
					/*
					{
	"name": "score",
	"description": "Scoring",
	"type": "game",
	"action": "stScore",
	"updateGameProgression": true,
	"transitions": {
		"nextRound": 2,
		"nextGuess": 4
	}
}
					*/
					break;
				case "guessTurbo":
					/*
					{
	"name": "guessTurbo",
	"description": "Other players must guess",
	"descriptionmyturn": "${you} must guess",
	"type": "multipleactiveplayer",
	"action": "stGuessTurbo",
	"possibleactions": [
		"guessTurbo"
	],
	"transitions": {
		"score": 7
	}
}
					*/
					break;
				case "scoreTurbo":
					/*
					{
	"name": "scoreTurbo",
	"description": "Scoring",
	"type": "game",
	"action": "stScoreTurbo",
	"updateGameProgression": true,
	"transitions": {
		"nextRound": 2
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
export default haiclue;
