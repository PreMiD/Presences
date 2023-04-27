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

const solo: GamePresence = {
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
		"": 20
	}
}
					*/
					break;
				case "playerTurn":
					/*
					{
	"name": "playerTurn",
	"description": "${actplayer} must play or draw a card",
	"descriptionmyturn": "${you} must play a card or",
	"type": "activeplayer",
	"args": "argPlayerTurn",
	"action": "stPlayerTurn",
	"possibleactions": [
		"playCard",
		"drawCard"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombiePass": 12,
		"endHand": 30
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
		"playerTurn": 2,
		"colorWish": 6,
		"choosePlayer": 7,
		"drawDecision": 8,
		"playOrPass": 9,
		"moveCards": 5
	}
}
					*/
					break;
				case "moveCards":
					/*
					{
	"name": "moveCards",
	"description": "Moving the cards around in playing order",
	"type": "game",
	"action": "stMoveCards",
	"transitions": {
		"nextPlayer": 3
	}
}
					*/
					break;
				case "playerChooseColor":
					/*
					{
	"name": "playerChooseColor",
	"description": "${actplayer} must choose a color",
	"descriptionmyturn": "${you} must choose a color",
	"type": "activeplayer",
	"possibleactions": [
		"chooseColor"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombieChooseColor": 11
	}
}
					*/
					break;
				case "playerChoosePlayer":
					/*
					{
	"name": "playerChoosePlayer",
	"description": "${actplayer} must choose a player",
	"descriptionmyturn": "${you} must choose a player to change cards with: ",
	"type": "activeplayer",
	"possibleactions": [
		"choosePlayer"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombiePass": 12
	}
}
					*/
					break;
				case "playerHasToDraw":
					/*
					{
	"name": "playerHasToDraw",
	"description": "${actplayer} must extend or draw ${drawAmount} cards",
	"descriptionmyturn": "${you} must extend or draw ${drawAmount} cards",
	"type": "activeplayer",
	"args": "argPlayerHasToDraw",
	"possibleactions": [
		"playCard",
		"drawCard"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombiePass": 12,
		"endHand": 30
	}
}
					*/
					break;
				case "playerTurnAfterDraw":
					/*
					{
	"name": "playerTurnAfterDraw",
	"description": "${actplayer} may play the drawn card or pass",
	"descriptionmyturn": "${you} must choose: ",
	"type": "activeplayer",
	"args": "argPlayerTurnAfterDraw",
	"possibleactions": [
		"playCard",
		"pass"
	],
	"transitions": {
		"nextPlayer": 3,
		"zombiePass": 12,
		"endHand": 30
	}
}
					*/
					break;
				case "playerConfirm":
					/*
					{
	"name": "playerConfirm",
	"description": "Wait until every player is ready",
	"descriptionmyturn": "Ready for the action?",
	"type": "multipleactiveplayer",
	"possibleactions": [
		"playerConfirm"
	],
	"action": "stPlayerConfirm",
	"transitions": {
		"beginHand": 21
	}
}
					*/
					break;
				case "zombieChooseColor":
					/*
					{
	"name": "zombieChooseColor",
	"description": "",
	"type": "game",
	"action": "stZombieChooseColor",
	"transitions": {
		"nextPlayer": 12
	}
}
					*/
					break;
				case "zombiePass":
					/*
					{
	"name": "zombiePass",
	"description": "",
	"type": "game",
	"action": "stZombiePass",
	"transitions": {
		"nextPlayer": 2,
		"drawDecision": 8
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
		"playerConfirm": 10
	}
}
					*/
					break;
				case "beginHand":
					/*
					{
	"name": "beginHand",
	"description": "",
	"type": "game",
	"action": "stBeginHand",
	"updateGameProgression": true,
	"transitions": {
		"beginHand": 2
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
export default solo;
