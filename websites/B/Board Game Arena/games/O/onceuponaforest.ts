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

const onceuponaforest: GamePresence = {
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
				case "drawCardInit":
					/*
					{
	"name": "drawCardInit",
	"description": "${actplayer} must draw a card",
	"descriptionmyturn": "${you} must draw a card",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard"
	],
	"transitions": {
		"nextPlayer": 3
	},
	"action": "stDrawCardInit"
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
	"updateGameProgression": true,
	"transitions": {
		"drawCardInit": 2,
		"playCardOnForest": 10,
		"playLatestCardsOnForest": 20,
		"gameEnd": 99
	}
}
					*/
					break;
				case "playCardOnForest":
					/*
					{
	"name": "playCardOnForest",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play one of your cards on your forest",
	"type": "activeplayer",
	"possibleactions": [
		"playCardOnForest"
	],
	"transitions": {
		"giveCardToPlayer": 11,
		"nextPlayer": 3,
		"drawCard": 15
	},
	"action": "stPlayCardOnForest"
}
					*/
					break;
				case "giveCardToPlayer":
					/*
					{
	"name": "giveCardToPlayer",
	"description": "${actplayer} must give a card to another player",
	"descriptionmyturn": "${you} must give one of your cards to another player",
	"type": "activeplayer",
	"possibleactions": [
		"giveCardToPlayer"
	],
	"transitions": {
		"switchToDesignatedPlayer": 12,
		"nextPlayer": 3
	}
}
					*/
					break;
				case "switchToDesignatedPlayer":
					/*
					{
	"name": "switchToDesignatedPlayer",
	"description": "",
	"type": "game",
	"action": "stSwitchToDesignatedPlayer",
	"updateGameProgression": false,
	"transitions": {
		"playImposedCardOnForest": 13
	}
}
					*/
					break;
				case "playImposedCardOnForest":
					/*
					{
	"name": "playImposedCardOnForest",
	"description": "${actplayer} must play the received card",
	"descriptionmyturn": "${you} must play the received card on your forest",
	"type": "activeplayer",
	"possibleactions": [
		"playImposedCardOnForest"
	],
	"transitions": {
		"switchPlayerBack": 14
	},
	"action": "stPlayImposedCardOnForest",
	"updateGameProgression": true
}
					*/
					break;
				case "switchPlayerBack":
					/*
					{
	"name": "switchPlayerBack",
	"description": "",
	"type": "game",
	"action": "stSwitchBackToCurrentPlayer",
	"updateGameProgression": false,
	"transitions": {
		"drawCard": 15,
		"nextPlayer": 3
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must draw a card",
	"descriptionmyturn": "${you} must draw cards to complete your hand",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard"
	],
	"transitions": {
		"drawCard": 15,
		"nextPlayer": 3
	},
	"action": "stDrawCard"
}
					*/
					break;
				case "playLatestCardsOnForest":
					/*
					{
	"name": "playLatestCardsOnForest",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} must play the rest of your hand on your forest",
	"type": "activeplayer",
	"action": "stPlayLatestCardsOnForest",
	"possibleactions": [
		"playCardOnForest"
	],
	"transitions": {
		"playLatestCardsOnForest": 20,
		"nextPlayer": 3
	},
	"updateGameProgression": true
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
export default onceuponaforest;
