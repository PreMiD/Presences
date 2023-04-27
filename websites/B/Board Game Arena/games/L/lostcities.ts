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

const lostcities: GamePresence = {
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
				case "newRound":
					/*
					{
	"name": "newRound",
	"description": "",
	"type": "game",
	"action": "stNewRound",
	"transitions": {
		"start": 10
	}
}
					*/
					break;
				case "nextPlayer":
					/*
					{
	"name": "nextPlayer",
	"description": "",
	"updateGameProgression": true,
	"type": "game",
	"action": "stNextPlayer",
	"transitions": {
		"": 11
	}
}
					*/
					break;
				case "playerPlayCard":
					/*
					{
	"name": "playerPlayCard",
	"description": "${actplayer} must place a card in an expedition or on the board",
	"descriptionmyturn": "${you} must place a card in an expedition or on the board",
	"type": "activeplayer",
	"possibleactions": [
		"playCardExpedition",
		"playCardBoard"
	],
	"transitions": {
		"": 12
	}
}
					*/
					break;
				case "playerPickCard":
					/*
					{
	"name": "playerPickCard",
	"description": "${actplayer} must pick a card from the board or from the deck",
	"descriptionmyturn": "${you} must pick a card from the board or from the deck",
	"type": "activeplayer",
	"possibleactions": [
		"pickFromBoard",
		"pickFromDeck"
	],
	"transitions": {
		"": 14
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
		"deckEmpty": 98,
		"nextTurn": 10
	}
}
					*/
					break;
				case "statProcessing":
					/*
					{
	"name": "statProcessing",
	"description": "",
	"type": "game",
	"action": "stStatProcessing",
	"transitions": {
		"endGame": 99,
		"newRound": 2
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
export default lostcities;
