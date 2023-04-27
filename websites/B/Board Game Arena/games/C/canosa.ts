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

const canosa: GamePresence = {
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
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move a piece or transfer a ring",
	"descriptionmyturn": "${you} must select a piece to move or transfer a ring from",
	"type": "activeplayer",
	"possibleactions": [
		"move",
		"fight",
		"transfer"
	],
	"transitions": {
		"move": 10,
		"fight": 10,
		"transfer": 10,
		"zombiePass": 20,
		"endGame": 99
	},
	"args": "argPlayerTurn",
	"action": "stPlayerTurn"
}
					*/
					break;
				case "playerTurn2":
					/*
					{
	"name": "playerTurn2",
	"description": "${actplayer} must move a piece or transfer a ring",
	"descriptionmyturn": "${you} must select a piece to move or transfer a ring from",
	"type": "activeplayer",
	"possibleactions": [
		"move",
		"fight",
		"transfer"
	],
	"transitions": {
		"move": 20,
		"fight": 20,
		"transfer": 20,
		"zombiePass": 20,
		"endGame": 99
	},
	"args": "argPlayerTurn",
	"action": "stPlayerTurn"
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
		"nextTurn": 2,
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
export default canosa;
