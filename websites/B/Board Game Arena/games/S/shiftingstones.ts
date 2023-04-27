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

const shiftingstones: GamePresence = {
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
		"": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must select a Pattern card or End turn",
	"descriptionmyturn": "${you} must select a Pattern card",
	"type": "activeplayer",
	"updateGameProgression": "true",
	"possibleactions": [
		"swapStones",
		"flipStone",
		"objDone",
		"drawCards",
		"gameOver"
	],
	"transitions": {
		"zombiePass": 3,
		"endGame": 99
	}
}
					*/
					break;
				case "backtopturn":
					/*
					{
	"name": "backtopturn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stBackToPTurn",
	"updateGameProgression": "true",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "dummyturn":
					/*
					{
	"name": "dummyturn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stDummyTurn",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"updateGameProgression": "true",
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
export default shiftingstones;
