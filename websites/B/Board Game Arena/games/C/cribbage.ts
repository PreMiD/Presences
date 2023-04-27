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

const cribbage: GamePresence = {
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
				case "startState":
					/*
					{
	"name": "startState",
	"description": "",
	"type": "game",
	"action": "stStartState",
	"updateGameProgression": true,
	"transitions": {
		"cut": 200,
		"random": 3
	}
}
					*/
					break;
				case "setDealer":
					/*
					{
	"name": "setDealer",
	"description": "",
	"type": "game",
	"action": "stSetDealer",
	"transitions": {
		"tie": 2,
		"winner": 9
	}
}
					*/
					break;
				case "nextHand":
					/*
					{
	"name": "nextHand",
	"description": "",
	"type": "game",
	"action": "stNextHand",
	"updateGameProgression": true,
	"transitions": {
		"": 10
	}
}
					*/
					break;
				case "giveToCrib":
					/*
					{
	"name": "giveToCrib",
	"description": "Opponent must choose 2 cards to give to their crib",
	"descriptionmyturn": "${you} must choose 2 cards to give to ${dealer} crib",
	"type": "multipleactiveplayer",
	"action": "stGiveCards",
	"args": "argDealerName",
	"possibleactions": [
		"giveCards"
	],
	"transitions": {
		"giveCards": 100
	}
}
					*/
					break;
				case "cutCard":
					/*
					{
	"name": "cutCard",
	"description": "${actplayer} must pick a cut card",
	"descriptionmyturn": "${you} must pick a cut card",
	"type": "activeplayer",
	"possibleactions": [
		"cutCard"
	],
	"transitions": {
		"cutCard": 20,
		"endGame": 90
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
		"nextPlayer": 30,
		"ClearBoard": 35,
		"endGame": 90
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
		"playerTurn": 20,
		"nextPlayer": 30,
		"go": 33,
		"ClearBoard": 35,
		"endGame": 90
	}
}
					*/
					break;
				case "go":
					/*
					{
	"name": "go",
	"description": "${actplayer} must play a card",
	"descriptionmyturn": "${you} cannot play a card",
	"type": "activeplayer",
	"possibleactions": [
		"go"
	],
	"transitions": {
		"nextPlayer": 30
	}
}
					*/
					break;
				case "ClearBoard":
					/*
					{
	"name": "ClearBoard",
	"description": "",
	"type": "game",
	"action": "stClearBoard",
	"transitions": {
		"nextPlayer": 30,
		"scoreHands": 40
	}
}
					*/
					break;
				case "scorePoneHand":
					/*
					{
	"name": "scorePoneHand",
	"description": "",
	"type": "game",
	"action": "stScorePoneHandHand",
	"transitions": {
		"scoreDealerHand": 45,
		"endGame": 90
	}
}
					*/
					break;
				case "scoreDealerHand":
					/*
					{
	"name": "scoreDealerHand",
	"description": "",
	"type": "game",
	"action": "stScoreDealerHand",
	"transitions": {
		"newHand": 9,
		"endGame": 90
	}
}
					*/
					break;
				case "endMatch":
					/*
					{
	"name": "endMatch",
	"description": "",
	"type": "game",
	"action": "stEndMatch",
	"transitions": {
		"nextGame": 9,
		"endMatch": 99
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
				case "checkForCut":
					/*
					{
	"name": "checkForCut",
	"description": "",
	"type": "game",
	"action": "stCheckAutoCut",
	"transitions": {
		"cut": 15,
		"cutCard": 20,
		"endGame": 90
	}
}
					*/
					break;
				case "cutDeal":
					/*
					{
	"name": "cutDeal",
	"description": "Opponent must choose a card ",
	"descriptionmyturn": "${you} must choose a card",
	"type": "multipleactiveplayer",
	"action": "stCutDeal",
	"possibleactions": [
		"cutDeal"
	],
	"transitions": {
		"done": 3
	}
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
export default cribbage;
