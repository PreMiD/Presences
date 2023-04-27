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

const mow: GamePresence = {
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
		"swapHands": 23,
		"playerTurn": 21
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play a card or pick up the herd",
	"descriptionnoHerd": "${actplayer} must play a card",
	"descriptionmustTake": "${actplayer} must play a card or pick up the herd",
	"descriptionmyturn": "${you} must play a card or pick up the herd",
	"descriptionmyturnnoHerd": "${you} must play a card",
	"descriptionmyturnmustTake": "${you} must pick up the herd",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"possibleactions": [
		"playCard",
		"playFarmer",
		"chooseDirection",
		"collectHerd",
		"collectLastHerd",
		"endGame"
	],
	"transitions": {
		"playCard": 31,
		"playFarmer": 31,
		"playFarmerWithOpponentSelection": 40,
		"chooseDirection": 22,
		"collectHerd": 31,
		"collectHerdSimple": 21,
		"collectLastHerd": 89,
		"zombiePass": 32
	}
}
					*/
					break;
				case "chooseDirection":
					/*
					{
	"name": "chooseDirection",
	"description": "${actplayer} must choose the direction",
	"descriptionmyturn": "${you} must choose the direction",
	"type": "activeplayer",
	"args": "argChooseDirection",
	"possibleactions": [
		"setDirection",
		"setPlayer"
	],
	"transitions": {
		"setDirection": 31,
		"setPlayer": 31,
		"nextPlayer": 32,
		"zombiePass": 32
	}
}
					*/
					break;
				case "swapHands":
					/*
					{
	"name": "swapHands",
	"description": "${actplayer} can swap cards in hand with another player",
	"descriptionmyturn": "${you} can swap cards in hand with another player",
	"type": "activeplayer",
	"args": "argSwapHands",
	"possibleactions": [
		"swap",
		"dontSwap"
	],
	"transitions": {
		"playerTurn": 21,
		"zombiePass": 32
	}
}
					*/
					break;
				case "playFarmer":
					/*
					{
	"name": "playFarmer",
	"description": "${actplayer} can play a farmer",
	"descriptionmyturn": "${you} can play a farmer",
	"type": "activeplayer",
	"args": "argPlayFarmer",
	"possibleactions": [
		"playFarmer",
		"pass"
	],
	"transitions": {
		"playFarmer": 31,
		"playFarmerWithOpponentSelection": 40,
		"pass": 32,
		"chooseDirectionPick": 22,
		"zombiePass": 32
	}
}
					*/
					break;
				case "playAgain":
					/*
					{
	"name": "playAgain",
	"description": "",
	"type": "game",
	"action": "stPlayAgain",
	"transitions": {
		"playCard": 21,
		"playAgain": 25,
		"chooseDirectionPick": 22,
		"nextPlayer": 32
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
		"nextPlayer": 21
	}
}
					*/
					break;
				case "selectOpponent":
					/*
					{
	"name": "selectOpponent",
	"description": "${actplayer} must select an opponent for played farmer card",
	"descriptionmyturn": "${you} must select an opponent for played farmer card",
	"type": "activeplayer",
	"action": "stSelectOpponent",
	"args": "argSelectOpponent",
	"possibleactions": [
		"viewCards",
		"exchangeCard"
	],
	"transitions": {
		"viewCards": 41,
		"exchangeCard": 42,
		"zombiePass": 32
	}
}
					*/
					break;
				case "viewCards":
					/*
					{
	"name": "viewCards",
	"description": "${actplayer} looks to chosen opponent cards",
	"descriptionmyturn": "${you} look to chosen opponent cards",
	"type": "activeplayer",
	"args": "argViewCards",
	"possibleactions": [
		"next"
	],
	"transitions": {
		"next": 31,
		"zombiePass": 32
	}
}
					*/
					break;
				case "giveCard":
					/*
					{
	"name": "giveCard",
	"description": "${actplayer} must give back a card to chosen opponent",
	"descriptionmyturn": "${you} must give back a card to chosen opponent",
	"type": "activeplayer",
	"action": "stGiveCard",
	"possibleactions": [
		"giveCard"
	],
	"transitions": {
		"giveCard": 31,
		"zombiePass": 32
	}
}
					*/
					break;
				case "selectFliesType":
					/*
					{
	"name": "selectFliesType",
	"description": "Player with special farmer can choose flies to ignore",
	"descriptionmyturn": "${you} can choose flies to ignore",
	"type": "multipleactiveplayer",
	"action": "stSelectFliesType",
	"args": "argSelectFliesType",
	"possibleactions": [
		"ignoreFlies"
	],
	"transitions": {
		"endHand": 90
	}
}
					*/
					break;
				case "collectHand":
					/*
					{
	"name": "collectHand",
	"description": "Collect points in each player's hand",
	"type": "game",
	"action": "stCollectHand",
	"transitions": {
		"selectFliesType": 45,
		"endHand": 90
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
	"action": "stEndRound",
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
export default mow;
