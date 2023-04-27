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

const ageofcivilization: GamePresence = {
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
				case "pickCiv":
					/*
					{
	"name": "pickCiv",
	"description": "${actplayer} must rise a civilization",
	"descriptionmyturn": "${you} must rise a civilization",
	"type": "activeplayer",
	"args": "argPickCiv",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 5,
		"same": 2,
		"zombiePass": 5
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must take an action or Rest",
	"descriptionmyturn": "${you} must take an action or Rest",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 6,
		"same": 5,
		"zombiePass": 6
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
		"same": 5,
		"again": 6,
		"next": 9
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
	"action": "stEndTurn",
	"transitions": {
		"pick": 2,
		"turn": 5,
		"end": 99,
		"zombiePass": 99
	}
}
					*/
					break;
				case "playerEndTurn":
					/*
					{
	"name": "playerEndTurn",
	"description": "${actplayer} must take an action or Rest",
	"descriptionmyturn": "${you} must take an action or Rest",
	"type": "activeplayer",
	"args": "argPlayerEndTurn",
	"possibleactions": [
		"select"
	],
	"transitions": {
		"next": 9,
		"same": 8,
		"zombiePass": 9
	}
}
					*/
					break;
				case "nextEndTurn":
					/*
					{
	"name": "nextEndTurn",
	"description": "",
	"type": "game",
	"action": "stNextEndTurn",
	"transitions": {
		"same": 8,
		"again": 9,
		"next": 7
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
export default ageofcivilization;
