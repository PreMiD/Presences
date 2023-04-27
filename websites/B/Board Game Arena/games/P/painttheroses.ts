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

const painttheroses: GamePresence = {
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
				case "drawWhim":
					/*
					{
	"name": "drawWhim",
	"description": "All players without a Whim card must draw a Whim card",
	"descriptionmyturn": "${you} must draw a Whim card",
	"type": "multipleactiveplayer",
	"action": "stDrawWhimInit",
	"possibleactions": [
		"drawWhim",
		"recordNotepad"
	],
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "drawShrub":
					/*
					{
	"name": "drawShrub",
	"description": "",
	"type": "game",
	"action": "stDrawShrub",
	"transitions": {
		"": 4
	}
}
					*/
					break;
				case "placeTile":
					/*
					{
	"name": "placeTile",
	"description": "${actplayer} must place a tile",
	"descriptionmyturn": "${you} must place a tile",
	"type": "activeplayer",
	"possibleactions": [
		"placeTile",
		"recordNotepad",
		"useHelper"
	],
	"transitions": {
		"placeTile": 5,
		"moduleCards": 14,
		"zombiePass": 5
	}
}
					*/
					break;
				case "intermediatePhase":
					/*
					{
	"name": "intermediatePhase",
	"description": "",
	"type": "game",
	"action": "stIntermediatePhase",
	"updateGameProgression": true,
	"transitions": {
		"": 6
	}
}
					*/
					break;
				case "suggestWhimToGuess":
					/*
					{
	"name": "suggestWhimToGuess",
	"description": "Some players must suggest a Whim card to guess ${or_suggest_passing}",
	"descriptionmyturn": "${you} must click a Whim card (including your own) to suggest a guess ${or_suggest_passing}",
	"type": "multipleactiveplayer",
	"args": "argSuggestWhimToGuess",
	"action": "stSuggestWhimToGuessInit",
	"possibleactions": [
		"suggestWhimToGuess",
		"recordNotepad"
	],
	"transitions": {
		"": 7
	}
}
					*/
					break;
				case "setWhimSelectPlayer":
					/*
					{
	"name": "setWhimSelectPlayer",
	"description": "",
	"type": "game",
	"action": "stSetWhimSelectPlayer",
	"transitions": {
		"": 8
	}
}
					*/
					break;
				case "selectWhimToGuess":
					/*
					{
	"name": "selectWhimToGuess",
	"description": "${actplayer} must click a Whim card to guess ${or_pass}",
	"descriptionmyturn": "Click any player's Whim card (including yours) to be guessed in this turn ${or_pass}",
	"type": "activeplayer",
	"args": "argSelectWhimToGuess",
	"possibleactions": [
		"selectWhimToGuess",
		"recordNotepad",
		"useHelper"
	],
	"transitions": {
		"": 9
	}
}
					*/
					break;
				case "decideWhimToGuess":
					/*
					{
	"name": "decideWhimToGuess",
	"description": "",
	"type": "game",
	"action": "stDecideWhimToGuess",
	"transitions": {
		"guessWhim": 10,
		"skipGuess": 13
	}
}
					*/
					break;
				case "suggestGuessWhim":
					/*
					{
	"name": "suggestGuessWhim",
	"description": "Some players must suggest a guess for ${otherplayer}'s Whim card",
	"descriptionmyturn": "${you} must suggest a guess for ${otherplayer}'s Whim card",
	"type": "multipleactiveplayer",
	"args": "argSuggestGuessWhim",
	"action": "stSuggestGuessWhimInit",
	"possibleactions": [
		"suggestGuessWhim",
		"recordNotepad"
	],
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "setWhimGuessPlayer":
					/*
					{
	"name": "setWhimGuessPlayer",
	"description": "",
	"type": "game",
	"action": "stSetWhimGuessPlayer",
	"transitions": {
		"": 12
	}
}
					*/
					break;
				case "guessWhim":
					/*
					{
	"name": "guessWhim",
	"description": "${actplayer} must guess ${otherplayer}'s Whim card",
	"descriptionmyturn": "${you} must guess ${otherplayer}'s Whim card",
	"type": "activeplayer",
	"args": "argGuessWhim",
	"possibleactions": [
		"guessWhim",
		"recordNotepad"
	],
	"transitions": {
		"": 13
	}
}
					*/
					break;
				case "scoreWhim":
					/*
					{
	"name": "scoreWhim",
	"description": "",
	"type": "game",
	"action": "stScoreWhim",
	"transitions": {
		"moreGuess": 5,
		"moduleCards": 14,
		"endGuess": 18
	}
}
					*/
					break;
				case "suggestModuleCards":
					/*
					{
	"name": "suggestModuleCards",
	"description": "Some players must suggest a Queen card and a Helper card to keep",
	"descriptionmyturn": "${you} must suggest a Queen card and a Helper card to keep",
	"type": "multipleactiveplayer",
	"action": "stSuggestModuleCardsInit",
	"args": "argSuggestModuleCards",
	"possibleactions": [
		"suggestModuleCards",
		"recordNotepad"
	],
	"transitions": {
		"": 15
	}
}
					*/
					break;
				case "setModuleCardsSelectPlayer":
					/*
					{
	"name": "setModuleCardsSelectPlayer",
	"description": "",
	"type": "game",
	"action": "stSetModuleCardsSelectPlayer",
	"transitions": {
		"": 16
	}
}
					*/
					break;
				case "selectModuleCards":
					/*
					{
	"name": "selectModuleCards",
	"description": "${actplayer} must select a Queen card and a Helper card to keep",
	"descriptionmyturn": "${you} must select a Queen card and a Helper card to keep",
	"type": "activeplayer",
	"args": "argSelectModuleCards",
	"possibleactions": [
		"selectModuleCards",
		"recordNotepad",
		"useHelper"
	],
	"transitions": {
		"": 17
	}
}
					*/
					break;
				case "changeModuleCards":
					/*
					{
	"name": "changeModuleCards",
	"description": "",
	"type": "game",
	"action": "stChangeModuleCards",
	"transitions": {
		"moreGuess": 5,
		"endGuess": 18
	}
}
					*/
					break;
				case "moveQueen":
					/*
					{
	"name": "moveQueen",
	"description": "",
	"type": "game",
	"action": "stMoveQueen",
	"transitions": {
		"continueGame": 2,
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
export default painttheroses;
