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

const yaniv: GamePresence = {
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
				case "throwTurn":
					/*
					{
	"name": "throwTurn",
	"description": "${actplayer} must play a valid card combination",
	"descriptionmyturn": "${you} must play a valid card combination ${or_yaniv}",
	"type": "activeplayer",
	"args": "argThrowTurn",
	"possibleactions": [
		"playCard",
		"callYaniv"
	],
	"updateGameProgression": true,
	"transitions": {
		"playCard": 3,
		"endRound": 6,
		"zombiePass": 5
	}
}
					*/
					break;
				case "pickupTurn":
					/*
					{
	"name": "pickupTurn",
	"description": "${actplayer} must draw or pick up a card",
	"descriptionmyturn": "${you} must draw or pick up a card",
	"type": "activeplayer",
	"args": "argPickupTurn",
	"possibleactions": [
		"drawCard",
		"pickupCard"
	],
	"transitions": {
		"nextTurn": 5,
		"slapdownPossible": 4,
		"zombiePass": 5
	}
}
					*/
					break;
				case "slapdownTurn":
					/*
					{
	"name": "slapdownTurn",
	"description": "${actplayer} must draw or pick up a card",
	"descriptionmyturn": "${you} may play the drawn ${card_color}${card_value} immediately",
	"type": "activeplayer",
	"args": "argSlapdownTurn",
	"possibleactions": [
		"slapdownPlay",
		"slapdownPass"
	],
	"transitions": {
		"nextTurn": 5,
		"zombiePass": 5
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
		"nextPlayer": 2,
		"endRound": 6,
		"endGame": 99
	}
}
					*/
					break;
				case "endRound":
					/*
					{
	"name": "endRound",
	"description": "",
	"type": "game",
	"action": "stEndRound",
	"transitions": {
		"nextPlayer": 2,
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
export default yaniv;
