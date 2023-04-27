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

const diablo: GamePresence = {
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
				case "selectOriginFirstTurn":
					/*
					{
	"name": "selectOriginFirstTurn",
	"description": "${actplayer} must select a checker to move.",
	"descriptionmyturn": "${you} must select a checker to move.",
	"type": "activeplayer",
	"args": "argSelectOriginFirstTurn",
	"possibleactions": [
		"selectOriginFirstTurn"
	],
	"transitions": {
		"selectOriginFirstTurn": 3,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "selectDestinationFirstTurn":
					/*
					{
	"name": "selectDestinationFirstTurn",
	"description": "${actplayer} must select a destination.",
	"descriptionmyturn": "${you} must select a destination.",
	"type": "activeplayer",
	"args": "argSelectDestinationFirstTurn",
	"possibleactions": [
		"selectDestinationFirstTurn",
		"unselectOrigin"
	],
	"transitions": {
		"selectDestinationFirstTurn": 10,
		"unselectOrigin": 2,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "selectOriginMoveA":
					/*
					{
	"name": "selectOriginMoveA",
	"description": "${actplayer} must select a stack for move A.",
	"descriptionmyturn": "${you} must select a stack for move A.",
	"type": "activeplayer",
	"args": "argSelectOriginMoveA",
	"possibleactions": [
		"selectOriginMoveA"
	],
	"transitions": {
		"selectOriginMoveA": 5,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "selectDestinationMoveA":
					/*
					{
	"name": "selectDestinationMoveA",
	"description": "${actplayer} must select a destination for move A.",
	"descriptionmyturn": "${you} must select a destination for move A.",
	"type": "activeplayer",
	"args": "argSelectDestinationMoveA",
	"possibleactions": [
		"selectDestinationMoveA",
		"unselectOrigin"
	],
	"transitions": {
		"selectDestinationMoveA": 6,
		"selectDestinationMoveA_noMovesB": 9,
		"unselectOrigin": 4,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "selectOriginMoveB":
					/*
					{
	"name": "selectOriginMoveB",
	"description": "${actplayer} must select a stack for move B.",
	"descriptionmyturn": "${you} must select a stack for move B.",
	"type": "activeplayer",
	"args": "argSelectOriginMoveB",
	"possibleactions": [
		"selectOriginMoveB"
	],
	"transitions": {
		"selectOriginMoveB": 7,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "selectDestinationMoveB":
					/*
					{
	"name": "selectDestinationMoveB",
	"description": "${actplayer} must select a destination for move B.",
	"descriptionmyturn": "${you} must select a destination for move B.",
	"type": "activeplayer",
	"args": "argSelectDestinationMoveB",
	"possibleactions": [
		"selectDestinationMoveB",
		"unselectOrigin"
	],
	"transitions": {
		"selectDestinationMoveB": 10,
		"unselectOrigin": 6,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "removeCheckerMoveA":
					/*
					{
	"name": "removeCheckerMoveA",
	"description": "${actplayer} must remove a checker (move A).",
	"descriptionmyturn": "${you} must remove a checker (move A).",
	"type": "activeplayer",
	"args": "argRemoveCheckerMoveA",
	"possibleactions": [
		"removeCheckerMoveA"
	],
	"transitions": {
		"removeCheckerMoveA": 9,
		"removeCheckerMoveA_noMoreCheckers": 99,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "removeCheckerMoveB":
					/*
					{
	"name": "removeCheckerMoveB",
	"description": "${actplayer} must remove a checker (move B).",
	"descriptionmyturn": "${you} must remove a checker (move B).",
	"type": "activeplayer",
	"args": "argRemoveCheckerMoveB",
	"possibleactions": [
		"removeCheckerMoveB"
	],
	"transitions": {
		"removeCheckerMoveB": 10,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 4,
		"nextTurn_noMovesA": 8
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
export default diablo;
