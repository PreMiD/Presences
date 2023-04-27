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

const crazyfarmers: GamePresence = {
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
				case "selectFirstCrossroad":
					/*
					{
	"name": "selectFirstCrossroad",
	"description": "${actplayer} must select a crossroad around his field from where to start",
	"descriptionmyturn": "${you} must select a crossroad around your field from where to start",
	"type": "activeplayer",
	"possibleactions": [
		"selectFirstCrossroad",
		"undo"
	],
	"transitions": {
		"selectFirstCrossroad": 3,
		"zombiepass": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must move or play a card",
	"descriptionmyturn": "${you} must move or play a card",
	"type": "activeplayer",
	"possibleactions": [
		"move",
		"playCard",
		"next",
		"undo",
		"discard",
		"endGame"
	],
	"updateGameProgression": true,
	"transitions": {
		"canMove": 3,
		"next": 10,
		"endTurn": 4,
		"restart": 2,
		"shouldDiscard": 5,
		"zombiepass": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "endTurn":
					/*
					{
	"name": "endTurn",
	"description": "${actplayer} must play a card or end turn",
	"descriptionmyturn": "${you} must play a card or end turn",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"next",
		"move",
		"discard",
		"undo"
	],
	"updateGameProgression": true,
	"transitions": {
		"canMove": 3,
		"shouldDiscard": 5,
		"next": 10,
		"restart": 2,
		"endTurn": 4,
		"zombiepass": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "discard":
					/*
					{
	"name": "discard",
	"description": "${actplayer} must play or discard a card to have max 6 cards",
	"descriptionmyturn": "${you} must play or discard a card to have max 6 cards",
	"type": "activeplayer",
	"possibleactions": [
		"playCard",
		"next",
		"move",
		"discard",
		"undo"
	],
	"updateGameProgression": true,
	"transitions": {
		"canMove": 3,
		"shouldDiscard": 5,
		"next": 10,
		"endTurn": 4,
		"zombiepass": 11,
		"endGame": 99
	}
}
					*/
					break;
				case "next":
					/*
					{
	"name": "next",
	"description": "",
	"type": "game",
	"action": "stNextPlayer",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 3,
		"nextStarting": 2,
		"nextEndTurn": 4
	}
}
					*/
					break;
				case "zombie":
					/*
					{
	"name": "zombie",
	"description": "",
	"type": "game",
	"action": "stZombie",
	"updateGameProgression": true,
	"transitions": {
		"nextPlayer": 3,
		"nextStarting": 2,
		"nextEndTurn": 4,
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
export default crazyfarmers;
