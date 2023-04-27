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

const superfantasybrawl: GamePresence = {
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
				case "nextAction":
					/*
					{
	"name": "nextAction",
	"description": "",
	"type": "game",
	"action": "stNextAction",
	"updateGameProgression": true,
	"transitions": {
		"same": 2,
		"endTurn": 5,
		"endGame": 6,
		"next": 3,
		"showHand": 4,
		"zombiePass": 6
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card or choose a standard action",
	"descriptionmyturn": "${you} must play a card or choose a standard action",
	"type": "activeplayer",
	"args": "argMoveState",
	"possibleactions": [
		"actSelect"
	],
	"transitions": {
		"next": 2,
		"endTurn": 5,
		"endGame": 6,
		"zombiePass": 6
	}
}
					*/
					break;
				case "showHand":
					/*
					{
	"name": "showHand",
	"description": "${actplayer} looks at your hand",
	"descriptionmyturn": "${you} must look at your opponent hand",
	"type": "activeplayer",
	"args": "argShowHand",
	"possibleactions": [
		"actDone"
	],
	"transitions": {
		"next": 2,
		"zombiePass": 6
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
	"updateGameProgression": true,
	"transitions": {
		"end": 6,
		"next": 2,
		"zombiePass": 6
	}
}
					*/
					break;
				case "endGame":
					/*
					{
	"name": "endGame",
	"description": "",
	"type": "game",
	"action": "stEndGame",
	"updateGameProgression": true,
	"transitions": {
		"end": 99,
		"next": 3
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
export default superfantasybrawl;
