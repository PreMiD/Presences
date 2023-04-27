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

const justone: GamePresence = {
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
				case "roundSetup":
					/*
					{
	"name": "roundSetup",
	"description": "Setting up a new round, please wait...",
	"action": "stRoundSetup",
	"args": "argRoundSetup",
	"type": "game",
	"updateGameProgression": true,
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "clueGiving":
					/*
					{
	"name": "clueGiving",
	"description": "Waiting for other players to type clues",
	"descriptionmyturn": "${you} must type a clue for the active player",
	"type": "multipleactiveplayer",
	"args": "argCluegiving",
	"possibleactions": [
		"actSetClue",
		"actUndoClueSubmission"
	],
	"transitions": {
		"4": 4
	}
}
					*/
					break;
				case "clueTransition":
					/*
					{
	"name": "clueTransition",
	"description": "Updating players to be active before clue checking",
	"action": "stClueTransition",
	"type": "game",
	"transitions": {
		"5": 5
	}
}
					*/
					break;
				case "clueCheck":
					/*
					{
	"name": "clueCheck",
	"description": "Waiting for ${actplayer} to exclude identical and incorrect clues",
	"descriptionmyturn": "${you} must decide if there are identical or incorrect clues",
	"type": "activeplayer",
	"action": "stClueCheck",
	"args": "argClueCheck",
	"possibleactions": [
		"actExcludeClues"
	],
	"transitions": {
		"9": 9
	}
}
					*/
					break;
				case "guess":
					/*
					{
	"name": "guess",
	"description": "Waiting for ${actplayer} to guess",
	"descriptionmyturn": "${you} must guess what the mystery word is",
	"type": "activeplayer",
	"args": "argGuess",
	"possibleactions": [
		"actGuess"
	],
	"transitions": {
		"7": 7
	}
}
					*/
					break;
				case "guessPreCheck":
					/*
					{
	"name": "guessPreCheck",
	"description": "Checking if mystery word is correct",
	"action": "stGuessPreCheck",
	"type": "game",
	"transitions": {
		"8": 8,
		"11": 11
	}
}
					*/
					break;
				case "guessCheck":
					/*
					{
	"name": "guessCheck",
	"description": "Waiting for ${actplayer} to decide if the guess was correct",
	"descriptionmyturn": "${you} must decide if the guess was correct",
	"type": "activeplayer",
	"args": "argGuessCheck",
	"possibleactions": [
		"actGuessCheck",
		"actGuess"
	],
	"transitions": {
		"10": 10
	}
}
					*/
					break;
				case "guessManager":
					/*
					{
	"name": "guessManager",
	"description": "Transferring the turn to the active player",
	"action": "stGuessManage",
	"type": "game",
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "preDiscussRound":
					/*
					{
	"name": "preDiscussRound",
	"description": "Changing active player",
	"action": "stPreDiscussRound",
	"type": "game",
	"transitions": {
		"11": 11
	}
}
					*/
					break;
				case "discussRound":
					/*
					{
	"name": "discussRound",
	"description": "${actplayer} should decide to proceed",
	"descriptionmyturn": "${you} should decide to proceed",
	"type": "activeplayer",
	"args": "argDiscussRound",
	"possibleactions": [
		"actNextRound"
	],
	"transitions": {
		"2": 2,
		"99": 99
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
export default justone;
