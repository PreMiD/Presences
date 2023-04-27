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

const strands: GamePresence = {
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
				case "playerFirstTurn":
					/*
					{
	"name": "playerFirstTurn",
	"description": "${actplayer} must cover any space marked <span class=\"strands-num-2\">2</span>.",
	"descriptionmyturn": "${you} must cover any space marked <span class=\"strands-num-2\">2</span>.",
	"type": "activeplayer",
	"possibleactions": [
		"coverSpace"
	],
	"transitions": {
		"coverSpace": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must cover up to X empty spaces marked X.",
	"descriptionmyturn": "${you} must cover up to X empty spaces marked X.",
	"type": "activeplayer",
	"possibleactions": [
		"coverSpace"
	],
	"transitions": {
		"coverSpace": 4,
		"zombiePass": 4
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "",
	"type": "game",
	"action": "st_nextNormalTurn",
	"updateGameProgression": true,
	"transitions": {
		"nextTurn": 3,
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
export default strands;
