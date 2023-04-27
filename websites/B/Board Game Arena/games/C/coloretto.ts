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

const coloretto: GamePresence = {
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
	"description": "Game setup",
	"type": "manager",
	"action": "stGameSetup",
	"transitions": {
		"": 2
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 3
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must pick a card or take a row",
	"descriptionmyturn": "${you} must pick a card or take a row",
	"type": "activeplayer",
	"action": "stPlayerTurn",
	"updateGameProgression": true,
	"possibleactions": [
		"pickCard",
		"takeRow"
	],
	"transitions": {
		"pickCard": 8,
		"takeRow": 4
	}
}
					*/
					break;
				case "endPlayerTurn":
					/*
					{
	"name": "endPlayerTurn",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndPlayerTurn",
	"transitions": {
		"nextPlayer": 2,
		"endOfRound": 5
	}
}
					*/
					break;
				case "endOfRound":
					/*
					{
	"name": "endOfRound",
	"description": "",
	"descriptionmyturn": "",
	"type": "game",
	"action": "stEndOfRound",
	"transitions": {
		"nextRound": 2,
		"endOfGame": 99
	}
}
					*/
					break;
				case "chooseRow":
					/*
					{
	"name": "chooseRow",
	"description": "${actplayer} must choose a row for the card",
	"descriptionmyturn": "${you} must place this card on a row",
	"type": "activeplayer",
	"action": "stChooseRow",
	"possibleactions": [
		"placeOnRow"
	],
	"transitions": {
		"placeOnRow": 4
	}
}
					*/
					break;
				case "gameEnd":
					/*
					{
	"name": "gameEnd",
	"description": "End of game",
	"action": "stGameEnd",
	"type": "manager",
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
export default coloretto;
