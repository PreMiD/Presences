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

const cinco: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"updateGameProgression": true,
	"transitions": {
		"": 30
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card, take a card or exchange 4 cards",
	"descriptionmyturn": "${you} must select a card ${or1} click on the deck to draw a card ${or2}",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"takeACard",
		"exchange4Cards",
		"playCard"
	],
	"transitions": {
		"takeACard": 35,
		"exchange4Cards": 35,
		"playCard": 31,
		"zombiePass": 35,
		"NotPossible": 35
	}
}
					*/
					break;
				case "playToken":
					/*
					{
	"name": "playToken",
	"description": "${actplayer} must place a token",
	"descriptionmyturn": "${you} must place a token",
	"type": "activeplayer",
	"args": "argPlayToken",
	"possibleactions": [
		"playAToken"
	],
	"transitions": {
		"playAToken": 32,
		"zombiePass": 35
	}
}
					*/
					break;
				case "tokenPlayed":
					/*
					{
	"name": "tokenPlayed",
	"description": "",
	"type": "game",
	"action": "stTP",
	"updateGameProgression": true,
	"transitions": {
		"": 35
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
		"nextPlayer": 30,
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
export default cinco;
