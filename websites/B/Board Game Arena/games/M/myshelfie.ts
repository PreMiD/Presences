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

const myshelfie: GamePresence = {
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
		"": 10
	}
}
					*/
					break;
				case "choosingTiles":
					/*
					{
	"name": "choosingTiles",
	"description": "${actplayer} must choose one or more item tiles from the living room",
	"descriptionmyturn": "${you} must choose one or more item tiles from the living room",
	"type": "activeplayer",
	"args": "argChoosingTiles",
	"possibleactions": [
		"chooseTiles"
	],
	"transitions": {
		"chooseTiles": 20,
		"zombiePass": 30
	}
}
					*/
					break;
				case "fillingShelf":
					/*
					{
	"name": "fillingShelf",
	"description": "${actplayer} must choose where to insert the chosen tile(s) on his/her shelf",
	"descriptionmyturn": "${you} must choose where to insert the chosen tile(s) on your shelf",
	"type": "activeplayer",
	"args": "argFillingShelf",
	"possibleactions": [
		"insertTiles"
	],
	"transitions": {
		"insertTiles": 30
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "Ending turn..",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 10,
		"playerScoring": 31
	}
}
					*/
					break;
				case "playerFinalScoring":
					/*
					{
	"name": "playerFinalScoring",
	"description": "Calculating ${player_name} score..",
	"type": "game",
	"args": "argPlayerFinalScoring",
	"action": "stPlayerFinalScoring",
	"transitions": {
		"nextScoring": 31,
		"gameEnd": 99
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
export default myshelfie;
