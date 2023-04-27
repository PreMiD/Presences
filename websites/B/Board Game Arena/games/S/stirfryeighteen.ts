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

const stirfryeighteen: GamePresence = {
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
				case "generalSetup":
					/*
					{
	"name": "generalSetup",
	"description": "",
	"type": "game",
	"action": "stGeneralSetup",
	"transitions": {
		"beginMatch": 3
	}
}
					*/
					break;
				case "playerDraw":
					/*
					{
	"name": "playerDraw",
	"description": "",
	"type": "game",
	"action": "stPlayerDraw",
	"updateGameProgression": true,
	"transitions": {
		"playerDiscard": 4,
		"zombiePass": 11
	}
}
					*/
					break;
				case "playerAction":
					/*
					{
	"name": "playerAction",
	"description": "${actplayer} may discard cards and cook",
	"descriptionmyturn": "${you} must choose",
	"type": "activeplayer",
	"action": "stPlayerAction",
	"args": "argPlayerAction",
	"possibleactions": [
		"discardCard",
		"playCards",
		"pass"
	],
	"transitions": {
		"askCardType": 7,
		"askTasteTest": 5,
		"nextAction": 6,
		"endTurn": 9,
		"checkMeal": 10,
		"zombiePass": 11
	}
}
					*/
					break;
				case "askTasteTest":
					/*
					{
	"name": "askTasteTest",
	"description": "Wait until all players have passed or a taste test is called",
	"descriptionmyturn": "Ask for a taste test?",
	"type": "multipleactiveplayer",
	"action": "stAskTasteTest",
	"possibleactions": [
		"askTasteTest",
		"pass"
	],
	"transitions": {
		"nextAction": 6
	}
}
					*/
					break;
				case "afterDiscard":
					/*
					{
	"name": "afterDiscard",
	"description": "",
	"type": "game",
	"action": "stAfterDiscard",
	"transitions": {
		"discardAgain": 4,
		"endGame": 98
	}
}
					*/
					break;
				case "askCardType":
					/*
					{
	"name": "askCardType",
	"description": "${actplayer} must inform about the discarded protein card",
	"descriptionmyturn": "${you} must tell which protein card you have discarded",
	"type": "activeplayer",
	"possibleactions": [
		"tell"
	],
	"transitions": {
		"askTasteTest": 5,
		"zombiePass": 11
	}
}
					*/
					break;
				case "playerReduce":
					/*
					{
	"name": "playerReduce",
	"description": "${actplayer} must reduce his hand to 3 cards",
	"descriptionmyturn": "${you} must reduce your hand to 3 cards",
	"type": "activeplayer",
	"action": "stCheckReduce",
	"possibleactions": [
		"reduceHand"
	],
	"transitions": {
		"endTurn": 11,
		"zombiePass": 11
	}
}
					*/
					break;
				case "checkMeal":
					/*
					{
	"name": "checkMeal",
	"description": "",
	"type": "game",
	"action": "stCheckMeal",
	"transitions": {
		"endTurn": 9,
		"endGame": 98
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
		"nextPlayer": 3,
		"endGame": 98
	}
}
					*/
					break;
				case "preFinal":
					/*
					{
	"name": "preFinal",
	"description": "",
	"type": "game",
	"action": "stPreFinal",
	"transitions": {
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
export default stirfryeighteen;
