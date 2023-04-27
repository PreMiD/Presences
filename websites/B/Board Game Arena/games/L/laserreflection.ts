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

const laserreflection: GamePresence = {
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
				case "modeInit":
					/*
					{
	"name": "modeInit",
	"description": "",
	"type": "manager",
	"action": "stGameInit",
	"transitions": {
		"solo": 5,
		"normal": 3,
		"random": 5,
		"team_selection": 9,
		"seed": 6,
		"design": 10
	}
}
					*/
					break;
				case "puzzleCreationInit":
					/*
					{
	"name": "puzzleCreationInit",
	"description": "Some players are creating their puzzle",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 30,
	"action": "stCreatePuzzleInit",
	"transitions": {
		"next": 4
	}
}
					*/
					break;
				case "puzzleCreationInitEnd":
					/*
					{
	"name": "puzzleCreationInitEnd",
	"description": "",
	"type": "manager",
	"action": "stCreatePuzzleEnd",
	"transitions": {
		"next": 5
	}
}
					*/
					break;
				case "puzzlePlayInit":
					/*
					{
	"name": "puzzlePlayInit",
	"description": "Some players are solving their puzzle",
	"descriptionmyturn": "${you} must resolve the puzzle of",
	"type": "multipleactiveplayer",
	"initialprivate": 50,
	"action": "stPlayPuzzleInit",
	"args": "argPlayPuzzleInit",
	"transitions": {
		"next": 8,
		"endGame": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "createFromSeed":
					/*
					{
	"name": "createFromSeed",
	"description": "You should provide the seed code of a puzzle",
	"descriptionmyturn": "You should provide the seed code of a puzzle",
	"type": "activeplayer",
	"possibleactions": [
		"seedValidate"
	],
	"transitions": {
		"next": 5
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "Waiting for the start of the next round",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 80,
	"action": "stEndRound",
	"possibleactions": [],
	"transitions": {
		"next": 5,
		"endGame": 99
	},
	"updateGameProgression": true
}
					*/
					break;
				case "teamSelectionInit":
					/*
					{
	"name": "teamSelectionInit",
	"description": "Some players are selecting their team",
	"descriptionmyturn": "",
	"type": "multipleactiveplayer",
	"initialprivate": 90,
	"action": "stTeamSelectionInit",
	"transitions": {
		"next": 5
	}
}
					*/
					break;
				case "design":
					/*
					{
	"name": "design",
	"description": "Create a puzzle to share with other players",
	"descriptionmyturn": "Create a puzzle to share with other players",
	"type": "activeplayer",
	"args": "argDesignPuzzle",
	"possibleactions": [
		"resetDesign",
		"stopGame"
	],
	"transitions": {
		"continue": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "puzzleCreation":
					/*
					{
	"name": "puzzleCreation",
	"description": "Some players are creating their puzzle",
	"descriptionmyturn": "${you} must place the elements on the grid to create a puzzle for the other players",
	"type": "private",
	"possibleactions": [
		"gridChange",
		"creationEnd"
	],
	"action": "stCreatePuzzlePrivate",
	"transitions": {
		"continue": 30,
		"next": 31
	}
}
					*/
					break;
				case "puzzleCreationEnd":
					/*
					{
	"name": "puzzleCreationEnd",
	"description": "Some players are creating their puzzle",
	"descriptionmyturn": "${you} must place the elements on the grid to create a puzzle for the other players",
	"type": "private"
}
					*/
					break;
				case "puzzlePlayWait":
					/*
					{
	"name": "puzzlePlayWait",
	"description": "",
	"descriptionmyturn": "Get ready to solve your puzzle!",
	"type": "private",
	"possibleactions": [
		"puzzleStart",
		"displayDurations"
	],
	"transitions": {
		"stay": 50,
		"continue": 51,
		"teamWait": 53
	}
}
					*/
					break;
				case "puzzlePlay":
					/*
					{
	"name": "puzzlePlay",
	"description": "Waiting for other players",
	"descriptionmyturn": "${you} must resolve the puzzle of",
	"type": "private",
	"possibleactions": [
		"gridChange",
		"puzzleResolve",
		"giveUp",
		"timeout",
		"giveUpPropose",
		"giveUpRefuse"
	],
	"transitions": {
		"continue": 51,
		"solution": 52,
		"teamWait": 54,
		"copy": 55
	}
}
					*/
					break;
				case "puzzleSolution":
					/*
					{
	"name": "puzzleSolution",
	"description": "Go to next round",
	"descriptionmyturn": "Go to next round",
	"type": "private",
	"args": "argSolutionDisplay",
	"possibleactions": [
		"hideSolution",
		"stopGame"
	]
}
					*/
					break;
				case "puzzlePlayWaitTeam":
					/*
					{
	"name": "puzzlePlayWaitTeam",
	"description": "",
	"descriptionmyturn": "Some of your teammates are not ready yet, the game will start soon...",
	"type": "private",
	"transitions": {
		"continue": 51
	}
}
					*/
					break;
				case "puzzleResolvedWaitTeam":
					/*
					{
	"name": "puzzleResolvedWaitTeam",
	"description": "",
	"descriptionmyturn": "Some of your teammates have not yet solved the puzzle.",
	"type": "private",
	"possibleactions": [
		"timeout",
		"giveUpPropose",
		"giveUpRefuse"
	],
	"transitions": {
		"continue": 54
	}
}
					*/
					break;
				case "puzzleCopy":
					/*
					{
	"name": "puzzleCopy",
	"description": "Waiting for other players",
	"descriptionmyturn": "At least one of your teammates has solved the puzzle!",
	"type": "private",
	"possibleactions": [
		"gridChange",
		"puzzleResolve",
		"giveUp",
		"timeout",
		"giveUpPropose",
		"giveUpRefuse"
	],
	"transitions": {
		"continue": 55,
		"solution": 52,
		"teamWait": 54,
		"copy": 55
	}
}
					*/
					break;
				case "scoreDisplay":
					/*
					{
	"name": "scoreDisplay",
	"description": "Go to next round",
	"descriptionmyturn": "Go to next round",
	"type": "private",
	"possibleactions": [
		"hideScore",
		"stopGame"
	],
	"transitions": {
		"continue": 80
	}
}
					*/
					break;
				case "teamSelection":
					/*
					{
	"name": "teamSelection",
	"description": "Some players are selecting their team",
	"descriptionmyturn": "${you} must select a team",
	"type": "private",
	"possibleactions": [
		"teamSelect",
		"teamValidate"
	],
	"transitions": {
		"continue": 90,
		"next": 91
	}
}
					*/
					break;
				case "teamSelected":
					/*
					{
	"name": "teamSelected",
	"description": "Some players are selecting their team",
	"descriptionmyturn": "Some players are selecting their team",
	"type": "private",
	"possibleactions": [
		"teamCancel"
	],
	"transitions": {
		"continue": 91,
		"previous": 90
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
export default laserreflection;
