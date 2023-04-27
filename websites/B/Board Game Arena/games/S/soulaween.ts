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

const soulaween: GamePresence = {
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
				case "checkMode":
					/*
					{
	"name": "checkMode",
	"description": "checking mode",
	"type": "game",
	"action": "checkMode",
	"transitions": {
		"simple": 10,
		"standard": 3
	}
}
					*/
					break;
				case "waitClientCardInformation":
					/*
					{
	"name": "waitClientCardInformation",
	"description": "Please wait for your opponent",
	"descriptionmyturn": "Please choose a character you'd like to play as",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"choosePlayerCard"
	],
	"transitions": {
		"startGame": 10,
		"zombieEnd": 99,
		"dummy": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must put a piece",
	"descriptionmyturn": "${you} must put a piece in an empty cell. (You may click on the rightmost Soul Piece to change its color)",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playDisc"
	],
	"transitions": {
		"playDisc": 11,
		"zombieEnd": 99
	}
}
					*/
					break;
				case "checkBoard":
					/*
					{
	"name": "checkBoard",
	"description": "checking board now",
	"descriptionmyturn": "checking board now",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stCheckBoard",
	"possibleactions": [
		"stCheckBoard"
	],
	"transitions": {
		"endPlayer": 20,
		"selectPossible": 12,
		"noBranch": 13
	}
}
					*/
					break;
				case "selectPossible":
					/*
					{
	"name": "selectPossible",
	"description": "Please wait your oppenent",
	"descriptionmyturn": "you must choose from the panel",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"selectPossiable"
	],
	"transitions": {
		"waitClientPossible": 14
	}
}
					*/
					break;
				case "processBranch":
					/*
					{
	"name": "processBranch",
	"description": "Waiting Server...",
	"descriptionmyturn": "Waiting Server...",
	"type": "activeplayer",
	"possibleactions": [
		"processBranch"
	],
	"transitions": {
		"endPlayer": 20
	}
}
					*/
					break;
				case "waitClientPossible":
					/*
					{
	"name": "waitClientPossible",
	"description": "Waiting for ${actplayer}",
	"descriptionmyturn": "${you} must choose a pattern to reap OR / AND decide whether to rotate the character card or not.",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"processClientPossiable"
	],
	"transitions": {
		"clientPossiableGot": 13,
		"zombieEnd": 99
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
		"nextTurn": 10,
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
export default soulaween;
