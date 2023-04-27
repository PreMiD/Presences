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

const bug: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must place a stone",
	"descriptionmyturn": "${you} must place a stone",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playstone",
		"cantPlay"
	],
	"transitions": {
		"playstone": 4,
		"eatBug": 3,
		"zombiePass": 5,
		"cantPlay": 99
	}
}
					*/
					break;
				case "growing":
					/*
					{
	"name": "growing",
	"description": "${actplayer} eats enemy bug and his bug will grow",
	"descriptionmyturn": "${you} ate enemy bug(s). Place a stone adjacent to the bug that ate to grow it",
	"type": "activeplayer",
	"updateGameProgression": true,
	"possibleactions": [
		"playstone",
		"cantPlay"
	],
	"transitions": {
		"playstone": 4,
		"eatBug": 3,
		"cantPlay": 4
	}
}
					*/
					break;
				case "otherEat":
					/*
					{
	"name": "otherEat",
	"type": "game",
	"possibleactions": [
		"eatBug",
		"cantEat"
	],
	"action": "stOtherEat",
	"transitions": {
		"eatBug": 3,
		"cantEat": 5
	},
	"updateGameProgression": true
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
	"possibleactions": [
		"nextTurn",
		"cantPlay",
		"endGame"
	],
	"transitions": {
		"nextTurn": 2,
		"cantPlay": 99,
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
export default bug;
