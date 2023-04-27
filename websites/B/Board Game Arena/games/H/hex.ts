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

const hex: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a piece",
	"descriptionmyturn": "<span class=\"${textcolor}\">You</span> must place a piece",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"pass",
		"resign"
	],
	"transitions": {
		"hexPlayed": 20,
		"passed": 21,
		"zombiePass": 21,
		"resigned": 99
	}
}
					*/
					break;
				case "playerTurnNoPass":
					/*
					{
	"name": "playerTurnNoPass",
	"description": "${actplayer} must place a piece",
	"descriptionmyturn": "<span class=\"${textcolor}\">You</span> must place a piece",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"resign"
	],
	"transitions": {
		"hexPlayed": 20,
		"zombiePass": 21,
		"resigned": 99
	}
}
					*/
					break;
				case "playerTurnOrSwap":
					/*
					{
	"name": "playerTurnOrSwap",
	"description": "${actplayer} must decide whether to swap",
	"descriptionmyturn": "Do <span class=\"${textcolor}\">you</span> want to take your opponent's first move?",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playToken",
		"pass",
		"swapPieces",
		"resign"
	],
	"transitions": {
		"hexPlayed": 20,
		"passed": 21,
		"swapped": 21,
		"zombiePass": 21,
		"resigned": 99
	}
}
					*/
					break;
				case "checkForWin":
					/*
					{
	"name": "checkForWin",
	"type": "game",
	"action": "stCheckForWin",
	"updateGameProgression": true,
	"transitions": {
		"notEndedYet": 21,
		"gameEnded": 99
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
		"normalTurn": 10,
		"swapTurn": 13,
		"noPassTurn": 12
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
export default hex;
