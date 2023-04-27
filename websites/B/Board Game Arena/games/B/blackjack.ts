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

const blackjack: GamePresence = {
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
				case "placeBet":
					/*
					{
	"name": "placeBet",
	"description": "${actplayer} must place a bet",
	"descriptionmyturn": "${you} must place a bet",
	"type": "activeplayer",
	"args": "argPlaceBet",
	"possibleactions": [
		"placeBet"
	],
	"transitions": {
		"placeBet": 3,
		"zombiePass": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "nextBet":
					/*
					{
	"name": "nextBet",
	"description": "",
	"type": "game",
	"action": "stNextBet",
	"transitions": {
		"nextBet": 2,
		"endBet": 4,
		"endGame": 99
	}
}
					*/
					break;
				case "dealCards":
					/*
					{
	"name": "dealCards",
	"description": "",
	"type": "game",
	"action": "stDealCards",
	"transitions": {
		"blackjackEnd": 7,
		"startHand": 5
	}
}
					*/
					break;
				case "playHand":
					/*
					{
	"name": "playHand",
	"description": "${actplayer} must choose what to do",
	"descriptionmyturn": "${you} must choose what to do",
	"type": "activeplayer",
	"args": "argPlayHand",
	"possibleactions": [
		"selectHit",
		"selectStand",
		"selectDouble",
		"selectSplit",
		"selectSurrender"
	],
	"transitions": {
		"continueTurn": 5,
		"endPlay": 6,
		"zombiePass": 6,
		"endGame": 99
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
		"continueHand": 5,
		"endHand": 7,
		"endGame": 99
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
	"updateGameProgression": true,
	"transitions": {
		"nextHand": 2,
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
export default blackjack;
