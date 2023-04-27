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

const flamingpyramids: GamePresence = {
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
		"": 30
	}
}
					*/
					break;
				case "showFree":
					/*
					{
	"name": "showFree",
	"description": "",
	"type": "game",
	"action": "stShowFree",
	"updateGameProgression": true,
	"transitions": {
		"chooseCard": 31
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a tile",
	"descriptionmyturn": "${you} must play a tile",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"checkForMayhem": 34
	}
}
					*/
					break;
				case "playerFall":
					/*
					{
	"name": "playerFall",
	"description": "${actplayer} must choose where the tile falls",
	"descriptionmyturn": "${you} must choose where the tile falls",
	"type": "activeplayer",
	"possibleactions": [
		"chooseFall"
	],
	"transitions": {
		"checkForMayhem": 34
	}
}
					*/
					break;
				case "mayhem":
					/*
					{
	"name": "mayhem",
	"description": "",
	"type": "game",
	"action": "stMayhem",
	"transitions": {
		"finishTurn": 35,
		"chooseFall": 32,
		"curse": 36,
		"end_curse": 38
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"nextPlayer": 30,
		"endHand": 40
	}
}
					*/
					break;
				case "prevPlayer":
					/*
					{
	"name": "prevPlayer",
	"description": "",
	"type": "game",
	"action": "stPrevPlayer",
	"transitions": {
		"prevPlayer": 37
	}
}
					*/
					break;
				case "Curse":
					/*
					{
	"name": "Curse",
	"description": "",
	"type": "game",
	"action": "stCurse",
	"transitions": {
		"checkForMayhem": 34
	}
}
					*/
					break;
				case "setPlayer":
					/*
					{
	"name": "setPlayer",
	"description": "",
	"type": "game",
	"action": "stSetPlayer",
	"transitions": {
		"setPlayer": 35
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
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
export default flamingpyramids;
