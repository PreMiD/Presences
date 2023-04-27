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

const spades: GamePresence = {
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
		"": 21
	}
}
					*/
					break;
				case "actionBidding":
					/*
					{
	"name": "actionBidding",
	"description": "${actplayer} is bidding",
	"descriptionmyturn": "${you} must bid a number of tricks",
	"type": "activeplayer",
	"args": "argActionBidding",
	"possibleactions": [
		"bid"
	],
	"transitions": {
		"nextPlayer": 32,
		"zombiePass": 10,
		"endGame": 99
	}
}
					*/
					break;
				case "nextPlayerBid":
					/*
					{
	"name": "nextPlayerBid",
	"type": "game",
	"action": "stNextPlayerBid",
	"transitions": {
		"ContinueBid": 21,
		"startTricks": 31
	}
}
					*/
					break;
				case "cardExchange":
					/*
					{
	"name": "cardExchange",
	"type": "activeplayer",
	"description": "${actplayer} must give 2 cards to partner",
	"descriptionmyturn": "${you} must give 2 cards to your partner",
	"possibleactions": [
		"giveCards"
	],
	"transitions": {
		"": 24
	}
}
					*/
					break;
				case "cardExchange_playerChange":
					/*
					{
	"name": "cardExchange_playerChange",
	"type": "game",
	"action": "stCardExchange_playerChange",
	"transitions": {
		"exchangeNotFinished": 23,
		"startTricks": 31
	}
}
					*/
					break;
				case "newTrick":
					/*
					{
	"name": "newTrick",
	"description": "",
	"type": "game",
	"action": "stNewTrick",
	"transitions": {
		"": 31
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play a card",
	"type": "activeplayer",
	"possibleactions": [
		"playCard"
	],
	"transitions": {
		"playCard": 32
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
		"nextPlayerBid": 21,
		"exchange": 23,
		"nextPlayer": 31,
		"nextTrick": 30,
		"finalHand": 33,
		"endHand": 40
	}
}
					*/
					break;
				case "lastHand":
					/*
					{
	"name": "lastHand",
	"description": "Playing last cards",
	"type": "game",
	"possibleactions": [
		"playCard"
	],
	"action": "stLastHand",
	"transitions": {
		"": 40
	}
}
					*/
					break;
				case "endHand":
					/*
					{
	"name": "endHand",
	"description": "",
	"type": "game",
	"action": "stEndHand",
	"transitions": {
		"nextHand": 20,
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
export default spades;
