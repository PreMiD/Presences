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

const locomomo: GamePresence = {
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
		"chooseToken": 2
	}
}
					*/
					break;
				case "chooseToken":
					/*
					{
	"name": "chooseToken",
	"description": "${actplayer} must move an animal",
	"descriptionmyturn": "${you} must choose an animal",
	"type": "activeplayer",
	"possibleactions": [
		"chooseToken"
	],
	"transitions": {
		"placeTokens": 3,
		"nextTurn": 4
	}
}
					*/
					break;
				case "placeTokens":
					/*
					{
	"name": "placeTokens",
	"description": "${actplayer} must compose their group photo",
	"descriptionmyturn": "${you} must compose your group photo by placing the animals inside the rows",
	"type": "activeplayer",
	"possibleactions": [
		"compose"
	],
	"transitions": {
		"nextTurn": 4,
		"gameEnd": 99
	}
}
					*/
					break;
				case "nextTurn":
					/*
					{
	"name": "nextTurn",
	"description": "",
	"type": "game",
	"action": "stNextTurn",
	"transitions": {
		"chooseToken": 2,
		"finalScoring": 90
	},
	"updateGameProgression": true
}
					*/
					break;
				case "finalScoring":
					/*
					{
	"name": "finalScoring",
	"description": "",
	"type": "game",
	"action": "stFinalScoring",
	"transitions": {
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
export default locomomo;
