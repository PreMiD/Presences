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

const egocentricworld: GamePresence = {
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
				case "newHand":
					/*
					{
	"name": "newHand",
	"description": "",
	"type": "game",
	"action": "stNewHand",
	"transitions": {
		"playerTurn": 5
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must do an action",
	"descriptionmyturn": "${you} must do an action",
	"type": "activeplayer",
	"possibleactions": [
		"drawCard",
		"pickCard",
		"playCard",
		"playOneCard",
		"stopRound",
		"throwCard"
	],
	"transitions": {
		"drawCard": 10,
		"pickCard": 15,
		"stopRound": 60,
		"exchangeCards": 30,
		"seeCards": 40,
		"throwCard": 60,
		"endHand": 70,
		"zombiePass": 60
	}
}
					*/
					break;
				case "drawCard":
					/*
					{
	"name": "drawCard",
	"description": "${actplayer} must activate or discard a card",
	"descriptionmyturn": "${you} must activate or discard a card",
	"type": "activeplayer",
	"args": "argDrawCard",
	"possibleactions": [
		"playCardDrawn",
		"throwCard",
		"playCard"
	],
	"transitions": {
		"exchangeCards": 30,
		"seeCards": 40,
		"throwCard": 60,
		"endHand": 70,
		"zombieThrow": 80
	}
}
					*/
					break;
				case "pickCard":
					/*
					{
	"name": "pickCard",
	"description": "${actplayer} must activate or discard a card",
	"descriptionmyturn": "${you} must activate or discard a card",
	"type": "activeplayer",
	"args": "argPickCard",
	"possibleactions": [
		"playCardPicked",
		"throwCard",
		"playCard"
	],
	"transitions": {
		"exchangeCards": 30,
		"seeCards": 40,
		"throwCard": 60,
		"endHand": 70,
		"zombieThrow": 80
	}
}
					*/
					break;
				case "exchangeCards":
					/*
					{
	"name": "exchangeCards",
	"description": "${actplayer} must choose one or two players",
	"descriptionmyturn": "${you} must choose one or two players",
	"type": "activeplayer",
	"args": "argExchangeCards",
	"possibleactions": [
		"choosePlayersExchange",
		"chooseCardsExchange"
	],
	"transitions": {
		"askFirstPlayerExchange": 31,
		"zombiePass": 60
	}
}
					*/
					break;
				case "askFirstPlayerExchange":
					/*
					{
	"name": "askFirstPlayerExchange",
	"description": "",
	"type": "game",
	"action": "stAskFirstPlayerExchange",
	"transitions": {
		"playerAnswer": 32
	}
}
					*/
					break;
				case "firstPlayerAnswerExchange":
					/*
					{
	"name": "firstPlayerAnswerExchange",
	"description": "${actplayer} must validate or cancel an exchange",
	"descriptionmyturn": "${you} must validate or cancel an exchange",
	"type": "activeplayer",
	"args": "argFirstPlayerAnswerExchange",
	"possibleactions": [
		"cancelEffect",
		"validateExchange"
	],
	"transitions": {
		"targetAgreesExchange": 33,
		"cancel": 60,
		"endHand": 70,
		"zombieAccept": 33
	}
}
					*/
					break;
				case "firstTargetAgreesExchange":
					/*
					{
	"name": "firstTargetAgreesExchange",
	"description": "",
	"type": "game",
	"action": "stFirstTargetAgreesExchange",
	"transitions": {
		"secondPlayerAnswer": 34,
		"chooseCardsOnePlayer": 36
	}
}
					*/
					break;
				case "secondPlayerAnswerExchange":
					/*
					{
	"name": "secondPlayerAnswerExchange",
	"description": "${actplayer} must validate or cancel an exchange",
	"descriptionmyturn": "${you} must validate or cancel an exchange",
	"type": "activeplayer",
	"args": "argSecondPlayerAnswerExchange",
	"possibleactions": [
		"cancelEffect",
		"validateExchange"
	],
	"transitions": {
		"targetAgreesExchange": 35,
		"cancel": 60,
		"endHand": 70,
		"zombieAccept": 33
	}
}
					*/
					break;
				case "secondTargetAgreesExchange":
					/*
					{
	"name": "secondTargetAgreesExchange",
	"description": "",
	"type": "game",
	"action": "stSecondTargetAgreesExchange",
	"transitions": {
		"chooseCardsFirstPlayer": 37
	}
}
					*/
					break;
				case "exchangeCardsOnePlayer":
					/*
					{
	"name": "exchangeCardsOnePlayer",
	"description": "${actplayer} can choose a card for ${other_player}",
	"descriptionmyturn": "${you} can choose a card for ${other_player}",
	"type": "activeplayer",
	"args": "argExchangeCardsOnePlayer",
	"possibleactions": [
		"chooseCardsOneExchange"
	],
	"transitions": {
		"exchangeMade": 60,
		"drawCard": 60
	}
}
					*/
					break;
				case "exchangeCardsFirstPlayer":
					/*
					{
	"name": "exchangeCardsFirstPlayer",
	"description": "${actplayer} can choose a card for ${first_player}",
	"descriptionmyturn": "${you} can choose a card for ${first_player}",
	"type": "activeplayer",
	"args": "argExchangeCardsFirstPlayer",
	"possibleactions": [
		"chooseCardsFirstExchange"
	],
	"transitions": {
		"drawCard": 60,
		"chooseCardsSecond": 38
	}
}
					*/
					break;
				case "exchangeCardsSecondPlayer":
					/*
					{
	"name": "exchangeCardsSecondPlayer",
	"description": "${actplayer} can choose a card for ${second_player}",
	"descriptionmyturn": "${you} can choose a card for ${second_player} or validate directly for a random one",
	"type": "activeplayer",
	"args": "argExchangeCardsSecondPlayer",
	"possibleactions": [
		"chooseCardsSecondExchange"
	],
	"transitions": {
		"exchangeMade": 60,
		"drawCard": 60
	}
}
					*/
					break;
				case "seeCards":
					/*
					{
	"name": "seeCards",
	"description": "${actplayer} must choose a player",
	"descriptionmyturn": "${you} must choose a player",
	"type": "activeplayer",
	"possibleactions": [
		"choosePlayerSee"
	],
	"transitions": {
		"askPlayerSee": 45,
		"zombiePass": 60
	}
}
					*/
					break;
				case "askPlayer":
					/*
					{
	"name": "askPlayer",
	"description": "",
	"type": "game",
	"action": "stAskPlayer",
	"transitions": {
		"playerAnswer": 46
	}
}
					*/
					break;
				case "playerAnswer":
					/*
					{
	"name": "playerAnswer",
	"description": "${actplayer} must validate or cancel an effect",
	"descriptionmyturn": "${you} must validate or cancel an effect",
	"type": "activeplayer",
	"args": "argPlayerAnswer",
	"possibleactions": [
		"cancelEffect",
		"validateEffect"
	],
	"transitions": {
		"targetAgreesSee": 47,
		"cancel": 60,
		"endHand": 70,
		"zombieAccept": 47
	}
}
					*/
					break;
				case "targetAgreesSee":
					/*
					{
	"name": "targetAgreesSee",
	"description": "",
	"type": "game",
	"action": "stTargetAgreesSee",
	"transitions": {
		"playerSee": 48
	}
}
					*/
					break;
				case "playerSee":
					/*
					{
	"name": "playerSee",
	"description": "${actplayer} must validate",
	"descriptionmyturn": "${you} must validate",
	"type": "activeplayer",
	"args": "argPlayerSee",
	"possibleactions": [
		"validate"
	],
	"transitions": {
		"nextPlayer": 60,
		"zombieAccept": 60
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
		"playerTurn": 5,
		"endHand": 70
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
		"nextHand": 2,
		"endGame": 99
	}
}
					*/
					break;
				case "zombieThrow":
					/*
					{
	"name": "zombieThrow",
	"description": "",
	"type": "game",
	"action": "stZombieThrow",
	"transitions": {
		"throwCard": 60
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
export default egocentricworld;
